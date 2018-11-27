import { SIZE, SYMBOLS} from './const.js'
import {map} from './main.js'

class Inventory {
  constructor() {
    this.items = [];
  }

  add(item) {
    this.items.push(item);
  }

  remove(i) {
    this.items.splice(i, 1);
  }
}

class PhysicalEntity {
  constructor(x, y) {
    this.move(x, y);
  }

  move(x, y) {
    this._x = x;
    this._y = y;
  }

  collides(direction, map) {
    if (direction == 'up' && this._y > 0 && map[this._y-1][this._x] != SYMBOLS['0'] ||
        direction == 'left' && this._x > 0 && map[this._y][this._x-1] != SYMBOLS['0'] ||
        direction == 'right' && this._x < (SIZE.w-1) && map[this._y][this._x+1] != SYMBOLS['0'] ||
        direction == 'down' && this._y < (SIZE.h-1) && map[this._y+1][this._x] != SYMBOLS['0']) {
            return false
    }
    return true
  }

  get x() { return this._x }
  get y() { return this._y }
  set x(x) {
    this._x = x
  }
  set y(y) {
    this._y = y
  }

  get info() {
    return {
      type : 'player',
      instance: this
    }
  }

  // set map(map) {
  //   this._map = map;
  // }
}


export class Player extends PhysicalEntity {
  constructor(x, y) {
    super(x,y);
    this.lvl = 1;
    this.wore_items = {
      weapon: null,
      weapon: null,
      head: null,
      neck: null, 
      chest: null,
      lHand: null,
      rHand: null,
      legs: null,
      foots: null,
      finger1: null,
      finger2:null,
      shoulders:null
    }
  }

  // move(x, y) {
  //   this._x = x;
  //   this._y = y;
  // }

  // collides(direction) {
  //   let map = this._map;
  //   if (direction == 'up' && this._y > 0 && map[this._y-1][this._x] != SYMBOLS['0'] ||
  //       direction == 'left' && this._x > 0 && map[this._y][this._x-1] != SYMBOLS['0'] ||
  //       direction == 'right' && this._x < (SIZE.x-1) && map[this._y][this._x+1] != SYMBOLS['0'] ||
  //       direction == 'down' && this._y < (SIZE.y-1) && map[this._y+1][this._x] != SYMBOLS['0']) {
  //           return false
  //   }
  //   return true
  // }

  // get x() { return this._x }
  // get y() { return this._y }
  
  get hp() {
    return 10+this.lvl^1.5;
  }

  get attack() {
    return 1 + this.items.reduce((total, item) => {total+item.attack});
  }

  get defense() {
    return 2 + this.items.reduce((total, item) => {total+item.defense});
  }

  // set x(x) {
  //   this._x = x
  // }
  // set y(y) {
  //   this._y = y
  // }

  // set map(map) {
  //   this._map = map;
  // }
}