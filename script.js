window.addEventListener("load", () => {
    const canvas = document.getElementById("canvas");
    const ctx = canvas.getContext("2d");
    const gameCont = document.querySelector(".game-container");
  
    canvas.width = gameCont.clientWidth;
    canvas.height = gameCont.clientHeight;
  
    //Background Class
    class Background {
      constructor(img, width, height) {
        this.img = img;
        this.width = width;
        this.height = height;
      }
  
      draw(context) {
        context.save();
        context.drawImage(this.img, 0, 0, this.width, this.height);
        context.restore();
      }
    }
  
    // Background Images
    const bgImage1 = new Image();
    bgImage1.src =
      "./oak_woods_v1.0/oak_woods_v1.0/background/background_layer_1.png";
  
    const bgImage2 = new Image();
    bgImage2.src =
      "./oak_woods_v1.0/oak_woods_v1.0/background/background_layer_2.png";
  
    const bgImage3 = new Image();
    bgImage3.src =
      "./oak_woods_v1.0/oak_woods_v1.0/background/background_layer_3.png";
  
    // Background Objects
    const objectBGimage1 = new Background(bgImage1, canvas.width, canvas.height);
    const objectBGimage2 = new Background(bgImage2, canvas.width, canvas.height);
    const objectBGimage3 = new Background(bgImage3, canvas.width, canvas.height);
    const bgImages = [objectBGimage1, objectBGimage2, objectBGimage3];
  
    // context.drawImage(this.objectImage, this.sX, this.sy, this.sWidth, this.sHeight, this.dX, this.dY, this.dWidth, this.dHeight);
    //Floor Tiles
    class Floor {
      constructor(img, sx, sy, sw, sh, dx, dy, dw, dh) {
          this.img = img;
          this.sx = sx;
          this.sy = sy;
          this.sw = sw;
          this.sh = sh;
          this.dx = dx;
          this.dy = dy;
          this.dw = dw;
          this.dh = dh;
      }
  
      draw(context) {
          context.save();
          context.drawImage(this.img, this.sx, this.sy, this.sw, this.sh, this.dx, this.dy, this.dw, this.dh);
          // context.strokeRect(this.dx, this.dy, this.dw, this.dh);
          
          context.restore();
      }
    }
  
    //Tiles Images
    const tilesImg1 = new Image();
    tilesImg1.src = "./oak_woods_v1.0/oak_woods_v1.0/oak_woods_tileset.png"
  
    const objecttiles1 = new Floor(tilesImg1, 120, 167, 72, 25, 0, 530, canvas.width/5, 60);
    let k=0;
    const floorObjects = [objecttiles1];
    for(let i = 1; i<=5; i++){
      k+=canvas.width/5;
      floorObjects.push(new Floor(tilesImg1, 120, 167, 72, 25, k, 530, canvas.width/5, 60));
    }
  
    //Decorations
    class Decorations {
      constructor(img, sx, sy, sw, sh, dx, dy, dw, dh) {
          this.img = img;
          this.sx = sx;
          this.sy = sy;
          this.sw = sw;
          this.sh = sh;
          this.dx = dx;
          this.dy = dy;
          this.dw = dw;
          this.dh = dh;
      }
  
      draw(context) {
          context.save();
          context.drawImage(this.img, this.sx, this.sy, this.sw, this.sh, this.dx, this.dy, this.dw, this.dh);
          context.restore();
      }
    }
  
    //Decoration Images
    const shopImage = new Image();
    shopImage.src = "./oak_woods_v1.0/oak_woods_v1.0/decorations/shop.png";
  
    const shopObject = new Decorations(shopImage, 0, 0, 118, 114, 20, 232, 350, 350);
  
    const lampImage = new Image();
    lampImage.src = "./oak_woods_v1.0/oak_woods_v1.0/decorations/lamp.png";
  
    const lampObject = new Decorations(lampImage, 0, 0, 23, 57, canvas.width-100, 292, 55, 240);
    const decorObjects = [shopObject,lampObject];
  
    //Player Character
    class Player {
      constructor(game) {
        this.game = game;
        this.maxX = this.game.width * 0.8;
        this.minX = this.game.width * 0.01;

        this.img = new Image();
        this.img.src =
          "./Sprites/craftpix-net-230380-free-shinobi-sprites-pixel-art/Samurai/Idle.png";

        this.sx = 0;
        this.sy = 0;
        this.sw = 127;
        this.sh = 128;
        this.dx = this.minX;
        this.dy = 335;
        this.dw = 190;
        this.dh = 200;

        this.currentFrame = 0;
        this.totalFrame = 6;
        this.framesDrawn = 0;
      }

      draw(context) {
        context.save();
        context.drawImage(
          this.img,
          this.sx,
          this.sy,
          this.sw,
          this.sh,
          this.dx,
          this.dy,
          this.dw,
          this.dh
        );
        
        // context.strokeRect(this.dx, this.dy, this.dw, this.dh);
        
        context.restore();
      }

      right() {
        this.currentFrame %= this.totalFrame;
        this.sx = this.currentFrame * this.sw;
        if (this.dx < this.maxX) {
          this.dx += 7;
        }

        this.framesDrawn += 4;
        if (this.framesDrawn >= 10) {
          this.currentFrame += 1;
          this.framesDrawn = 0;
        }
      }

      left() {
        this.currentFrame %= this.totalFrame;
        this.sx = this.currentFrame * this.sw;
        if (this.dx > this.minX) {
          this.dx -= 7;
        }

        this.framesDrawn += 4;
        if (this.framesDrawn >= 10) {
          this.currentFrame += 1;
          this.framesDrawn = 0;
        }
      }

      attackRight() {
        this.currentFrame %= this.totalFrame;
        this.sx = this.currentFrame * this.sw + 10;

        this.framesDrawn += 4;        
        if (this.framesDrawn >= 10) {
          this.currentFrame += 1;
          this.framesDrawn = 0;
        }
      }

      attackLeft() {
        this.currentFrame %= this.totalFrame;
        this.sx = this.currentFrame * this.sw;

        this.framesDrawn += 4;        
        if (this.framesDrawn >= 10) {
          this.currentFrame += 1;
          this.framesDrawn = 0;
        }
      }

      idle() {
        this.totalFrame = 3;
        this.currentFrame %= this.totalFrame;
        this.sx = this.currentFrame * this.sw;

        this.framesDrawn += 1;        
        if (this.framesDrawn >= 10) {
          this.currentFrame += 1;
          this.framesDrawn = 0;
        } 
      }

      update() {
        if (this.game.kbrd.right) {
          this.right();
        }
        if (this.game.kbrd.left) {
          this.left();
        }
        if(this.game.kbrd.attack && !this.game.direction){
          this.attackLeft();
        }
        else if(this.game.kbrd.attack && this.game.direction){
          this.attackRight();
        }
        else{
          this.idle();
        }
      }
    }
    
    //Enemy Character

    class Enemy {
      constructor(game) {
        this.game = game;
        this.img = new Image();
        this.img.src = "./Sprites/craftpix-net-230380-free-shinobi-sprites-pixel-art/Fighter/Idle-left.png";
        this.sx = 0;
        this.sy = 0;
        this.sw = 127;
        this.sh = 128;
        this.dx = this.game.player.maxX;
        this.dy = 335;
        this.dw = 190;
        this.dh = 200;

        this.currentFrame = 0;
        this.totalFrame = 3;
        this.framesDrawn = 0;
      }

      draw(context) {
        context.save();
        context.drawImage(this.img, this.sx, this.sy, this.sw, this.sh, this.dx, this.dy, this.dw, this.dh);
        // context.strokeRect(this.dx, this.dy, this.dw, this.dh);
        context.restore();
      }

      update() {
        if(this.game.player.dx >= this.dx-100 && this.game.kbrd.attack) {
          this.img.src = "./Sprites/craftpix-net-230380-free-shinobi-sprites-pixel-art/Fighter/Hurt-left.png";
        }else {
          this.img.src = "./Sprites/craftpix-net-230380-free-shinobi-sprites-pixel-art/Fighter/Idle-left.png";
        }
        this.currentFrame %= this.totalFrame;
        this.sx = this.currentFrame * this.sw + 10;

        this.framesDrawn += 1;        
        if (this.framesDrawn >= 10) {
          this.currentFrame += 1;
          this.framesDrawn = 0;
        } 
      }
    }

    //Game Class
    class Game {
      constructor(type) {
        this.canvas = type;
        this.width = this.canvas.width;
        this.height = this.canvas.height;
  
        this.decor = new Decorations();
        this.player = new Player(this);
        this.enemy = new Enemy(this);
  
        this.kbrd = {
          left: false,
          right: false,
          idle: true,
          attack: false
        }
        this.attackkeys = ["z","x","c","v"];
        this.direction = true; // true for right, false for left
  
        addEventListener("keydown", (e) => {
          if (e.key === "ArrowLeft") {
            this.kbrd.left = true;
            this.direction = false;
            this.player.totalFrame = 6;
            this.kbrd.idle = false;
            this.player.img.src = "./Sprites/craftpix-net-230380-free-shinobi-sprites-pixel-art/Samurai/Run-left.png";
          }
          if (e.key === "ArrowRight") {
            this.direction = true;
            this.kbrd.right = true;
            this.player.totalFrame = 6;
            this.kbrd.idle = false;
            this.player.img.src = "./Sprites/craftpix-net-230380-free-shinobi-sprites-pixel-art/Samurai/Run.png";
          }

          if (e.key === "z") {
            this.idle = false;
            this.kbrd.attack = true;
            this.player.totalFrame = 6;
            if(this.direction)
            this.player.img.src = "./Sprites/craftpix-net-230380-free-shinobi-sprites-pixel-art/Samurai/Attack_1.png";
            else
            this.player.img.src = "./Sprites/craftpix-net-230380-free-shinobi-sprites-pixel-art/Samurai/Attack_1-left.png"
          }
          if (e.key === "x") {
            this.idle = false;
            this.kbrd.attack = true;
            this.player.totalFrame = 3;
            if(this.direction)
            this.player.img.src = "./Sprites/craftpix-net-230380-free-shinobi-sprites-pixel-art/Samurai/Attack_2.png";
            else
            this.player.img.src = "./Sprites/craftpix-net-230380-free-shinobi-sprites-pixel-art/Samurai/Attack_2-left.png"
          }
          if (e.key === "c") {
            this.idle = false;
            this.kbrd.attack = true;
            this.player.totalFrame = 3;
            if(this.direction)
            this.player.img.src = "./Sprites/craftpix-net-230380-free-shinobi-sprites-pixel-art/Samurai/Attack_3.png";
            else
            this.player.img.src = "./Sprites/craftpix-net-230380-free-shinobi-sprites-pixel-art/Samurai/Attack_3-left.png"
          }
        });

        addEventListener("keyup", (e) => {
          if (this.kbrd.left) {
            this.player.img.src = "./Sprites/craftpix-net-230380-free-shinobi-sprites-pixel-art/Samurai/idle-left.png";
            this.kbrd.left = false;
            this.direction = false;
            this.kbrd.idle = true;
          }
          if (this.kbrd.right) {
            this.player.img.src = "./Sprites/craftpix-net-230380-free-shinobi-sprites-pixel-art/Samurai/Idle.png";
            this.kbrd.right = false;
            this.direction = true;
            this.kbrd.idle = true;
          }
          if(this.kbrd.attack){
            if(this.direction) {
            this.player.img.src = "./Sprites/craftpix-net-230380-free-shinobi-sprites-pixel-art/Samurai/Idle.png";
            } else {
              this.player.img.src = "./Sprites/craftpix-net-230380-free-shinobi-sprites-pixel-art/Samurai/idle-left.png";
            }
            this.kbrd.attack = false;
            this.kbrd.idle = true;
          }
        });
      }

      render(context) {
          this.player.draw(context);
          this.player.update();

          this.enemy.draw(context);
          this.enemy.update();
      }
    }
  
    const game = new Game(canvas);
  
    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
  
      // Background
      bgImages.forEach((object) => {
        object.draw(ctx);
      });
      
      //Decorations
      decorObjects.forEach((object) => {
        object.draw(ctx);
      })
      
          //Floor
          floorObjects.forEach((object) => {
              object.draw(ctx);
          })
  
      game.render(ctx);
      requestAnimationFrame(animate);
    }
  
    animate();
  });
  