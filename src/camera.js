import {SIZE} from './const.js'

export class Camera {
  constructor() {
    this.x = 0;
    this.y = 0;
    this.w = 66;
    this.h = 30;
  }

  move(x, y) {
    this.x = x - this.w/2;
    this.y = y - this.h/2;
    if (this.x < 0) this.x = 0;
    else if (this.x +this.w > SIZE.w) this.x = SIZE.w - this.w;
    if (this.y < 0) this.y = 0;
    else if (this.y +this.h > SIZE.h) this.y = SIZE.h - this.h;
  }

  moveOnPlayer(player) {
    this.move(player.x, player.y)
  }
}