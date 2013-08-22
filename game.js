window.Asteroids = (function(Lib) {

	function randRange(low, high) {
		return Math.random()*(high - low) + low;
	}


	Lib.Game = (function() {
		function Game(width, height, canvasEl) {
			this.width = width;
			this.height = height;
			this.gameOver = false;
			this.context = canvasEl.getContext("2d");;
			this.asteroids = this.makeRandomAsteroids(5);
			this.ship = new Asteroids.Ship(this.width / 2, this.height / 2, this);
			this.bullets = [];

			var thatShip = this.ship;
			key('up', function() {
				if (thatShip.velocity <= 8) thatShip.velocity += 1;
			} );
			key('down', function() {
				if (thatShip.velocity > 0) thatShip.velocity -= 1;
			} );
			key('left', function() {
				thatShip.direction -= Math.PI/16;
				//if (thatShip.xDelta >= -8) thatShip.xDelta -= 1;
			} );
			key('right', function() {
				thatShip.direction += Math.PI/16;
				//if (thatShip.xDelta <= 8) thatShip.xDelta += 1;
			} );
			key ('space', function() {
				thatShip.fireBullet();
			} );
		}

		Game.prototype.destroyAsteroid = function (index) {
			for (var j = index; j < this.asteroids.length - 1; j++) {
				this.asteroids[j] = this.asteroids[j+1];
			}
			this.asteroids.pop();
		}

		Game.prototype.draw = function () {
			this.context.clearRect(0, 0, this.width, this.height);
			var ctx = this.context;

			if (this.gameOver) {
				ctx.fillStyle = "blue";
				ctx.font = "italic " + 36 + "pt Arial ";
				ctx.fillText("GAME OVER", 20, 150);
				window.clearInterval(this.timerId);
			}

			this.ship.draw();

			for (var i = 0; i < this.bullets.length; i++) {
				if (this.bullets[i].offscreen()) {
					for (var j = i; j < this.bullets.length - 1; j++) {
						this.bullets[j] = this.bullets[j+1];
					}
					this.bullets.pop();
					i--;
				} else {
					this.bullets[i].draw();
				}
			}

			for (var i = 0; i < this.asteroids.length; i++) {
				if (this.asteroids[i].offscreen()) {
					this.destroyAsteroid(i);
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
			if (this.ship.isHit()) {
				this.gameOver = true;
			};

			this.ship.update();
			for (var i = 0; i < this.asteroids.length; i++) {
				this.asteroids[i].update();
			}

			for (var i = 0; i < this.bullets.length; i++) {
				this.bullets[i].update();
				var target = this.bullets[i].hitsAsteroid();
				if (target !== -1) {
					this.destroyAsteroid(target);
				}
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

			this.timerId = window.setInterval(function() {
				//console.log("Triggered interval");
				that.update();
				that.draw();
			}, 1000/32);
		};

		return Game;
	})();

	return Lib;

})(window.Asteroids || {});