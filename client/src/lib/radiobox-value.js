// @param document node
// @return string|array

module.exports = function(el) {
    var values = []

    if (!el) return null

    if (typeof el.length == 'undefined') return el.checked ? el.value : null

    for (var i = 0; i < el.length; i++) {
        el[i].checked && values.push(el[i].value)
    }

    return values
}