import {SIZE} from './const.js'

export class Camera {
  constructor() {
    this.x = 0;
    this.y = 0;
    this.w = 66;
    this.h = 30;

    this.c = {x:this.x, y:this.y, w:this.w, h:this.h}
  }

  moveOnPlayer(player) {
    this.x = player.x - this.w/2;
    this.y = player.y - this.h/2;
    if (this.x < 0) this.x = 0;
    else if (this.x +this.w > SIZE.w) this.x = SIZE.w - this.w;
    if (this.y < 0) this.y = 0;
    else if (this.y +this.h > SIZE.h) this.y = SIZE.h - this.h;
  }
}