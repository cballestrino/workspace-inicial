let HTMLcontentToAppend = "";

//Oculta el cartel de "Funcionalidad en desarrollo":
let warningSign = document.getElementsByTagName("div")[3]
warningSign.hidden = true;

//Crear un div contenedor en el main del documento:
let largeContainerDIV = document.createElement("div");
document.getElementsByTagName("main")[0].appendChild(largeContainerDIV);
largeContainerDIV.setAttribute("id", "parent-container");
largeContainerDIV.className = 'container';

let emailUser = localStorage.getItem("myuser");

//Objeto en donde se guardan los datos del usuario:
let userData = { name: "", middlename: "", lastname: "", secondsurname: "", email: emailUser, phone: "", image: "" };

//Variable donde se guardan los datos obtenidos de localStorage que se van a mostrar en la página:
let updatedUserData = JSON.parse(localStorage.getItem("userData"));

if (emailUser == null) { //Condición para verificar que el usuario este logueado, en caso contrario aparece un cartel de advertencia:
    warningSign.hidden = false;
    document.getElementsByTagName("h4")[0].innerHTML = "Usted no puede ver esta página porque no está logueado. Por favor, logué su usuario para ingresar: " + `<a href="index.html">Loguear</a>`
} else if (updatedUserData == null) { //Condición para verificar que los datos almacenados en el localStorage no sean nulos. Caso contrario se almacena el objeto userData en el localStorage: 
    localStorage.setItem("userData", JSON.stringify(userData));
    window.location.href = "my-profile.html"
} else {
    HTMLcontentToAppend = `
        <div class="row ">
            <div class="col m-2 text-left">
                <h2>Perfil</h2>
            </div>

            <div class="col mx-auto text-left m-1">
                <img id="profilePicturePreview" src="img/img_perfil.png" class="rounded float-end w-25 border" alt="Imagen de perfil"> 
            </div>

            <hr>

            <div class="row m-2 mx-auto">
                <form  id="formID" action="" method="post" novalidate>
                    <div class="row">
                        <div class="container col">
                            <label for="nameInput">Primer nombre*:</label>
                            <br>
                            <input id="nameInput" class="form-control" type="text" name="name" value="${updatedUserData.name}"  aria-label="default input" required>
                        </div>
                        <br>

                        <div class="col">
                            <label for="middleNameInput">Segundo nombre:</label>
                            <br>
                            <input id="middleNameInput" class="form-control" type="text" name="middlename" value="${updatedUserData.middlename}" aria-label="default input">
                        </div>
                    </div>
                    <br>

                    <div class="row">
                        <div class="col">
                            <label for="lastNameInput">Primer apellido*:</label>
                            <br>
                            <input id="lastNameInput" class="form-control" type="text" name="lastname" value="${updatedUserData.lastname}" aria-label="default input" required>
                        </div>
                        <br>

                        <div class="col">
                            <label for="secondSurnameInput">Segundo apellido:</label>
                            <br>
                            <input id="secondSurnameInput" class="form-control" type="text" name="secondsurname" value="${updatedUserData.secondsurname}" aria-label="default input">
                        </div>
                    </div>
                    <br>

                    <div class="row">
                        <div class="col">
                            <label for="emailInput">E-mail*:</label>
                            <br>
                            <input id="emailInput" class="form-control" type="email" name="email" value=${userData.email} aria-label="default input" required>
                        </div>
                        <br>

                        <div class="col">
                            <label for="profilePicture" class="form-label">Imagen de perfil:</label>
                            <br>
                            <input id="profilePicture" type="file" class="form-control" size="30">
                        </div>
                    </div>
                    <br>

                    <div class="row">
                        <div class="col">
                            <label for="phoneInput">Teléfono de contacto:</label>
                            <br>
                            <input id="phoneInput" class="form-control w-50" type="tel" name="phone" value="${updatedUserData.phone}" aria-label="default input">

                            <div class="col" size"30" ></div>
                            
                        </div>
                    </div>

                    <hr class="mt-5">
                    <div class="col">
                        <input type="submit" id="submitButton" class="btn btn-primary" value="Guardar cambios" />
                    </div>
                </form>
            </div>

        </div>
    `
    largeContainerDIV.innerHTML = HTMLcontentToAppend;

    //Variables donde se guardan elementos del documento HTML:
    let submitForm = document.forms["formID"];
    let nameVar = document.getElementById("nameInput");
    let lastnameVar = document.getElementById("lastNameInput");
    let emailVar = document.getElementById("emailInput")
    let phoneVar = document.getElementById("phoneInput");

    //Evento para guardar la imagen de perfil:
    document.querySelector("#profilePicture").addEventListener("change", function () {
        let reader = new FileReader();

        reader.addEventListener("load", () => {
            localStorage.setItem("savedProfilePicture", reader.result);
        });
        reader.readAsDataURL(this.files[0]);
    });

    //Evento para mostrar la imagen de perfil:
    document.addEventListener("DOMContentLoaded", () => {
        let profilePictureURLvar = localStorage.getItem("savedProfilePicture");
        if (profilePictureURLvar) {
            document.querySelector("#profilePicturePreview").setAttribute("src", profilePictureURLvar)
        };
    });


    //Evento Submit, validación y almacenamiento en el localStorage:
    submitForm.addEventListener("submit", (e) => {

        //Validación de los input: "name", email y lastname:
        if (submitForm.name.validity.valueMissing) {
            submitForm.name.setCustomValidity('¡El campo no puede estar vacio!');
            submitForm.name.reportValidity();
            e.preventDefault();
        } else if (submitForm.lastname.validity.valueMissing) {
            submitForm.lastname.setCustomValidity('¡El campo no puede estar vacio!');
            submitForm.lastname.reportValidity();
            e.preventDefault();
        } else if (submitForm.email.validity.valueMissing) {
            submitForm.email.setCustomValidity('¡El campo no puede estar vacio!');
            submitForm.email.reportValidity();

            console.log("Prueba3");
            e.preventDefault();
        } else {
            //Se guardan los datos en la "base de datos del usuario":
            userData.name = nameVar.value
            userData.middlename = document.getElementById("middleNameInput").value
            userData.lastname = lastnameVar.value
            userData.secondsurname = document.getElementById("secondSurnameInput").value
            userData.email = emailVar.value
            userData.phone = phoneVar.value
            localStorage.setItem("userData", JSON.stringify(userData));
        }
    });
};