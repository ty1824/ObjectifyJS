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
            if (prop != "super") Object.defineProperty(object, prop, { value : definition[prop], enumerable : true });
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
     * @param {Object} config.extends
     * @param {Function} config.constructor
     * @param {Object} config.definition
     * @returns {Object} The new class
     */
        /*
    var defclass = function (parameters) {

        var Class = function(config) {
            if (parameters.extends) {
                parameters.extends.call(this, config); // SUPER call
            }
            this.name = parameters.class;
            this.__init(config); // Constructor call
        };

        Class.prototype = parameters.extends ? Object.create(parameters.extends.prototype) : Object.create(Object.prototype);
        define(Class.prototype, parameters.definition);

        define(Class, Class.prototype);

        return Class;
    }; */

    var defclass = function(parameters) {
        var Class = parameters.definition;
        console.log(parameters.extends.prototype);
        Class.prototype = parameters.extends ? Object.create(parameters.extends.prototype) : Object.create(Object.prototype);
        console.log(Class.prototype);
        define(Class.prototype, Class);

        Class.prototype.super = parameters.extends;

        return Class;
    }

    var timeout = function(args) {
        args.func.call(args.caller);
        console.log("Calling timeout with args: " + args)
        setTimeout(args.repeat, args.delay, {
            repeat : args.repeat,
            delay : args.delay,
            func : args.func,
            caller : args.caller});
    }


    return {
        define : define,
        struct : struct,
        class : defclass,
        timeout : timeout
    }
} ());