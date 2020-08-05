import { Ball } from "./ball.js";
import { Block } from "./block.js";

class App {
  constructor() {
    this.canvas = document.createElement("canvas");
    this.ctx = this.canvas.getContext("2d");

    document.body.appendChild(this.canvas);

    window.addEventListener("resize", this.resize.bind(this), false);
    this.resize();

    this.block = new Block(300, 450, 700, 30);

    this.ball = new Ball(this.stageWidth, this.stageHeight, 60, 15);

    window.requestAnimationFrame(this.animation.bind(this));
  }

  resize() {
    this.stageWidth = document.body.clientWidth;
    this.stageHeight = document.body.clientHeight;

    this.canvas.width = this.stageWidth * 2;
    this.canvas.height = this.stageHeight * 2;
    this.ctx.scale(2, 2);
  }

  animation() {
    window.requestAnimationFrame(this.animation.bind(this));

    this.ctx.clearRect(0, 0, this.stageWidth, this.stageHeight);

    this.block.draw(this.ctx);

    this.ball.draw(this.ctx, this.stageWidth, this.stageHeight, this.block);
  }
}

window.onload = () => {
  new App();
};
