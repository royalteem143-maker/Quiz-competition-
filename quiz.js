if(!localStorage.getItem("name")){
  window.location.href = "./login.html";
}

/* ========= QUESTION BANK (already set by you) ========= */
const QUESTION_BANK = [ /* SAME questions you already added */ ];

/* ========= SECTION SPLIT ========= */
const GK = QUESTION_BANK.slice(0,10);
const MATHS = QUESTION_BANK.slice(10,20);
const REASONING = QUESTION_BANK.slice(20,30);

const SECTIONS = [
  {name:"GK Section", data:GK},
  {name:"Maths Section", data:MATHS},
  {name:"Reasoning Section", data:REASONING}
];

let sectionIndex = 0;
let qIndex = 0;
let score = 0;
let time = 10;
let timer;

const qEl = document.getElementById("question");
const oEl = document.getElementById("options");
const tEl = document.getElementById("timer");
const sEl = document.getElementById("sectionName");

function saveLeaderboard(){
  let data = JSON.parse(localStorage.getItem("leaderboard")) || [];
  data.push({ name: localStorage.getItem("name"), score });
  localStorage.setItem("leaderboard", JSON.stringify(data));
}

function showQuestion(){
  clearInterval(timer);

  if(sectionIndex >= SECTIONS.length){
    saveLeaderboard();
    localStorage.setItem("score", score);
    window.location.href = "./result.html";
    return;
  }

  const section = SECTIONS[sectionIndex];

  if(qIndex >= section.data.length){
    sectionIndex++;
    qIndex = 0;
    showQuestion();
    return;
  }

  sEl.innerText = section.name;

  const q = section.data[qIndex];
  qEl.innerText = `Q${qIndex+1}. ${q.q}`;
  oEl.innerHTML = "";

  q.o.forEach((opt, idx)=>{
    const btn = document.createElement("button");
    btn.className = "option-btn";
    btn.innerText = opt;
    btn.onclick = ()=>answer(idx);
    oEl.appendChild(btn);
  });

  time = 10;
  tEl.innerText = time;

  timer = setInterval(()=>{
    time--;
    tEl.innerText = time;
    if(time <= 0){
      qIndex++;
      showQuestion();
    }
  },1000);
}

function answer(idx){
  if(idx === SECTIONS[sectionIndex].data[qIndex].a){
    score++;
  }
  qIndex++;
  showQuestion();
}

showQuestion();
