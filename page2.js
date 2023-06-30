let addExerciceInput = document.getElementById('add-exercice-input');
let ExerciceListContainer = document.getElementById('Exercice-admin-container');
 document.getElementById("return-to-users").addEventListener("click",returnToUsers)
document.getElementById('add-exercice-btn').addEventListener('click', addExercice);

function CreateMyElement(tagName, textContent = "", className = "") {
  let element = document.createElement(tagName);
  element.textContent = textContent;
  className ? element.classList.add(className) : null;
  return element;
}



function showExercice() {
    ExerciceListContainer.innerHTML = '';
    if (activeUser) {
      fetch(`http://localhost:8000/exercices/${activeUser.id}`)
        .then(response => response.json())
        .then(Exercices => {
          Exercices.forEach(Exercice => {
            let ExerciceElement = CreateMyElement('li');
            let ExerciceContent = CreateMyElement('span', Exercice.name, 'exercice-box');
            let deleteButton = CreateMyElement('button', 'Delete', 'delete-button');
            Exercice.state ? ExerciceElement.style.background = 'green':ExerciceElement.style.background==='rgb(255, 255, 255)'
            deleteButton.addEventListener('click', () => deleteExercice(Exercice.id));
            deleteButton.innerHTML = "<i class='fa-solid fa-trash'></i>";
      
            ExerciceElement.appendChild(ExerciceContent);
            ExerciceElement.appendChild(deleteButton);
          
            ExerciceListContainer.appendChild(ExerciceElement);
      
          });
        })
        .catch(error => {
          console.error(error);
        });
    }
  }
  
  function addExercice() {
    let ExerciceDescription = addExerciceInput.value.trim();

    if (ExerciceDescription !== '' && activeUser) {
      fetch('http://localhost:8000/exercice', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          "name": ExerciceDescription,
          "userid": activeUser.id
        })
      })
      .then(response => response.json())
      .then(newExercice => {
        showExercice();
        addExerciceInput.value = '';
      })
      .catch(error => {
        console.error(error);
      });
    }
  }
  
  function deleteExercice(ExerciceId) {
    fetch(`http://localhost:8000/exercice/${ExerciceId}`, {
      method: 'DELETE'
    })
    .then(response => {
      if (response.status === 204) {
        showExercice();
      } else {
        throw new Error(`Failed to delete Exercice with ID ${ExerciceId}`);
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

