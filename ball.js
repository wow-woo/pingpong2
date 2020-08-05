export class Ball {
  constructor(stageWidth, stageHeight, radius, speed) {
    this.radius = radius;
    this.vx = speed;
    this.vy = speed;

    const diameter = this.radius * 2;
    this.x = diameter + (Math.random() * stageWidth - diameter);
    this.y = diameter + (Math.random() * stageHeight - diameter);
  }

  draw(ctx, stageWidth, stageHeight, obstacle) {
    this.x += this.vx;
    this.y += this.vy;

    this.bounceWindow(stageWidth, stageHeight);

    this.bounceBlock(obstacle);

    ctx.fillStyle = "#fdd700";
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
    ctx.fill();
  }

  bounceWindow(stageWidth, stageHeight) {
    const minX = this.radius;
    const minY = this.radius;
    const maxX = stageWidth - this.radius;
    const maxY = stageHeight - this.radius;

    if (this.x <= minX || this.x >= maxX) {
      this.vx *= -1;
      this.x += this.vx;
    } else if (this.y <= minY || this.y >= maxY) {
      this.vy *= -1;
      this.y += this.vy;
    } else {
      return;
    }
  }

  bounceBlock(obstacle) {
    const minX = obstacle.x - this.radius;
    const maxX = obstacle.maxX + this.radius;
    const minY = obstacle.y - this.radius;
    const maxY = obstacle.maxY + this.radius;

    if (this.x > minX && this.x < maxX && this.y > minY && this.y < maxY) {
      console.log("ahha");
      const left = Math.abs(minX - this.x);
      const right = Math.abs(this.x - maxX);
      const top = Math.abs(minY - this.y);
      const bottom = Math.abs(this.y - maxY);
      const hitX = Math.min(left, right);
      const hitY = Math.min(top, bottom);
      const judge = Math.min(hitX, hitY);

      if (judge == hitX) {
        this.vx *= -1;
        this.x += this.vx;
      } else if (judge == hitY) {
        this.vy *= -1;
        this.y += this.vy;
      }
    } else {
      return;
      //   console.log(
      //     parseInt(minX),
      //     parseInt(this.x),
      //     parseInt(maxX),
      //     "||",
      //     parseInt(minY),
      //     parseInt(this.y),
      //     parseInt(maxY)
      //   );
    }
  }
}
