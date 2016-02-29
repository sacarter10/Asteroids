$(function () {
  var canvas = $('canvas')[0];
  var $directions = $('#directions');

  var windowHeight = $(window).height();
  var windowWidth = $(window).width();

  canvas.height = windowHeight;
  canvas.width = windowWidth;

  var game = new Asteroids.Game(windowWidth, windowHeight, canvas);
  game.setup();

  key('enter', function () {
  	$directions.fadeOut();
  	game.start();
  })
});
