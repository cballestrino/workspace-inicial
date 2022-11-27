/*Se modifico en la URL la ID de la categoría, en su lugar se obtuvo el item "CatID" guardado en localStorage.
De esta manera cada vez que se entra a la página de productos se cargan los artículos correspondientes a la categoria
guardada en el localStorage*/ 
const urlCars = `https://japceibal.github.io/emercado-api/cats_products/${localStorage.getItem("catID")}.json`;

let catProductsArray = []

function showProductList(array){                        
    let htmlContentToAppend = "";
     for(let i = 0; i < array.products.length; i++){ 
        let product = array.products[i];
        htmlContentToAppend += `
        <div class="list-group-item list-group-item-action">
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

        //Array donde se guardan los objetos de products:
        let  productArr= catProductsArray.products

        // Función para modificar la página
        function showProductList2(array){                        
            let htmlContentToAppend = "";
             for(let i = 0; i < array.length; i++){ 
                let product = array[i];
                htmlContentToAppend += `
                <div class="list-group-item list-group-item-action">
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

        // Elementos (inputs) que se incorporan al HTML a través de un div contenedor:
        document.getElementById("filterContainer").innerHTML = `
            <div class="text-muted"> 
                <input type="button" id="ascendingPrice" value="Precio ascedente">
                <input type="button" id="descendingPrice" value="Precio descendente">
                <input type="button" id="relevance" value="Relevancia">
            </div>

            <div class="text-muted">
                <label for="tentacles">Precio:</label>
                <input type="number" id="basePrice">
                <input type="number" id="limitPrice">
                <input type="button" id="filterButton" value="Filtrar">
                <input type="button" id="cleanButton" value="Limpiar">
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
        document.getElementById("cleanButton").addEventListener("click", e=>{
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
                console.log(relevanceVar);
                showProductList2(relevanceVar);
        });

    });
});



