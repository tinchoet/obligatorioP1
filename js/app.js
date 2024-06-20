// Globals
let productTableVisible = false; // bool que guarda si se está mostrando la tabla de productos al admin como un true o false
let productTableUserVisible = false; // bool que guarda si se está mostrando la tabla de productos al usuario como un true o false
let showingAdminOrUsers = false; // bool que guarda si se está mostrando la vista de administrador o usuario como un true o false
let createProductsVisible = false; // bool que guarda si se está mostrando la función de crear productos al admin como un true o false

let mainApp = new App();

// Función de incio
window.addEventListener("load", () => {
  mainApp.preloadUsers();
  mainApp.preloadProducts();
  mainApp.preloadSales();

  // Función de registro y display none al login al hacer click en el botón de registro
  document.querySelector("#register-button").addEventListener("click", registerFunction);
  document.querySelector("#hideLogin").addEventListener("click", showRegister);

  // Función de login y display none al registro al hacer click en el botón de login
  document.querySelector("#login-button").addEventListener("click", loginFunction);
  document.querySelector("#arrow-container").addEventListener("click", showLogin);

  // Al finalizar el registro muestra un hipervinculo que te permite redirigirte para iniciar sesión con la cuenta recién registrada
  document.querySelector("#register-success-login").addEventListener("click", showLogin);

  // Header: vista administrador
  hideHeaderHiddenActions();
  document.querySelector("#header-hidden-show-products-button").addEventListener("click", showAndHideProducts);
  document.querySelector("#header-hidden-create-products-button").addEventListener("click", showAndHideCreateProducts);
  document.querySelector("#header-hidden-logout-button").addEventListener("click", logout); // logout

  document.querySelector("#header-hidden-show-sales-button").addEventListener("click", showSales);
  document.querySelector("#header-hidden-show-sales-button").addEventListener("click", toggleSalesListDisplay);
  document.querySelector("#header-hidden-show-earnings-button").addEventListener("click", showEarnings);
  document.querySelector("#header-hidden-show-earnings-button").addEventListener("click", toggleEarningsDisplay);

  document.querySelector("#sales-actions").addEventListener("change", showFilterSales);

  // Header: vista usuario
  hideUserHiddenActions();
  document.querySelector("#user-hidden-show-products-button").addEventListener("click", showAndHideProductsUser);
  document.querySelector("#user-hidden-logout-button").addEventListener("click", logout); // logout
  document.querySelector("#user-hidden-show-purchases-button").addEventListener("click", showUserPurchases);
  document.querySelector("#user-hidden-show-purchases-button").addEventListener("click", toggleUserPurchases);

  // Crear producto
  document.querySelector("#create-products-button").addEventListener("click", createProduct);
});

// Función de login
function showLogin() {
  document.querySelector("#login-container").style.display = "flex"; // Muestra login
  document.querySelector("#register-container").style.display = "none"; // Display none al registro
  document.querySelector("#arrow-container").style.display = "none"; // Display none a la flecha para ir hacia atrás
  document.querySelector("#logo-container").style.display = "none"; // Display none al logo de la tienda
}

// Función de registro
function showRegister() {
  document.querySelector("#login-container").style.display = "none"; // Display none al login
  document.querySelector("#register-container").style.display = "flex"; // Muestra registro
  document.querySelector("#arrow-container").style.display = "block"; // Muestra flecha para ir hacia atrás
  document.querySelector("#logo-container").style.display = "block"; // Muestra logo de la tienda
}

// Función de logout
function logout() {
  document.querySelector("#products-list").style.display = "none";
  document.querySelector("#products-list-user").style.display = "none";
  document.querySelector("#login-container").style.display = "flex";
  document.querySelector("#register-container").style.display = "none";
  document.querySelector("#header-sales-actions").style.display = "none";
  document.querySelector("#edit-product-options").style.display = "none";
  document.querySelector("#user-purchases-list").style.display = "none";
  document.querySelector("#earnings-list-and-text").style.display = "none";

  // Al hacer logout muestra la pestaña de Login y esconde el header (opciones de administrador)
  showLogin();
  hideHeaderHiddenActions();
  hideUserHiddenActions();
}

// Validaciones


