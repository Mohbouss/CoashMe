
let SecondExerciceListContainer = document.getElementById("exercice-user-container");
function showExerciseUser(id) {
      fetch(`http://localhost:8000/exercices/${id}`)
        .then(response => response.json())
        .then(Exercices => {
          Exercices.forEach(Exercice => {
            let ExerciceElement = CreateMyElement("li");
            let ExerciceContent = CreateMyElement('span', Exercice.name, 'exercice-box');
            Exercice.state ? ExerciceElement.style.background = 'green':ExerciceElement.style.background='rgb(242,242,242)'
            ExerciceElement.addEventListener('click', () => tskdone(ExerciceElement,Exercice.id)) 
            ExerciceElement.appendChild(ExerciceContent);
           SecondExerciceListContainer.appendChild(ExerciceElement);
            
          });
        })
        .catch(error => {
          console.error(error);
        });
    }

function tskdone(ExerciceElement,id){
  if (ExerciceElement.style.background == 'rgb(242, 242, 242)') {
    ExerciceElement.style.background = 'rgb(50, 205, 50)';
    update(true,id)
  } else {
    ExerciceElement.style.background = 'rgb(242, 242, 242)';
    update(false,id)
  }
}
function update(state,id)
{
  fetch(`http://localhost:8000/exercices/${id}`, {
  method: 'PUT',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    "state": state
  })
})
.then(response => response.json())
.then(newstate => {

})
.catch(error => {
  console.error(error);
});

}