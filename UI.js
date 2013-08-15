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
     * Bounds
     *
     * @public
     * @param config
     * @constructor
     */
    var Bounds = Util.class( { extends : Object,
        constructor : function Bounds(config) {
            if (config.bounds) {
                this.left = config.bounds.left;
                this.top = config.bounds.top;
                this.right = config.bounds.right;
                this.bottom = config.bounds.bottom;
            } else if (config.location && config.dimensions) {
                this.left = config.location.x;
                this.top = config.location.y;
                this.right = this.left + config.dimensions.width;
                this.bottom = this.top + config.dimensions.height;
            } else {
                this.left = config.left;
                this.top = config.top;
                this.right = config.right;
                this.bottom = config.bottom;
            }
        },
        definition : {
            x : function() { return this.left; },
            y : function() { return this.top; },
            width : function() { return this.right - this.left; },
            height : function() { return this.bottom - this.top; },
            getLeft : function() { return this.left; },
            getTop : function() { return this.top; },
            getRight : function() { return this.right; },
            getBottom : function() { return this.bottom;},

            applySpacing : function(spacing) {
                var ret = new Bounds(this);
                ret.top += spacing.top;
                ret.left += spacing.left;
                ret.bottom -= spacing.bottom;
                ret.right -= spacing.right;
                return ret;
            }
        }
    });

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

            setPosition : function setPosition(position) { this.position = position; this.requireLayout(); },
            getPosition : function getPosition() { return this.position; },

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

            doLayout : function doLayout() {
                this.bounds = new Bounds({
                    location : this.location,
                    dimensions : this.dimensions
                });
                this.marginBounds = this.bounds.applySpacing(this.margins);
                this.paddingBounds = this.marginBounds.applySpacing(this.padding);
            },

            draw : function draw() {
                if (this.requiresLayout) {
                    this.doLayout();
                }
            }
        }
    });

    var Window = Util.class( { extends : Object,
        constructor : function(config) {

        },
        definition : {

        }
    });

    var Layout = Util.class( { extends : Widget,
        constructor : function(config) {

        },
        definition : {

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
                Widget.doLayout.call(this); // Super call (calculates bounds)

                var textViewAttrs = {
                    text : this.text,
                    x : this.paddingBounds.x(),
                    y : this.paddingBounds.y(),
                    width : this.paddingBounds.width(),
                    height : this.paddingBounds.height()
                };

                if (this.textView) {
                    this.textView.setAttrs(textViewAttrs);
                } else {
                    this.textView = new Kinetic.Text(textViewAttrs);
                    this.group.addChild(this.textView);
                }

            }
        }
    });

    return {
        Point : Point,
        Dimensions : Dimensions,
        Spacing : Spacing,
        Widget : Widget,
        TextWidget : TextWidget
    }


} (Objectify.Util));