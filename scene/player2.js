function startPlayer2(worldState) {
    const SCREEN_WIDTH = 1000;
    const SCREEN_HEIGHT = 600;
    const backgroundMusic = play('start2',{loop:true})
    setGravity(0);
    const background = add([sprite("background"), pos(0, 0), scale(0.75)]);
    const container = add([
      rect(680, 400),
      color(0, 0, 0),
      opacity(0.8),
      area(),
      scale(1.2),
      anchor("center"),
      pos(center().x-220,center().y),
    ]);
    function makePlayer(posX, posY, width, height, scaleFactor, id) {
      return add([
        pos(posX, posY),
        scale(scaleFactor),
        area({ shape: new Rect(vec2(0), width, height) }),
        anchor("center"),
        body({ stickToPlatform: true }),
        {
          isCurrentlyJumping: false,
          health: 500,
          sprites: {
            run: "run-" + id,
            idle: "idle-" + id,
            jump: "jump-" + id,
            attack: "attack-" + id,
            death: "death-" + id,
          },
        },
      ]);
    }
  //   setGravity(1200);
  
    const player1 = makePlayer(1150, 380, 16, 42, 9, "player2");
    player1.use(sprite(player1.sprites.idle));
    player1.flipX = true;
    player1.play("idle");
    function run(player, speed, flipPlayer) {
      if (player.health === 0) {
        return;
      }
  
      if (player.curAnim() !== "run" && !player.isCurrentlyJumping) {
        player.use(sprite(player.sprites.run));
        player.play("run");
      }
      player.move(speed, 0);
      player.flipX = flipPlayer;
    }
    container.add([
      text("Enter the name of Player 2\n\n        (max - 10)", 90),
      scale(1),
      // pos(center()),
      //   pos("center")
      anchor("center"),
      pos(0, -100),
    ]);
    const nameFieldContainer = container.add([
      rect(500, 80),
      color(164, 164, 164 ),
      opacity(0.5),
      area(),
      // scale(2),
      anchor("center"),
      pos(0,50)
    ]);
  
    const nameField = nameFieldContainer.add([
      text("", 20),
      pos(0,0),
      //   origin("center")
      anchor("center"),
    ]);
  
    // charInput((ch) => {
    //     nameField.text += ch;
    // });
    onKeyPress((ch) => {
  
      if(ch!="backspace"&&ch!="enter"&&ch!="space"&&ch!='shift'&&ch!='control'&&ch!='alt'&&ch!='meta')
      if(nameField.text.length<10)
      nameField.text += ch.toUpperCase();
    });
    onKeyPress("backspace", () => {
      nameField.text = nameField.text.slice(0, -1);
    });
    onKeyPress("space", () => {
      nameField.text += " ";
    });
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
  
    onKeyRelease("enter", () => {
        flashScreen();
        setTimeout(() => {
            backgroundMusic.paused = true;
      go("fight", { ...worldState,player2: nameField.text });
        }, 1000);
    });
  }
  