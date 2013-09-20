$(function () {
  var canvas = $("<canvas width='" + 1000 +
                 "' height='" + 800 + "'></canvas>");
  $('body').append(canvas);

  new Asteroids.Game(1000, 800, canvas.get(0)).start();
});