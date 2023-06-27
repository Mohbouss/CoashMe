let EmailInput=document.getElementById("email")
let PasswordInput = document.getElementById("password")
document.getElementById("login").addEventListener("click",login)
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
        let LoginPage = document.querySelector('#login-page')
        
         header.textContent = newuser.name
       if (newuser.role == "coach")
        {
            page1.classList.remove('hidden');
            LoginPage.classList.add("hidden")

        }
        else if(newuser.role=="coachee"){
            page3.classList.remove('hidden');
            showExerciseUser(newuser.id)
            LoginPage.classList.add("hidden")
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