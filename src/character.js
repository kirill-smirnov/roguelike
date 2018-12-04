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
    this.type = '';
  }

  move(x, y) {
    this._x = x;
    this._y = y;
  }

  collides(direction, map) {
    if (direction == 'up' && this._y > 0 && map[this._y-1][this._x].type != 'wall' ||
        direction == 'left' && this._x > 0 && map[this._y][this._x-1].type != 'wall' ||
        direction == 'right' && this._x < (SIZE.w-1) && map[this._y][this._x+1].type != 'wall' ||
        direction == 'down' && this._y < (SIZE.h-1) && map[this._y+1][this._x].type != 'wall') {
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
      instance: this,
      roomId: this.roomId
    }
  }
  get stats() {
    return {
      hp: 2,
      attack: 1,
      defense: 0
    }
  }
}

export class Monster extends PhysicalEntity {
  constructor(x, y, symbol=SYMBOLS.monster) {
    super(x,y);
    this.symbol = symbol;
    this.type = 'monster';
  }

  static createMany(map, n=2000) {
  let monstersNeeded = n;

  let monsters = [];

  while (monstersNeeded) {
    let random = (min, max) => Math.floor(Math.random() * (max - min) + min);
    let x, y;
    do {
      x = random(0, SIZE.w);
      y = random(0, SIZE.h)
    } while (map[y][x].type == 'wall');

    monsters.push(new Monster(x, y));
    monstersNeeded--;
  }

  return monsters;
  }
}


export class Player extends PhysicalEntity {
  constructor(x, y) {
    super(x,y);
    this.type = 'player';
    this.lvl = 1;
    this.wore_items = {
      weapon: null,
      weapon2: null,
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
  get stats() {
    return {
      hp: 10+this.lvl^1.5,
      attack: 1 + this.items.reduce((total, item) => {total+item.attack}),
      defense: 2 + this.items.reduce((total, item) => {total+item.defense})
    }
  }
}