export const controlInit = (player, map, camera) => { 
  // Input

  document.addEventListener('keydown', e => {
    switch(e.keyCode) {
      case 87: // W
      case 38:
        if(!player.collides('up', map)) player.y--
        break;
      case 65: // A
      case 37:
        if(!player.collides('left', map)) player.x--
        break;
      case 68: // D
      case 39:
        if(!player.collides('right', map)) player.x++
        break;
      case 83: // S
      case 40:
        if(!player.collides('down', map)) player.y++
        break;
    }

    camera.moveOnPlayer(player)
  })
}