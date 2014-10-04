function notEmpty(str) {
    return str.length>0;

}
$.get("etc/valid_combos.txt", function(data) {
    var rows = data.split("\n");

    var random = Math.floor(Math.random() * rows.length);
    
    var nums = rows[random];
    
    while (nums == ""){
        var random = Math.floor(Math.random()*rows.length);
        nums = rows[random];
    }
    nums = nums.split(" ");
    nums = nums.filter(notEmpty);
    // shuffle
    for (var i = 0; i < 4; i++) { 
        var j = Math.floor(Math.random() * (4 - i) + i);
        var temp = nums[j];
        nums[j] = nums[i];
        nums[i] = temp;
    }
    var given_nums = "";
    for ( var i = 0; i < 4; i++) {
        given_nums+=nums[i];
        given_nums+= " ";
    }
   // $("#randnums").text(nums);
    $("#randnums").text(given_nums);
});

