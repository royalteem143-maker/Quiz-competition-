/* ===============================
   LOGIN CHECK
================================ */
if (!localStorage.getItem("name") || !localStorage.getItem("dob")) {
  window.location.href = "login.html";
}

/* ===============================
   QUESTION BANK (30 QUESTIONS)
   GK (Hard) | Maths (Easy) | Reasoning (Hard)
================================ */

const QUESTION_BANK = [

/* ===== GK : HARD (10) ===== */
{q:"Indian Constitution ka Preamble kis amendment se change hua?", o:["24th","42nd","44th","52nd"], a:1},
{q:"First General Election of India kab hua?", o:["1947","1950","1951-52","1955"], a:2},
{q:"Who was the first Indian Governor-General of India?", o:["Nehru","Rajagopalachari","Mountbatten","Rajendra Prasad"], a:1},
{q:"Which Article deals with National Emergency?", o:["352","356","360","370"], a:0},
{q:"CAG of India ki appointment kaun karta hai?", o:["PM","Parliament","President","Supreme Court"], a:2},
{q:"UNO Human Rights Declaration year?", o:["1945","1947","1948","1950"], a:2},
{q:"Green Revolution in India ka credit kisko diya jata hai?", o:["Norman Borlaug","M.S. Swaminathan","Kurien","Bhabha"], a:1},
{q:"Largest coalfield of India?", o:["Jharia","Raniganj","Bokaro","Talcher"], a:0},
{q:"Who wrote Hind Swaraj?", o:["Tilak","Gandhi","Nehru","Ambedkar"], a:1},
{q:"73rd Amendment relates to?", o:["Municipality","Panchayati Raj","Elections","Judiciary"], a:1},

/* ===== MATHS : EASY (10) ===== */
{q:"20 + 30 = ?", o:["40","50","60","70"], a:1},
{q:"15 × 4 = ?", o:["45","50","60","65"], a:2},
{q:"10% of 200 = ?", o:["10","15","20","25"], a:2},
{q:"√81 = ?", o:["7","8","9","10"], a:2},
{q:"50 − 25 = ?", o:["20","25","30","35"], a:1},
{q:"CP = 100, SP = 120, Profit % ?", o:["10%","15%","20%","25%"], a:2},
{q:"2² + 3² = ?", o:["10","11","12","13"], a:1},
{q:"Average of 6 & 10 ?", o:["6","7","8","9"], a:2},
{q:"LCM of 5 and 10 ?", o:["5","10","15","20"], a:1},
{q:"8 × 5 = ?", o:["30","35","40","45"], a:2},

/* ===== REASONING : HARD (10) ===== */
{q:"A is taller than B but shorter than C. Who is tallest?", o:["A","B","C","Cannot say"], a:2},
{q:"Odd one out: Pen, Pencil, Eraser, Book", o:["Pen","Pencil","Eraser","Book"], a:3},
{q:"Series: 3, 9, 27, ?", o:["54","81","72","90"], a:1},
{q:"If CAT = 24, then DOG = ?", o:["26","30","36","40"], a:1},
{q:"2, 6, 12, 20, ?", o:["28","30","32","36"], a:0},
{q:"Mirror of 2:45 will be?", o:["9:15","9:30","10:15","10:30"], a:0},
{q:"All roses are flowers. Some flowers are red. Then?", o:["All roses red","Some roses may be red","No rose red","None"], a:1},
{q:"B, E, H, K, ?", o:["L","M","N","O"], a:1},
{q:"Which word cannot be made from EXAMINATION?", o:["EXAM","NATION","TONE","AXIS"], a:3},
{q:"If INDIA = JOEJB then PAK = ?", o:["QBL","QAL","QAK","PBK"], a:0}
];

/* ===============================
   SECTION SPLIT
================================ */

const GK = QUESTION_BANK.slice(0,10);
const MATHS = QUESTION_BANK.slice(10,20);
const REASONING = QUESTION_BANK.slice(20,30);

const SECTIONS = [
  { name:"GK Section", data: GK },
  { name:"Maths Section", data: MATHS },
  { name:"Reasoning Section", data: REASONING }
];

/* ===============================
   QUIZ VARIABLES
================================ */

let sectionIndex = 0;
let qIndex = 0;
let score = 0;
let time = 10;
let timer;

const qEl = document.getElementById("question");
const oEl = document.getElementById("options");
const tEl = document.getElementById("timer");
const sEl = document.getElementById("sectionName");

/* ===============================
   SAVE LEADERBOARD
================================ */

function saveLeaderboard(){
  let data = JSON.parse(localStorage.getItem("leaderboard")) || [];

  data.push({
    name: localStorage.getItem("name"),
    dob: localStorage.getItem("dob"),
    score: score
  });

  localStorage.setItem("leaderboard", JSON.stringify(data));
}

/* ===============================
   SHOW QUESTION
================================ */

function showQuestion(){
  clearInterval(timer);

  if(sectionIndex >= SECTIONS.length){
    saveLeaderboard();
    localStorage.setItem("score", score);
    window.location.href = "result.html";
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
  qEl.innerText = `Q${qIndex + 1}. ${q.q}`;
  oEl.innerHTML = "";

  q.o.forEach((opt, idx) => {
    const btn = document.createElement("button");
    btn.className = "option-btn";
    btn.innerText = opt;
    btn.onclick = () => answer(idx);
    oEl.appendChild(btn);
  });

  time = 10;
  tEl.innerText = time;

  timer = setInterval(() => {
    time--;
    tEl.innerText = time;
    if(time <= 0){
      qIndex++;
      showQuestion();
    }
  }, 1000);
}

/* ===============================
   ANSWER HANDLER
================================ */

function answer(idx){
  if(idx === SECTIONS[sectionIndex].data[qIndex].a){
    score++;
  }
  qIndex++;
  showQuestion();
}

/* ===============================
   START QUIZ
================================ */

showQuestion();
