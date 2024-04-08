kaboom({
    backgroundAudio: true,
    background: [0, 0, 0]
    
})

// setBackground(Color.fromHex('#FFFFFF'))

loadAssets();
scene('start',(worldState)=>setStart(worldState))
scene('player1',(worldState)=>startPlayer1(worldState))
scene('player2',(worldState)=>startPlayer2(worldState))
scene('fight',(worldState)=>setBattle(worldState))

// const setPause=(play)=>{if(play){backgroundMusic.paused=false}else{backgroundMusic.paused=true}}

go('start',{player1:'',player2:''})