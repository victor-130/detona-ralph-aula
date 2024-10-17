const state = {
    view:{
        squares: document.querySelectorAll(".square"),
        enemy: document.querySelector(".enemy"),
        timeleft: document.querySelector('#time-left'),
        score: document.querySelector('#score')
    },
    values:{

        gameVelocity: 1000,
        hitPositioin: 0,
        result: 0,
        currentTime: 60,
    },
    actions: {
        timerId: setInterval(randomSquare,1000),
        countDownTimerId: setInterval(countDown,1000),
    }
};

function playSound(audioName){
    let audio = new Audio(`./src/audios/${audioName}.m4a`)
    audio.volume = 0.2
    audio.play()

}

function countDown(){
    state.values.currentTime--
    state.view.timeleft.textContent = state.values.currentTime 

    if(state.values.currentTime <= 0){
        clearInterval(state.actions.countDownTimerId)
        clearInterval(state.actions.timerId)
        alert("game Over! O resultado foi "+state.values.result)
    }
}

function randomSquare(){
    state.view.squares.forEach((square) => {
        square.classList.remove('enemy')
    })

    let randomNumber = Math.floor(Math.random() * 9)
    let randomSquare = state.view.squares[randomNumber]

    randomSquare.classList.add("enemy")
    state.values.hitPositioin = randomSquare.id
}


function addListenerHitBox(){
    
    state.view.squares.forEach((squares) => {
        squares.addEventListener('mousedown', ()=> {
            if(squares.id === state.values.hitPositioin){
                state.values.result++
                state.view.score.textContent = state.values.result
                state.values.hitPositioin = null
                playSound('hit')
            }
        })
    })
}

function initialize(){
    addListenerHitBox()
    
}

initialize()