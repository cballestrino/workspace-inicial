/*Se modifico en la URL la ID de la categoría, en su lugar se obtuvo el item "CatID" guardado en localStorage.
De esta manera cada vez que se entra a la página de productos se cargan los artículos correspondientes a la categoria
guardada en el localStorage*/ 
const urlCars = PRODUCTS_URL + localStorage.getItem("catID") + EXT_TYPE;

//Imprime la URL de la API en la consola (Entrega 8: Mostrar la dir. del localhost donde están los datos)
console.log(urlCars);

let catProductsArray = []


//Función que guarda el ID del producto seleccionado en el localStorage y luego redirecciona hacia product-info.html:
function selectProduct(id){
    document.addEventListener("click",()=> {
        localStorage.setItem("selectedProduct", id)
        window.location = "product-info.html"
    });
};

function showProductList(array){                        
    let htmlContentToAppend = "";
     for(let i = 0; i < array.products.length; i++){ 
        let product = array.products[i];
        htmlContentToAppend += `
        <div onclick="selectProduct(${product.id})" class="list-group-item list-group-item-action">
            <div class="row">
                    <div class="col-3">
                <img src=${product.image}  class="img-thumbnail">
                    </div>
                        <div class="col">
                             <div class="d-flex w-100 justify-content-between">
                                <h4 class="mb-1">${product.name} ${product.currency} ${product.cost}</h4>
                                <small class="text-muted">${product.soldCount} artículos</small>
                            </div>
                <p class="mb-1">${product.description}</p>
                        </div>
            </div>
        </div>        
        `
        document.getElementById('myContainerProducts').innerHTML=htmlContentToAppend;
       
    }
}

