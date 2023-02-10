
document.getElementsByTagName("div")[1].remove();

document.getElementsByTagName("div")[0].innerHTML = `
    <form id="form1" class="signin text-center" action="">
        <!-- Img and title-->
        <img src="img/login.png"  width="100%">
        <h4 class="fw-bold text-center">Inicio de sesión</h4>

        <!-- Login -->
        <div class="mb-4">
            <label for="email" class="form-label">Email</label>
            <input id="inputEmail" type="email" class="form-control" placeholder="Email">
            <p id="idEmailErrorMessage" hidden>Ingresa tu e-mail</p>  
        </div>

        <div class="mb-4">
            <label for="password" class="form-label">Contraseña</label>
            <input id="inputPasword" type="password" class="form-control" placeholder="Contraseña">
            <p id="idPasswordErrorMessage" hidden>Ingresa tu contraseña</p>         
        </div>

        <!--Submit button-->
        <button id="submitButton" class="btn btn-primary" type="submit">Ingresa</button>
    </form>
        `




document.getElementById("form1").addEventListener('submit', e => {
    let email = document.getElementById("inputEmail");
    let password = document.getElementById("inputPasword");

    if (email.value.length === 0 || password.value.length === 0){
        
        if (email.value.length === 0){             
            e.preventDefault();                        
            email.style.borderColor = 'red';
            let emailErrorMessage = document.getElementById("idEmailErrorMessage");
            emailErrorMessage.hidden= false;
            emailErrorMessage.style.color = "red";
        }

        if(password.value.length === 0){            
            e.preventDefault(); 
            password.style.borderColor = 'red';
            let passwordErrorMessage = document.getElementById("idPasswordErrorMessage")
            passwordErrorMessage.hidden= false;
            passwordErrorMessage.style.color = "red";          
        }
    }else{
            e.preventDefault();
            window.location.href = 'home.html';
         };   

    /* Variable con el valor del input e-mail*/
    let infoUser = document.getElementById("inputEmail").value

    /*Guardado de la variable como item  en el localStorage con nombre "myuser*/ 
    localStorage.setItem("myuser", JSON.stringify(infoUser));
}); 


