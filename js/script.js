'use strict';
/*global $*/

// $('.bg-video').videobackground({
//   videoSource: [['./images/traffic.mp4', 'video/mp4']],
//     // ['video/big-buck-bunny.webm', 'video/webm'],
//     // ['video/big-buck-bunny.ogv', 'video/ogg']],
//   // controlPosition: '#main',
//   // poster: 'video/big-buck-bunny.jpg',
//   resize: false,
//   resizeTo: 'window',
//   loop: true,
//   loadedCallback: function() {
//     $(this).videobackground('mute');
//   }
// });

$(window).scroll(function(e){
  parallax($('.js-parallax'));
});

function parallax($el){
  // var scrolled = $(window).scrollTop();
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
  // alert(chosen.video);
  $(videoEl).attr('poster', chosen.still);
  videoEl.innerHTML =
    '<source src="' + chosen.mp4 + '" type="video/mp4" />'
    + '<source src="' + chosen.webm + '" type="video/webm" />'
    + '<img src="' + chosen.still + '">'
  ;
}

insertVideo(document.getElementById('bg-video'), videos);


// <video autoplay>
//     <source src="/resources/video/product-hero.mp4.mp4" type='video/mp4; codecs="avc1.42E01E, mp4a.40.2"' />
//     <source src="/resources/video/product-hero.webmhd.webm" type='video/webm; codecs="vp8, vorbis"' />
//     <img src="/images/product/product-parent-hero.jpg" title="Your browser does not support the <video> tag">
// </video>

// video.bg-video(autoplay="autoplay", loop="loop")
//   source(src="./images/RainingH264.mp4", type="video/mp4")