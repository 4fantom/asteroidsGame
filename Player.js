class Player {
    constructor(x, y, game) {
        this.x = x;
        this.y = y;
        this.dx = x;
        this.dy = x;
        this.arrowRight = false;
        this.arrowLeft = false;
        this.arrowUp = false;
        this.isShoot = false;
        this.isAlive = true;
        this.lastShootTime = 0;
        this.angle = 0;
        this.moveSpeed = 2;
        this.game = game;
        this.init();
    }

    init() {
        this.game.ticker.addObj(this)
    }

    onTick(){
        this.move();
        this.shoot();
    }

    keyDown(e) {

        if (e.key === 'ArrowRight' || e.key === 'Right') {
            this.arrowRight = true;
        }
        if (e.key === 'ArrowLeft' || e.key === 'Left') {
            this.arrowLeft = true;
        }
        if (e.key === 'ArrowUp' || e.key === 'Right') {
            this.arrowUp = true;
        }
        if (e.key === ' ') {
            this.isShoot = true;
        }
    }

    keyUp(e) {
        this.alpha = 0;
        if (e.key === 'ArrowRight' || e.key === 'Right') {
            this.arrowRight = false;
        }
        if (e.key === 'ArrowLeft' || e.key === 'Left') {
            this.arrowLeft = false;
        }
        if (e.key === 'ArrowUp' || e.key === 'Right') {
            this.arrowUp = false;
        }
        if (e.key === ' ') {
            this.isShoot = false;
        }
    }

    draw() {
        this.dx = this.x;
        this.dy = this.y + 15;
        context.save();
        context.beginPath();
        context.translate(this.dx, this.dy);
        context.rotate(this.angle * Math.PI / 180);
        context.translate(-this.dx, -this.dy);
        context.moveTo(this.x, this.y);
        context.lineTo(this.x - 10, this.y + 30);
        context.moveTo(this.x, this.y);
        context.lineTo(this.x + 10, this.y + 30);
        context.moveTo(this.x - 8, this.y + 22);
        context.lineTo(this.x + 8, this.y + 22);
        context.strokeStyle = 'white';
        context.stroke();
        context.closePath();
        context.translate(0, 0);
        context.restore();
    }

    move() {
        context.clearRect(this.x - 22, this.y - 5, 44, 42);
        if (this.arrowRight) {
            this.angle = this.angle + 5;
            this.isShoot = false;
        }

        if ((this.arrowLeft)) {
            this.angle = this.angle - 5;
            this.isShoot = false;
        }

        if ((this.arrowUp)) {
            if (this.y < 0) {
                this.y = canvas.height;
            }
            if (this.y > canvas.height) {
                this.y = 0;
            }
            if (this.x > canvas.width) {
                this.x = 0;
            }

            if (this.x < 0) {
                this.x = canvas.width;
            }

            this.y -= this.moveSpeed * Math.cos(this.angle * Math.PI / 180);
            this.x += this.moveSpeed * Math.sin(this.angle * Math.PI / 180);
        }
    }

    shoot() {
        if (this.isShoot && Date.now() - this.lastShootTime > 300) {
            const projectile = new Projectile(this.x + 20 * Math.sin(this.angle * Math.PI / 180), this.y - 20 * Math.cos(this.angle * Math.PI / 180), this.angle, this.game);
            this.lastShootTime = Date.now();
            this.game.projectiles.push(projectile);
            this.isShoot = false;
        }
    }


}