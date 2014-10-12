$('#runner').runner({'autostart': true});
$('#stop_button').click(function() { 
    $('#runner').runner('stop');             
});
$('#start_button').click(function() { 
    $('#runner').runner('start');             
});

