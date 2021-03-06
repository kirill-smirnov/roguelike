let pressedButtons = [];


function controlInit (/* player, map, camera */) { 
  // Input

  document.addEventListener('keydown', e => {
    const index = pressedButtons.indexOf(e.keyCode);

    if (index === -1) 
      pressedButtons.push(e.keyCode);

    // switch(e.keyCode) {
    //   case 87: // W
    //   case 38:
    //     if(!player.collides('up', map)) player.y--
    //     break;
    //   case 65: // A
    //   case 37:
    //     if(!player.collides('left', map)) player.x--
    //     break;
    //   case 68: // D
    //   case 39:
    //     if(!player.collides('right', map)) player.x++
    //     break;
    //   case 83: // S
    //   case 40:
    //     if(!player.collides('down', map)) player.y++
    //     break;
    // }

    // camera.moveOnPlayer(player)
  });

  document.addEventListener('keyup', e => {
    const index = pressedButtons.indexOf(e.keyCode);

    if (index > -1)
      pressedButtons.splice(index, 1);
  });
}

let lastTimeStarted = Date.now();

function controlTick(player, map, camera) {
  const now = Date.now();
  if (now - lastTimeStarted < 200)
    return;

  lastTimeStarted = now;

  for (let key of pressedButtons) {
    switch(key) {
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
  }
}

export {controlInit, controlTick}