// Función registro
function registerFunction() {
  let firstName = document.querySelector("#register-name").value;
  let lastName = document.querySelector("#register-surname").value;
  let username = document.querySelector("#register-username").value;
  let password = document.querySelector("#register-password").value;
  let creditCard = document.querySelector("#register-card").value;
  let cvc = Number(document.querySelector("#register-cvc").value);

  if (
    !checkVoidInputs(firstName, lastName, username, password, creditCard, cvc)
    // SOLAMENTE si no hay espacios en blanco -> inicio la validación del registro
    // en caso de que todo se valide -> creo el usuario
  ) {
    validateName(firstName, lastName);
    validateUsername(username);
    validatePassword(password);
    validateCard(creditCard);
    validateCVC(cvc);

    if (
      validateName(firstName, lastName) &&
      !validateUsername(username) &&
      validatePassword(password) &&
      validateCard(creditCard) &&
      validateCVC(cvc)
    ) {
      mainApp.createNewUser(
        firstName,
        lastName,
        username,
        password,
        creditCard,
        cvc
      );
      document.querySelector("#register-messages").innerHTML =
        "Usuario registrado con éxito";
      document.querySelector("#register-success-login").innerHTML =
        "Iniciar sesión";
      console.log("Usuario creado:" + mainApp.userList[length - 1]);
    }
  } else {
    document.querySelector("#register-messages").innerHTML =
      "No pueden haber espacios vacíos";
  }
}

// Función login
function loginFunction() {
  let username = document.querySelector("#login-username").value;
  let password = document.querySelector("#login-password").value;
  let foundUser = false;

  if (!checkVoidInputs(username, password)) {
    for (let i = 0; i < mainApp.userList.length; i++) {
      if (
        username === mainApp.userList[i].username &&
        password === mainApp.userList[i].password
        // busco si dentro de un mismo Objeto user hay un nombre y contraseña
        // coincidente con la que acabo de ingresar
      ) {
        mainApp.loggedUser = mainApp.userList[i];
        foundUser = true;
      }
    }

    if (foundUser) {
      document.querySelector("#login-container").style.display = "none";
      if (mainApp.loggedUser.power) {
        showAdminFunctions();
      } else {
        showUserFunctions();
      }
    } else {
      document.querySelector("#login-messages").innerHTML =
        "Credenciales incorrectas, intenta otra vez.";
    }
  } else {
    document.querySelector("#login-messages").innerHTML =
      "No pueden haber espacios vacíos";
  }
}

// Validación de nombre
function validateName(firstName, lastName) {
  let nameValidated = false;
  document.querySelector("#register-error-fullName").innerHTML = "";

  if (
    firstName.charAt(0) === firstName.charAt(0).toUpperCase() &&
    lastName.charAt(0) === lastName.charAt(0).toUpperCase()
    // valido que el primer caracter de tanto el nombre como el apellido estén en mayúsculas
  ) {
    nameValidated = true;
  } else if (firstName === "" || lastName === "") {
    document.querySelector("#register-error-fullName").innerHTML = "";
  } else {
    document.querySelector("#register-error-fullName").innerHTML =
      "El Nombre y Apellido deben comenzar en mayúsculas";
  }

  return nameValidated;
}

function validateUsername(username) {
  let usernameExists = false;
  document.querySelector("#register-error-username").innerHTML = "";

  for (let i = 0; i < mainApp.userList.length; i++) {
    if (username === mainApp.userList[i].username) {
      usernameExists = true;
      // busco si el nombre que ingrese es coincidente con el nombre asignado a otro objeto
      // si es coincidente, muestro mensaje de error y le doy a usernameExists valor true
      document.querySelector("#register-error-username").innerHTML =
        "El nombre de usuario ya existe";
    }
  }

  return usernameExists;
}

// Validación de contraseña
function validatePassword(password) {
  let passwordValidated = false;
  let passwordUppercaseCount = 0;
  let passwordLowercaseCount = 0;
  let passwordNumberCount = 0;
  document.querySelector("#register-error-password").innerHTML = "";

  for (let i = 0; i < password.length; i++) {
    if (password.charCodeAt(i) >= 65 && password.charCodeAt(i) <= 90) {
      // checkeo si el caracter de la posición en la que estoy dentro del bucle
      // corresponde a una letra mayúscula según la tabla ascii
      passwordUppercaseCount++;
    }
    if (password.charCodeAt(i) >= 97 && password.charCodeAt(i) <= 122) {
      // checkeo si el caracter de la posición en la que estoy dentro del bucle
      // corresponde a una letra minúscula según la tabla ascii
      passwordLowercaseCount++;
    }
    if (!isNaN(password.charAt(i))) {
      // checkeo si el caracter de la posición en la que estoy dentro del bucle
      // corresponde a un número
      passwordNumberCount++;
    }
  }

  if (
    password.length < 5 ||
    passwordLowercaseCount === 0 ||
    passwordUppercaseCount === 0 ||
    passwordNumberCount === 0
    // muestro mensajes de error uno por uno
  ) {
    if (password.length < 5) {
      document.querySelector("#register-error-password").innerHTML +=
        "La contraseña debe contener al menos 5 caracteres. <br>";
    }
    if (passwordUppercaseCount === 0) {
      document.querySelector("#register-error-password").innerHTML +=
        "La contraseña debe contener al menos una mayúscula. <br>";
    }
    if (passwordLowercaseCount === 0) {
      document.querySelector("#register-error-password").innerHTML +=
        "La contraseña debe contener al menos una minúscula. <br>";
    }
    if (passwordNumberCount === 0) {
      document.querySelector("#register-error-password").innerHTML +=
        "La contraseña debe contener al menos un número.";
    }
  } else {
    passwordValidated = true;
  }

  return passwordValidated;
}

