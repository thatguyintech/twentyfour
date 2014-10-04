/*
 * expr-respond.js
 *
 * Validates user's expression.
 * Include jquery and expr-parser before including this.
 *
 */
function notEmpty(string) {
    return string.length>0;
}
$("#expr-submit").click(function() {
    var expr = $("#expr-input").val();
    var UsedAllNumbers = 1;
    if (expr.length > 0) {
        // TODO: check that only and all digits given are used
        var givens = $("#randnums").text();
        var givens = givens.split(" ");
        givens = givens.filter(notEmpty);
        console.log(givens);
        var re = new RegExp("[ +-/*\(\)]", "g");
        var nums_used = expr.split(re);
        nums_used = nums_used.filter(notEmpty)
        console.log(nums_used);
        if (nums_used.length != 4) {
            alert ("You must use all four numbers.");
            UsedAllNumbers=0;
        }
        for (var i = 0; i < 4; i++) {
                bool = 0;
                for ( var j = 0; j < 4; j++) {
                if (nums_used[i] == givens[j]) {
                    bool = 1;
                    break;
                }
           }
            if (!bool) {
                alert("You must use each number exactly once.");
                UsedAllNumbers = 0;
                break;
            }
        } 
        if (UsedAllNumbers==1) {
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
     }
});
