<html>
<title>Creating Page</title>
<link rel="stylesheet" href="style.css">
<body style="text-align: center">
    <div id="content">
    <br><br>
    <img src="images/loading.gif" style="margin: auto auto; text-align: center" alt="loading">
    </div>
</body>
<script>
  
    window.onload = function(){
    var newUrl = document.getElementById("newLink").innerHTML; 
    window.location = newUrl;
};

</script>
<?php
$youtube = $_POST["URL"];
$youtube2 = substr($youtube,30,13); //https://www.youtube.com/watch?v=4BuOlKZ_C2k
$time = microtime(); // 0.97861100 1418258708 
//echo $time;
$ms = substr($time,2,3);
$ft = substr($time,11,20);
$combined = $ft . $ms .$youtube2.".html";
echo "<a href='http://peek.ninja/$combined' id='newLink'>http://peek.ninja/$combined</a>";
$filecreate = fopen($combined,"w");

	$dbhost = '00.000.000.00'; //Place host for SQL server here
	$dbuser = 'notUsername'; //SQL Username
	$dbpass = 'NotPassword'; //SQL Password

	$db = 'YouShare'; //SQL Database


	$conn = mysqli_connect($dbhost, $dbuser, $dbpass); 
	mysqli_select_db($conn, $db);
        
       $ip = $_SERVER['REMOTE_ADDR']; 
       
mysqli_query($conn, "INSERT INTO `Videos` (url, started, ip) VALUES ('http://peek.ninja/$combined', 0, '$ip')");


$text = '
<html>
<head>
<link rel="shortcut icon" href="images/favicon.ico" type="image/x-icon">
<link rel="icon" href="/favicon.ico" type="image/x-icon">
<link rel="stylesheet" href="http://yui.yahooapis.com/pure/0.5.0/pure-min.css">
<script src="http://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js"></script>
<script src="http://apis.google.com/js/client.js?onload=onJSClientLoad"></script>
<link rel="stylesheet" href="style.css">
<title>PeekNinja</title>
</head>
<body>


<div id="top">
        <div id="logo">
            <img src="images/logo2.png" width="100" id="logoimg" alt="logo">
        <a href="index.html"><h1><b><font style="color: #1165B1">Peek</font></b>Ninja<font style="font-size: 10px">BETA</font></h1></a>
        </div>
        <div id="paypal">
            <h2>Donate to help us add new features!</h2>
            <script async="async" src="https://www.paypalobjects.com/js/external/paypal-button.min.js?merchant=kkhorram@gmail.com" 
            data-button="donate" 
            data-name="PeekNinja" 
            data-currency="USD" 
            data-callback="http://peek.ninja">
            </script>
        </div>
    </div> 
<div id="End">
<p>The video has ended.</p>
</div>
<div id="content">
<h1 class="hostThing" id="hostText">You are the host of this page. As soon as you leave, the page will be deleted!</h1>
<h1 class="hostThing">Share the URL of this page to your friends!</h1>
<div id="Cover">
<h1>Hold on while we load your video</h1>
</div>
<div id="mob">
<iframe id="myYTPlayer" width="640" height="390" frameborder="0" title="YouTube video player" src="http://www.youtube.com/embed/u1zgFlCw8Aw?enablejsapi=1&controls=0" type="text/html" allowfullscreen></iframe>
</div>


<div id="chatDiv">
    
    <div id="messageContainer1">
    <input type="text" id="nickName" class="pure-input-1-2" name="MSG" placeholder="Enter A Nickname">
    <button class="pure-button pure-button-primary" id="enterName">Submit</button>
    </div>
    
    <ul id="messages"> 
    </ul>
</div>
    

<p id="Mobile">Sorry, we don\'t have mobile support (yet!)</p>
<div id="buttonContainer">
<button id="startButton" class="pure-button pure-button-primary" disabled>Play</button>
<button id="stopButton" class="pure-button pure-button-primary" disabled>Pause</button>

</div>
<h1 id="countdown" style="text-align: center"></h1>
<br><br><br><br>
</div>
    
    


</body>
<script>
$("#End").hide();
 $("#Mobile").hide();
