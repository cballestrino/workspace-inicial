const USER_ID = 25801;

//Imprime la URL de la API en la consola (Entrega 8: Mostrar la dir. del localhost donde están los datos)
console.log(CART_INFO_URL + USER_ID + EXT_TYPE)

let contentToAppend = ``;
let CostcontentToAppend = ``;
let modalContentToAppend = '';
let submitContentToAppend = '';


// Peteción de los datos a CART_INFO_URL con la ID de usuario 25801:
getJSONData(CART_INFO_URL + USER_ID + EXT_TYPE).then(function (resultObj) {
    if (resultObj.status === "ok") {
        console.log(resultObj.data);
    };



    // Variable donde se guardan los elementos de la página:
    contentToAppend = `
    <div class="container mx-auto">

        <form id="cart-form-id" action="" method="post" novalidate>

            <div class="row">
                <div class="col text-center py-3">
                    <h2 class="mx-auto">Carrito de compras</h2>
                </div>

                <br>

                <div class="">   
                    <div class="col text-start">    
                        <h3>Artículos a comprar</h3>
                    </div>

                    <hr>
                    
                    <table class="">               
                        <thead class="">                              
                            <tr class="">
                                <td class="px-4 w-25" text-center"></td>
                                <th class="px-4 w-25">Nombre</th>
                                <th class="px-4 w-25">Costo</th>
                                <th class="px-4 w-25">Cantidad</th>
                                <th class="px-4 w-25">Subtotal</th>
                            </tr>
                        </thead>

                        <tbody id="tbody-content" class="">
                            <tr class="">
                                <td class="px-4 w-25 container text-start" ><img src="${resultObj.data.articles[0].image}"  alt="..." class="img-fluid"></td>
                                <td class="px-4 w-25">${resultObj.data.articles[0].name}</td>
                                <td class="px-4 w-25">${resultObj.data.articles[0].currency} ${resultObj.data.articles[0].unitCost}</td>
                                <td class="px-4 w-25"><input class="w-25" id="count-input-id" type="number" value="0" min="1"></td> 
                                <th class="ps-4 pe-1 w-25" id="subtotalCost" >${resultObj.data.articles[0].currency} 0</th>                            
                            </tr>

                        </tbody>
                    </table>
                    <hr>
                </div>
                
                <div class="container row py-2">
                    <h3>Tipo de envio</h3>
                    
                    <div class="col">
                        <input type="radio" id="radio-premium" name="shipping" value="0.15">
                        <label for="radio-premium">Premium 2 a 5 días (15%)</label>
                    
                        <br>

                        <input type="radio" id="radio-express" name="shipping" value="0.07">
                        <label for="radio-express">Express 5 a 8 días (7%)</label>

                        <br>

                        <input type="radio" id="radio-standard" name="shipping" value="0.05">
                        <label for="radio-standard">Standard 12 a 15 días (5%)</label>
                    </div>
                </div>

                <div class="container row py-2">
                    <h3>Dirección de envío</h3>
                    
                    <div class="col">
                        <label class="" for="input-street">Calle: </label>
                        <br>
                        <input class=""type="text " id="input-street" name="address" value=""> 
                    </div>       

                    <div class="col">
                        <label class="" for="input-number">Número: </label>
                        <br>
                        <input class="" type="text" id="input-number" name="address" value="">
                    </div>
                    
                    <br>
                    
                    <div class="container">
                        <label class="" for="input-corner">Esquina: </label>
                        <br>
                        <input class="" type="text" id="input-corner" name="address" value="">
                    </div>
                    <hr class="m-5">
                </div>
            </div>

            <div>
                <h3>Costo</h3>

                <div class=" row border">
                    <h5>Subtotal</h5>

                    <div class="col">   
                        <p class="text-start">Costo unitario del producto por cantidad</p> 
                    </div>

                    <div class="col">
                        <p class="text-end" id="grand-subtotal-ID">${resultObj.data.articles[0].currency} 0</p>
                    </div>
                </div> 

                <div class="row border">
                    <h5>Costo de envío</h5>

                    <div class="col">  
                    <p>Según el tipo de envio</p>
                    </div>
                    
                    <div class="col">
                        <p class="text-end" id="grand-subtotal-percent-ID">${resultObj.data.articles[0].currency}  ${resultObj.data.articles[0].unitCost * 0}</p>
                    </div>
                    
                </div>

                <div class="row border">
                    <div class="col">
                        <h5>Total ($)</h5>
                    </div>

                    <div class="col">
                        <p class="text-end" id="total-ID">${resultObj.data.articles[0].currency} 0</p>
                    </div>
                </div>
            </div> 
            
            <hr>

            <div class="row">
                    <h3>Forma de pago</h3>

                    <div class="col">
                        <p id="modal-paragraph-ID">No se ha seleccionado
                            <button type="button" class="btn btn-link ps-0" data-bs-toggle="modal" data-bs-target="#modal-payment">
                                Seleccionar
                            </button>
                    </p>
                    </div>
            </div>

            <div class="modal fade" id="modal-payment" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalLabel">Forma de pago</h5>
                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                <div class="modal-body">
                    
                    <div>
                        <input type="radio" id="credit-card-radio-ID" name="button" value="credit">
                        <label for="credit-card-radio-ID">Tarjeta de crédito</label>
                        <hr>
                    </div>

                    <div class="row">   
                        <div class="col">
                            <label class=""for="card-number-input-ID">Número de tarjeta</label>
                            <br>
                            <input class=""type="text" id="card-number-input-ID"" name="creditCard" value="">  
                        </div>       

                        <div class="col">
                            <label class="" for="security-code-input-ID">Código de seg.</label>
                            <br>
                            <input class="" type="text" id="security-code-input-ID" name="creditCard" value="">
                        </div>
                        
                        <br>
                        
                        <div class="container">
                            <label class="" for="expiration-input-ID">Vencimiento (MM/AA): </label>
                            <br>
                            <input class="" type="text" id="expiration-input-ID" name="creditCard" value="">
                        </div>
                    </div>

                    <br>

                    <div>
                        <input type="radio" id="bank-transfer-radio-ID" name="button" value="bankTransfer">
                        <label for="bank-transfer-radio-ID">Transferencia bancaria</label>
                        <hr>
                    </div>

                    <div class="col">
                        <label class=""for="account-number-input-ID">Número de cuenta</label>
                        <br>
                        <input class=""type="text" id="account-number-input-ID" name="bankTransfer" value="">  
                    </div> 
                </div>
                
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                </div>

                    </div>
                </div>
            </div>


            <div class="container row">
                <button id="submit-button-id" type="submit" class="btn btn-primary">Finalizar compra</button>
            </div>
        </form> 
    </div>
    
    `;

    // InnetHTML para colocar los elementos en la página:
    document.getElementById("main-container").innerHTML = contentToAppend;

    //Función para calcular e imprimir el porcentaje y el costo total en la página: 
    let grandSubtotalPlusPercentage = 0;
    function calcPercentagePlusTotal (elementID, grandSubtotal) {
        document.getElementById(elementID).addEventListener("click", (e) => {
            grandSubtotalPlusPercentage = document.getElementById(elementID).value;
            document.getElementById("grand-subtotal-percent-ID").innerHTML = grandSubtotalPlusPercentage * grandSubtotal;
            document.getElementById("total-ID").innerHTML = `<b>${resultObj.data.articles[0].currency} ${(grandSubtotalPlusPercentage * grandSubtotal) + grandSubtotal} </b>`;
        });
    };


    //Evento para cambiar el valor del subtotal, porcentaje y total:
    document.getElementById("count-input-id").addEventListener("input", (event) => {
        let countInput = document.getElementById("count-input-id");
        let subtotal = countInput.value * resultObj.data.articles[0].unitCost;
        document.getElementById("subtotalCost").innerHTML = `${resultObj.data.articles[0].currency} ` + (subtotal);

        document.getElementById("grand-subtotal-ID").innerHTML = `${resultObj.data.articles[0].currency} ${subtotal}`;



        //Impresión del porcentaje y el valor total (subtotal general más porcentaje):
        calcPercentagePlusTotal("radio-premium", subtotal);
        calcPercentagePlusTotal("radio-express", subtotal);
        calcPercentagePlusTotal("radio-standard", subtotal);

        document.getElementById("grand-subtotal-percent-ID").innerHTML = grandSubtotalPlusPercentage * subtotal;
        document.getElementById("total-ID").innerHTML = `<b>${resultObj.data.articles[0].currency} ${(grandSubtotalPlusPercentage * subtotal) + subtotal} </b>`;
    });


    // Evento para desactivar los botones de "bankTransfer":
    document.getElementById("credit-card-radio-ID").addEventListener('click', (e) => {
        //Desactivación de los input del formulario de "Transferencia bancaria":
        document.getElementById("account-number-input-ID").disabled = true;

        //Activación de los input del formulario de "Tarjeta de crétido":
        document.getElementById("card-number-input-ID").disabled = false;
        document.getElementById("security-code-input-ID").disabled = false;
        document.getElementById("expiration-input-ID").disabled = false;

        document.getElementById("modal-paragraph-ID").innerHTML = `
            Tarjeta de crétido
                <button type="button" class="btn btn-link ps-0" data-bs-toggle="modal" data-bs-target="#modal-payment">
                    Seleccionar
                </button>
        `;
    });

    // Evento para desactivar los botones de "creditCard":
    document.getElementById("bank-transfer-radio-ID").addEventListener('click', (e) => {
        //Activación de los input del formulario de "Transferencia bancaria":
        document.getElementById("account-number-input-ID").disabled = false;

        //Desactivación de los input del formulario de "Tarjeta de crétido":
        document.getElementById("card-number-input-ID").disabled = true;
        document.getElementById("security-code-input-ID").disabled = true;
        document.getElementById("expiration-input-ID").disabled = true;

        document.getElementById("modal-paragraph-ID").innerHTML = `
            Transferencia bancaria
                <button type="button" class="btn btn-link ps-0" data-bs-toggle="modal" data-bs-target="#modal-payment">
                    Seleccionar
                </button>
        `;
    });
});


