let addExerciseInput = document.getElementById('add-exercise-input');
let ExerciseListContainer = document.getElementById('Exercise-admin-container');
document.getElementById("return-to-users").addEventListener("click",returnToUsers)
document.getElementById('add-exercise-btn').addEventListener('click', addExercise);

function CreateMyElement(tagName, textContent = "", className = "") {
  let element = document.createElement(tagName);
  element.textContent = textContent;
  className ? element.classList.add(className) : null;
  return element;
}



function showExercise() {
    ExerciseListContainer.innerHTML = '';
   
      fetch(`http://localhost:8000/exercices/${activeUser.id}`)
        .then(response => response.json())
        .then(Exercises => {
          if (Exercises.length === 0) {
            let phrase = CreateMyElement('h1',"No Exercises Found ","phrase")
            ExerciseListContainer.appendChild(phrase)
          }
          else {
          Exercises.forEach(Exercise => {
            let ExerciseElement = CreateMyElement('li');
            let ExerciseContent = CreateMyElement('span', Exercise.name, 'exercise-box');
            let deleteButton = CreateMyElement('button', 'Delete', 'delete-button');
            Exercise.state ?ExerciseElement.classList.add('completed'):ExerciseElement.classList.add('not-completed')
            deleteButton.addEventListener('click', () => deleteExercise(Exercise.id));
            deleteButton.innerHTML = "<i class='fa-solid fa-trash'></i>";
      
            ExerciseElement.appendChild(ExerciseContent);
            ExerciseElement.appendChild(deleteButton);
          
            ExerciseListContainer.appendChild(ExerciseElement);
      
          })};
        })
        .catch(error => {
          console.error(error);
        });
    
  }
  
  function addExercise() {
    let ExerciseDescription = addExerciseInput.value.trim();

    if (ExerciseDescription !== '' && activeUser) {
      fetch('http://localhost:8000/exercices', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          "name": ExerciseDescription,
          "userid": activeUser.id
        })
      })
      .then(response => response.json())
      .then(newExercise => {
        showExercise();
        addExerciseInput.value = '';
      })
      .catch(error => {
        console.error(error);
      });
    }
  }
  

  function deleteExercise(ExerciseId) {
    fetch(`http://localhost:8000/exercices/${ExerciseId}`, {
      method: 'DELETE'
    })
    .then(response => {
      if (response.status === 204) {
        showExercise();
      } else {
        throw new Error(`Failed to delete Exercise with ID ${ExerciseId}`);
      }
    })
    .catch(error => {
      console.error(error);
    });
  }
  

  function returnToUsers() {
    activeUser = null;
    let page1 = document.querySelector('#page1');
    let page2 = document.querySelector('#page2');
    page1.classList.remove('hidden');
    page2.classList.add('hidden');
    showUsers();
  }

