const board = document.getElementById("board");
let data = JSON.parse(localStorage.getItem("leaderboard")) || [];

// score high to low
data.sort((a,b)=>b.score - a.score);

data.forEach((u,i)=>{
  const tr = document.createElement("tr");
  tr.innerHTML = `
    <td>${i+1}</td>
    <td>${u.name}</td>
    <td>${u.dob}</td>
    <td>${u.score}</td>
  `;
  board.appendChild(tr);
});
