/**
 * Created with JetBrains WebStorm.
 * User: Tyler
 * Date: 8/9/13
 * Time: 12:52 AM
 * To change this template use File | Settings | File Templates.
 */

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
    var Widget = Util.class(Object,
        function Widget() {
            this.position = config.position || new Objectify.UI.Point();
            this.dimensions = config.dimensions || new Objectify.UI.Dimensions();
            this.margins = config.margins || new Objectify.UI.Spacing();
            this.padding = config.padding || new Objectify.UI.Spacing();
            this.visible = config.visible || true;
            this.group = new Kinetic.Group(null);
            this.children = [];
            this.drawSet = [];
            this.requiresLayout = true;
        },
        {
            setDimensions : function setDimensions(dimensions) { this.dimensions = dimensions; },
            getDimensions : function getDimensions() { return this.dimensions; },

            setMargins : function setMargins(margins) { this.margins = margins; },
            getMargins : function getMargins() { return this.margins; },

            setPadding : function setPadding(padding) { this.padding = padding; },
            getPadding : function getPadding() { return this.padding; },

            setVisible : function(visible) { this.visible = visible },
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
             * @param {Objectify.UI.Widget} child
             */
            addChild : function addChild(child) {
                this.children.push(child);
                this.group.add(child.group);
            },
            /**
             * Removes the specified child from this widget.
             *
             * @public
             * @param {Objectify.UI.Widget} child
             */
            removeChild : function removeChild(child) {
                var index = this.children.indexOf(child);
                if (index >= 0) {
                    this.children.splice(index, 1);
                    child.group.remove();
                }
            },

            doLayout : function doLayout() {},

            draw : function draw() {
                if (this.requiresLayout) {
                    this.doLayout();
                }
            }
        }
    );

    /**
     *
     * @param config
     * @constructor
     */
    var TextWidget = function(config) {
        this.__init(config);
    };
    Objectify.UI.TextWidget.prototype = {
        __init : function(config) {

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

    return {
        Point : Point,
        Dimensions : Dimensions,
        Spacing : Spacing,
        Widget : Widget
    }


} (Objectify.Util));