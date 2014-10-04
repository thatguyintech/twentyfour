$.get("etc/valid_combos.txt", function(data) {
    var rows = data.split("\n");
    var random = Math.floor(Math.random() * rows.length);
    var nums = rows[random];
    // shuffle
    for (var i = 0; i < 4; i++) { 
        var j = Math.floor(Math.random() * (4 - i) + i);
        var temp = nums[j];
        nums[j] = nums[i];
        nums[i] = temp;
    }
    $("#randnums").text(nums);
});

