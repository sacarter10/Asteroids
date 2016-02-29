$(function () {
  var canvas = $('canvas')[0];

  var windowHeight = $(window).height();
  var windowWidth = $(window).width();

  canvas.height = windowHeight;
  canvas.width = windowWidth;

  new Asteroids.Game(windowWidth, windowHeight, canvas).start();
});
