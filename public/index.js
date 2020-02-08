

/* eslint-disable */
var options = {
    // controls: true,
    width: 320,
    height: 240,
    fluid: false,
    controlBar: {
        volumePanel: false
    },
    plugins: {
        record: {
            audio: false,
            video: true,
            maxLength: 10,
            debug: true
        }
    }
};

// apply some workarounds for opera browser
applyVideoWorkaround();

var player = videojs('myVideo', options, function() {
    // print version information at startup
    console.log("working");
    var msg = 'Using video.js ' + videojs.VERSION +
        ' with videojs-record ' + videojs.getPluginVersion('record') +
        ' and recordrtc ' + RecordRTC.version;
    videojs.log(msg);
});

// error handling
player.on('deviceError', function() {
    console.warn('device error:', player.deviceErrorCode);
});

player.on('error', function(element, error) {
    console.error(error);
});



// user clicked the record button and started recording
player.on('startRecord', function() {
    console.log('started recording!');
});

// user completed recording and stream is available
player.on('finishRecord', function() {
    // the blob object contains the recorded data that
    // can be downloaded by the user, stored on server etc.
    console.log('finished recording: ', player.recordedData);

    upload(player.recordedData);
});

window.onload=function(){ 
    $("button[title='Device']").click();
    console.log("time")
    window.setTimeout(function() {
        player.record().start();
        }, 2000);

        window.setTimeout(function() {
            player.record().stop();
            // console.log("here");
             
            }, 8000);//5 sec delay

            
};

function upload(blob) {
    // this upload handler is served using webpack-dev-server for
    // this example, see build-config/fragments/dev.js
    var serverUrl = '/upload';
    var formData = JSON.stringify(blob);
console.log(formData);
    

    // start upload
    fetch(serverUrl, {
        method: 'POST',
        headers:{
            'Content-Type':'application/json'
        },
        body: formData
    }).then(
        document.repeat.submit()
    ).catch(
        error => console.error('an upload error occurred!')
    );
}