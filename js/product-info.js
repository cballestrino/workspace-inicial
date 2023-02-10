// Constante en donde se guarda la URL de la API (guardada en la constante PRODUCT_INFO_URL) más el ID guardado en el locarlStorage.
const PRODUCTS_API = PRODUCT_INFO_URL + localStorage.getItem("selectedProduct") + EXT_TYPE;

//Imprime la URL de la API en la consola (Entrega 8: Mostrar la dir. del localhost donde están los datos)
console.log(PRODUCTS_API);
console.log(PRODUCT_INFO_COMMENTS_URL);


// Remoción del div que contiene al cartel de "Funcionalidad en desarrollo":
document.getElementsByTagName("div")[3].remove();

//Creación de un <div> que funciona como el contenedor principal de los elementos de product-info.html:
let main = document.getElementsByTagName("main")[0];
let parentContainerDiv = document.createElement("div");
main.appendChild(parentContainerDiv);
parentContainerDiv.setAttribute("id", "parentContainerDiv");
parentContainerDiv.className = "container row mx-auto";

// Div contenedor de los elementos que muestran a los productos relacionados:
let relatedProductsDiv = document.createElement("div"); 
main.appendChild(relatedProductsDiv); 
relatedProductsDiv.setAttribute("id", "relatedProductsDiv");
relatedProductsDiv.className = "container row mx-auto"


// Variablas donde se guardan los elementos que se mostraran en la página:
let itemInformationToAppend = ``

let commentsToAppend = `
    <div class="container">
        <h4>Comentarios</h4>
    </div>        
    `;

let commentFormToAppend = ''

let internalEelatedProductElements = ``

let relatedProductsToAppend = ``;

let carouselToAppend = ''

// Función para guardar la ID del producto relacionado y redirigir a la página de product-info.html con los nuevos datos solicitados:
function selectProduct(id){
    document.addEventListener("click",()=> {
        localStorage.setItem("selectedProduct", id)
        window.location = "product-info.html"
    });
};