// Validación de tarjeta de crédito
function validateCard(creditCard) {
  let creditCardNoDashes = "";

  for (let i = 0; i < creditCard.length; i++) {
    if (creditCard.charAt(i) !== "-") {
      creditCardNoDashes += creditCard.charAt(i);
    }
  }
  creditCardNoDashes.toString();

  let addedUpNumber = 0;
  let cardValidated = false;

  document.querySelector("#register-error-card").innerHTML = "";

  // recorrer string de derecha a izquierda
  for (let pos = creditCardNoDashes.length - 1; pos >= 0; pos--) {
    let digit = Number(creditCardNoDashes.charAt(pos));

    // verificar si la posición actual (contando desde la derecha) es par
    if ((creditCardNoDashes.length - pos) % 2 === 0) {
      digit *= 2;

      // si la posición actual es mayor a 10, le resto 9, que es lo mismo que sumar cada uno de sus digitos individualmente
      // por ejemplo: 12. 1+2 = 3. 12-9 = 3. restarle 9 es una forma más sencilla de implementar la funcionalidad
      if (digit >= 10) {
        digit -= 9;
      }
    }

    // le sumo el digito actual al total, independientemente de si fue multiplicado por 2 o no
    addedUpNumber += digit;
  }

  if (addedUpNumber % 10 === 0) {
    // si el resultado total es divisible entre 10, la tarjeta es válida
    cardValidated = true;
  } else {
    cardValidated = false;
    document.querySelector("#register-error-card").innerHTML =
      "La tarjeta ingresada es incorrecta. <br>";
  }

  return cardValidated;
}

// Validación de CVC
function validateCVC(cvc) {
  let cvcValidated = false;
  let stringCVC = cvc.toString();
  document.querySelector("#register-error-cvc").innerHTML = "";

  for (let i = 0; i < stringCVC.length; i++) {
    if (stringCVC.length === 3) {
      // checkeo que el CVC tenga tres digitos
      cvcValidated = true;
    } else {
      document.querySelector("#register-error-cvc").innerHTML =
        "El CVC solamente puede tener 3 digitos";
    }
  }

  return cvcValidated;
}

// Checkear si hay inputs vacíos
function checkVoidInputs(input1, input2, input3, input4, input5, input6) {
  let voidInputs = false;

  if (
    input1 === "" ||
    input2 === "" ||
    input3 === "" ||
    input4 === "" ||
    input5 === "" ||
    input6 === ""
  ) {
    voidInputs = true;
  }

  return voidInputs;
}

// Función para extraer la url de la imagen sin el C:\fakepath\
function getFileName(filename) {
  let backslashPosition = -1;
  for (let i = filename.length - 1; i >= 0 && backslashPosition == -1; i--) {
    if (filename.charAt(i) == "\\") {
      backslashPosition = i;
    }
  }
  return filename.substring(backslashPosition + 1);
}

// Funciones del panel de control del admin
// Tabla de productos admin
function productsTableAdmin() {
  let HTMLtable = "<table border='1' align='center'>";

  HTMLtable += `<tr>
                <th>Nombre</th>
                <th>Precio</th>
                <th>Descripcion</th>
                <th>Imagen</th>
                <th>Estado</th>
                <th>Stock</th>
                <th>Acción</th>
            </tr>`;

  for (let i = 0; i < mainApp.productList.length; i++) {
    let loadingItem = mainApp.productList[i];
    let loadingItemStatus = "Activo";
    let loadingItemOnSale = 'En Oferta'

    if (!loadingItem.status) {
      loadingItemStatus = "Pausado";
    }
    if (!loadingItem.onSale) {
      loadingItemOnSale = '';
    }

    HTMLtable += `<tr>
                    <td>${loadingItem.name}</td>
                    <td>${loadingItem.price}</td>
                    <td>${loadingItem.description}</td>
                    <td><img src="../img/${loadingItem.image}"></td>
                    <td>${loadingItemStatus} <br> ${loadingItemOnSale}</td>
                    <td>${loadingItem.stock}</td>    
                    <td><input type='button' value='Cambiar estado' id='p${+i}'>
                        <br><br>
                        <input type='button' value='Editar producto' id='edit${+i}'>
                        <br><br>
                        <input type='button' value='Oferta' id='offer${+i}'>
                    </td>
                  </tr>`;
  }
  HTMLtable += "</table>";

  document.querySelector("#products-list").innerHTML = HTMLtable;
  document.querySelector("#products-list").style.display = "block";

  for (let i = 0; i < mainApp.productList.length; i++) {
    let currentButton = document.querySelector("#p" + i);
    currentButton.addEventListener("click", changeStatus);
  }

  for (let i = 0; i < mainApp.productList.length; i++) {
    let currentButton = document.querySelector("#edit" + i);
    currentButton.addEventListener("click", editProduct);
  }

  for (let i = 0; i < mainApp.productList.length; i++) {
    let currentButton = document.querySelector("#offer" + i);
    currentButton.addEventListener("click", offerProduct);
  }
}

