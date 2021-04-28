class Enemy {
    constructor(x, y, angle, state, game) {
        this.x = x;
        this.y = y;
        this.dx = 0;
        this.dy = 0;
        this.angle = angle;
        this.moveSpeed = 1;
        this.game = game;
        this.isHitted = false;
        this.state = state;
        this.init();
    }

    init() {
        this.game.ticker.addObj(this)
    }

    onTick() {
        this.move();
    }

    draw() {
        if (!this.isHitted) {
            if (this.state === 'big') {
                this.dx = this.x + 40;
                this.dy = this.y + 40;
                context.beginPath();
                context.moveTo(this.x, this.y);
                context.lineTo(this.x + 2, this.y + 30);
                context.lineTo(this.x + 5, this.y + 35);
                context.lineTo(this.x - 5, this.y + 40);
                context.lineTo(this.x + 10, this.y + 70);
                context.lineTo(this.x + 25, this.y + 65);
                context.lineTo(this.x + 40, this.y + 80);
                context.lineTo(this.x + 70, this.y + 50);
                context.lineTo(this.x + 70, this.y + 50);
                context.lineTo(this.x + 80, this.y + 10);
                context.lineTo(this.x + 60, this.y);
                context.lineTo(this.x, this.y);
                context.strokeStyle = 'white';
                context.stroke();
                context.closePath();
            }
            if (this.state === 'middle') {
                this.dx = this.x + 20;
                this.dy = this.y + 20;
                context.beginPath();
                context.moveTo(this.x, this.y);
                context.lineTo(this.x + 1, this.y + 15);
                context.lineTo(this.x + 3, this.y + 17);
                context.lineTo(this.x - 2, this.y + 20);
                context.lineTo(this.x + 10, this.y + 35);
                context.lineTo(this.x + 15, this.y + 27);
                context.lineTo(this.x + 19, this.y + 36);
                context.lineTo(this.x + 25, this.y + 25);
                context.lineTo(this.x + 35, this.y + 25);
                context.lineTo(this.x + 40, this.y + 5);
                context.lineTo(this.x + 30, this.y);
                context.lineTo(this.x, this.y);
                context.strokeStyle = 'white';
                context.stroke();
                context.closePath();
            }
            if (this.state === 'small') {
                this.dx = this.x + 10;
                this.dy = this.y + 10;
                context.beginPath();
                context.moveTo(this.x, this.y);
                context.lineTo(this.x + 1, this.y + 7);
                context.lineTo(this.x + 2, this.y + 9);
                context.lineTo(this.x - 1, this.y + 10);
                context.lineTo(this.x + 5, this.y + 15);
                context.lineTo(this.x + 7, this.y + 13);
                context.lineTo(this.x + 7, this.y + 20);
                context.lineTo(this.x + 13, this.y + 10);
                context.lineTo(this.x + 17, this.y + 17);
                context.lineTo(this.x + 20, this.y + 3);
                context.lineTo(this.x + 15, this.y);
                context.lineTo(this.x, this.y);
                context.lineTo(this.x + 10, this.y + 10);
                context.strokeStyle = 'white';
                context.stroke();
                context.closePath();
            }
        }
    }

    move() {
        context.clearRect(0, 0, canvas.width, canvas.height)

        if (this.y + 80 < 0) {
            this.y = canvas.height;
        }

        if (this.y > canvas.height) {
            this.y = 0;
        }

        if (this.x > canvas.width) {
            this.x = 0;
        }

        if (this.x + 85 < 0) {
            this.x = canvas.width;
        }

        this.y -= this.moveSpeed * Math.cos(this.angle * Math.PI / 180);
        this.x += this.moveSpeed * Math.sin(this.angle * Math.PI / 180);
    }

    hit() {
        let shards = [];
        for (let i = 0; i < 4; i++) {
            shards[i] = new Projectile(this.dx, this.dy, Math.random() * 360, this.game);
            setInterval(() => {
                shards[i].isUsed = true;
            }, 100)
        }
        if (this.state === 'big') {
            this.game.createMiddleEnemies(this.dx, this.dy);
        }
        if (this.state === 'middle') {
            this.game.createSmallEnemies(this.dx, this.dy);
        }
    }
}