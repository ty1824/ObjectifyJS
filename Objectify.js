/**
 * Created with JetBrains WebStorm.
 * User: Tyler
 * Date: 8/8/13
 * Time: 7:59 PM
 * To change this template use File | Settings | File Templates.
 */

var Objectify = (function(Kinetic) {

    Objectify.Util = {
        extend: function(c1, c2) {
            for (var sup in c2) {
                for(var key in sup.prototype) {
                    if(!( key in c1.prototype)) {
                        c1.prototype[key] = sup.prototype[key];
                    }
                }
            }
            return c1;
        }
    };

    /**
     * Point
     *
     * @class
     * @type {{x: number, y: number}}
     */
    Objectify.UI.Point = {
        x : 0,
        y : 0
    };

    /**
     * Dimensions
     *
     * @class
     * @type {{width: number, height: number}}
     */
    Objectify.UI.Dimensions = {
        width : 0,
        height : 0
    };

    /**
     * Spacing
     *
     * @class
     * @type {{top: number, bottom: number, left: number, right: number}}
     */
    Objectify.UI.Spacing = {
        top : 0,
        bottom : 0,
        left : 0,
        right : 0
    };

    /**
     * Widget
     *
     * @param config
     * @constructor
     */
    Objectify.UI.Widget = function(config) {
        this.__init(config);
    };
    Objectify.UI.Widget.prototype = {
        __init : function(config) {
            this.position = config.position || new Objectify.UI.Point();
            this.dimensions = config.dimensions || new Objectify.UI.Dimensions();
            this.margins = config.margins || new Objectify.UI.Spacing();
            this.padding = config.padding || new Objectify.UI.Spacing();
            this.visible = config.visible || true;
            this.children = [];
        },

        setDimensions : function setDimensions(dimensions) { this.dimensions = dimensions; },
        getDimensions : function getDimensions() { return this.dimensions; },

        setMargins : function setMargins(margins) { this.margins = margins; },
        getMargins : function getMargins() { return this.margins; },

        setPadding : function setPadding(padding) { this.padding = padding; },
        getPadding : function getPadding() { return this.padding; },

        setVisible : function(visible) { this.visible = visible },
        isVisible : function() { return this.visible; },

        addChild : function addChild(child) { children.push(child);},



        draw : function draw() {

        }
    };

    /**
     * ObjectWidget
     *
     * @param config
     * @constructor
     */
    Objectify.UI.ObjectWidget = function(config) {
        this.__init(config);
    };
    Objectify.UI.ObjectWidget.prototype = {
        __init : function(config) {
            Objectify.UI.Widget.call(this, config);
        }
    };
    Objectify.Util.extend(Objectify.UI.ObjectWidget, Objectify.UI.Widget);

    /**
     * RelationshipWidget
     *
     * @param config
     * @constructor
     */
    Objectify.UI.RelationshipWidget = function(config) {
        this.__init(config);
    };
    Objectify.UI.RelationshipWidget.prototype = {
        __init : function(config) {
            Objectify.UI.Widget.call(this, config);
        }
    };
    Objectify.Util.extend(Objectify.UI.RelationshipWidget, Objectify.UI.Widget);

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