// Marcar un producto como "en oferta"
function offerProduct() {
  let clickedButton = this;
  let buttonID = clickedButton.id;
  let productPosition = Number(buttonID.substring(5));
  let currentProduct = mainApp.productList[productPosition];
  if (currentProduct.onSale) {
    currentProduct.onSale = false;
  } else {
    currentProduct.onSale = true;
  }
  productsTableAdmin();
}

// Cambiar estado de una compra de activo a pausado y viceversa
function changeStatus() {
  let clickedButton = this;
  let buttonID = clickedButton.id;
  let productPosition = Number(buttonID.substring(1));
  let currentProduct = mainApp.productList[productPosition];
  if (currentProduct.status) {
    currentProduct.status = false;
  } else {
    currentProduct.status = true;
  }
  productsTableAdmin();
}

// Editar producto
function editProduct() {
  document.querySelector("#products-list").style.display = "none";
  document.querySelector("#edit-product-options").style.display = "block";

  let clickedButton = this;
  let buttonID = clickedButton.id;
  let productPosition = Number(buttonID.substring(4));
  let currentProduct = mainApp.productList[productPosition];

  document.querySelector("#editing-product-name").placeholder = currentProduct.name;
  document.querySelector("#editing-product-price").placeholder = `Precio del producto: ${currentProduct.price}`;
  document.querySelector("#editing-product-description").placeholder = currentProduct.description;
  document.querySelector("#editing-product-stock").placeholder = `Stock del producto: ${currentProduct.stock}`;
  document.querySelector("#editing-product-onSale").checked = currentProduct.onSale; // Corregido el selector

  document.querySelector("#editing-product-name").addEventListener("input", () => {
    if (!checkVoidInputs(document.querySelector("#editing-product-name").value)) {
      currentProduct.name = document.querySelector("#editing-product-name").value;
    }
  });

  document.querySelector("#editing-product-price").addEventListener("input", () => {
    if (!checkVoidInputs(document.querySelector("#editing-product-price").value)) {
      currentProduct.price = document.querySelector("#editing-product-price").value;
    }
  });

  document.querySelector("#editing-product-description").addEventListener("input", function () {
    if (!checkVoidInputs(document.querySelector("#editing-product-description").value)) {
      currentProduct.description = document.querySelector("#editing-product-description").value;
    }
  });

  document.querySelector("#editing-product-image").addEventListener("input", function () {
    if (!checkVoidInputs(document.querySelector("#editing-product-image").value)) {
      currentProduct.image = getFileName(document.querySelector("#editing-product-image").value);
    }
  });

  document.querySelector("#editing-product-stock").addEventListener("input", function () {
    if (!checkVoidInputs(document.querySelector("#editing-product-stock").value)) {
      currentProduct.stock = document.querySelector("#editing-product-stock").value;
    }
  });

  document.querySelector("#editing-product-onSale").addEventListener("change", function () {
    currentProduct.onSale = document.querySelector("#editing-product-onSale").checked;
  });

  document.querySelector("#finished-editing").addEventListener("click", () => {
    document.querySelector("#edit-product-options").style.display = "none";
    document.querySelector("#products-list").innerHTML = "";
    productsTableAdmin();
  });
}

// Función para crear producto
function createProduct() {
  let productName = document.querySelector(
    "#create-products-product-name"
  ).value;
  let productPrice = document.querySelector(
    "#create-products-product-price"
  ).value;
  let productDescription = document.querySelector(
    "#create-products-product-description"
  ).value;
  let productStock = document.querySelector(
    "#create-products-product-stock"
  ).value;
  let productImage = document.querySelector(
    "#create-products-product-image"
  ).value;
  let newFilePath = "../img/" + getFileName(productImage);

  if (
    !checkVoidInputs(
      productName,
      productPrice,
      productDescription,
      productStock,
      productImage
    )
  ) {
    mainApp.productPush(
      productName,
      productPrice,
      productDescription,
      newFilePath,
      productStock
    );
    document.querySelector("#create-products-message").innerHTML =
      "Producto creado con éxito";
  } else {
    document.querySelector("#create-products-message").innerHTML =
      "No pueden haber espacios vacíos";
  }
}

