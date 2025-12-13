const table = document.getElementById("leaderboard");
let data = JSON.parse(localStorage.getItem("leaderboard")) || [];
data.sort((a,b)=>b.score-a.score);

data.forEach((u,i)=>{
  const r=document.createElement("tr");
  r.innerHTML=`<td>${i+1}</td><td>${u.name}</td><td>${u.score}</td>`;
  table.appendChild(r);
});
