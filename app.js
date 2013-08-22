$(function () {
  var canvas = $("<canvas width='" + 1000 +
                 "' height='" + 800 + "'></canvas>");
  $('body').append(canvas);

  // `canvas.get(0)` unwraps the jQuery'd DOM element;
	//console.log(Asteroids);
	//aster = new Asteroids.Game();
	//console.log(aster);
  new Asteroids.Game(1000, 800, canvas.get(0)).start();
});