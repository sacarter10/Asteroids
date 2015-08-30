$(function () {
  var canvas = $("<canvas width='" + 100% +
                 "' height='" + 100% + "'></canvas>");
  $('body').append(canvas);

  new Asteroids.Game(1000, 800, canvas).start();
});
