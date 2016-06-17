/**
* @file jQuery plugin that will stick an absolutely positioned or fixed positioned elements relatively to ancestor or viewport respectively.
* @author Ian McBurnie <ianmcburnie@hotmail.com>
* @version 0.1.0
* @requires jquery
*/
(function($) {
    function alignTop($el, bounds, offset, isFixedPosition) {
        if (isFixedPosition) {
            $el.css('bottom', window.innerHeight - bounds.top - offset + 'px');
        } else {
            $el.css('top', 0 - ($el.outerHeight()) + offset + 'px');
        }
    }

    function alignBottom($el, bounds, offset) {
        $el.css('top', bounds.bottom + offset + 'px');
    }

    function alignVerticalStart($el, bounds, offset) {
        $el.css('top', bounds.top + offset + 'px');
    }

    function alignVerticalEnd($el, bounds, offset, isFixedPosition) {
        if (isFixedPosition) {
            $el.css('bottom', window.innerHeight - bounds.bottom - offset + 'px');
        } else {
            $el.css('top', bounds.bottom - $el.outerHeight() - offset + 'px');
        }
    }

    function alignMiddle($el, bounds, offset) {
        var targetDeltaHeight = bounds.height - $el.outerHeight();
        $el.css('top', bounds.top + (targetDeltaHeight / 2) + offset + 'px');
    }

    function alignLeft($el, bounds, offset, isFixedPosition) {
        if (isFixedPosition) {
            $el.css('right', window.innerWidth - bounds.left - offset + 'px');
        } else {
            $el.css('left', bounds.left - ($el.outerWidth()) + offset + 'px');
        }
    }

    function alignHorizontalStart($el, bounds, offset, isFixedPosition) {
        if (isFixedPosition) {
            $el.css('left', bounds.left + offset + 'px');
        } else {
            $el.css('left', 0 + offset + 'px');
        }
    }

    function alignHorizontalEnd($el, bounds, offset, isFixedPosition) {
        if (isFixedPosition) {
            $el.css('right', window.innerWidth - bounds.right + offset + 'px');
        } else {
            $el.css('left', bounds.right - $el.outerWidth() + offset + 'px');
        }
    }

    function alignRight($el, bounds, offset) {
        $el.css('left', bounds.right + offset + 'px');
    }

    function alignCenter($el, bounds, offset) {
        var targetDeltaWidth = bounds.width - $el.outerWidth();
        $el.css('left', bounds.left + (targetDeltaWidth / 2) + offset + 'px');
    }

    /**
    * jQuery plugin that will stick an absolutely positioned or fixed positioned elements relatively to ancestor or viewport respectively
    *
    * @method "jQuery.fn.stick"
    * @todo Allow fixed bounds to be passed in if we want to avoid the calculation (e.g. on scroll)
    * @param targetEl the target element to stick to
    * @param {Object} [options]
    * @param {number} [options.alignX]
    * @param {number} [options.alignY]
    * @param {number} [options.offsetTop]
    * @param {number} [options.offsetLeft]
    * @param {Object} [options.fixedBounds]
    * @return {jQuery} chainable jQuery class
    */
    $.fn.stick = function(targetEl, options) {
        options = $.extend({
            alignX: 0,
            alignY: 0,
            offsetTop: 0,
            offsetLeft: 0,
            isFixedPosition: false
        }, options);

        var bounds = (options.isFixedPosition === true) ? $.fn.stick.getElementsFixedBounds(targetEl) : $.fn.stick.getElementsBounds(targetEl);

        return this.each(function onEach() {
            var $this = $(this);

            switch (options.alignY) {
                case 0:
                case "top":
                    alignTop($this, bounds, options.offsetTop, options.isFixedPosition);
                    break;
                case 1:
                case "start":
                    alignVerticalStart($this, bounds, options.offsetTop);
                    break;
                case 2:
                case "end":
                    alignVerticalEnd($this, bounds, options.offsetTop, options.isFixedPosition);
                    break;
                case 3:
                case "bottom":
                default:
                    alignBottom($this, bounds, options.offsetTop);
                    break;
                case 4:
                case "middle":
                    alignMiddle($this, bounds, options.offsetTop);
                    break;
            }

            switch (options.alignX) {
                case 0:
                case "left":
                    alignLeft($this, bounds, options.offsetLeft, options.isFixedPosition);
                    break;
                case 1:
                case "start":
                default:
                    alignHorizontalStart($this, bounds, options.offsetLeft, options.isFixedPosition);
                    break;
                case 2:
                case "end":
                    alignHorizontalEnd($this, bounds, options.offsetLeft, options.isFixedPosition);
                    break;
                case 3:
                case "right":
                    alignRight($this, bounds, options.offsetLeft);
                    break;
                case 4:
                case "center":
                    alignCenter($this, bounds, options.offsetLeft);
                    break;
            }
        });
    };
}(jQuery));

/**
* Get the positional data of element (e.g. top, left, width, height) related to fixed positioning
* @method getElementsFixedBounds
* @return {Object} element boundary data object
*/
$.fn.stick.getElementsFixedBounds = function(el) {
    var $el = $(el);
    var $window = $(window);
    var scrollTop = $window.scrollTop();
    var scrollLeft = $window.scrollLeft();
    var offset = $el.offset();
    var outerHeight = $el.outerHeight();
    var outerWidth = $el.outerWidth();

    return {
        top: offset.top - scrollTop,
        left: offset.left - scrollLeft,
        bottom: (offset.top - scrollTop) + outerHeight,
        right: (offset.left - scrollLeft) + outerWidth,
        middle: (offset.top - scrollTop) + (outerHeight / 2),
        center: (offset.left - scrollLeft) + (outerWidth / 2),
        width: outerWidth,
        height: outerHeight
    };
};

$.fn.stick.getElementsBounds = function(el) {
    var $el = $(el);
    var offset = $el.offset();
    var outerHeight = $el.outerHeight();
    var outerWidth = $el.outerWidth();

    return {
        top: 0,
        left: 0,
        bottom: 0 + outerHeight,
        right: 0 + outerWidth,
        middle: 0 + (outerHeight / 2),
        center: 0 + (outerWidth / 2),
        width: outerWidth,
        height: outerHeight
    };
};

/**
* The jQuery plugin namespace.
* @external "jQuery.fn"
* @see {@link http://learn.jquery.com/plugins/|jQuery Plugins}
*/
