
function setStart(worldState) {
    // worldState.backgroundMusic=false;
    // const backgroundMusic = play('start',{loop:true})
  // const music = play("Title-Theme", {
  //   loop: true,
  //   volume: 0.5,
  // });
  // music.paused = false;
  const background = add([sprite("background"), pos(0, 0), scale(0.75)]);
  //   const title = add([
  //       text('Welcome to the Game', 20),
  //       area(),
  //       color(255, 0, 0 ),
  //       scale(2),
  //       pos(0,0)
  //   ])
  const recWidth = {
    width: 400,
    height: 100,
    color: (193, 254, 255),
  };
  console.log(background);
  
  const startMenu = add([
    rect(recWidth.width, recWidth.height),
    outline(5, Color.fromHex("#FF0000")),
    // anchor("center"),
    // pos(background.width / 2 - recWidth.width / 2, background.height / 2 - recWidth.height / 2),
    pos(1920 / 2 - recWidth.width-50, 250),
    // pos((background.width - recWidth.width) / 2, 300),
    opacity(0.8),
    color(0, 0, 0),
  ]);
  const startTitle = startMenu.add([
    text("> Start Game", { size: 45 }),
    pos(30, 30),
    color(255, 255, 255),
  ]);
  const controls = add([
    text("Press the SPACE to continue", {
      size: 48, // 48 pixels tall
      font: "sans-serif",
    }),
    pos(80, 1080 - 500),
    color(10, 10, 10),
  ]);
  function flashScreen() {
    const flash = add([
      rect(width(), height()),
      color(10, 10, 10),
      fixed(),
      opacity(0),
    ]);
    tween(
      flash.opacity,
      1,
      0.5,
      (val) => (flash.opacity = val),
      easings.easeInBounce
    );
  }
  onKeyPress("space", () => {
    // music.paused = true;
    flashScreen();
    setTimeout(() => {
        // backgroundMusic.paused = true;
      go("player1", worldState);
    }, 1000);
  });
  // onUpdate(()=>{

  // })
  // await tween(bean.opacity, 1, 0.5, (val) => bean.opacity = val, easings.easeOutQuad)
  // title.pos(width() / 2 - width(title) / 2,50)
}
