/* signup input declaration */
let SIgnUpUsernameInput = document.querySelector(".username-input")
let SIgnUpEmailInput = document.querySelector("#signup-email-input")
let SIgnUpPassInput = document.querySelector("#signup-password-input")

/* login input declaration */
let EmailInput = document.getElementById("email")
let PasswordInput = document.getElementById("password")
/* signup and login declaration */
let loginPage = document.querySelector("#login-page")
let signUpPage = document.querySelector("#signup-page")
/* button in the login page */
let LoginButton = document.querySelector('#login').addEventListener("click", login)
let sigUpButton = document.querySelector("#signup").addEventListener('click', () => toggleToSignUpPage())
let signInButton = document.querySelector("#sign-in").addEventListener('click', () => toggleToSignInPage())
/* button in the signup page */
let mainSignUpButton = document.querySelector("#second-signup").addEventListener('click', () => signup())

let currentUser = null;
function toggleToSignInPage() {
    loginPage.classList.remove('hidden')
    signUpPage.classList.add('hidden')
}

function toggleToSignUpPage() {
    loginPage.classList.add('hidden')
    signUpPage.classList.remove('hidden')
}

/* loginfunction */

function login() {

    let Email = EmailInput.value.trim();
    let Password = PasswordInput.value.trim();
    // let Email = "youssef@gmail.com"
    // let Password = "123"

    if (Email !== '' && Password !== "") {
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
            .then(newUser => {
                let page1 = document.querySelector('#page1');
                let page3 = document.querySelector('#page3');
                currentUser = newUser;

                if (newUser.role == "coach") {
                    page1.classList.remove('hidden');
                    loginPage.classList.add("hidden")
                    showUsers()

                } else if (newUser.role == "coachee") {
                    page3.classList.remove('hidden');
                    showExerciseUser(newUser.id)
                    loginPage.classList.add("hidden")
                } else {
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
function signup() {
    let userName = SIgnUpUsernameInput.value.trim();
    let userEmail = SIgnUpEmailInput.value.trim();
    let userPass = SIgnUpPassInput.value.trim();


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
                "role": "coach"
            })
        })
            .then(response => {
                if (response.status === 401) {
                    throw new Error('Unauthorized');


                }
                SIgnUpEmailInput.value = '';
                SIgnUpPassInput.value = '';
                SIgnUpUsernameInput.value = '';
                return response.json();
            })
            .then(newUser => {
                SIgnUpEmailInput.value = '';
                SIgnUpPassInput.value = '';
                SIgnUpUsernameInput.value = '';
                if (newUser.message) {
                    // Handle the error message
                } else {
                    page1.classList.remove('hidden');
                    signUpPage.classList.add("hidden");
                    currentUser = newUser;
                    showUsers();
                }
            })
            .catch(error => {
                if (error.message === 'Unauthorized') {
                    // Handle the unauthorized error
                    console.error('Unauthorized request');
                } else {
                    console.error(error.message);
                }
            });
    }
}
