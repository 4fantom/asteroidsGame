class Projectile {
    constructor(x, y, angle, game) {
        this.x = x;
        this.y = y;
        this.dx = 0;
        this.dy = 0;
        this.game = game;
        this.moveSpeed = 6;
        this.angle = angle;
        this.init();
        this.isUsed = false;
    }

    init() {
        this.game.ticker.addObj(this);
    }

    onTick() {
        this.move();
    }

    draw() {
        if (!this.isUsed) {
            this.dx = this.x;
            this.dy = this.y + 15;
            context.save();
            context.beginPath();
            context.translate(this.dx, this.dy);
            context.rotate(this.angle * Math.PI / 180);
            context.translate(-this.dx, -this.dy);
            context.arc(this.x, this.y, 1, 0, Math.PI * 2, false);
            context.strokeStyle = 'white';
            context.stroke();
            context.closePath();
            context.translate(0, 0);
            context.restore();
        }

    }

    move() {
        context.clearRect(this.x - 10, this.y - 1, 20, 20);
        this.y -= this.moveSpeed * Math.cos(this.angle * Math.PI / 180);
        this.x += this.moveSpeed * Math.sin(this.angle * Math.PI / 180);

        this.draw(this.angle);
        let game = this.game;
        if (this.x < 0 || this.x > canvas.width || this.y < 0 || this.y > canvas.height) {
            this.game.projectiles.forEach((e, id, arr) => {
                if (e === this) {
                    arr.splice(id, 1);
                }
            })
        }
    }
}