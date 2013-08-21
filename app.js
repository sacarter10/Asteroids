$(function () {
  var canvas = $("<canvas width='" + 500 +
                 "' height='" + 500 + "'></canvas>");
  $('body').append(canvas);

  // `canvas.get(0)` unwraps the jQuery'd DOM element;
	//console.log(Asteroids);
	//aster = new Asteroids.Game();
	//console.log(aster);
  new Asteroids.Game(500, 500, canvas.get(0)).start();
});