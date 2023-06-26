
let SecondExerciceListContainer = document.getElementById('Exercice-user-container');
function showExerciceuser(id) {
      fetch(`http://localhost:8000/exercices/${id}`)
        .then(response => response.json())
        .then(Exercices => {
          Exercices.forEach(Exercice => {
            let ExerciceElement = CreateMyElement('li');
            let ExerciceContent = CreateMyElement('span', Exercice.name, 'Exercice-box');
            let deleteButton = CreateMyElement('button', 'Delete', 'delete-button');
            deleteButton.addEventListener('click', () => deleteExercice(Exercice.id));
            deleteButton.innerHTML = "<i class='fa-solid fa-trash'></i>";
            ExerciceElement.appendChild(ExerciceContent);
            ExerciceElement.appendChild(deleteButton);
           SecondExerciceListContainer.appendChild(ExerciceElement);
            
          });
        })
        .catch(error => {
          console.error(error);
        });
    }
  showExerciceuser(2)