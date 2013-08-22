window.Asteroids = (function(Lib) {

	function randRange(low, high) {
		return Math.random()*(high - low) + low;
	}

	Lib.Bullet = (function() {

		//ship constructor
		function Bullet(x, y, xVel, yVel, game) {
			Asteroids.MovingObject.call(this, x, y, xVel, yVel, game);
			this.radius = 7;
		}

		Bullet.inherits(Asteroids.MovingObject);

		//Super DRY
		function colliding(obj1, obj2) {
			var dist = Math.pow((obj1.x - obj2.x), 2);
			dist += Math.pow((obj1.y - obj2.y), 2);
			dist = Math.sqrt(dist);

			return (dist < (obj1.radius + obj2.radius));
		}

		Bullet.prototype.hitsAsteroid = function () {
			asteroids = this.game.asteroids;

			for (var i = 0; i < asteroids.length; i++) {
				if (colliding(this, asteroids[i])) {
					return i;
				}
			}
			return -1;
		}

		Bullet.prototype.draw = function() {
			var ctx = this.game.context;

			ctx.fillStyle = "red";
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

		return Bullet;

  })();

	return Lib;

})(window.Asteroids || {});