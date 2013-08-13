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
    Objectify.Entity = function(config) {
        this.__init(config);
    };
    Objectify.Entity.prototype = {
        __init : function(config) {

        }
    };

    /**
     * Relationship
     *
     * @param config
     * @constructor
     */
    Objectify.Relationship = function(config) {
        this.__init(config);
    };
    Objectify.Relationship.prototype = {
        __init : function(config) {
            Objectify.Entity.call(this, config);
        }
    };
    Objectify.Util.extend(Objectify.Relationship, Objectify.Entity);

    /**
     * Object
     *
     * @param config
     * @constructor
     */
    Objectify.Object = function(config) {
        this.__init(config);
    };
    Objectify.Object.prototype = {
        __init : function(config) {
            Objectify.Entity.call(this, config);
        }
    };
    Objectify.Util.extend(Objectify.Object, Objectify.Entity);

} (Kinetic));