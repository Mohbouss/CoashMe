
let SecondExerciseListContainer = document.getElementById("exercise-user-container");
let pageThreeTitle = document.querySelector('#page3-title');
function showExerciseUser(id) {
      pageThreeTitle.innerHTML = currentUser.name;
      fetch(`http://localhost:8000/exercices/${id}`)
        .then(response => response.json())
        .then(Exercises => {
          Exercises.forEach(Exercise => {
            let ExerciseElement = CreateMyElement("li");
            let ExerciseContent = CreateMyElement('span', Exercise.name, 'exercise-box');
            Exercise.state ? ExerciseElement.classList.add('completed'):ExerciseElement.classList.add('not-completed')
            ExerciseElement.addEventListener('click', () => taskDone(ExerciseElement,Exercise.id)) 
            ExerciseElement.appendChild(ExerciseContent);
           SecondExerciseListContainer.appendChild(ExerciseElement);
            
          });
        })
        .catch(error => {
          console.error(error);
        });
    }

function taskDone(ExerciseElement,id){
  if (ExerciseElement.classList.contains('not-completed')) {
    ExerciseElement.classList.remove('not-completed')
    ExerciseElement.classList.add('completed');
    update(true,id)
  } else {
    ExerciseElement.classList.remove("completed")
    ExerciseElement.classList.add('not-completed');
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
.then(newState => {

})
.catch(error => {
  console.error(error);
});

}
