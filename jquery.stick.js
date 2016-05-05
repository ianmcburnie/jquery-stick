/**
* @file jQuery plugin that sticks the given fixed position element to any another element
* @author Ian McBurnie <ianmcburnie@hotmail.com>
* @version 0.0.1
* @requires jquery
*/
(function($) {
    function alignTop($el, fixedBounds, options) {
        $el.css('bottom', window.innerHeight - fixedBounds.top - options.offsetTop + 'px');
    }

    function alignBottom($el, fixedBounds, options) {
        $el.css('top', fixedBounds.bottom + options.offsetTop + 'px');
    }

    function alignVerticalBaseline($el, fixedBounds, options) {
        $el.css('bottom', window.innerHeight - fixedBounds.bottom - options.offsetTop + 'px');
    }

    function alignMiddle($el, fixedBounds, options) {
        var targetDeltaHeight = fixedBounds.height - $el.outerHeight();
        $el.css('top', fixedBounds.top + (targetDeltaHeight / 2) + options.offsetTop + 'px');
    }

    function alignLeft($el, fixedBounds, options) {
        $el.css('right', window.innerWidth - fixedBounds.left - options.offsetLeft + 'px');
    }

    function alignHorizontalBaseline($el, fixedBounds, options) {
        $el.css('left', fixedBounds.left + options.offsetLeft + 'px');
    }

    function alignRight($el, fixedBounds, options) {
        $el.css('left', fixedBounds.right + options.offsetLeft + 'px');
    }

    function alignCenter($el, fixedBounds, options) {
        var targetDeltaWidth = fixedBounds.width - $el.outerWidth();
        $el.css('left', fixedBounds.left + (targetDeltaWidth / 2) + options.offsetLeft + 'px');
    }

    /**
    * jQuery plugin that sticks the given fixed position element to any another element
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
            offsetLeft: 0
        }, options);

        var fixedBounds = $.fn.stick.getElementsFixedBounds(targetEl);

        return this.each(function onEach() {
            var $this = $(this);

            switch (options.alignY) {
                case 0:
                case "top":
                    alignTop($this, fixedBounds, options); break;
                case 1:
                case "baseline":
                    alignVerticalBaseline($this, fixedBounds, options); break;
                case 2:
                case "bottom":
                default:
                    alignBottom($this, fixedBounds, options); break;
                case 3:
                case "middle":
                    alignMiddle($this, fixedBounds, options); break;
            }

            switch (options.alignX) {
                case 0:
                case "left":
                    alignLeft($this, fixedBounds, options); break;
                case 1:
                case "baseline":
                default:
                    alignHorizontalBaseline($this, fixedBounds, options); break;
                case 2:
                case "right":
                    alignRight($this, fixedBounds, options); break;
                case 3:
                case "center":
                    alignCenter($this, fixedBounds, options); break;
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

/**
* The jQuery plugin namespace.
* @external "jQuery.fn"
* @see {@link http://learn.jquery.com/plugins/|jQuery Plugins}
*/
