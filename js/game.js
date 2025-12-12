let canvas;
let world;

function init() {
  canvas = document.getElementById("canvas");
  world = new World(canvas);

  //   character.src = ImageHub.character.walking;
  console.log("myCharacter is", world.character);
}
