var fs = require('fs')

function notEmpty (str) {
    return str.length > 0;
}

exports.getnums = function () {
    var text = fs.readFileSync("./static/etc/valid_combos.txt", "utf8");
    var rows = text.split("\n");
    var nums = "";
    while (nums.length == 0) {
        nums = rows[Math.floor(Math.random() * rows.length)];
    }
    nums = nums.split(" ").filter(notEmpty);
    for (var i = 0; i < 4; i++) {
        var j = Math.floor(Math.random() * (4 - i) + i);
        var temp = nums[j];
        nums[j] = nums[i];
        nums[i] = temp;
    }
    var given_nums = "";
    for (i = 0; i < 4; i++) {
        given_nums += nums[i];
        given_nums += " ";
    }
    return given_nums;
}
