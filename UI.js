/**
 * Created with JetBrains WebStorm.
 * User: Tyler
 * Date: 8/9/13
 * Time: 12:52 AM
 * To change this template use File | Settings | File Templates.
 */
"use strict";

Objectify.UI = (function(Util) {
    /**
     * Point
     *
     * @class
     * @type {{x: number, y: number}}
     */
    var Point = {
        x : 0,
        y : 0
    };

    /**
     * Dimensions
     *
     * @class
     * @type {{width: number, height: number}}
     */
    var Dimensions = {
        width : 0,
        height : 0
    };

    /**
     * Spacing
     *
     * @class
     * @type {{top: number, bottom: number, left: number, right: number}}
     */
    var Spacing = {
        top : 0,
        bottom : 0,
        left : 0,
        right : 0
    };

    /**
     * Widget
     *
     * @public
     * @param config
     * @constructor
     */
    var Widget = Util.class( { extends : Object,
        constructor : (function Widget(config) {
            this.position = config.position || new Point();
            this.dimensions = config.dimensions || new Dimensions();
            this.margins = config.margins || new Spacing();
            this.padding = config.padding || new Spacing();
            this.background = config.background || null;
            this.visible = config.visible || true;
            this.group = new Kinetic.Group(null);
            this.children = [];
            this.drawSet = [];
            this.requiresLayout = true;
        }),
        definition : {

            setDimensions : function setDimensions(dimensions) { this.dimensions = dimensions; this.requireLayout(); },
            getDimensions : function getDimensions() { return this.dimensions; },

            setMargins : function setMargins(margins) { this.margins = margins; this.requireLayout(); },
            getMargins : function getMargins() { return this.margins; },

            setPadding : function setPadding(padding) { this.padding = padding; this.requireLayout(); },
            getPadding : function getPadding() { return this.padding; },

            setBackground : function(background) { this.background = background; this.requireLayout(); },
            getBackground : function() { return this.background; },

            setVisible : function(visible) { this.visible = visible; this.requireLayout(); },
            /**
             * Checks if this widget is currently visible
             *
             * @public
             * @returns {boolean}
             */
            isVisible : function() { return this.visible; },

            /**
             * Adds a child to this widget.
             *
             * @public
             * @param {Widget} child
             */
            addChild : function addChild(child) {
                if (this.children.indexOf(child) < 0) {
                    this.children.push(child);
                    this.group.add(child.group);
                    this.requiresLayout = true;
                }
            },
            /**
             * Removes the specified child from this widget.
             *
             * @public
             * @param {Widget} child
             */
            removeChild : function removeChild(child) {
                var index = this.children.indexOf(child);
                if (index >= 0) {
                    this.children.splice(index, 1);
                    child.group.remove();
                    this.requiresLayout = true;
                }
            },

            requireLayout : function() { this.requiresLayout = true; },

            doLayout : function doLayout() { },

            draw : function draw() {
                if (this.requiresLayout) {
                    this.doLayout();
                }
            }
        }
    });

    /**
     * TextWidget
     *
     * @param config
     * @constructor
     */
    var TextWidget = Util.class( { extends : Widget,
        constructor : function(config) {
            this.text = config.text;
            this.textView = null;
        },
        definition : {
            setText : function(text) { this.text = text; this.requireLayout(); },
            getText : function() { return this.text; },

            doLayout : function() {
                Widget.doLayout.call(this); // Super call

                this.textView = new Kinetic.Text( {
                    text : this.text
                });
                this.group.addChild(this.textView);
            }
        }
    });

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

    return {
        Point : Point,
        Dimensions : Dimensions,
        Spacing : Spacing,
        Widget : Widget,
        TextWidget : TextWidget
    }


} (Objectify.Util));