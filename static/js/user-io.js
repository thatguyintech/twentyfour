/*
 * expr-respond.js
 *
 * Handles I/O of numbers and validates user's expression.
 * Include jquery and expr-parser before including this.
 *
 */

var startTime = 0;

socket.on('num_response', function (data) {
    startTime = Date.now();
    $("#randnums").text(data['nums']);
    $("#streak").text(data['streak']);
    if (parseInt($("#beststreak").text()) < data['streak']) {
        $("#beststreak").text(data['streak']);
    }
});

function notEmpty(string) {
    return string.length > 0;
}

$("#pass-submit").click(function () {
    $("#expr-input").val("");
    alert("Weak.");
    socket.emit('num_request_pass');
    return false;
});

$("#expr-form").submit(function () {
    var expr = $("#expr-input").val();
    var usedAllNumbers = true;
    if (expr.length > 0) {
        var givens = $("#randnums").text().split(" ").filter(notEmpty);
        var operation_re = new RegExp("[ +-/*\(\)]", "g");
        var nums_used = expr.split(operation_re).filter(notEmpty);
        if (nums_used.length != 4) {
            alert ("You must use all four numbers.");
            usedAllNumbers = false;
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
                    usedAllNumbers = false;
                    break;
                }
            } 
        }
        if (usedAllNumbers) {
            try {
                var space_re = new RegExp("\\s+", "g");
                var exprval = parser.parse(expr.replace(space_re, ""));
                var epsilon = 0.000001;
                if (Math.abs(exprval - 24) < epsilon) {
                    var endTime = Date.now();
                    var solveTime = (endTime - startTime) / 1000;
                    alert("Good job!\nYou took " + solveTime + " seconds.");
                    $("#expr-input").val("");
                    if (solveTime < parseFloat($("#fastest").text())
                        || $("#fastest").text().charAt(0) == "\u221E") {
                        $("#fastest").text(solveTime);
                    }
                    socket.emit('num_request_success',
                                { streak: parseInt($("#streak").text()) });
                } else {
                    alert(exprval + " is not 24. Try again!");
                }
            } catch (ex) {
                alert("Invalid expression. Try again!");
            }
        }
    } else {
        alert("Please enter a solution before submitting."); 
    }
    return false;
});

startTime = Date.now();
