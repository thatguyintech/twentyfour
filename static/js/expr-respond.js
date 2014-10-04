/*
 * expr-respond.js
 *
 * Handles I/O of numbers and validates user's expression.
 * Include jquery and expr-parser before including this.
 *
 */

socket.on('num_response', function (data) {
    $("#randnums").text(data['nums'])
});

function notEmpty(string) {
    return string.length > 0;
}

$("#pass").submit(function() {
    $("#expr-input").val("");
    alert("Weak.");
    socket.emit('num_request');
});

$("#expr-form").submit(function() {
    var expr = $("#expr-input").val();
    var usedAllNumbers = true;
    if (expr.length > 0) {
        var givens = $("#randnums").text().split(" ").filter(notEmpty);
        var operation_re = new RegExp("[ +-/*\(\)]", "g");
        var nums_used = expr.split(operation_re).filter(notEmpty);
        if (nums_used.length != 4) {
            alert ("You must use all four numbers.");
        } else {
            for (var i = 0; i < 4; i++) {
                var found = false;
                for (var j = 0; j < 4; j++) {
                     if (nums_used[i] == givens[j]) {
                         found = true;
                         break;
                     }
                }
                if (!found) {
                    alert("You must use only the given numbers.");
                }
            } 
        }
        if (usedAllNumbers) {
            try {
                var space_re = new RegExp("\\s+", "g");
                var exprval = parser.parse(expr.replace(space_re, ""));
                var epsilon = 0.000001;
                if (Math.abs(exprval - 24) < epsilon) {
                    $("#expr-input").val("");
                    alert("Good job!");
                    socket.emit('num_request');
                } else {
                    alert("Not 24. Try again!");
                }
            } catch (ex) {
                alert("Invalid expression. Try again!");
            }
        }
        return false;
    } else {
        alert("Please enter a solution before submitting."); 
        return false;
    }
});

