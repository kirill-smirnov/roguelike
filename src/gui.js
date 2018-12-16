//let el = document.querySelector('#info')
let gui = document.querySelector('#gui');
let log = document.querySelector('#log');

export  class GUI {
  static updateGUI(player) {
    let {lvl, exp, hp, attack, defense} = player.stats;
    gui.innerHTML = `lvl: ${lvl} exp: ${exp} hp: ${hp} attack: ${attack} defense: ${defense}`;
  }

  static log(msg) {
    log.innerHTML += msg + '<br>';
  }
}