// Mostrar tablas con ventas al admin
function showSales() {
  document.querySelector("#header-sales-actions").style.display = "block";
  let salesListContainer = document.querySelector("#sales-list");

  // Crear tabla
  let HTMLtable = "<table border='1' align='center'>";
  HTMLtable += `<tr>
                  <th>Nombre comprador</th>
                  <th>Balance comprador</th>
                  <th>Unidades</th>
                  <th>Nombre producto</th>
                  <th>Stock disponible</th>
                  <th>Estado compra</th>
                  <th>Acción</th>
              </tr>`;

  for (let i = 0; i < mainApp.salesList.length; i++) {
    let loadingItem = mainApp.salesList[i];
    HTMLtable += `<tr>
                    <td>${loadingItem.buyer.username}</td>
                    <td>${loadingItem.buyer.balance} USD</td>
                    <td>${loadingItem.amountPurchased}</td>
                    <td>${loadingItem.product.name}</td>
                    <td>${loadingItem.product.stock}</td>
                    <td>${loadingItem.purchaseStatus}</td>    
                    <td><input type='button' value='Aprobar' id='confirmP${+i}'>
                        <br><br>
                        <input type='button' value='Cancelar' id='cancelP${+i}'>
                        <br>
                    </td>
                </tr>`;
  }
  HTMLtable += "</table>";
  salesListContainer.innerHTML = HTMLtable;

  // Llamar a la función para confirmar o cancelar compras pendientes
  for (let i = 0; i < mainApp.salesList.length; i++) {
    let confirmButton = document.querySelector("#confirmP" + i);
    let cancelButton = document.querySelector("#cancelP" + i);

    if (mainApp.salesList[i].purchaseStatus === "Pendiente") {
      confirmButton.disabled = false;
      confirmButton.disabled = false;

      confirmButton.addEventListener("click", confirmSale);
      cancelButton.addEventListener("click", cancelSale);

    } else if (mainApp.salesList[i].purchaseStatus === "Aprobada") {
      confirmButton.disabled = true;
      cancelButton.disabled = true;
    } else if (mainApp.salesList[i].purchaseStatus === "Cancelada") {
      confirmButton.disabled = true;
      cancelButton.disabled = true;
    }
  }
}

// Confirmar compras pendientes
function confirmSale() {
  let clickedButton = this;
  let buttonID = clickedButton.id;
  let salePosition = Number(buttonID.substring(8));
  let currentSale = mainApp.salesList[salePosition];

  if (currentSale.product.stock - currentSale.amountPurchased >= 0) {
    currentSale.buyer.balance -=
      currentSale.amountPurchased * currentSale.product.price;
    currentSale.product.stock -= currentSale.amountPurchased;
    currentSale.purchaseStatus = "Aprobada";
    clickedButton.disabled = true;
  } else {
    alert("No hay stock suficiente para procesar esta orden de compra");
  }

  showSales();
}

// Cancelar compras pendientes
function cancelSale() {
  let clickedButton = this;
  let buttonID = clickedButton.id;
  let salePosition = Number(buttonID.substring(7));
  let currentSale = mainApp.salesList[salePosition];

  currentSale.purchaseStatus = "Cancelada";
  clickedButton.disabled = true;

  showSales();
}

// Genera la tabla con las ventas al hacer click en el botón de ver ganancias
function generateEarningsTable(salesList) {
  let earningsListContainer = document.querySelector("#earnings-list");
  let HTMLtable = "<table border='1' align='center'>";
  HTMLtable += `<tr>
                  <th>Nombre comprador</th>
                  <th>Nombre producto</th>
                  <th>Unidades compradas</th>
                  <th>Total</th>
                </tr>`;

  for (let i = 0; i < salesList.length; i++) {
    let saleItem = salesList[i];
    if (saleItem.purchaseStatus === "Aprobada") {
      HTMLtable += `<tr>
                      <td>${saleItem.buyer.username}</td>
                      <td>${saleItem.product.name}</td>
                      <td>${saleItem.amountPurchased}</td>
                      <td>${saleItem.amountPurchased * saleItem.product.price} USD</td>
                    </tr>`;
    }
  }
  HTMLtable += "</table>";
  earningsListContainer.innerHTML = HTMLtable;
}

// Hace el calculo de las ganancias totales al hacer click en el botón de ver ganancias
function calculateTotalEarningsAndPurchases(salesList) {
  let totalEarnings = 0;
  let totalPurchase = 0;
  for (let i = 0; i < salesList.length; i++) {
    let saleItem = salesList[i];
    if (saleItem.purchaseStatus === "Aprobada") {
      totalEarnings += saleItem.amountPurchased * saleItem.product.price;
      totalPurchase += saleItem.amountPurchased;
    }
  }
  document.querySelector("#total-earnings").innerHTML = `Ganancias totales: ${totalEarnings} USD <br> Unidades Compradas: ${totalPurchase}`;
}

