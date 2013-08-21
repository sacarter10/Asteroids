window.Asteroids = (function(Lib) {

	function randRange(low, high) {
		return Math.random()*(high - low) + low;
	}


	Lib.Game = (function() {
		function Game(width, height, canvasEl) {
			this.width = width;
			this.height = height;
			this.context = canvasEl.getContext("2d");;
			this.asteroids = this.makeRandomAsteroids(5);
			this.ship = new Asteroids.Ship(this.width / 2, this.height / 2, this); //OTP
		}

		Game.prototype.draw = function () {
			this.context.clearRect(0, 0, this.width, this.height);

			this.ship.draw();

			for (var i = 0; i < this.asteroids.length; i++) {
				if (this.asteroids[i].offscreen()) {
					for (var j = i; j < this.asteroids.length - 1; j++) {
						this.asteroids[j] = this.asteroids[j+1];
					}
					this.asteroids.pop();
					i--;
				} else {
					this.asteroids[i].draw();
				}
			}
		}

		Game.prototype.makeRandomAsteroids = function (number) {
			var asteroidArray = [];

			for (var i = 0; i < number; i++) {
				asteroidArray.push(new Asteroids.Asteroid(
					randRange(0, this.width), //x
					randRange(0, this.height), //y
					randRange(-5, 5), //xDelta
					randRange(-5, 5), //yDelta
					this));
			}

			return asteroidArray;
		};

		Game.prototype.update = function () {
			this.ship.isHit();
			this.ship.update();
			for (var i = 0; i < this.asteroids.length; i++) {
				this.asteroids[i].update();
			}

			var numNewAsteroids = 5 - this.asteroids.length;

			for (var j = 0; j < numNewAsteroids; j++) {
				var edge = Math.random();
				var xStart = 0;
				var yStart = 0;
				var xDelta = 0;
				var yDelta = 0;

				switch (true) {
					case (edge < 0.25):
						xStart = 0;
						xDelta = randRange(0, 5);
						yStart = randRange(0, this.height);
						break;
					case (edge < 0.5):
						xStart = this.width;
						yStart = randRange(0, this.height);
						xDelta = randRange(-5, 0);
						break;
					case (edge < 0.75):
						xStart = randRange(0, this.width);
						yStart = 0
						yDelta = randRange(0, 5);
						break;
					default:
						xStart = randRange(0, this.height);
						yStart = this.height;
						yDelta = randRange(-5, 0);
				}

				this.asteroids.push(new Asteroids.Asteroid(
					xStart, yStart,
					xDelta || randRange(-5, 5),
					yDelta || randRange(-5, 5),
					this));
			}
		}

		Game.prototype.start = function () {
			var that = this;
			that.draw();

			window.setInterval(function() {
				//console.log("Triggered interval");
				that.update();
				that.draw();
			}, 1000/32);
		};

		return Game;
	})();

	return Lib;

})(window.Asteroids || {});