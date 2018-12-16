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
    this.guid =  Math.floor((1 + Math.random()) * 0x10000000000);
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

  remove(objects) {

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
}

class AliveEntity extends PhysicalEntity {
  constructor(x, y) {
    super(x, y);
    this._stats = {
      hp: 0,
      attack: 0,
      defense: 0
    }


    this.lastTimeAttacked = 0;
    this.isEnemy = false;
    this.isDead = false;
  }
  update(objects) {
    let o = objects.filter(o => o.x === this.x && o.y === this.y && o.type !== this.type)[0];
    this.act(o);
    if (this._stats.hp <= 0) {
      this.isDead = true;
      this.remove(objects);
      return;
    }
  }

  act(o) {
    if (o && !o.isDead && 
      ((this.type == 'player' && o.isEnemy) || (this.type == 'monster' && o.type == 'player'))
      ) {
        if (Date.now() - this.lastTimeAttacked > 500) {
        this.attack(o);

        this.lastTimeAttacked = Date.now();
      }
      
    }
  }

  attack(o) {
    let minusHp = this._stats.attack*(100/(o.stats.defense+100));
    console.log(`${this.type} attacked ${o.type} and hitted ${minusHp}`);
    o.stats.hp -= minusHp;
    console.log(`${o.type} has ${o.stats.hp}`)
  }

  set stats(stats) {
    this._stats = stats;
  }

  get stats() {
    return this._stats;
  }
}

export class Monster extends AliveEntity {
  constructor(x, y, symbol=SYMBOLS.monster) {
    super(x,y);
    this._stats = {
      hp: 2,
      attack: 1,
      defense: 0
    },

    this.symbol = symbol;
    this.type = 'monster';
    this.isEnemy = true;
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
    this._stats = {
      hp: 10,
      attack: 5,
      defense: 2,
    }
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
      hp: this._stats.hp+this.lvl^1.5,
      attack: this._stats.attack + Object.keys(this.items).reduce((total, item) => this.items[item] ? total+this.items[item].attack : total, 0),
      defense: this._stats.defense + Object.keys(this.items).reduce((total, item) => this.items[item] ? total+this.items[item].defense : total, 0)
    }
  }
}