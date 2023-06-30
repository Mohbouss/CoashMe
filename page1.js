let AddUserInput = document.getElementById('add-user-input');
let UserListContainer = document.getElementById('user-container');
let AddEmailInput =document.getElementById("add-email-input")
let AddPassInput =document.getElementById("add-password-input")
document.getElementById('add-user-btn').addEventListener("click",addUser);
document.querySelectorAll('.logout').forEach(el => {
  el.addEventListener('click',function (e) {
     location.reload();
  });
});
let header = document.querySelector('#page2 header');
let activeUser = null;


function CreateMyElement(tagName, textContent = "", className = "") {
  let element = document.createElement(tagName);
  element.textContent = textContent;
  className ? element.classList.add(className) : null;
  return element;
}

function showUsers() {
  UserListContainer.innerHTML = '';

  fetch('http://localhost:8000/users')
    .then(response => response.json())
    .then(users => {
      users.forEach(user => {
        let userElement = CreateMyElement('li');
        let userContent = CreateMyElement('span', user.name, 'users-box');
        let deleteButton = CreateMyElement('button', "", 'delete-button');
        deleteButton.innerHTML = "<i class='fa-solid fa-trash'></i>";
        deleteButton.addEventListener('click', () => deleteUser(user.id));
        userContent.addEventListener('click', () => toggleDivs(user.id));

        userElement.appendChild(userContent);
        userElement.appendChild(deleteButton);
        UserListContainer.appendChild(userElement);
      });
    })
    .catch(error => {
      console.error(error);
    });
}
function addUser(){
  
  let userName = AddUserInput.value.trim();
  let userEmail = AddEmailInput.value.trim();
  let userPass = AddPassInput.value.trim();

  if (userName !== '') {
    fetch('http://localhost:8000/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        "name": userName,
        "role" :"coachee",
        "email": userEmail,
        "password": userPass
      })
    })
    .then(response => response.json())
    .then(newUser => {
      showUsers();
      AddUserInput.value = '';
      AddPassInput.value = '';
      AddEmailInput.value = '';
    })
    .catch(error => {
      console.error(error);
    });
  }
}
function deleteUser(userId) {
  fetch(`http://localhost:8000/users/${userId}`, {
    method: 'DELETE'
  })
  .then(response => {
    if (response.status === 204) {
      showUsers();
      if (activeUser && activeUser.id === userid) {
        activeUser = null;
        showTask();
      }
    } else {
      throw new Error(`Failed to delete user with ID ${userId}`);
    }
  })
  .catch(error => {
    console.error(error);
  });
}
function toggleDivs(userId) {
  fetch(`http://localhost:8000/user/${userId}`)
    .then(response => response.json())
    .then(user => {
      activeUser = user;
      let page1 = document.querySelector('#page1');
      let page2 = document.querySelector('#page2');
      page1.classList.add('hidden');
      page2.classList.remove('hidden');
      header.textContent = activeUser.name
      
      showExercice();
    })
    .catch(error => {
      console.error(error);
    });
}

showUsers();