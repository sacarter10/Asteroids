window.Asteroids = (function(Lib) {

	function randRange(low, high) {
		return Math.random()*(high - low) + low;
	}

	//to minimize Ryan's bitching
	Lib.Ship = (function() {

		//ship constructor
		function Ship(x, y, game) {
			Asteroids.MovingObject.call(this, x, y, 0, 0, game);
			this.radius = 47;
		}

		Ship.inherits(Asteroids.MovingObject);

		Ship.prototype.isHit = function () {
			asteroids = this.game.asteroids;

			for (var i = 0; i < asteroids.length; i++) {
				if (colliding(this, asteroids[i])) {
					// console.log("you got hit");
					this.xDelta = asteroids[i].xDelta;
					this.yDelta = asteroids[i].yDelta;
					asteroids[i].xDelta = 0;
					asteroids[i].yDelta = 0;
				}
			}
		}

		function colliding(obj1, obj2) {
			// console.log("called colliding");
			var dist = Math.pow((obj1.x - obj2.x), 2);
			dist += Math.pow((obj1.y - obj2.y), 2);
			dist = Math.sqrt(dist);

			return (dist < (obj1.radius + obj2.radius));
		}

		Ship.prototype.draw = function() {

			//console.log("I'm trying to draw!")
			var ctx = this.game.context;
			//console.log("I stored a context!")

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

		return Ship;

  })();

	return Lib;

})(window.Asteroids || {});