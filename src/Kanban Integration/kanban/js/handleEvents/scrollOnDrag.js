/**
 * handle drag of items to scroll when approching parent borders
 */

const scrollAmount = 10;
const padding = 150;
var container = null;
var intervalId = null;
var event = null;

/**
 * Get the directions depending on cursor position
 */
const getScrollDirections = function(container) {
    const rect = container.getBoundingClientRect();
    var x = event.clientX - rect.left;
    var y = event.clientY - rect.top;
    var { height, width } = rect;
    const directions = [];

    const top = Math.floor(y);
    const bottom = Math.floor(height - y);
    const left = Math.floor(x);
    const right = Math.floor(width - x);

    if (left <= padding) {
        directions.push("left");
    } else if (right <= padding) {
        directions.push("right");
    }

    if (top <= padding) {
        directions.push("top");
    } else if (bottom <= padding) {
        directions.push("bottom");
    }

    return directions;
}

/**
 * scroll in the direction of the cursor
 */
const scroll = function() { 
    if (!container) {
        return;
    }
    
    const directions = getScrollDirections(container);
    directions.forEach(direction => {
        switch(direction) {
            case "left":
                container.scrollBy({
                    left: -scrollAmount,
                    behavior: "instant"
                });
                break;
            case "right":
                container.scrollBy({
                    left: scrollAmount,
                    behavior: "instant"
                });
                break;
            case "top":
                container.scrollBy({
                    top: -scrollAmount,
                    behavior: "instant"
                });
                break;
            case "bottom":
                container.scrollBy({
                    top: scrollAmount,
                    behavior: "instant"
                });
                break;
        }
    });

    // continue scrolling without the mousemove event triggered
    if (directions.length > 0 && !intervalId) {
        intervalId = setInterval(scroll, 10);
    }
}

const handleMousemove = function(e) {
    event = e;
    scroll();
}

module.exports = {
    start: function (el, source) {
        container = $(el).parents(".scrolling-container")[0];
        $(document).on("mousemove", handleMousemove);
    },
    stop: function () {
        $(document).unbind("mousemove", handleMousemove);
        clearInterval(intervalId);
        intervalId = null;
    }
}