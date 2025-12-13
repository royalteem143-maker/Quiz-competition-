if(!localStorage.getItem("name")){
  location.href="login.html";
}

const allQuestions = [
 {q:"2 + 2 = ?", o:["2","3","4","5"], a:2},
 {q:"India capital?", o:["Delhi","Mumbai","Kolkata","Chennai"], a:0},
 {q:"5 × 2 = ?", o:["5","7","10","12"], a:2},
 {q:"Sun rises from?", o:["North","South","East","West"], a:2},
 {q:"10 ÷ 2 = ?", o:["2","5","10","20"], a:1}
];

// 🔀 shuffle
const questions = allQuestions.sort(()=>0.5 - Math.random()).slice(0,3);

let index = 0;
let score = 0;
let time = 10;
let timer;

const qBox = document.getElementById("question");
const optBox = document.getElementById("options");
const timerBox = document.getElementById("timer");

function showQuestion(){
  clearInterval(timer);
  time = 10;
  timerBox.innerText = time;

  const q = questions[index];
  qBox.innerText = q.q;
  optBox.innerHTML = "";

  q.o.forEach((opt,i)=>{
    const btn = document.createElement("button");
    btn.innerText = opt;
    btn.className = "option-btn";
    btn.onclick = ()=>answer(i);
    optBox.appendChild(btn);
  });

  timer = setInterval(()=>{
    time--;
    timerBox.innerText = time;
    if(time<=0){
      next();
    }
  },1000);
}

function answer(i){
  if(i === questions[index].a) score++;
  next();
}

function next(){
  clearInterval(timer);
  index++;
  if(index < questions.length){
    showQuestion();
  }else{
    localStorage.setItem("score", score);
    location.href="result.html";
  }
}

showQuestion();
