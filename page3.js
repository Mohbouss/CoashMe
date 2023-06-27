
let SecondExerciceListContainer = document.getElementById("exercice-user-container");
function showExerciseUser(id) {
      fetch(`http://localhost:8000/exercices/${id}`)
        .then(response => response.json())
        .then(Exercices => {
          Exercices.forEach(Exercice => {
            let ExerciceElement = CreateMyElement("li");
            let ExerciceContent = CreateMyElement('span', Exercice.name, 'exercice-box');
            ExerciceElement.appendChild(ExerciceContent);
           SecondExerciceListContainer.appendChild(ExerciceElement);
            
          });
        })
        .catch(error => {
          console.error(error);
        });
    }
  