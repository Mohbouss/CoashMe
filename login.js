/* signup input declaration */
let SIgnUpUsernameInput =document.querySelector(".username-input")
let SIgnUpEmailInput =document.querySelector(".email-input")
let SIgnUpPassInput =document.querySelector(".password-input")

/* login input declaration */
let EmailInput=document.getElementById("email")
let PasswordInput = document.getElementById("password")
/* signup and login declaration */
let loginPage =document.querySelector("#login-page")
let signUpPage = document.querySelector("#signup-page")
/* button in the login page */
let LoginButton= document.querySelector('#login').addEventListener("click",login)
let sigUpButton=document.querySelector("#signup").addEventListener('click',() => toggleToSignUpPage()) 
/* button in the signup page */
let mainSignUpButton = document.querySelector(".submitBtn").addEventListener('click',()=> signup())

function toggleToSignUpPage(){
loginPage.classList.add('hidden')
signUpPage.classList.remove('hidden')
}

/* loginfunction */

function login(){
  
    let Email = EmailInput.value.trim();
    let Password = PasswordInput.value.trim();
  
    if (Email !== '' && Password!=="") {
      fetch('http://localhost:8000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          "email": Email,
          "password": Password
        })
      })
      .then(response => response.json())
      .then(newuser => {
        let page1 = document.querySelector('#page1');
        let page3 = document.querySelector('#page3');
        
        
         
       if (newuser.role == "coach")
        {
            page1.classList.remove('hidden');
            loginPage.classList.add("hidden")
            currentUser = newuser
            showUsers()
        
        }
        else if(newuser.role=="coachee"){
            page3.classList.remove('hidden');
            showExerciseUser(newuser.id)
            loginPage.classList.add("hidden")
        } 
        else {
            alert("Invalid credentials")
        }
       
        PasswordInput.value = '';
      })
      .catch(error => {
        console.error(error);
      });
    }
  }


/* signup function */
function signup(){
  let userName =SIgnUpUsernameInput.value.trim();
  let userEmail = SIgnUpEmailInput.value.trim();
  let userPass = SIgnUpPassInput.value.trim();

  if (userName !== '') {
    fetch('http://localhost:8000/coachs', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        "name": userName,  
        "email": userEmail,
        "password": userPass,
      })
    })
    .then(response => response.json())
    .then(newUser => {
     
      loginPage.classList.remove('hidden') 
      signUpPage.classList.add('hidden')
      
      AddUserInput.value = '';
      AddPassInput.value = '';
      AddEmailInput.value = '';
    })
    .catch(error => {
      console.error(error);
    });
  }

}