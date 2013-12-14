'use strict';
/*global $*/

$(window).scroll(function(){
  parallax($('.js-parallax'));
});

function parallax($el){
  $el.each(function() {
    var element_offset = $(this).offset().top - $(window).scrollTop();
    $(this).css('background-position', '50%' + (element_offset * 0.05) + '%');
  });
}

// var videos = [
//   // {mp4: './videos/raining.mp4', webm: './videos/raining.webm', still: './videos/raining.jpg'},
//   // {mp4: './videos/pond-ripples.mp4', webm: './videos/pond-ripples.webm', still: './videos/pond-ripples.jpg'},
//   {mp4: './videos/dark-leaf.mp4', webm: './videos/dark-leaf.webm', still: './videos/dark-leaf.jpg'}
// ];

// function insertVideo(video_box, videos) {
//   // var chosen = videos[Math.floor(Math.random()*videos.length)]; //This is turned off for now
//   var chosen = videos[0];
//   if (Modernizr.video.mp4 || Modernizr.video.webm) {
//     video_box.html(
//         '<video autoplay="autoplay" loop="loop" poster="' + chosen.still + '">'
//       + '<source src="' + chosen.mp4 + '" type="video/mp4" />'
//       + '<source src="' + chosen.webm + '" type="video/webm" />'
//       + '<img src="' + chosen.still + '">'
//       + '</video>'
//     );
//   } else {
//     video_box.html('<img src="' + chosen.still + '">');
//   }
// }

// insertVideo($('.js-video-box'), videos);
