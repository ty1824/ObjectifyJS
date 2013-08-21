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
     */
    var Point = function Point() {
        this.x = 0;
        this.y = 0;
    };

    /**
     * Dimensions
     *
     * @class
     */
    var Dimensions = function Dimensions() {
        this.width = 0;
        this.height = 0;
    };

    /**
     * Spacing
     *
     * @class
     */
    var Spacing = function Spacing() {
        this.top = 0;
        this.bottom = 0;
        this.left = 0;
        this.right = 0;
    };

    /**
     * Bounds
     *
     * @public
     * @param config
     * @constructor
     */
    var Bounds = Util.class( { class : "Bounds",  extends : Object,
        definition : {
            __init : function Bounds(config) {
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

    var Window = Util.class({ extends : Object,
        definition : function Window(config) {
            var stage = new Kinetic.Stage({
                container : config.container,
                width : 800,
                height : 600
            });
            var layer = new Kinetic.Layer({

            });
            var view = null;
            var rate = 10;
            var requireRedraw = false;
            var addChild = true;
            var drawing = false;

            // Debug add stuff to this
            this.view = function() { return view; };
            this.drawing = function() { return drawing; };

            stage.add(layer);

            this.setView = function setView(newView) {
                view = newView;
                layer.removeChildren();
                addChild = true;
            }

            this.setRate = function setRate(newRate) {
                rate = newRate;
            }

            this.getRate = function getRate() {
                return rate;
            }

            this.redraw = function redraw() {
                requireRedraw = true;
            }

            this.start = function start() {
                if (!drawing) {
                    drawing = true;
                    drawWrapper(this, 0);
                }
            }

            function drawWrapper(instance, count) {
//console.log("Counter: " + count++ + ", Rate : " + instance.getRate());
                instance.draw();
                if (instance.drawing) {
                    setTimeout(drawWrapper, instance.getRate(), instance, count);
                }
            }

            this.draw = function draw() {
//console.log("Drawing: " + drawing + ", rate: " + rate);
                if (requireRedraw && view) {
                    view.draw();
                    if (addChild) {
                        layer.addChild(view.getGroup());
                    }
                    stage.draw();
                }
            }

            this.stop = function stop() {
                drawing = false
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
        definition : function Widget(config) {
            var position = config.position || new Point();
            var dimensions = config.dimensions || new Dimensions();
            var margins = config.margins || new Spacing();
            var padding = config.padding || new Spacing();
            var background = config.background || null;
            var visible = config.visible || true;

            this.setPosition = function setPosition(position) { this.position = position; this.requireLayout(); };
            this.getPosition = function getPosition() { return this.position; };

            this.setDimensions = function setDimensions(dimensions) { this.dimensions = dimensions; this.requireLayout(); };
            this.getDimensions = function getDimensions() { return this.dimensions; };

            this.setMargins = function setMargins(margins) { this.margins = margins; this.requireLayout(); };
            this.getMargins = function getMargins() { return this.margins; };

            this.setPadding = function setPadding(padding) { this.padding = padding; this.requireLayout(); };
            this.getPadding = function getPadding() { return this.padding; };

            this.setBackground = function setBackground(background) { this.background = background; this.requireLayout(); };
            this.getBackground = function getBackground() { return this.background; };

            this.setVisible = function setVisible(visible) { this.visible = visible; this.requireLayout(); };

            /**
             * Checks if this widget is currently visible
             *
             * @public
             * @returns {boolean}
             */
            this.isVisible = function() { return this.visible; };

            this.getGroup = function() { return this.group; };

            this.requireLayout = function() {
                this.requiresLayout = this.visible;
                if (this.requiresLayout) {
                    this.layout();
                }
            };

            this.layout = function layout() {
                this.doLayout();
                this.requiresLayout = false;
            };

            this.doLayout = function doLayout() {
                this.bounds = new Bounds({
                    location : this.location,
                    dimensions : this.dimensions
                });
                this.marginBounds = this.bounds.applySpacing(this.margins);
                this.paddingBounds = this.marginBounds.applySpacing(this.padding);
            };

            this.draw = function draw() {
                if (this.requiresLayout) {
                    this.layout();
                }
            };
        }
    });

    /*
    var Widget = Util.class( { class : "Widget",  extends : Object,
        definition : {
            __init : function Widget(config) {
                this.position = config.position || new Point();
                this.dimensions = config.dimensions || new Dimensions();
                this.margins = config.margins || new Spacing();
                this.padding = config.padding || new Spacing();
                this.background = config.background || null;
                this.visible = config.visible || true;
                this.doLayout();
            },

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
             /
            isVisible : function() { return this.visible; },

            getGroup : function() { return this.group; },

            requireLayout : function() {
                this.requiresLayout = this.visible;
                if (this.requiresLayout) {
                    this.layout();
                }
            },

            layout : function layout() {
                this.doLayout();
                this.requiresLayout = false;
            },

            doLayout : function doLayout() {
                this.bounds = new Bounds({
                    location : this.location,
                    dimensions : this.dimensions
                });
                this.marginBounds = this.bounds.applySpacing(this.margins);
                this.paddingBounds = this.marginBounds.applySpacing(this.padding);
            },

            draw : function() {
                if (this.requiresLayout) {
                    this.layout();
                }
            }
        }
    });
*/

    var WidgetGroup = Util.class( { extends : Widget,
        definition :  function WidgetGroup(config) {
            var children = [];

            /**
             * Adds a child to this widget.
             *
             * @public
             * @param {Widget} child
             */
            this.addChild = function addChild(child) {
                if (this.children.indexOf(child) < 0) {
                    this.children.push(child);
                    this.group.add(child.group);
                    this.requireLayout();
                }
            }

            /**
             * Removes the specified child from this widget.
             *
             * @public
             * @param {Widget} child
             */
            this.removeChild = function removeChild(child) {
                var index = this.children.indexOf(child);
                if (index >= 0) {
                    this.children.splice(index, 1);
                    child.group.remove();
                    this.requireLayout();
                }
            }

            this.doLayout = function doLayout() {
                Widget.doLayout.call(this);

                var groupAttrs = {
                    x : this.paddingBounds.x(),
                    y : this.paddingBounds.y(),
                    width : this.paddingBounds.getWidth(),
                    height : this.paddingBounds.getHeight()
                }

                this.group.setAttrs(groupAttrs);

                for (var child in this.children) {
                    child.doLayout();
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
        definition : function TextWidget(config) {

            var textView;

            var text = config.text;

            this.setText = function setText(text) { text = text; this.requireLayout(); },
            this.getText = function getText() { return text; },

            this.doLayout = function doLayout() {
                console.log("Doing layout");
                this.super.doLayout.call(this); // Super call (calculates bounds)

                var textViewAttrs = {
                    text : text,
                    x : this.paddingBounds.x(),
                    y : this.paddingBounds.y(),
                    width : this.paddingBounds.width(),
                    height : this.paddingBounds.height()
                };

                if (textView) {
                    textView.setAttrs(textViewAttrs);
                } else {
                    textView = new Kinetic.Text(textViewAttrs);
                    this.group.addChild(textView);
                }

            }
        }
    });

    return {
        Point : Point,
        Dimensions : Dimensions,
        Spacing : Spacing,
        Widget : Widget,
        TextWidget : TextWidget,
        WidgetGroup : WidgetGroup,
        Window : Window
    }


} (Objectify.Util));