// Función que llama las dos funciones anteriores y muestra ambas
function showEarnings() {
  let salesList = mainApp.salesList;
  generateEarningsTable(salesList);
  calculateTotalEarningsAndPurchases(salesList);
}

// Filtrar ventas según estado: vista administrador
function showFilterSales() {
  let salesFilter = document.querySelector("#sales-actions").value;
  let HTMLtable = "";

  switch (salesFilter) {
    case "Aprobadas":
      let approved = mainApp.salesList.filter(
        (Sale) => Sale.purchaseStatus === "Aprobada"
      );
      HTMLtable = "<table border='1' align='center'>";
      HTMLtable += `<tr>
                      <th>Nombre comprador</th>
                      <th>Balance comprador</th>
                      <th>Unidades</th>
                      <th>Nombre producto</th>
                      <th>Stock disponible</th>
                      <th>Estado compra</th>
                   </tr>`;
      for (let i = 0; i < approved.length; i++) {
        let loadingItem = approved[i];
        HTMLtable += `<tr>
                        <td>${loadingItem.buyer.username}</td>
                        <td>${loadingItem.buyer.balance} USD</td>
                        <td>${loadingItem.amountPurchased}</td>
                        <td>${loadingItem.product.name}</td>
                        <td>${loadingItem.product.stock}</td>
                        <td>${loadingItem.purchaseStatus}</td>
                      </tr>`;
      }
      HTMLtable += "</table>";
      document.querySelector("#sales-list").innerHTML = HTMLtable;
      break;

    case "Pendientes":
      let pending = mainApp.salesList.filter(
        (Sale) => Sale.purchaseStatus === "Pendiente"
      );
      HTMLtable = "<table border='1' align='center'>";
      HTMLtable += `<tr>
                      <th>Nombre comprador</th>
                      <th>Balance comprador</th>
                      <th>Unidades</th>
                      <th>Nombre producto</th>
                      <th>Stock disponible</th>
                      <th>Estado compra</th>
                    </tr>`;
      for (let i = 0; i < pending.length; i++) {
        let loadingItem = pending[i];
        HTMLtable += `<tr>
                        <td>${loadingItem.buyer.username}</td>
                        <td>${loadingItem.buyer.balance} USD</td>
                        <td>${loadingItem.amountPurchased}</td>
                        <td>${loadingItem.product.name}</td>
                        <td>${loadingItem.product.stock}</td>
                        <td>${loadingItem.purchaseStatus}</td>
                      </tr>`;
      }
      HTMLtable += "</table>";
      document.querySelector("#sales-list").innerHTML = HTMLtable;
      break;

    case "Canceladas":
      let cancelled = mainApp.salesList.filter(
        (Sale) => Sale.purchaseStatus === "Cancelada"
      );
      HTMLtable = "<table border='1' align='center'>";
      HTMLtable += `<tr>
                      <th>Nombre comprador</th>
                      <th>Balance comprador</th>
                      <th>Unidades</th>
                      <th>Nombre producto</th>
                      <th>Stock disponible</th>
                      <th>Estado compra</th>
                </tr>`;
      for (let i = 0; i < cancelled.length; i++) {
        let loadingItem = cancelled[i];
        HTMLtable += `<tr>
                        <td>${loadingItem.buyer.username}</td>
                        <td>${loadingItem.buyer.balance} USD</td>
                        <td>${loadingItem.amountPurchased}</td>
                        <td>${loadingItem.product.name}</td>
                        <td>${loadingItem.product.stock}</td>
                        <td>${loadingItem.purchaseStatus}</td>
                      </tr>`;
      }
      HTMLtable += "</table>";
      document.querySelector("#sales-list").innerHTML = HTMLtable;
      break;

    default:
      showSales();
  }
}

// Funciones del panel del usuario
// Crear tabla con los productos visibles para el usuario
function productsTableUser() {
  let HTMLtable = "<table border='1' align='center'>";

  HTMLtable += `<tr>
                <th>Nombre</th>
                <th>Precio</th>
                <th>Descripcion</th>
                <th>Imagen</th>
                <th>Stock</th>
                <th>Unidades</th>
                <th>Comprar</th>
            </tr>`;

  for (let i = 0; i < mainApp.productList.length; i++) {
    let loadingItem = mainApp.productList[i];
    let loadingSale = loadingItem.onSale ? 'En Oferta' : '';
    if (mainApp.productList[i].status) {
      HTMLtable += `<tr>
                  <td>${loadingItem.name}</td>
                  <td>${loadingItem.price} <br> <span style="color: red;">${loadingSale}</span></td>
                  <td>${loadingItem.description}</td>
                  <td><img src="img/${loadingItem.image}"></td>
                  <td>${loadingItem.stock}</td>    
                  <td><input type='number' id='products-list-stock${+i}' placeholder='Cantidad de unidades'></td>
                  <td><input type='button' value='Comprar' id='purchaseP${+i}'></td>
              </tr>`;
    }
  }
  HTMLtable += "</table>";

  document.querySelector("#products-list-user").innerHTML = HTMLtable;
  document.querySelector("#products-list-user").style.display = "block";

  for (let i = 0; i < mainApp.productList.length; i++) {
    let purchaseButton = document.querySelector("#purchaseP" + i);
    if (purchaseButton) {
      purchaseButton.addEventListener("click", buyProduct);
    }
  }
}

