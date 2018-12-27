import {SYMBOLS, SIZE} from './const.js'
import {createDungeon as _createDungeon} from './dungeon.js'
import { Camera } from './camera.js'
import { Monster } from './entities.js'
// import * as inFov from './fov.js';

export class levelManager {
  constructor() {
    this.levels = {
      world: null,
      towns: [],
      dungeons: []
    };

    let dungeon = this.createDungeon();
    this.currentLevel = dungeon;
    this.currentMap = dungeon.map[dungeon.currentFloor];
  }

  createDungeon() {
    let m = _createDungeon(); // array of levels

    for (let i = 0; i < m.length; i++) {
      for (let j = 0; j < m[i].length; j++) {
        m[i][j].lighted = false;
      }
    }

    let lvl = {
      id: Math.floor((1 + Math.random()) * 0x10000000000),
      map: m,
      objects: [],
      camera: new Camera(),
      currentFloor:0
    }
    this.levels.dungeons.push(lvl);
    
    return lvl;
  }

  update() {
    let map = this.currentMap;
    let camera = this.currentLevel.camera;
    
    for (let i = camera.y; i < camera.y+camera.h; i++) {
      for (let j = camera.x; j < camera.x+camera.w; j++) {
        map[i][j].lighted = false;
      }
    }

  }

  FOV(player) {
    let map = this.currentMap;
    let camera = this.currentLevel.camera;
    let radius = 10;

    for (let phi = 0; phi < 360; phi++) {
      let x=Math.cos(phi*Math.PI/180);
      let y=Math.sin(phi*Math.PI/180);
      let ox = player.x + 0.5;
      let oy = player.y + 0.5;
      for (let r = 0; r < radius; r++) {
        let i = Math.floor(oy), j = Math.floor(ox);
        if (i >= SIZE.h || j >= SIZE.w || i < 0 || j < 0)
          continue
        if (map[i][j].type === 'wall') {
          break;
        }
        else map[i][j].lighted = true;
        ox +=x;
        oy += y;
      }
    }
  }

  createMonsters() {
    for (let m of Monster.spawnMany(this.currentMap, 2000 )) 
      this.currentLevel.objects.push(m)
  }
}
