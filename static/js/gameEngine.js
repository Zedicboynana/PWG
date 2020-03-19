//add pidgin help dictionary
class ENGINE {
  constructor() {
    this.chapter = 0
    this.allQuestions = queBank
    this.answer = []
    this.question = []

    this.submitBtn = document.getElementById("submit");
    this.score = 0;
    this.coin = 0;
    this.streak = [];
    this.clickValue = "";
    this.btns = [
      document.getElementById("btn1"),
      document.getElementById("btn2"),
      document.getElementById("btn3"),
      document.getElementById("btn4"),
      document.getElementById("btn5"),
      document.getElementById("btn6"),
      document.getElementById("btn7"),
      document.getElementById("btn8"),
      document.getElementById("btn9"),
      document.getElementById("btn10"),
      document.getElementById("btn11"),
      document.getElementById("btn12"),
      document.getElementById("btn13"),
      document.getElementById("btn14")
    ];

    this.dom = {
      score: document.getElementById("score"),
      coin: document.getElementById("coin"),
      word: document.getElementById("word"),

      flip: function () {
        let flips = {
          first: document.getElementById("first"),
          firstDiv: document.getElementById("firstdiv"),
          second: document.getElementById("second"),
          secondDiv: document.getElementById("seconddiv")
        };

        let rand = Math.floor(Math.random() * 5);
        if (rand == 0) {
          flips.second.style.flexDirection = "column-reverse";
          flips.secondDiv.style.flexDirection = "row-reverse";
          flips.firstDiv.style.flexDirection = "row-reverse";
        }

        if (rand == 1) {
          flips.first.style.flexDirection = "column-reverse";
          flips.secondDiv.style.flexDirection = "row";
          flips.firstDiv.style.flexDirection = "row";
        }

        if (rand == 2) {
          flips.second.style.flexDirection = "column";
          flips.first.style.flexDirection = "column";
          flips.firstDiv.style.flexDirection = "row-reverse";
        }
      },

      onEnd: function () {
        let views = {
          option: document.getElementById("option"),
          g: document.getElementById("game"),
          sc: document.getElementById("sc"),
          co: document.getElementById("co"),
          resume: document.getElementById('resume'),
          optMsg: document.getElementById('optionMsg'),
          next: document.getElementById('next')
        };

        views.g.style.display = "none";
        views.option.style.display = "flex";
        views.sc.innerHTML = `Scores: ${app.score}`;
        views.co.innerHTML = `Coin: ${app.coin}`;
        views.optMsg.innerHTML = 'END OF CHAPTER'
        views.resume.style.display = 'none'
        views.next.style.display = 'block'
      },

      onWrong: function (app) {
        app.dom.word.innerHTML = "WRONG";
        app.dom.word.style.color = 'red'
        setTimeout(() => (app.dom.word.innerHTML = "",
          app.dom.word.style.color = 'white'), 500);
      },

      onRight: function (app) {
        app.dom.word.innerHTML = "CORRECT";
        app.dom.word.style.color = 'lightgreen'
        setTimeout(() => (app.dom.word.innerHTML = "",
          app.dom.word.style.color = 'white'), 500);
      }
    };
    this.gameLogic(this.chapter)
    this.load();
    this.pwa();
    //this.gameSound()
  }