// Función crear orden de compra
function buyProduct() {
  let clickedButton = this;

  let buttonID = clickedButton.id;

  let productPosition = Number(buttonID.substring(9));
  let currentProduct = mainApp.productList[productPosition];
  let amountPurchased = Number(
    document.querySelector("#products-list-stock" + productPosition).value
  );

  if (currentProduct.stock >= 1) {
    mainApp.createSale(mainApp.loggedUser, currentProduct, amountPurchased);
  } else {
    alert("No hay suficientes unidades como para realizar este pedido");
  }
  productsTableUser();
}


// Mostrar historial de compras: vista usuario
function showUserPurchases() {
  let showPurchasesContainer = document.querySelector("#user-purchases-list");
  let totalSpent = 0;
  let totalUnits = 0;

  // Calcular total gastado por usuario + unidades compradas para mostrarlas posteriormente
  for (let i = 0; i < mainApp.salesList.length; i++) {
    if (mainApp.salesList[i].buyer.username === mainApp.loggedUser.username && mainApp.salesList[i].purchaseStatus === "Aprobada") {
      totalUnits = totalUnits + mainApp.salesList[i].amountPurchased;
      totalSpent = totalSpent + mainApp.salesList[i].amountPurchased * mainApp.salesList[i].product.price;
    }
  }

  // Crear tabla
  let HTMLtable = "<table border='1' align='center'>";
  HTMLtable += `<tr>
                  <th>Nombre producto</th>
                  <th>Unidades</th>
                  <th>Precio</th>
                  <th>Estado compra</th>
                  <th>Acción</th>
              </tr>`;

  for (let i = 0; i < mainApp.salesList.length; i++) {
    let loadingItem = mainApp.salesList[i];

    if (loadingItem.buyer.username == mainApp.loggedUser.username) {
      let totalPrice = loadingItem.product.price * loadingItem.amountPurchased;
      totalSpent += totalPrice;
      totalUnits += loadingItem.amountPurchased;

      HTMLtable += `<tr>
                      <td>${loadingItem.product.name}</td>
                      <td>${loadingItem.amountPurchased}</td>
                      <td>${loadingItem.product.price * loadingItem.amountPurchased}</td>
                      <td>${loadingItem.purchaseStatus}</td>    
                      <td><input type='button' value='Cancelar' id='cancelP${i}'><br></td>
                    </tr>`;

      HTMLtable += `<tr><td colspan="5" align="right">Total gastado: ${totalSpent} - Unidades compradas: ${totalUnits}</td></tr>`;
      HTMLtable += `<tr><td colspan="5" align="right">Saldo restante: ${mainApp.loggedUser.balance}</td></tr>`;
    }
  }

  HTMLtable += "</table>";

  showPurchasesContainer.innerHTML = HTMLtable;

  for (let i = 0; i < mainApp.salesList.length; i++) {
    if (mainApp.salesList[i].buyer.username === mainApp.loggedUser.username) {
      let cancelButton = document.querySelector("#cancelP" + i);

      if (
        mainApp.salesList[i].purchaseStatus === "Cancelada" ||
        mainApp.salesList[i].purchaseStatus === "Aprobada"
      ) {
        cancelButton.disabled = true;
      }

      if (mainApp.salesList[i].purchaseStatus === "Pendiente") {
        cancelButton.addEventListener("click", cancelPendingSale);
      }
    }
  }
}

// Cancelar compra pendiente: vista usuario (al hacer click en panel de historial compras)
function cancelPendingSale() {
  let clickedButton = this;
  let buttonID = clickedButton.id;
  let salePosition = Number(buttonID.substring(7));
  let currentSale = mainApp.salesList[salePosition];

  if (currentSale.purchaseStatus === "Pendiente") {
    currentSale.purchaseStatus = "Cancelada";
    showUserPurchases();
    clickedButton.disabled = true;
  } else {
    clickedButton.disabled = false;
  }
}



// Funciones de visibilidad
// Se ejecuta al inicio y al logout. Esconde el header de vista administrador
function hideHeaderHiddenActions() {
  document.querySelector("#header-hidden-actions").style.display = "none";
  document.querySelector("#header-sales-actions").style.display = "none";
}

