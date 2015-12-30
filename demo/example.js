window.onload = function(){
  // initialize video.js
  var player = videojs('test_video');

  //load the marker plugin
  player.markers({
    markerTip:{
      display: true,
    },
    breakOverlay:{
      display: true,
      displayTime: 3,
      text: function(marker) {
         return 'This is an break overlay: ' + marker.text;
      }
    },
    onMarkerReached: function(marker) {
      $('.event-list').append('<div>marker reached: ' + marker.text + '</div>');
    },
    onMarkerClick: function(marker){
      $('.event-list').append('<div>marker clicked: ' + marker.text + '</div>');
    },
    markers: [
      {
        time: 9.5,
        text: 'this is a long long marker'
      },
      {
        time: 16,
        image: './thumbnail.jpg',
        text: 'marker with image'
      },
      {
        time: 23.6,
        text: ''
      },
      {
        time: 28,
        text: 'marker'
      },
      {
        time: 36,
        image: './thumbnail.jpg',
      }
    ]
  });

  $('.next').click(function(){
    player.markers.next();
  });

  $('.prev').click(function(){
    player.markers.prev();
  });

  $('.remove').click(function(){
    player.markers.remove([1,2]);
  });

  $('.add').click(function(){
    player.markers.add([
      {
        time: 40,
        text: 'I\'m NEW'
      }
    ]);
  });

  $('.updateTime').click(function(){
    var markers = player.markers.getMarkers();
    for (var i = 0; i < markers.length; i++) {
       markers[i].time += 1;
    }
    player.markers.updateTime();
  });

  $('.reset').click(function(){
    player.markers.reset([
      {
        time: 40,
        text: 'I\'m NEW'
      },
      {
        time:20,
        text: 'Brank new'
      }
    ]);
   });

  $('.destroy').click(function(){
    player.markers.destroy();
  });
};
