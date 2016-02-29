window.Asteroids = (function(Lib) {

	function randRange(low, high) {
		return Math.random()*(high - low) + low;
	}

	Lib.Ship = (function() {

		//ship constructor
		function Ship(x, y, game) {
			Asteroids.MovingObject.call(this, x, y, 0, 0, game);
			this.radius = 20;
			this.direction = 0;
			this.velocity = 0;
		}

		Ship.inherits(Asteroids.MovingObject);

		Ship.prototype.isHit = function () {
			asteroids = this.game.asteroids;

			for (var i = 0; i < asteroids.length; i++) {
				if (colliding(this, asteroids[i])) {
					return true;
				}
			}
			return false;
		}


		Ship.prototype.update = function() {

			this.xDelta = this.velocity * Math.cos(this.direction);
			this.yDelta = this.velocity * Math.sin(this.direction);

			Asteroids.MovingObject.prototype.update.call(this);
			if (this.offscreen()) {
				if (this.x < 0) {
				  this.x = this.game.width;
				}
				if (this.x > this.game.width) {
				  this.x = 0;
				}
				if (this.y < 0) {
				  this.y = this.game.height;
				}
				if (this.y > this.game.height) {
				  this.y = 0;
				}
			}
		}

		Ship.prototype.fireBullet = function() {
			var bulletXDelta = 10 * Math.cos(this.direction) + this.xDelta;
			var bulletYDelta = 10 * Math.sin(this.direction) + this.yDelta;

			var bullet = new Asteroids.Bullet(
				this.x,
				this.y,
				bulletXDelta,
				bulletYDelta,
				this.game);
			this.game.bullets.push(bullet);
		}

		function colliding(obj1, obj2) {
			var dist = Math.pow((obj1.x - obj2.x), 2);
			dist += Math.pow((obj1.y - obj2.y), 2);
			dist = Math.sqrt(dist);

			return (dist < (obj1.radius + obj2.radius));
		}

		Ship.prototype.draw = function() {

			var ctx = this.game.context;

			//Draw the collision detection circle
			ctx.fillStyle = "#e50000"; //red
			ctx.beginPath();
	    ctx.arc(
	      this.x,
	      this.y,
	      this.radius, 
	      0, 
	      2 * Math.PI, 
	      false 
	    );
			ctx.fill();

			//Pt Forward, Left, and Right of triangle
			var PtF = [this.radius, 0];
			var PtL = [0, this.radius];
			var PtR = [0, -this.radius];

			var Pts = [PtF, PtL, PtR];
			for (var i = 0; i < 3; i++) {
				var x = Pts[i][0];
				var y =	Pts[i][1];

				Pts[i][0] = x * Math.cos(this.direction)
									- y * Math.sin(this.direction);

				Pts[i][1] = x * Math.sin(this.direction)
									+ y * Math.cos(this.direction);
			}
			for (var i = 0; i < 3; i++) {
				Pts[i][0] += this.x;
				Pts[i][1] += this.y;
			}
		
			//Draw the facing triangle
			ctx.fillStyle = "black"; 
			ctx.beginPath();
			ctx.moveTo(PtF[0], PtF[1]);
			ctx.lineTo(PtL[0], PtL[1]);
			ctx.lineTo(PtR[0], PtR[1]);
			ctx.closePath();
			ctx.fill();
			ctx.strokeStyle = 'black';
			ctx.lineWidth = 2;
			ctx.stroke();
		}

		return Ship;

  })();

	return Lib;

})(window.Asteroids || {});