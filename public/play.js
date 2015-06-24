
 var socket = io();

    // 2. This code loads the IFrame Player API code asynchronously.
    var tag = document.createElement('script');

    tag.src = "https://www.youtube.com/iframe_api";
    var firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

    // 3. This function creates an <iframe> (and YouTube player)
    //    after the API code downloads.
    var player;
    var id = 'M7lc1UVf-VE';

    function onYouTubeIframeAPIReady() {
        player = new YT.Player('player', {
            events: {
                'onReady': onPlayerReady,
                'onStateChange': onPlayerStateChange
            }
        });
    }

    // 4. The API will call this function when the video player is ready.
    function onPlayerReady(event) {
        //player.playVideo();
    }

    // 5. The API calls this function when the player's state changes.
    //    The function indicates that when playing a video (state=1),
    //    the player should play for six seconds and then stop.
    var done = false;

    function onPlayerStateChange(event) {
        console.log("Player state changed");
    }


    function stopVideo() {
        player.stopVideo();
    }

     var uid = window.location.href;
    uid = uid.substring(uid.indexOf("#") + 1);
    console.log("ID play.js " + uid); 
    uid = parseInt(uid);
    socket.emit('newuser', uid, function(data){
      id = "https://www.youtube.com/embed/" + data.url + "?enablejsapi=1&controls=0";
      document.getElementById("player").src = id;
      console.log(JSON.stringify(data));
      if(data.started === 1){
        window.location.replace("missed.html");
      }



       $.getJSON("https://api.ipify.org?format=jsonp&callback=?",
            function(json) {
                if(json.ip === data.host){ // User is host
                  $("#start").removeAttr("disabled");
                  $("#pause").removeAttr("disabled");
                }
            });

                /*DUMP ARR INTO CHAT-BOX*/
    });



    /* PLAY IS PRESSED */

    $("#start").click(function(){
      console.log('sending ID to play: ' + uid);
      socket.emit('play', uid);
    });

    $("#pause").click(function(){
      socket.emit('pause', uid);
    });

    socket.on('update', function(data){ // Left off here
      if(data._id === uid){ // User IDs match  
        console.log("DATA PLAY: " + data.play)
        if(data.play === 1){ // play
          player.playVideo();
        }
        else{ // User paused
          player.pauseVideo();
        }
      } 
    });