// Se ejecuta al inicio y al logout. Esconde el header de vista usuario
function hideUserHiddenActions() {
  document.querySelector("#header-hidden-actions-user").style.display = "none";
}

// Al hacer login como admin se muestra el header y opciones  de administrador
function showAdminFunctions() {
  document.querySelector("#header-hidden-actions").style.display = "block";
}

// Al hacer login como usuario se muestra el header y opciones de usuario
function showUserFunctions() {
  document.querySelector("#header-hidden-actions-user").style.display = "block";
}

// Prende y apaga la vista de la lista de compras al usuario
function toggleUserPurchases() {
  let userPurchasesContainer = document.getElementById("user-purchases-list");

  if (userPurchasesContainer.style.display === "none") {
    userPurchasesContainer.style.display = "block";
  } else {
    userPurchasesContainer.style.display = "none";
  }

  // Oculta todos los paneles que el usuario pudiese haber tenido abiertos previamente para que no se abran los dos al mismo tiempo
  document.querySelector("#create-products-container").style.display = "none";
  document.querySelector("#products-list").style.display = "none";
  document.querySelector("#products-list-user").style.display = "none";
  document.querySelector("#sales-list").style.display = "none";
  document.querySelector("#edit-product-options").style.display = "none";
  document.querySelector("#header-sales-actions").style.display = "none";
}

// Prende y apaga la vista de la lista de productos al admin
function showAndHideProducts() {
  productTableVisible = !productTableVisible;
  if (productTableVisible) {
    productsTableAdmin();
  } else {
    document.querySelector("#products-list").style.display = "none";
  }

  // Oculta todos los paneles que el usuario pudiese haber tenido abiertos previamente para que no se abran los dos al mismo tiempo
  document.querySelector("#create-products-container").style.display = "none";
  document.querySelector("#sales-list").style.display = "none";
  document.querySelector("#earnings-list-and-text").style.display = "none";
  document.querySelector("#header-sales-actions").style.display = "none";
  document.querySelector("#user-purchases-list").style.display = "none";
}

// Prende y apaga la vista de la lista de productos al usuario
function showAndHideProductsUser() {
  productTableUserVisible = !productTableUserVisible;
  if (productTableUserVisible) {
    productsTableUser();
  } else {
    document.querySelector("#products-list-user").style.display = "none";
  }

  document.querySelector("#user-purchases-list").style.display = "none";
}

// Prende y apaga la vista de la lista de ventas al admin
function toggleSalesListDisplay() {
  let salesContainer = document.getElementById("sales-list");
  let salesActions = document.getElementById("header-sales-actions");

  if (salesContainer.style.display === "block") {
    salesActions.style.display = "none";
    salesContainer.style.display = "none";
  } else {
    salesActions.style.display = "block";
    salesContainer.style.display = "block";
  }

  // Oculta todos los paneles que el usuario pudiese haber tenido abiertos previamente para que no se abran los dos al mismo tiempo
  document.querySelector("#create-products-container").style.display = "none";
  document.querySelector("#products-list").style.display = "none";
  document.querySelector("#earnings-list-and-text").style.display = "none";
  document.querySelector("#edit-product-options").style.display = "none";
  document.querySelector("#user-purchases-list").style.display = "none";
}

// Prende y apaga la vista de creación de productos al admin
function showAndHideCreateProducts() {
  createProductsVisible = !createProductsVisible;
  if (createProductsVisible) {
    document.querySelector("#create-products-container").style.display =
      "block";
  } else {
    document.querySelector("#create-products-container").style.display = "none";
  }

  // Oculta todos los paneles que el usuario pudiese haber tenido abiertos previamente para que no se abran los dos al mismo tiempo
  document.querySelector("#products-list").style.display = "none";
  document.querySelector("#sales-list").style.display = "none";
  document.querySelector("#earnings-list-and-text").style.display = "none";
  document.querySelector("#header-sales-actions").style.display = "none";
  document.querySelector("#user-purchases-list").style.display = "none";
}

// Prende y apaga la vista de la lista con las ganancias al admin
function toggleEarningsDisplay() {
  let earningsContainer = document.getElementById("earnings-list-and-text");

  if (earningsContainer.style.display === "block") {
    earningsContainer.style.display = "none";
  } else {
    earningsContainer.style.display = "block";
  }

  // Oculta todos los paneles que el usuario pudiese haber tenido abiertos previamente para que no se abran los dos al mismo tiempo
  document.querySelector("#create-products-container").style.display = "none";
  document.querySelector("#products-list").style.display = "none";
  document.querySelector("#sales-list").style.display = "none";
  document.querySelector("#edit-product-options").style.display = "none";
  document.querySelector("#header-sales-actions").style.display = "none";
  document.querySelector("#user-purchases-list").style.display = "none";
}