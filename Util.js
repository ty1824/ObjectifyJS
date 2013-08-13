/**
 * Created with JetBrains WebStorm.
 * User: Tyler.Hodgkins
 * Date: 8/13/13
 * Time: 1:52 PM
 * To change this template use File | Settings | File Templates.
 */

"use strict";

Objectify.Util = (function() {

    var define = function (object, definition) {
        for (var prop in definition) {
            if (definition.hasOwnProperty(prop)) {
                object.prototype[prop] = definition[prop];
            }
        }
        return object;
    };

    var struct = function(definition) {
        return this.define(Object.create(Object), definition);
    };

    /**
     * Creates a new object with the given parent object, constructor, and definition.
     *
     * @param {Object} parameters
     * @param {Object} config.extend
     * @param {Function} config.constructor
     * @param {Object} config.definition
     * @returns {Object} The new class
     */
    var defclass = function (parameters) {
        var ret = function(config) {
            if (parameters.extend) {
                parameters.extend.call(this, config); // SUPER call
            }
            this.__init(config); // Constructor call
        };
        ret.prototype = Object.create(parameters.extend.prototype || Object.prototype, parameters.definition);
        ret.prototype.__init = parameters.constructor;

        return ret;
    };


    return {
        define : define,
        struct : struct,
        class : defclass
    }
} ());