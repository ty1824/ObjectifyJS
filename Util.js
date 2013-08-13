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
     * @param {Object} parameters
     * @param {Object} config.extend
     * @param {Function} config.ctor
     * @param {Object} config.definition
     * @returns {Object} The new class
     */
    var defclass = function (parameters) {
        parameters.ctor.prototype = Object.create(parameters.extend.prototype)
        return define(parameters.ctor, parameters.definition);
    };


    return {
        define : define,
        struct : struct,
        class : defclass
    }
} ());