document.addEventListener("DOMContentLoaded", function (e) {
    getJSONData(urlCars).then(function (resultObj) {
        if (resultObj.status === "ok") {
            catProductsArray = resultObj.data;      
            showProductList(catProductsArray);
        }

        console.log(catProductsArray)

        //Array donde se guardan los objetos de products:
        let  productArr= catProductsArray.products

        
        // Función para modificar la página
        function showProductList2(array){                  
                let htmlContentToAppend = "";
                for(let i = 0; i < array.length; i++){ 
                    let product = array[i];
                    htmlContentToAppend += `
                    <div onclick="selectProduct(${product.id})" class="list-group-item list-group-item-action">
                        <div class="row">
                                <div class="col-3">
                            <img src=${product.image}  class="img-thumbnail">
                                </div>
                                    <div class="col">
                                        <div class="d-flex w-100 justify-content-between">
                                            <h4 class="mb-1">${product.name} ${product.currency} ${product.cost}</h4>
                                            <small class="text-muted">${product.soldCount} artículos</small>
                                        </div>
                            <p class="mb-1">${product.description}</p>
                                    </div>
                        </div>
                    </div>    
                    `
                    document.getElementById('myContainerProducts').innerHTML=htmlContentToAppend; 
                };
        };

        // Elementos (inputs) que se incorporan al HTML a través de un div contenedor:
        document.getElementById("filterContainer").innerHTML = `

            <div id="search-form" class="col w-25 m-1 input-group">
                <input id="search-input" class="input-group-text m-1" type="search" name="search" placeholder="Buscar...">       
            </div>

            <div class="row w-25 m-2">

                <div class="col w-25 border" id="ascendingPrice" >
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" class="bi bi-sort-up" viewBox="0 0 16 16">
                    <path d="M3.5 12.5a.5.5 0 0 1-1 0V3.707L1.354 4.854a.5.5 0 1 1-.708-.708l2-1.999.007-.007a.498.498 0 0 1 .7.006l2 2a.5.5 0 1 1-.707.708L3.5 3.707V12.5zm3.5-9a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zM7.5 6a.5.5 0 0 0 0 1h5a.5.5 0 0 0 0-1h-5zm0 3a.5.5 0 0 0 0 1h3a.5.5 0 0 0 0-1h-3zm0 3a.5.5 0 0 0 0 1h1a.5.5 0 0 0 0-1h-1z"/>
                    </svg>

                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-currency-dollar" viewBox="0 0 16 16">
                    <path d="M4 10.781c.148 1.667 1.513 2.85 3.591 3.003V15h1.043v-1.216c2.27-.179 3.678-1.438 3.678-3.3 0-1.59-.947-2.51-2.956-3.028l-.722-.187V3.467c1.122.11 1.879.714 2.07 1.616h1.47c-.166-1.6-1.54-2.748-3.54-2.875V1H7.591v1.233c-1.939.23-3.27 1.472-3.27 3.156 0 1.454.966 2.483 2.661 2.917l.61.162v4.031c-1.149-.17-1.94-.8-2.131-1.718H4zm3.391-3.836c-1.043-.263-1.6-.825-1.6-1.616 0-.944.704-1.641 1.8-1.828v3.495l-.2-.05zm1.591 1.872c1.287.323 1.852.859 1.852 1.769 0 1.097-.826 1.828-2.2 1.939V8.73l.348.086z"/>
                    </svg>
                </div>

                <div class="col w-25 border" id="descendingPrice">
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" class="bi bi-sort-down" viewBox="0 0 16 16">
                    <path d="M3.5 2.5a.5.5 0 0 0-1 0v8.793l-1.146-1.147a.5.5 0 0 0-.708.708l2 1.999.007.007a.497.497 0 0 0 .7-.006l2-2a.5.5 0 0 0-.707-.708L3.5 11.293V2.5zm3.5 1a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zM7.5 6a.5.5 0 0 0 0 1h5a.5.5 0 0 0 0-1h-5zm0 3a.5.5 0 0 0 0 1h3a.5.5 0 0 0 0-1h-3zm0 3a.5.5 0 0 0 0 1h1a.5.5 0 0 0 0-1h-1z"/>
                    </svg>

                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-currency-dollar" viewBox="0 0 16 16">
                    <path d="M4 10.781c.148 1.667 1.513 2.85 3.591 3.003V15h1.043v-1.216c2.27-.179 3.678-1.438 3.678-3.3 0-1.59-.947-2.51-2.956-3.028l-.722-.187V3.467c1.122.11 1.879.714 2.07 1.616h1.47c-.166-1.6-1.54-2.748-3.54-2.875V1H7.591v1.233c-1.939.23-3.27 1.472-3.27 3.156 0 1.454.966 2.483 2.661 2.917l.61.162v4.031c-1.149-.17-1.94-.8-2.131-1.718H4zm3.391-3.836c-1.043-.263-1.6-.825-1.6-1.616 0-.944.704-1.641 1.8-1.828v3.495l-.2-.05zm1.591 1.872c1.287.323 1.852.859 1.852 1.769 0 1.097-.826 1.828-2.2 1.939V8.73l.348.086z"/>
                    </svg>
                </div>

                <div class="col w-25 border" id="relevance">
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" class="bi bi-sort-down" viewBox="0 0 16 16">
                    <path d="M3.5 2.5a.5.5 0 0 0-1 0v8.793l-1.146-1.147a.5.5 0 0 0-.708.708l2 1.999.007.007a.497.497 0 0 0 .7-.006l2-2a.5.5 0 0 0-.707-.708L3.5 11.293V2.5zm3.5 1a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zM7.5 6a.5.5 0 0 0 0 1h5a.5.5 0 0 0 0-1h-5zm0 3a.5.5 0 0 0 0 1h3a.5.5 0 0 0 0-1h-3zm0 3a.5.5 0 0 0 0 1h1a.5.5 0 0 0 0-1h-1z"/>
                    </svg>
                    Rel.
                </div>
            </div>

            <div class="col m-1 input-group">     
                    <label for="">Precio:</label>
                    <input class="input-group-text m-1" type="number" id="basePrice">
                    <input class="input-group-text m-1" type="number" id="limitPrice">
                    <button class="btn btn-light m-1" type="button" id="filterButton">Filtrar</button>
                    <button class="btn btn-link m-1" type="button" id="clearButton">Limpiar</button>    
            </div>
        `

        // Botón de filtrado (Cuando se cliquea el botón "filtrar" se filtran los productos por precio):
        document.getElementById("filterButton").addEventListener("click", e=>{
            let varBasePrice = document.getElementById("basePrice").value;
            let varLimitPrice = document.getElementById("limitPrice").value;

            // Función de rangos 
            function filterFunct (product){
                return product.cost > varBasePrice && product.cost < varLimitPrice
            }

            //Filtrado de precios según el valor agregado por el usuario
            let productsFilter = productArr.filter(filterFunct);
            showProductList2(productsFilter);
        });

        //Botón para limpiar la función de filtro por precios (deja la lista original):
        document.getElementById("clearButton").addEventListener("click", e=>{
            showProductList(catProductsArray);
        });
        
        // Botón para ordenar los artículos por ascenso de precios:
        document.getElementById("ascendingPrice").addEventListener("click", e=>{
            let ascendingVar = productArr.sort((l1, l2)=>{
                if (l1.cost === l2.cost ){
                    return 0
                }else{
                    if (l1.cost < l2.cost){
                        return -1
                    }else{
                        return 1
                     }
                    };
                });

                showProductList2(ascendingVar);
        });

        // Botón para ordenar los artículos por descenso de precios:
        document.getElementById("descendingPrice").addEventListener("click", e=>{
            let descendingVar = productArr.sort((l1, l2)=>{
                if (l1.cost === l2.cost ){
                    return 0
                }else{
                    if (l1.cost > l2.cost){
                        return -1
                    }else{
                        return 1
                     }
                    };
                });

                showProductList2(descendingVar);
        });

        // Botón para ordenar los artículos en descenso por relevancia:
        document.getElementById("relevance").addEventListener("click", e=>{
            let relevanceVar = productArr.sort((l1, l2)=>{
                if (l1.soldCount === l2.soldCount ){
                    return 0
                }else{
                    if (l1.soldCount < l2.soldCount){
                        return -1
                    }else{
                        return 1
                     }
                    };
                });
                showProductList2(relevanceVar);
        });
        
        //Botón de busqueda:
        let searchInput = document.getElementById("search-input")

        searchInput.addEventListener("search", ()=>{
            searchResult = ''
            for (let product of  catProductsArray.products){
                let name = product.name.toLowerCase().includes(searchInput.value.toLowerCase());
                let description = product.description.toLowerCase().includes(searchInput.value.toLowerCase());

                if (name || description){
                        searchResult = `
                        <div onclick="selectProduct(${product.id})" class="list-group-item list-group-item-action">
                            <div class="row">
                                    <div class="col-3">
                                <img src=${product.image}  class="img-thumbnail">
                                    </div>
                                        <div class="col">
                                            <div class="d-flex w-100 justify-content-between">
                                                <h4 class="mb-1">${product.name} ${product.currency} ${product.cost}</h4>
                                                <small class="text-muted">${product.soldCount} artículos</small>
                                            </div>
                                <p class="mb-1">${product.description}</p>
                                        </div>
                            </div>
                        </div>                 
                        `   
                    document.getElementById('myContainerProducts').innerHTML=searchResult;
                };
            }
        });
        

    });
});