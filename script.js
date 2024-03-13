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

  class Game {
    constructor(type) {
      this.canvas = type;
      this.width = this.canvas.width;
      this.height = this.canvas.height;
    }

    render(context) {}
  }

  const game = new Game(canvas);

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Background
    bgImages.forEach((object) => {
      object.draw(ctx);
    });

    game.render(ctx);
    requestAnimationFrame(animate);
  }

  animate();
});
