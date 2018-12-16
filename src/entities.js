import { SIZE, SYMBOLS} from './const.js'
import {map} from './main.js'

let random = (min, max) => Math.floor(Math.random() * (max - min) + min);

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

  spawn(map, x, y) {
    if (x == null || y == null) {
      do {
        x = random(0, SIZE.w);
        y = random(0, SIZE.h)
      } while (map[y][x].type != 'floor');
    }
    this.move(x, y);
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
      type : this.type,
      instance: this
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

class AliveEntity extends PhysicalEntity {
  constructor(x, y) {
    super(x, y);
    this.lastTimeAttacked = 0;
  }
  update(objects) {
    let o = objects.filter(o => o.x === this.x && o.y === this.y && o.type !== this.type)[0];
    this.act(o);
  }

  act(o) {
    if (o) {
      
      //TODO: make fights turn based. Check when it attacked
        if (Date.now() - this.lastTimeAttacked > 500) {
        this.attack(o);

        this.lastTimeAttacked = Date.now();
      }
      
    }
  }

  attack(o) {
    console.log(`${this.type} attacked ${o.type} and hitted ${this.stats.attack-o.stats.defense/2}`);
  }
}

export class Monster extends AliveEntity {
  constructor(x, y, symbol=SYMBOLS.monster) {
    super(x,y);
    this.symbol = symbol;
    this.type = 'monster';
  }

  static spawnMany(map, n=2000) {
    let monstersNeeded = n;

    let monsters = [];

    while (monstersNeeded) {
      
      let monster = new Monster();
      monster.spawn(map);

      monsters.push(monster);
      monstersNeeded--;
  }

  return monsters;
  }
}


export class Player extends AliveEntity {
  constructor(x, y) {
    super(x,y);
    this.type = 'player';
    this.lvl = 1;
    this.items = {
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
      attack: 1 + Object.keys(this.items).reduce((total, item) => this.items[item] ? total+this.items[item].attack : total, 0),
      defense: 2 + Object.keys(this.items).reduce((total, item) => this.items[item] ? total+this.items[item].defense : total, 0)
    }
  }
}