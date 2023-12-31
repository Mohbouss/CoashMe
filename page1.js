/* creation Trainee inputs */
let AddUserInput = document.getElementById('add-user-input');
let UserListContainer = document.getElementById('user-container');
let AddEmailInput =document.getElementById("add-email-input")
let AddPassInput =document.getElementById("add-password-input")
/* header of the page */
let pageOneTitle = document.querySelector('#page1-title');
let pageTwoTitle = document.querySelector('#page2-title');
let activeUser = null;
/* pages */
let page1 = document.querySelector('#page1');
let page2 = document.querySelector('#page2');
let page3 = document.querySelector('#page3');

document.querySelector('#add-user-btn').addEventListener("click",addUser);
/* logout button functionality implementation */
document.querySelectorAll('.logout').forEach(el => {
  el.addEventListener('click',function (e) {
        EmailInput.value=""
        page1.classList.add('hidden')
        page2.classList.add('hidden')
        page3.classList.add('hidden')
        loginPage.classList.remove('hidden')
  });
});




function CreateMyElement(tagName, textContent = "", className = "") {
  let element = document.createElement(tagName);
  element.textContent = textContent;
  className ? element.classList.add(className) : null;
  return element;
}

function showUsers() {
  UserListContainer.innerHTML = '';
  pageOneTitle.innerHTML = currentUser.name;

  fetch(`http://localhost:8000/users/${currentUser.id}`)
    .then(response => response.json())
  
    .then(users => {
       if (users.message){
      let phrase = CreateMyElement('h1',"No Members Found ","phrase")
      UserListContainer.appendChild(phrase)
     }
     else{ 
      UserListContainer.innerHTML = ''
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
      })};
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
        "email": userEmail,
        "password": userPass,
        "role":"coachee",
        "coachId":currentUser.id
      })
    })
    .then(response => response.json())
    .then(newUser => {
      if (newUser.message){
        window.alert('this user already exist')
        UserListContainer.appendChild(phrase)}
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
      if (activeUser && activeUser.id === userId) {
        activeUser = null;
        showUsers();
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
      pageTwoTitle.innerHTML = activeUser.name
      
      showExercise();
    })
    .catch(error => {
      console.error(error);
    });
}