if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
 $("#mob").hide();
 $("#Mobile").show();

}
vstart = false;
host = false;
var y = window.location.href;
y = y.substring(33,44); // http://peek.ninja/1418283525340v=yJD1Iwy5lUY.html
y = "http://www.youtube.com/embed/" + y + "?enablejsapi=1";
var e = "http://www.youtube.com/embed/yJD1Iwy5lUY?enablejsapi=1";
document.getElementById("myYTPlayer").src = y;
var getYoutube = window.location.href; //1418267757058v=yJD1Iwy5lUY.html
var yt = getYoutube.substring(getYoutube.indexOf("v") + 2, getYoutube.indexOf(".html"));
//alert(yt); // Works!

       var tag = document.createElement("script");
      tag.src = "https://www.youtube.com/iframe_api";
      var firstScriptTag = document.getElementsByTagName("script")[0];
      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

var player;
      function onYouTubeIframeAPIReady() {
        player = new YT.Player("myYTPlayer", {
          events: {
            "onReady": onPlayerReady,
            "onStateChange": onPlayerStateChange
          }
        });

function onPlayerReady() {
                    StartPause();
    console.log("entering timer");
    
     
}

}
var HostPause = false;
var defaultp = false; // false = pre-buffer not finished
var Done = 0;
function StartPause(){
    player.mute();
        player.playVideo();
        setTimeout(function(){
            console.log("Got here");
            player.seekTo(0);
            player.playVideo();
            Done++;
            player.pauseVideo();
            $("#Cover").hide();
            $("#startButton").removeAttr("disabled"); //enable the button
            defaultp = true; // Pre-buffer finished
        },6000); // 6 seconds
    }

$(document).ready(function(){ //Create click handlers and other stuff
    var MS = document.URL;
    MS = MS.substring(18,31); //http://peek.ninja/1419843761239v=yJD1Iwy5lUY.html
    
$("#enterName").click(function(){
    $("#enterName").unbind( "click" );
    nickname = document.getElementById("nickName").value;
    $("#nickName").attr("id", "message");
    $("#enterName").attr("id", "sendMessage");
    $("#message").attr("placeholder", "Enter Message");
    $("#message").val("");
 
    $("#sendMessage").html("Send!");
    
$("#sendMessage").click(function(){
    var RealMessage = nickname + ":" + document.getElementById("message").value;
    $.ajax({
        url: "sendmessage.php",
        type: "post",
        data: {msg:RealMessage, flag:"write", epoch: MS},
        //removed the datatype:JSON
        success : function(response)
        {
            console.log("Message sent");
            $("#message").val("");
            
        },
        error: function(){
            console.log("error");
        }
    });
});
});

$(document).keypress(function(e) {
    if(e.which == 13 && $(document.activeElement).attr("type") == "text") {
        var RealMessage = nickname + ":" + document.getElementById("message").value;
        $.ajax({
        url: "sendmessage.php",
        type: "post",
        data: {msg:RealMessage, flag:"write", epoch: MS},
        //removed the datatype:JSON
        success : function(response)
        {
            console.log("Message sent");
            $("#message").val("");
        },
        error: function(){
            console.log("error");
        }
    });

    }
});







    
check();
    var prev = "";
function check(){ // Read messages
    $.ajax({
    url: "sendmessage.php",
    type: "post",
    data: {flag:"read", epoch: MS},
    success : function(m){
        if(prev != m){ // Old message not the same as new message
        
        var myIndex = m.indexOf(":"); 
        var usersName = m.substring(0, myIndex);
        var userMessage = m.substring(myIndex + 1);
        $("#messages").append("<li style=\"background-color: #3366FF; border-radius: 5px;\"><b>" + usersName + "</b></li>");
        $("#messages").append("<li>" + userMessage +"</li>");
        $("#messages").animate({scrollTop:$("#messages")[0].scrollHeight}, 1000);
    }
        prev = m;
        setTimeout(check(),2500);
    },
    error : function(){
      
    }
    });
}


    $("#stopButton").click(function(){
        HostPause = true;
        var url2 = document.URL;
        $.ajax({
        url: "StopVideo.php",
        type: "POST",
        data: {url: url2},
        datatype: "JSON",
        success : function(response){
                $("#startButton").removeAttr("disabled");
                $("#stopButton").attr("disabled", true);
            player.pauseVideo();
            console.log("Video paused");
            $("#countdown").html("The video is paused");
        }
        });



    });
    
window.onunload = window.onbeforeunload = (function(){ //Clean up database :D
    
    if(host == true)
    {
        var myUrl = document.URL;
        $.ajax({
            url: "RemoveEntry.php", 
            type: "POST",
            data: {url: myUrl},
            cache: false,
            datatype: "json",
            success: function(response)
            {
            }
            });
    }
});


    $("#startButton").click(function(){ //WHen they click \'Start Video\'
        Done++;
            player.unMute();
            var myUrl = document.URL;
            $.ajax({
            url: "SetVideo.php", 
            type: "POST",
            data: {url: myUrl},
            cache: false,
            datatype: "json",
            success: function(response)
            {
                
                $("#startButton").attr("disabled", true);
                
                if(HostPause == true){
                    player.playVideo();
                    HostPause = false;
                    $("#countdown").html("The video is playing");
                    $("#stopButton").removeAttr("disabled");
                }
                else{
            	StartTimer();
                vstart = true;
                }
            }
            });
            
 });
            var myUrl = document.URL;
            
            $.ajax({
            url: "CheckHost.php", 
            type: "POST",
            data: {url: myUrl},
            cache: false,        
            success: function(response)
            {
            	if(response == "true")
                {
                    host = true;
                }
                else if(response == "started")
                {
                    window.location = "missed.html";                   
                }
                else if(response == "false")
                {
                    host = false;
                    var elem = document.getElementById("startButton");
                    var elem2 = document.getElementById("stopButton");
                    var elem3 = document.getElementById("hostText");
                    elem2.parentNode.removeChild(elem2);
                    elem.parentNode.removeChild(elem);
                    elem3.parentNode.removeChild(elem3);
                    AJAXTimer = window.setInterval(function(){CheckForStart()}, 100); // Changed frmo 250 to 50 //edit: logan changed to 100
                }
                
            }
            });  
});

