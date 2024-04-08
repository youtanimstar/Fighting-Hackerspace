function loadAssets() {
  // Load the images
  loadSprite('background','./assets/background/Battleground2.png');
  loadSprite('background2','./assets/background/Battleground1.png');
// Player 1
  loadSprite("idle-player1", "./assets/Player1/Idle.png", {
    sliceX: 10, sliceY: 1, anims: { "idle": {from: 0, to: 9, speed: 12, loop: true}}
})
loadSprite("jump-player1", "./assets/Player1/Jump.png", {
    sliceX: 3, sliceY: 1, anims: { "jump": { from: 0, to: 2, speed: 2, loop: true}}
})
loadSprite("attack-player1", "./assets/Player1/Attack1.png", {
    sliceX: 7, sliceY: 1, anims: { "attack": { from: 0, to: 6, speed: 18}}
})
loadSprite("run-player1", "./assets/Player1/Run.png", {
    sliceX: 8, sliceY: 1, anims: { "run": { from: 0, to: 7, speed: 18}}
})
loadSprite("death-player1", "./assets/Player1/Death.png", {
    sliceX: 7, sliceY: 1, anims: { "death": { from: 0, to: 6, speed: 10}}
})
// Player 2
loadSprite("idle-player2", "./assets/Player2/Idle.png", {
    sliceX: 10, sliceY: 1, anims: { "idle": {from: 0, to: 9, speed: 12, loop: true}}
})
loadSprite("jump-player2", "./assets/Player2/Jump.png", {
    sliceX: 2, sliceY: 1, anims: { "jump": { from: 0, to: 1, speed: 2, loop: true}}
})
loadSprite("attack-player2", "./assets/Player2/Attack1.png", {
    sliceX: 4, sliceY: 1, anims: { "attack": { from: 0, to: 3, speed: 10}}
})
loadSprite("run-player2", "./assets/Player2/Run.png", {
    sliceX: 6, sliceY: 1, anims: { "run": { from: 0, to: 5, speed: 18}}
})
loadSprite("death-player2", "./assets/Player2/Death.png", {
    sliceX: 9, sliceY: 1, anims: { "death": { from: 0, to: 8, speed: 10}}
})

//load the sound
loadSound("fight","./assets/sound/fightCountdown.mp3");
loadSound('strike1',"./assets/sound/strike1.mp3");
loadSound('strike2',"./assets/sound/strike2.mp3");
loadSound('battleMusic',"./assets/sound/Decisive-Battle.mp3")
loadSound('start',"./assets/sound/Title-Theme.mp3")
loadSound('start2',"./assets/sound/And-the-Journey-Begins.mp3")
}
