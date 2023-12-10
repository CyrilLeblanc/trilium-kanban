module.exports = function(container, event) {
    const padding = 150;
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