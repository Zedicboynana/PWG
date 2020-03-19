let splash = document.getElementById('splash')
let option = document.getElementById('option')
let game = document.getElementById('game')
let menuBtn = document.getElementById('menu')

let resumeBtn = document.getElementById('resume')
let resBtn = document.getElementById('restart')
let quitBtn = document.getElementById('quit')

resBtn.addEventListener('click', () => location.reload())
quitBtn.addEventListener('click', ()=> location.reload())

let optionMsg = document.getElementById('optionMsg')
let optionOpened = false
splash.style.display = 'flex'

let playGuess = document.getElementById('play-guess')
playGuess.addEventListener('click', () => {
    setTimeout(() => {
        splash.classList.add('splash-out')
        splash.style.display = 'none'
        game.style.display = 'block'
        game.classList.add('splash-in')
}, 300)
})



if (!optionOpened) {
    menuBtn.addEventListener('click', () => {
        //console.log(app)
        option.style.display = 'flex'
        game.classList.add('splash-out')
        game.style.display = 'none'
        optionMsg.innerHTML = 'PAUSED'
        optionMsg.classList.add('ani-splash')
       
        optionOpened = true
        if (optionOpened) {
            resumeBtn.addEventListener('click', () => {
                if (app.answer.length === app.streak.length) {
                    console.log('game have ended')
                }
                option.style.display = 'none'
                game.style.display = 'block'
                optionOpened = false
                game.classList.add('splash-out')
            })
        }
    })
} 

