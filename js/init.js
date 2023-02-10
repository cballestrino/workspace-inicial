const CATEGORIES_URL = "https://japceibal.github.io/emercado-api/cats/cat.json";
// const CATEGORIES_URL = "http://127.0.0.1:3000/cats";

const PUBLISH_PRODUCT_URL = "https://japceibal.github.io/emercado-api/sell/publish.json";
// const PUBLISH_PRODUCT_URL = "http://127.0.0.1:3000/sell";

const PRODUCTS_URL = "https://japceibal.github.io/emercado-api/cats_products/";
// const PRODUCTS_URL = "http://127.0.0.1:3000/cats_products/";

const PRODUCT_INFO_URL = "https://japceibal.github.io/emercado-api/products/";
// const PRODUCT_INFO_URL = "http://127.0.0.1:3000/products/";

const PRODUCT_INFO_COMMENTS_URL = "https://japceibal.github.io/emercado-api/products_comments/";
// const PRODUCT_INFO_COMMENTS_URL = "http://127.0.0.1:3000/products_comments/";

const CART_INFO_URL = "https://japceibal.github.io/emercado-api/user_cart/";
// const CART_INFO_URL = "http://127.0.0.1:3000/user_cart/";

const CART_BUY_URL = "https://japceibal.github.io/emercado-api/cart/buy.json";
// const CART_BUY_URL = "http://127.0.0.1:3000/cart";

const EXT_TYPE = ".json";

let showSpinner = function(){
  document.getElementById("spinner-wrapper").style.display = "block";
}

let hideSpinner = function(){
  document.getElementById("spinner-wrapper").style.display = "none";
}

let getJSONData = function(url){
    let result = {};
    showSpinner();
    return fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      }else{
        throw Error(response.statusText);
      }
    })
    .then(function(response) {
          result.status = 'ok';
          result.data = response;
          hideSpinner();
          return result;
    })
    .catch(function(error) {
        result.status = 'error';
        result.data = error;
        hideSpinner();
        return result;
    });
}



    /*Se obtiene el item del localStorage (los datos ingresados del usuario) y se guarda en una variable*/
let valueUser = JSON.parse(localStorage.getItem("myuser"));

  /* Agrega el valor del usuario (su e-mail) en el navbar, obteniendo la id de un div contenedor y el 4to elemento de la lista */
let myuser = document.getElementById("navbarNav")



//Agrega el dropdown al navbar:
myuser.getElementsByTagName("li")[3].innerHTML = `
<div class="dropdown">
  <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
  ${valueUser}
  </button>
  <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
    <li><a class="dropdown-item" href="cart.html">Mi carrito</a></li>
    <li><a class="dropdown-item" href="my-profile.html">Mi perfil </a></li>
    <li ><a id="logoutID" class="dropdown-item" href="#">Cerrar sesión</a></li>
  </ul>
</div>
`
document.getElementById("logoutID").addEventListener("click", ()=>{
      localStorage.removeItem("myuser");
      window.location.href = "index.html"
});

  // Modifica un atributo del 1er anchor para que el usuario al cliquear "inicio" sea redirigido al homepage del sitio (Ésto no corresponde a la Entrega 2):
myuser.getElementsByTagName("a")[0].setAttribute("href", "home.html");


