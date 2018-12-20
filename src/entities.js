import { SIZE, SYMBOLS} from './const.js'
import {map} from './main.js'
import {GUI} from './gui.js'

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
    for (let i = 0; i < objects.length; i++) {
      var o = objects[i];
      if (o.guid === this.guid) {
        delete objects[i];
      }
    }
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

    this.lastTimeAttacked = 0;
    this.lastTimeAddedHP = 0;
    this.timeToAddHP = 1000;
    this.isEnemy = false;
    this.isDead = false;
  }
  update(objects) {
    if (this.isDead) return;

    let o = objects.filter(o => o.x === this.x && o.y === this.y && o.guid !== this.guid)[0];
    if (o) this.act(o);

    if (this.hp < this.maxHP) {
      if (Date.now() - this.lastTimeAddedHP >= this.timeToAddHP) {
        this.hp += Math.min(this.maxHP/60, this.maxHP-this.hp); // Not to add HP more than max
        this.lastTimeAddedHP = Date.now();
      }
    }

    if (this.hp <= 0) {
      this.isDead = true;
    }
  }
  doAttack(o) {
    let minusHp = this.stats.attack*(100/(o.stats.defense+100)).toFixed(2);
    GUI.log(`${this.type} attacked ${o.type} and hitted ${minusHp}`);
    o.hp -= minusHp;
  }


  act(o) {
    if (o && !o.isDead && 
      ((this.type == 'player' && o.isEnemy) || (this.type == 'monster' && o.type == 'player'))
      ) {
      if (Date.now() - this.lastTimeAttacked >= 500) {
        this.doAttack(o);

        this.lastTimeAttacked = Date.now();
      }
      
    }
  }

  set stats(stats) {
    this._stats = stats;
  }

  get stats() {
    return {
      hp: this.hp,
      attack: this.attack,
      defense: this.defense
    }
  }
}

export class Monster extends AliveEntity {
  constructor(x, y, symbol=SYMBOLS.monster) {
    super(x,y);
    this.timeToAddHP = 2000;

    this.hp = this.maxHP = 2;
    this.attack = 1;
    this.defense = 0;

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
    this.hp = this.maxHP= 10;
    this.attack = 5;
    this.defense = 2;

    this.lvl = 1;
    this.exp = 0;
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
      hp: this.hp,
      attack: this.attack + Object.keys(this.items).reduce((total, item) => this.items[item] ? total+this.items[item].attack : total, 0),
      defense: this.defense + Object.keys(this.items).reduce((total, item) => this.items[item] ? total+this.items[item].defense : total, 0),
      lvl: this.lvl,
      exp: this.exp
    }
  }
}