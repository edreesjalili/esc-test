(function() {
    'use strict';
    angular
        .module("socialwallApp", ["akoenig.deckgrid", "ngSanitize", "linkify", "angularLazyImg"])
        .filter("postFilter", postFilter)
        .controller("cardListController", CardListController);
})();

function postFilter() {
    return function(posts, filters) {
        return posts.filter(function(post) {
            if(filters.length === 0) return true;
            if(filters.indexOf(post.service_slug) < 0)
                return false;
            else return true;
        });
    }
}

function CardListController($filter) {
    var vm = this;
    vm.filters = [];
    vm.posts = sortPosts(getPosts().items);
    vm.filteredPosts = $filter('postFilter')(vm.posts, vm.filters);
    vm.disableLoad = false;
    vm.visibleFilters = false;

    vm.updateFilters = updateFilters;
    vm.activeFilter = activeFilter;
    vm.loadMorePosts = loadMorePosts;
    vm.toggleFilters = toggleFilters;

    
    function sortPosts(o){
    o.sort(function(a, b) {
        return a.item_published - b.item_published;
    });
    return o;
    }

    /* no longer needed due to linkify module and added custom parsing for instagram in angular-linkify.js
    function parseTweets(tweets) {
        for(var i = 0; i < tweets.length; i++) {
            if(tweets[i].service_slug === "instagram") {
                tweets[i].item_data.caption = parseInstagramMessage(tweets[i]);
                continue;
            }
            else if (tweets[i].service_slug === "manual") continue;
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
    */

    function updateFilters(filterOption) {
        var i;
        i = vm.filters.indexOf(filterOption);
        if (i < 0) vm.filters.push(filterOption);
        else vm.filters.splice(i,1);

        vm.filteredPosts = $filter('postFilter')(vm.posts, vm.filters);
    }

    function activeFilter(filterOption) {
        return (vm.filters.indexOf(filterOption) >= 0) ? true : false;
    }

    function loadMorePosts() {
        if (vm.disableLoad) return;
        vm.disableLoad = true;
        (sortPosts(getPosts().items)).forEach(function(post) {
            vm.posts.push(post);
        });
        
        vm.filteredPosts = (function() {
            var posts = $filter('postFilter')(vm.posts, vm.filters);
            vm.disableLoad = false;
            return posts;
        })();
    }

    function toggleFilters() {
        vm.visibleFilters = !vm.visibleFilters;
    }
}
