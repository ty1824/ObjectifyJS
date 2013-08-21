/**
 * Created with JetBrains WebStorm.
 * User: Tyler
 * Date: 8/8/13
 * Time: 7:59 PM
 * To change this template use File | Settings | File Templates.
 */

"use strict";

var Objectify = (function(Kinetic) {
    /**
     * Entity
     *
     * @param config
     * @constructor
     */
    var Entity = function(config) {
        this.__init(config);
    };
    Entity.prototype = {
        __init : function(config) {

        }
    };

    /**
     * Relationship
     *
     * @param config
     * @constructor
     */
    var Relationship = function(config) {
        this.__init(config);
    };
    Relationship.prototype = {
        __init : function(config) {
            Objectify.Entity.call(this, config);
        }
    };
    //extend(Objectify.Relationship, Objectify.Entity);

    /**
     * Object
     *
     * @param config
     * @constructor
     */
    var Obj = function(config) {
        this.__init(config);
    };
    Obj.prototype = {
        __init : function(config) {
            Objectify.Entity.call(this, config);
        }
    };
    //Objectify.Util.extend(Objectify.Object, Objectify.Entity);

    return {
        Entity : Entity,
        Relationship : Relationship,
        Obj : Obj
    }
} (Kinetic));