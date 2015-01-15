$(function () {
  var canvas = $(canvas);

  new Asteroids.Game(1000, 800, canvas.get(0)).start();
});
