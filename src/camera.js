import {SIZE} from './const.js'

export class Camera {
  constructor() {
    this.x = 0;
    this.y = 0;
    this.w = Math.floor(SIZE.screenW/9.69696969697);
    this.h = Math.floor(SIZE.screenH/16);
  }

  move(x, y) {
    this.x = Math.floor(x - this.w/2);
    this.y = Math.floor(y - this.h/2);
    if (this.x < 0) this.x = 0;
    else if (this.x +this.w > SIZE.w) this.x = SIZE.w - this.w;
    if (this.y < 0) this.y = 0;
    else if (this.y +this.h > SIZE.h) this.y = SIZE.h - this.h;
  }

  moveOnPlayer(player) {
    this.move(player.x, player.y)
  }
}