let EmailInput=document.getElementById("email")
let PasswordInput = document.getElementById("password")
btnlogin=document.getElementById("login").addEventListener("click",login)
function login(){
  
    let Email = EmailInput.value.trim();
    let Password = PasswordInput.value.trim();
  
    console.log("button")
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
        current_user=newuser
        let page1 = document.querySelector('#page1');
        let page3 = document.querySelector('#page3');
        let LoginPage = document.querySelector('#login-page')
        
         header.textContent = current_user.name
       if (current_user.role == "coach")
        {
            page1.classList.remove('hidden');
            LoginPage.classList.add("hidden")

        }
        else if(current_user.role=="coachee"){
            page3.classList.remove('hidden');
            showExerciceuser(current_user.id)
            LoginPage.classList.add("hidden")
        } 
        else {
            alert("Invalid credentials")
        }
        EmailInput.value = '';
        PasswordInput.value = '';
      })
      .catch(error => {
        console.error(error);
      });
    }
  }