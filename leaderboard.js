function loadCSV(){
  let url = document.getElementById('csv').value;
  fetch(url).then(r=>r.text()).then(t=>{
    document.getElementById('out').textContent=t;
  });
}