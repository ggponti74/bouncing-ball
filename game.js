const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// --- Resource Loader ---
const images = {};
async function loadResources(assets) {
    for (const [key, src] of Object.entries(assets)) {
        await new Promise((resolve) => {
            const img = new Image();
            img.onload = () => { images[key] = img; resolve(); };
            img.src = src;
        });
    }
}

// --- Sprite Animation Class ---
class Sprite {
    constructor(image, frameWidth, frameHeight, frameCount) {
        this.image = image;
        this.frameWidth = frameWidth;
        this.frameHeight = frameHeight;
        this.frameCount = frameCount;
        this.currentFrame = 0;
        this.timer = 0;
    }
    update() {
        this.timer++;
        if (this.timer > 10) { // Change frame every 10 ticks
            this.currentFrame = (this.currentFrame + 1) % this.frameCount;
            this.timer = 0;
        }
    }
    draw(x, y) {
        ctx.drawImage(this.image, this.currentFrame * this.frameWidth, 0, 
                      this.frameWidth, this.frameHeight, x, y, this.frameWidth, this.frameHeight);
    }
}

// --- Game Loop ---
let player;
async function init() {
    await loadResources({ hero: 'icon.png' });
    player = new Sprite(images.hero, 192, 192, 0);
    requestAnimationFrame(gameLoop);
}

function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    player.update();
    player.draw(0, 0);
    
    requestAnimationFrame(gameLoop);
}

init();