  pwa() {
    //service worker
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker
        .register("/gameWorker.js")
        .then(function (reg) {
          //console.log("SW REGISTERED   --PWA RUNNING");
        })
        .catch(function (err) {
          console.error(err);
        });
    }
  }

  gameLogic(chap) {
    this.answer = this.allQuestions[chap][0]
    this.question = this.allQuestions[chap][1] 
  }

  load() {
    this.btns.map((btn, index) => {
      btn.innerHTML = this.question[index];
      btn.addEventListener("click", () => {
        this.clickValue += btn.innerHTML;
        //console.log(app.clickValue)
        this.dom.word.innerHTML = this.clickValue;
        //btns shuffles color and coin
        this.stealBtn(btn, index);
        this.dom.flip();
        //this.btnSound.play()
      });
    });
  }

  end() {
    if (this.streak.length === 14) {
      //if streak equals 10 --chapter one
      //if streak 
      console.log("end of chapter one");
      this.dom.onEnd();
      this.chapter += 1 
      this.streak.length = 0
      console.log(this.chapter)
      //console.log(this.streak)
      this.answer = this.allQuestions[this.chapter][0]
      this.question = this.allQuestions[this.chapter][1]
      console.log('answer', this.answer)
      console.log('question', this.question)
      this.gameLogic(this.chapter)
      let nextBtn = document.getElementById('next')
      nextBtn.addEventListener('click', () => {
        let game = document.getElementById('game')
        let opt = document.getElementById('option')
        opt.style.display = 'none'
        game.style.display = 'block'
      } )
    }
    
    else if (this.streak.length === 24) {
      console.log('end of chapter two')
      this.dom.onEnd();
      this.chapter += 1 
      this.streak.length = 0
      console.log(this.chapter)
      //console.log(this.streak)
      this.answer = this.allQuestions[this.chapter][0]
      this.question = this.allQuestions[this.chapter][1]
      console.log('answer', this.answer)
      console.log('question', this.question)
     this.gameLogic(this.chapter)
      let nextBtn = document.getElementById('next')
      nextBtn.addEventListener('click', () => {
        let game = document.getElementById('game')
        let opt = document.getElementById('option')
        opt.style.display = 'none'
        game.style.display = 'block'
      } )
    }
  }

  win(index) {
    this.answer[index] = undefined;
    this.streak.push(undefined);
    this.clickValue = "";
    //this.dom.word.innerHTML = this.clickValue;
    this.score = app.score + 1;
    this.dom.score.innerHTML = app.score;
    this.dom.onRight(this);
    this.dom.flip();
    this.end();
  }

  loss() {
    let v = undefined;
    this.streak.push(v);
    this.clickValue = "";
    this.dom.word.innerHTML = this.clickValue;
    this.dom.onWrong(this);
    this.dom.flip();
    this.end();
  }

  stealBtn(btn, index) {
    let r = Math.floor(Math.random() * 4);
    function alp(r) {
      let s = ["A", "E", "I", "G", "U"];
      return s[r];
    }

    if (this.score <= 6) {
      //console.log("one");
    }

    if (this.score > 6) {
      //console.log("two");
      btn.innerHTML = alp(r);
    }
  }

  gameSound() {
    this.btnSound = new Audio()
    this.btnSound.src = './static/song/tom.wav'
    this.btnSound.controls = false

    this.startSound = new Audio()
    this.startSound.src = './static/song/congas.wav'
    this.startSound.loop = true
    this.startSound.controls = false
    this.startSound.onended = function () {
      console.log('true true true')
    }
  }

  _clearTypo() {
    this.clickValue = "";
    this.dom.word.innerHTML = "";
    this.dom.flip()
  }

  _coin(c) {
    //console.log('gimme my coins now')
    let rand = Math.floor(Math.random() * this.answer.length) * 50;
    if (c == 4) {
      this.coin += 50 + rand;
    } else if (c == 5) {
      this.coin += 100 + rand;
    } else if (c == 3) {
      this.coin += 200 + rand;
    } else if (c == 7) {
      this.coin += 400 + rand;
    }

    this.dom.coin.innerHTML = this.coin;
  }

}


let app = new ENGINE();

app.submitBtn.addEventListener("click", () => {
  if (app.end()) {
    (() => {
      console.log("game ended");
      console.log("your stat");
      console.log("score:", app.score);
      console.log("answer", app.answer);
      app.clickValue = "";
      return false;
    })();
  } else {
    //console.log("playing");
    if (app.answer.includes(app.clickValue.toLocaleLowerCase())) {
      app.answer.map((value, index) => {
        if (value === app.clickValue.toLocaleLowerCase()) {
          app._coin(app.clickValue.length);
          app.win(index);
          //console.log("ans:", app.answer);
          //console.log("str:", app.streak);
        }
      });
    } else {
      app.loss();
      //console.log("ans:", app.answer);
      //console.log("str:", app.streak);
      return false;
    }
  }
});

let clearbtn = document.getElementById("clear");
clearbtn.addEventListener("click", () => {
  app._clearTypo();
});

let name = document.getElementById('name')
name.addEventListener('change', (e) => {
  e.target.value = ''
})

//window.addEventListener('DOMContentLoaded', () => app.startSound.play())
