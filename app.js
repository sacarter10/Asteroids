$(function () {
  var canvas = $('canvas')[0];

  new Asteroids.Game(1000, 800, canvas.get(0)).start();
});
