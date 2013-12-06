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
  'http://vimeo.com/81169230/download?t=1386311114&v=210281169&s=e1b2db56a10da3082363186b61282de0',
  'http://vimeo.com/81169229/download?t=1386311053&v=210283943&s=ab0eae412a497d8b9847172a373da806',
  'http://vimeo.com/81168830/download?t=1386311157&v=210278977&s=e2c505e1bc797edc3ec58060478e8f26',
  'http://vimeo.com/81169228/download?t=1386312293&v=210288847&s=0a75cb2a3097fc49ea0552c19f5cdd31'
];

function insertVideo(videoEl, videos) {
  var chosen_video = videos[Math.floor(Math.random()*videos.length)];
  videoEl.innerHTML =
    '<source src="' + chosen_video + '" type="video/mp4" />'
    // + '<source src="/resources/video/product-hero.webmhd.webm" type="video/webm" />'
    // + '<img src="/images/product/product-parent-hero.jpg" title="Your browser does not support the <video> tag">'
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