function CheckForStart()
{
            var myUrl = document.URL;
            $.ajax({
            url: "VideoCheck.php", 
            type: "POST",
            data: {url: myUrl},
            cache: false,
            datatype: "json",
            success: function(response)
            {
            	if(response == "true")
                {
                    if(vstart == false)
                    {
                        StartTimer();
                        vstart = true;
                    }
                    else if(HostPause == true)
                    {
                        player.playVideo();
                        $("#countdown").html("The video is playing!");
                    }
                }
                else
                {
                    if(vstart == true)
                    {
                        HostPause = true;
                        player.pauseVideo();
                        $("#countdown").html("The host paused the video");
                    }
                }
            }
          
        });
   
}

function StartTimer() 
{
    timerID = window.setInterval(function(){CountDown()}, 1000); //Call CountDown() every second
}

var timerthing = 10; //10 second countdown (can be changed to a variable)
function CountDown()
{
    
    $("#countdown").html(timerthing); //Set the inner html of the timer header

    if(timerthing < 1) //if it is done counting down
    {
        window.clearInterval(timerID); //stop the timer
        vstart = true; //set this thing to true
        player.playVideo(); //play the video
        $("#countdown").html("The video is playing!"); //set header to show the video is playing
        $("#stopButton").removeAttr("disabled");
    }
    
    timerthing--; //subtract one from countdown
}
function onPlayerStateChange() {
        var sStatus = player.getPlayerState();
        PlayerState(sStatus);
        if(sStatus === 0){RealStart = false;}
        if(sStatus === 1 && vstart === false && defaultp === true){ // Play is pressed, video has not yet started and defult pre-buf not done yet.
          player.pauseVideo();
        }
}

	function Paused(){
        if(Done !== 1){
		player.playVideo();
          }        

	}
 

  function PlayerState(sStatus) { 
        if (sStatus == -1) {
            console.log("Video has not started.");
        } 
        else if (sStatus == 0) { //Video is over
            $("#content").hide();
            $("#End").show();
            window.location = "Over.html";
            console.log ("Video has ended.");
        } 
        else if (sStatus == 1) {console.log ("Video is playing.");} 
        else if (sStatus == 2) {
                        console.log("vstart = " + vstart);
            console.log("HostPause = " + HostPause);
            if(HostPause == false){
            Paused();
        }
            console.log ("Video is paused.");

        } //paused 
        else if (sStatus == 3) {console.log ("Video is buffering.");} 
        else if (sStatus == 5) {console.log ("Video is cued.");} 
    } 

</script>

</html>';
fwrite($filecreate,$text);
fclose($filecreate);
?>

</html>