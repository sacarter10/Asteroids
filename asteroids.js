Function.prototype.inherits = function (Superclass) {
	function Surrogate() {}
	Surrogate.prototype = Superclass.prototype;
	this.prototype = new Surrogate();
}

window.Asteroids = (function(Lib) {

	function randRange(low, high) {
		return Math.random()*(high - low) + low;
	}

	Lib.MovingObject = (function() {
		function MovingObject(x, y, xDelta, yDelta, game) {
			this.x = x;
			this.y = y;
			this.radius = 15;
			this.xDelta = xDelta;
			this.yDelta = yDelta;
			this.game = game;
		}

		MovingObject.prototype.update = function() {
			this.x += this.xDelta;
			this.y += this.yDelta;
		}

		MovingObject.prototype.offscreen = function() {
			if (this.x < 0 || this.x > this.game.width) {
				return true;
			}
			if (this.y < 0 || this.y > this.game.height) {
				return true;
			}
			return false;
		}

		return MovingObject;

	})();

	Lib.Asteroid = (function() {

		function Asteroid (x, y, xDelta, yDelta, game) {
			Lib.MovingObject.call(this, x, y, xDelta, yDelta, game);
		}

		Asteroid.inherits(Lib.MovingObject);

		Asteroid.prototype.draw = function () {
			//console.log("I'm trying to draw!")
			var ctx = this.game.context;
			//console.log("I stored a context!")

			ctx.fillStyle = "black";
			ctx.beginPath();

	    ctx.arc(
	      this.x,
	      this.y,
	      this.radius, //radius
	      0, //something
	      2 * Math.PI, //what
	      false //FALSE
	    );

	    ctx.fill();
		}

		return Asteroid;

	})();
	// return {
	// 	Asteroid: Asteroid
	// };
	return Lib;

})(window.Asteroids || {});