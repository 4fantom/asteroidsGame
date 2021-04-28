const canvas = document.querySelector('canvas');
const body = document.querySelector('body')
canvas.width = body.offsetWidth;
canvas.height = body.offsetHeight;
const context = canvas.getContext('2d');
context.save();

class Game {

    constructor() {
        this.ticker = new Ticker();
        this.player = null;
        this.projectiles = [];
        this.enemy = 0;
        this.enemiesAmount = 0;
        this.enemies = [];
        this.lives = 0;
        this.level = 1;
        this.score = 0;
        this.scoreAmount = 0;
        this.x = 30;
        this.y = 60;
        this.gamePaused = true;
        this.startGameAsk();
        this.startButtonListener();
    }

    startGameAsk() {
        context.fillStyle = "white";
        context.strokeStyle = 'white';
        context.font = "italic 25pt Arial";
        context.fillText('Start new game', canvas.width / 2 - 100, canvas.height / 2 - 30);
        context.beginPath();
        context.moveTo(canvas.width / 2 - 120, canvas.height / 2 - 70);
        context.lineTo(canvas.width / 2 + 170, canvas.height / 2 - 70);
        context.lineTo(canvas.width / 2 + 170, canvas.height / 2);
        context.lineTo(canvas.width / 2 - 120, canvas.height / 2);
        context.lineTo(canvas.width / 2 - 120, canvas.height / 2 - 70);
        context.stroke();
        context.closePath();
    }

    startButtonListener() {
        let game = this;
        addEventListener('click', (e) => {
            if (!game.gamePaused) {
                return
            }
            if (e.offsetX > canvas.width / 2 - 120 && e.offsetX < canvas.width / 2 + 170) {
                if (e.offsetY > canvas.height / 2 - 70 && e.offsetY < canvas.height / 2) {
                    context.clearRect(0, 0, canvas.width, canvas.height);
                    game.gamePaused = false;
                    game.init();
                }
            }
        })

        document.addEventListener('keydown', (e) => {
            game.player.keyDown(e);
        });
        document.addEventListener('keyup', (e) => {
            game.player.keyUp(e);
        });
    };

    init() {
        this.score = 0;
        this.lives = 3;
        this.createBigEnemies();
        this.createNewPlayer();
        this.ticker.addObj(this);
    }

    onTick() {
        this.checkHit();
        this.checkCollision();
        this.draw();
    }

    addListeners() {

    }

    draw() {
        context.fillStyle = "white";
        context.font = "italic 30pt Arial";
        context.fillText(this.score, 30, 40);
        let x = this.x;
        for (let i = 0; i < this.lives; i++) {
            context.beginPath();
            context.moveTo(x, this.y);
            context.lineTo(x - 8, this.y + 28);
            context.moveTo(x, this.y);
            context.lineTo(x + 8, this.y + 28);
            context.moveTo(x - 6, this.y + 20);
            context.lineTo(x + 6, this.y + 20);
            context.strokeStyle = 'white';
            context.stroke();
            context.closePath();
            x += 20;
        }
    }

    createNewPlayer() {
        this.player = new Player(canvas.width / 2, canvas.height / 2, this);
    }

    createBigEnemies() {
        this.enemiesAmount = this.level;
        for (let i = 0; i < this.enemiesAmount; i++) {
            this.enemy = new Enemy(Math.random() * canvas.width, Math.random() * canvas.height, Math.random() * 360, 'big', this)
            this.enemies.push(this.enemy)
        }
    }

    createMiddleEnemies(x, y) {
        for (let i = 0; i < 2; i++) {
            this.enemy = new Enemy(x, y, Math.random() * 360, 'middle', this)
            this.enemies.push(this.enemy)
        }
    }

    createSmallEnemies(x, y) {
        for (let i = 0; i < 2; i++) {
            this.enemy = new Enemy(x, y, Math.random() * 360, 'small', this)
            this.enemies.push(this.enemy)
        }
    }

    checkHit() {
        let game = this;
        this.enemies.forEach((enemy, id) => {
                game.projectiles.forEach((projectile, number) => {
                    const distance = Math.hypot(projectile.x - enemy.dx, projectile.y - enemy.dy);
                    let radius = 0;
                    if (enemy.state === 'big') {
                        radius = 46;
                        game.scoreAmount = 50;
                    } else if (enemy.state === 'middle') {
                        radius = 24;
                        game.scoreAmount = 25;
                    } else if (enemy.state === 'small') {
                        radius = 13;
                        game.scoreAmount = 10;
                    }
                    if (distance < radius + 2) {
                        game.score += game.scoreAmount;
                        enemy.isHitted = true;
                        enemy.hit();
                        game.enemies.splice(id, 1);
                        game.projectiles.splice(number, 1);
                        projectile.isUsed = true;
                    }
                    if (game.enemies.length <= 0) {
                        this.levelUp();
                    }
                })
            }
        )
    }

    levelUp() {
        game.level++;
        game.createBigEnemies();
    }

    checkCollision() {
        if (!game.gamePaused) {
            let game = this;
            this.enemies.forEach((enemy) => {
                    const distance = Math.hypot(game.player.dx - enemy.dx, game.player.dy - enemy.dy);
                    let radius = 0;
                    if (enemy.state === 'big') {
                        radius = 46;
                    } else if (enemy.state === 'middle') {
                        radius = 24;
                    } else if (enemy.state === 'small') {
                        radius = 13;
                    }
                    if (distance < radius + 15) {
                        this.collision();
                    }
                }
            )
        }
    }

    collision() {
        console.log('dg');
        console.log(this.enemies.length);
        this.ticker.removeObj(this.player);
        this.lives = this.lives - 1;
        if (this.lives <= 0) {
            this.end();
        } else {
            this.createNewPlayer();
        }
    }

    end() {
        this.gamePaused = true;
        this.enemies = [];
        this.ticker.removeAll();
        setTimeout(() => {
            context.restore();
            context.clearRect(0, 0, canvas.width, canvas.height);
            context.fillStyle = "white";
            context.font = "italic 20pt Arial";
            context.strokeStyle = 'white';
            context.fillText('Game is ended. Your score is ' + this.score, 40, 200);
            this.startGameAsk();
        }, 100)
    }
}

const game = new Game();
