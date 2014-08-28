'use strict';

/* Services */

var app = angular.module('myApp.services', []);
app.service('receiptService', function() {
    /*
     * Provide receipt data between different controllers.
     */
    this.mockReceipt = {"date":{"Y":2014,"h":23,"m":15,"M":7,"D":16},"total_sum":null,"shop_name":"abc heinola","products":[{"price":2.39,"name":"hedelmäpupmijggurtti"},{"price":0.34,"name":"hakarueji"},{"price":7.29,"name":"hyvä suomi arkijuusto"},{"price":2.45,"name":"maksalaatikko"},{"price":2.49,"name":"broileripyörykät"},{"price":0.21,"name":"muovikassi 40l valio"},{"price":5.35,"name":"vmssezsn"}],"credit_card":true};

    // this.receipt = this.mockReceipt;
    this.getReceipt = function() {
        // get current receipt or one specified by id
        return this.receipt;
    };

    this.updateReceipt = function(rcpt) {
        // Update receipt to api
    };

    this.setReceipt = function(rcpt) {
        this.receipt = rcpt;
    };
});
//TODO inject http service properly here or on the top line??
app.service('userService', function($http, $location, $timeout, $cookies) {

    var user = null;
    var userhash = null;

    this.getUser = function() {
        return user;
    };

    this.setUser = function(username, pwhash){
        // validate login cookie with api
        $http({method: 'POST', url: '/api/verifycookie/',
               data: {'username': username, 'pwhash': pwhash}}).
            success(function(data, status, headers, config) {
                //set user
                user = username;
                userhash = pwhash;
                console.log("Login verified OK!");
            }).
            error(function(data, status, headers, config) {
                console.log("Validation error, removing cookies.");
                $cookies.currentUser = "";
                $cookies.currentUserHash = "";
            });

    };

    this.loginUser = function(username, password) {
        
        $http({method: 'GET', url: '/api/user/'}).
            success(function(data, status, headers, config) {
                console.log("Login OK!");
                // this callback will be called asynchronously
                // when the response is available
                console.log(data);
                console.log(status);
                console.log(headers);
                console.log(config);
            }).
            error(function(data, status, headers, config) {
                console.log("Login Error:");
                console.log(data);
                console.log(status);
                console.log(headers);
                console.log(config);
            });
        // HTTP Post /api/user/
        // {'username': username, 'password': password}
        // TODO create http-request function.
    };

    this.registerUser = function(username, password) {
        $http({method: 'POST', url: '/api/user/',
               data: {
                   'username': username,
                   'password': password}}).
            success(function(data, status, headers, config) {
                user = data['username'];
                userhash = data['pwhash'];
                
                $cookies.currentUser = data['username'];
                $cookies.currentUserHash = data['pwhash'];
                
                $location.path('/home');
            }).
            error(function(data, status, headers, config) {
                console.log("something wrong with registration.. duplicate user maybe");
                console.log(data);
            });
        // HTTP Post /api/user/
        // {'username': username, 'password': password}
        // TODO create http-request function.
    };

    this.logout = function() {
        $cookies.currentUser = '';
        $cookies.currentUserHash = '';
        user = null;
        userhash = null;
        
        $location.path('/index');

    };

    this.updatePassword = function(newPassword) {
        $http({method: 'UPDATE', url: '/api/user/'}).
            success(function(data, status, headers, config) {
                // this callback will be called asynchronously
                // when the response is available
            }).
            error(function(data, status, headers, config) {
                // called asynchronously if an error occurs
                // or server returns response with an error status.
            });
        // HTTP Post /api/user/
        // {'username': username, 'password': password}
        // TODO create http-request function.
    };
});
