(function() {
    'use strict';
    angular
        .module("socialwallApp", ["akoenig.deckgrid", "ngSanitize", "linkify"])
        .controller("cardListController", CardListController);
})();

function CardListController() {
    var vm = this;
    vm.posts = parseTweets(shuffle(getPosts().items));
}

function shuffle(o){
  for(var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
  return o;
}

function parseTweets(tweets) {
    for(var i = 0; i < tweets.length; i++) {
        if(tweets[i].service_slug === "instagram") {
            tweets[i].item_data.caption = parseInstagramMessage(tweets[i]);
            continue;
        } else if (tweets[i].service_slug === "manual") continue;
        //fixes @s
        tweets[i].item_data.tweet = tweets[i].item_data.tweet.replace(/(@([A-Z]*[a-z]*[0-9]*)*)/g, function(a, b) {
            return '<span class="red-text">'+b+'</span>';
        });
        //fixes #s
        tweets[i].item_data.tweet = tweets[i].item_data.tweet.replace(/(#([A-Z]*[a-z]*[0-9]*)*)/g, function(a, b) {
            return '<span class="red-text">'+b+'</span>';
        });
    }
    return tweets;
}

function parseInstagramMessage(message) {
    return message.item_data.caption.replace(/(#([A-Z]*[a-z]*[0-9]*)*)/g, function(a, b) {
            return '<span class="red-text">'+b+'</span>';
        });
}
