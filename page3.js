
let SecondExerciceListContainer = document.getElementById("exercice-user-container");
function showExerciseUser(id) {
      fetch(`http://localhost:8000/exercices/${id}`)
        .then(response => response.json())
        .then(Exercices => {
          Exercices.forEach(Exercice => {
            let ExerciceElement = CreateMyElement("li");
            let ExerciceContent = CreateMyElement('span', Exercice.name, 'exercice-box');
            Exercice.state ? ExerciceElement.classList.add('completed'):ExerciceElement.classList.add('incompleted')
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
  if (ExerciceElement.classList.contains('incompleted')) {
    ExerciceElement.classList.remove('incompleted')
    ExerciceElement.classList.add('completed');
    update(true,id)
  } else {
    ExerciceElement.classList.remove("completed")
    ExerciceElement.classList.add('incompleted');
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