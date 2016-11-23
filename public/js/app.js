(function() {
    'use strict';
    angular
        .module("socialwallApp", ["akoenig.deckgrid"])
        .controller("cardListController", cardListController);
})();

function cardListController() {
    var vm = this;
    vm.posts = shuffle(getPosts().items);
}

function shuffle(o){
  for(var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
  return o;
}