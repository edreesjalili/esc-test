(function() {
    'use strict';
    angular
        .module("socialwallApp", [])
        .controller("cardListController", cardListController);
})();

function cardListController() {
    var vm = this;
    vm.posts = getPosts().items;
}