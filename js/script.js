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

var videos = [
  {mp4: './videos/pond-ripples.mp4', webm: './videos/pond-ripples.webm', still: './videos/pond-ripples.jpg'},
  {mp4: './videos/dark-leaf.mp4', webm: './videos/dark-leaf.webm', still: './videos/dark-leaf.jpg'},
  {mp4: './videos/raining.mp4', webm: './videos/raining.webm', still: './videos/raining.jpg'},
];

function insertVideo(videoEl, videos) {
  var chosen = videos[Math.floor(Math.random()*videos.length)];
  videoEl.attr('poster', chosen.still);
  videoEl.html(
      '<source src="' + chosen.mp4 + '" type="video/mp4" />'
    + '<source src="' + chosen.webm + '" type="video/webm" />'
    + '<img src="' + chosen.still + '">')
}

insertVideo($('#bg-video'), videos);