// Petición de los datos del artículo a la API mediante el getJSONData y creación de los elementos que se van a mostrar en la página:
getJSONData(PRODUCTS_API).then(function (resultObj) {
    if (resultObj.status === "ok") {
        console.log(resultObj.data);      
    }

    // Creación de los elementos que se van a mostrar en la página con los datos optenidos de la API (datos del artículo):
    for (i=1; i < resultObj.data.images.length; i++){
        carouselToAppend += `
        <div class="carousel-item">
            <img src="${resultObj.data.images[i]}" class="d-block w-100">
        </div>
        `
    };

    
    
    itemInformationToAppend = `
        <div class="list-group-item list-group-item-action container mx-auto border-0 " >
            <div class="row">
                    <div class="col m-4">
                        <h2 class="mb-4">${resultObj.data.name}</h2> 
                        
                        <hr>
                        <div>
                            <h5 class="mb-1"><b>Precios: </b></h5> 
                            <p class="mb-1">${resultObj.data.currency} ${resultObj.data.cost} </p>
                        </div>
                        <br>
                        <div>
                            <h5 class="mb-1"><b>Descripción: </b></h5>
                            <p class="mb-1">${resultObj.data.description}</p>
                        </div>
                        <br>
                        <div>
                            <h5 class="mb-1"><b>Categoría: </b></h5>
                            <p class="mb-1">${resultObj.data.category}</p>
                        </div>
                        <br>
                        <div>
                            <h5 class="mb-1"><b>Cantidad vendidos: </b></h5>
                            <small class="text-muted">${resultObj.data.soldCount} artículos</small>
                        </div>
                        <br>
                        <div class="col">
                            <h5 class="mb-1"><b>Imágenes ilustrativas: </b></h5>

                            <div id="carouselExampleIndicators" class="carousel slide mx-auto w-50 carousel-dark slide" data-bs-ride="carousel">
                                <div class="carousel-indicators">
                                    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" class="active primary" aria-current="true" aria-label="Slide 1"></button>
                                    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
                                    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
                                    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="3" aria-label="Slide 4"></button>
                                </div>

                                <div class="carousel-inner">
                                <div class="carousel-item active">
                                    <img src="${resultObj.data.images[0]}" class="d-block w-100" alt="...">
                                </div>
                                
                                ${carouselToAppend}

                                <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
                                    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                                    <span class="visually-hidden">Previous</span>
                                </button>
                                <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
                                    <span class="carousel-control-next-icon" aria-hidden="true"></span>
                                    <span class="visually-hidden">Next</span>
                                </button>
                          </div>

                        </div>                       
                    </div>
            </div>
        </div> 
            `
    parentContainerDiv.innerHTML = itemInformationToAppend 
    
    

    // Petición a la API con los datos de los "comentarios" y creación de los elementos que van a mostrar los datos en la página:
    getJSONData(PRODUCT_INFO_COMMENTS_URL + localStorage.getItem("selectedProduct") + EXT_TYPE).then(function (resultObj) {
        if (resultObj.status === "ok") {
            console.log(resultObj.data);      
        };

        //Función que muestra la puntuación en forma de estrella (haciendo uso del método "repeat()"): 
        function showRatingStars(ratingNumber){
            let ratingStarsToAppendChecked = `<span class="fa fa-star checked"></span>`;
            let ratingStarsToAppendNotChecked = `<span class="fa fa-star"></span>`;
            let uncheckedStars = 5 - ratingNumber ;
            if (ratingNumber > 0){
                return ratingStarsToAppendChecked.repeat(ratingNumber) + ratingStarsToAppendNotChecked.repeat(uncheckedStars);
            }else{
                return ratingStarsToAppendNotChecked.repeat(5)
            };
        };

        // Elementos que muestran la caja de comentarios en la página: 
        for (let i=0; i < resultObj.data.length; i++){ 
            commentsToAppend += `
                <div class="container m-0 mx-auto border" style="width 75% bg-dark">
                    <p class="m-1"><strong>${resultObj.data[i].user}</strong> - ${resultObj.data[i].dateTime} - ${showRatingStars(resultObj.data[i].score)}</p>
                    <p class="m-1">${resultObj.data[i].description}</p>
                </div>  
                `                  
        };

        parentContainerDiv.innerHTML = itemInformationToAppend + commentsToAppend

        // Elementos del formulario "comentar" y evento submit:
        commentFormToAppend += `
        <div>

            <div class="m-2">
                <h4>Comentar</h4>
            </div>
            <form id="documentForm" action="" method="get">

                <div class="form-group w-50">
                    <label>Tu opinión: </label>
                    <textarea name="description" id="userDescription"class="form-control" rows="4" cols="20" required></textarea>
                </div>
    
                <div class="form-group">
                    <label class="m-2">Tu puntuación: </label>
                    <br>
                        <div>
                            <select class="m-2 border" id="selectionOption" name="score"  style="Width: 15%; hight: 25%;" required>
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="5">5</option>
                            </select>
                        </div>
                </div>
    
                <div class="form-group">
                    <input type="submit" value="Enviar">
                </div>
            </form>
        </div>
        `
        parentContainerDiv.innerHTML = itemInformationToAppend + commentsToAppend + commentFormToAppend

        document.getElementById("documentForm").addEventListener('submit', e =>{ 
            if (document.getElementById("selectionOption").length !== 0){
                commentsToAppend += `
                <div class="container m-0 mx-auto border" style="width 75% bg-dark">
                        <p class="m-1"><strong>${valueUser}</strong> - ${showRatingStars(document.getElementById("selectionOption").value)}</p>
                        <p class="m-1">${document.getElementById("userDescription").value}</p>
                    </div>       
                `
            };
            parentContainerDiv.innerHTML = itemInformationToAppend + commentsToAppend + commentFormToAppend                        
        });
    }); 
     
    
    // Elementos a mostrar en la página con los datos de los productos relacionados:
    relatedProductsDiv.innerHTML = relatedProductsToAppend

    for (let i=0; i < resultObj.data.relatedProducts.length; i++){
        let relatedProducts = resultObj.data.relatedProducts[i]
        
        internalEelatedProductElements += `
        <div onclick="selectProduct(${relatedProducts.id})" class="col w-50 m-1 mx-auto border">
            <img class="w-75" src="${relatedProducts.image}"></img>
            <p class="m-1">${relatedProducts.name}</p>      
        </div>
       `         
    };

    relatedProductsToAppend = `
    <hr>
    <div>
        <h5 class="mb-1">Productos relacionados</h5>
    <div>
    <div class="row m-1 mx-auto w-50 mx-1">
        ${internalEelatedProductElements}
    </div>
    `;

    relatedProductsDiv.innerHTML = relatedProductsToAppend
});