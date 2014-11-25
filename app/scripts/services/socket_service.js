/**
 * @brief Angular-Service for the socket io updates
 *
 * @file socket_service.js
 * @author martin linggi
 */

(function() {
    'use strict';

    angular.module('forgedditApp').factory('SocketService', ['$rootScope', function ($rootScope) {

        //=====================================================================
        // private variables
        //=====================================================================
        var socket = io.connect();

        //=====================================================================
        // private functions
        //=====================================================================
        function on(eventName, callback) {
            socket.on(eventName, function () {
                var args = arguments;
                $rootScope.$apply(function () {
                    callback.apply(socket, args);
                });
            });
        }

        function emit(eventName, data, callback) {
            if (typeof data == 'function') {
                callback = data;
                data = {};
            }
            socket.emit(eventName, data, function () {
                var args = arguments;
                $rootScope.$apply(function () {
                    if (callback) {
                        callback.apply(socket, args);
                    }
                });
            });
        }

        function emitAndListen(eventName, data, callback) {
            this.emit(eventName, data, callback);
            this.on(eventName, callback);
        }

        //=====================================================================
        // Service API
        //=====================================================================
        return {
            on: on,
            emit: emit,
            emitAndListen: emitAndListen
        };
    }]);
}());