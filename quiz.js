const name = localStorage.getItem("studentName");

if (!name) {
  window.location.href = "login.html";
}

document.getElementById("student").innerText =
  "Student: " + name;

function submitQuiz() {
  let score = 0;

  const q1 = document.querySelector('input[name="q1"]:checked');
  const q2 = document.querySelector('input[name="q2"]:checked');

  if (q1) score += parseInt(q1.value);
  if (q2) score += parseInt(q2.value);

  localStorage.setItem("score", score);
  window.location.href = "result.html";
}
