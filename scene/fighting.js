

function setBattle(worldState) {
    
    play("fight", {
        volume: 1,
      });
      const music = play("battleMusic", {
        loop: true,
        volume: 0.5,
      });
      
  const background = add([sprite("background"), pos(0, 0), scale(0.75)]);
  //   const backgroundWidth = background.width;
  //   console.log(backgroundWidth);
  console.log(worldState);
  
  add([rect(16, 720), area(), body({ isStatic: true }), pos(-20, 0)]);
  add([
    rect(16, 720),
    area(),
    opacity(0),
    body({ isStatic: true }),
    pos(1340, 0),
  ]);
  const base = add([
    rect(1340, 100),
    color(0, 0, 0),
    opacity(0),
    area(),
    body({ isStatic: true }),
    pos(0, 580),
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
  setGravity(1200);

  const player1 = makePlayer(200, 100, 16, 42, 6, "player1");
  player1.use(sprite(player1.sprites.idle));
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

  function resetPlayerToIdle(player) {
    player.use(sprite(player.sprites.idle));
    player.play("idle");
  }
  onKeyDown("d", () => {
    run(player1, 500, false);
  });
  onKeyRelease("d", () => {
    if (player1.health !== 0) {
      resetPlayerToIdle(player1);
      player1.flipX = false;
    }
  });

  onKeyDown("a", () => {
    run(player1, -500, true);
  });
  onKeyRelease("a", () => {
    if (player1.health !== 0) {
      resetPlayerToIdle(player1);
      player1.flipX = true;
    }
  });
  function makeJump(player) {
    if (player.health === 0) {
      return;
    }

    if (player.isGrounded()) {
      const currentFlip = player.flipX;
      player.jump();
      player.use(sprite(player.sprites.jump));
      player.flipX = currentFlip;
      player.play("jump");
      player.isCurrentlyJumping = true;
    }
  }

  function resetAfterJump(player) {
    if (player.isGrounded() && player.isCurrentlyJumping) {
      player.isCurrentlyJumping = false;
      if (player.curAnim() !== "idle") {
        resetPlayerToIdle(player);
      }
    }
  }

  onKeyDown("w", () => {
    makeJump(player1);
  });

  player1.onUpdate(() => resetAfterJump(player1));

  function attack(player, excludedKeys,strike) {
    if (player.health === 0) {
      return;
    }

    for (const key of excludedKeys) {
      if (isKeyDown(key)) {
        return;
      }
    }

    const currentFlip = player.flipX;
    if (player.curAnim() !== "attack") {
      player.use(sprite(player.sprites.attack));
      player.flipX = currentFlip;
      const slashX = player.pos.x + 30;
      const slashXFlipped = player.pos.x - 350;
      const slashY = player.pos.y - 200;

      add([
        rect(300, 300),
        area(),
        pos(currentFlip ? slashXFlipped : slashX, slashY),
        opacity(0),
        player.id + "attackHitbox",
      ]);

      player.play("attack", {
        onEnd: () => {
          resetPlayerToIdle(player);
          player.flipX = currentFlip;
        },
      });
      const strikePlay = play(strike, {
        volume: 1,
    })
    }
  }

  onKeyPress("space", () => {
    attack(player1, ["a", "d", "w"],"strike1");
    
  });

  onKeyRelease("space", () => {
    destroyAll(player1.id + "attackHitbox");
    
  });
  const player2 = makePlayer(1100, 100, 16, 42, 6, "player2");
  player2.use(sprite(player2.sprites.idle));
  player2.play("idle");
  player2.flipX = true;
  onKeyDown("right", () => {
    run(player2, 500, false);
  });
  onKeyRelease("right", () => {
    if (player2.health !== 0) {
      resetPlayerToIdle(player2);
      player2.flipX = false;
    }
  });

  onKeyDown("left", () => {
    run(player2, -500, true);
  });
  onKeyRelease("left", () => {
    if (player2.health !== 0) {
      resetPlayerToIdle(player2);
      player2.flipX = true;
    }
  });

  onKeyDown("up", () => {
    makeJump(player2);
  });

  player2.onUpdate(() => resetAfterJump(player2));

  onKeyPress("down", () => {
    attack(player2, ["left", "right", "up"],"strike2");
  });

  onKeyRelease("down", () => {
    destroyAll(player2.id + "attackHitbox");
  });

  const counter = add([
    rect(100, 80),
    pos(center().x - 43, center().y - 270),
    color(10, 10, 10),
    area(),
    anchor("center"),
  ]);

  const count = counter.add([
    text("60"),
    area(),
    anchor("center"),
    {
      timeLeft: 100,
    },
  ]);
  const winningContainer = add([
    rect(500, 80),
    color(0, 0, 0),
    opacity(0),
    area(),
    scale(2),
    anchor("center"),
    pos(center())
  ]);
  const winningText = winningContainer.add([
    text(""),
    area(),
    scale(1),
    anchor("center"),
    // pos(center()),
  ]);

  let gameOver = false;
  onKeyDown("enter", () => (gameOver ? go("fight") : null));


  function declareWinner(winningText, player1, player2) {
    winningContainer.opacity = 0.8;
    if (
      (player1.health > 0 && player2.health > 0) ||
      (player1.health === 0 && player2.health === 0)
    ) {
        
      winningText.text = "Tie!";
    } else if (player1.health > 0 && player2.health === 0) {
      winningText.text = `${worldState.player1} won!`;
      player2.use(sprite(player2.sprites.death));
      player2.play("death");
    } else {
      winningText.text = `${worldState.player2} won!`;
      player1.use(sprite(player1.sprites.death));
      player1.play("death");
    }
    setTimeout(() => {
        // winningContainer.opacity = 0;
        music.paused = true;
        go('start')
    }, 5000);
    
  }

  const countInterval = setInterval(() => {
    if (count.timeLeft === 0) {
      clearInterval(countInterval);
      declareWinner(winningText, player1, player2);
      gameOver = true;

      return;
    }
    count.timeLeft--;
    count.text = count.timeLeft;
  }, 1000);

  
  const player1HealthContainer = add([
    rect(500, 70),
    area(),
    outline(5),
    pos(90, 20),
    color(200, 0, 0),
  ]);

  const player1HealthBar = player1HealthContainer.add([
    rect(498, 65),
    color(0, 180, 0),
    pos(498, 70 - 2.5),
    rotate(180),
  ]);

  player1.onCollide(player2.id + "attackHitbox", () => {
    if (gameOver) {
      return;
    }

    if (player1.health !== 0) {
      player1.health -= 50;
      tween(
        player1HealthBar.width,
        player1.health,
        1,
        (val) => {
          player1HealthBar.width = val;
        },
        easings.easeOutSine
      );
    }

    if (player1.health === 0) {
      clearInterval(countInterval);
      declareWinner(winningText, player1, player2);
      gameOver = true;
    }
  });

  const player2HealthContainer = add([
    rect(500, 70),
    area(),
    outline(5),
    pos(690, 20),
    color(200, 0, 0),
  ]);

  const player2HealthBar = player2HealthContainer.add([
    rect(498, 65),
    color(0, 180, 0),
    pos(2.5, 2.5),
  ]);

  player2.onCollide(player1.id + "attackHitbox", () => {
    if (gameOver) {
      return;
    }

    if (player2.health !== 0) {
      player2.health -= 50;
      tween(
        player2HealthBar.width,
        player2.health,
        1,
        (val) => {
          player2HealthBar.width = val;
        },
        easings.easeOutSine
      );
    }

    if (player2.health === 0) {
      clearInterval(countInterval);
      declareWinner(winningText, player1, player2);
      gameOver = true;
    }
  });

}
