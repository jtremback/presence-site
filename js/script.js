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

function insertVideo() {
  if (!(Modernizr.video.mp4 || Modernizr.video.webm)) {
    $('.js-video-box').html('<img src="./videos/dark-leaf.jpg" />');
  }
}

insertVideo();
