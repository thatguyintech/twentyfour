/*
 * expr-respond.js
 *
 * Include jquery and expr-parser before including this.
 *
 */

$("#expr-submit").click(function() {
    var expr = $("#expr-input").val();
    if (expr.length > 0) {
        try {
            var space_re = new RegExp("\\s+", "g");
            var exprval = parser.parse(expr.replace(space_re, ""));
            var epsilon = 0.000001;
            if (Math.abs(exprval - 24) < epsilon) {
                alert("Good job!");
            } else {
                alert("Not 24. Try again!");
            }
        } catch (ex) {
            alert("Invalid expression. Try again!");
        }
    }
});
