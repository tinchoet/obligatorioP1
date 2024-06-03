window.addEventListener("load", init);

function init() {
  document.querySelector("#hideLogin").addEventListener("click", showRegister); // función para esconder login al hacer click en 'registrarse'
  document
    .querySelector("#register-button")
    .addEventListener("click", registerFunction); // función para validar registro
  document
    .querySelector("#arrow-container")
    .addEventListener("click", showLogin); // función para mostrar login al clickear en la flecha para ir hacia atrás en el registro
  preloadUsers();
}

function showRegister() {
  document.querySelector("#login-container").style.display = "none";
  document.querySelector("#register-container").style.display = "block";
  document.querySelector("#arrow-container").style.display = "block"; // flecha para ir hacia atrás
  document.querySelector("#logo-container").style.display = "block"; // logo de la tienda
}

function showLogin() {
  document.querySelector("#login-container").style.display = "block";
  document.querySelector("#register-container").style.display = "none";
  document.querySelector("#arrow-container").style.display = "none"; // flecha para ir hacia atrás
  document.querySelector("#logo-container").style.display = "none"; // logo de la tienda
}

let mainApp = new App();

function registerFunction() {
  let firstName = document.querySelector("#register-name").value;
  let lastName = document.querySelector("#register-surname").value;
  let username = document.querySelector("#register-username").value;
  let password = document.querySelector("#register-password").value;
  let creditCard = document.querySelector("#register-card").value;
  let cvc = Number(document.querySelector("#register-cvc").value);

  validateName(firstName, lastName);
  validateUsername(username);
  validatePassword(password);
  validateCard(creditCard);
  validateCVC(cvc);
  checkVoidInputs(firstName, lastName, username, password, creditCard, cvc);

  if (
    nameValidated === true &&
    usernameExists === false &&
    passwordValidated === true &&
    cardValidated === true &&
    cvcValidated === true &&
    voidInputs === false
  ) {
    createNewUser(firstName, lastName, password, username, creditCard, cvc);
    document.querySelector("#register-success").innerHTML =
      "Usuario registrado con éxito";
  } else {
    document.querySelector("#register-success").innerHTML = "Hubo un problema con el registro del usuario. <br> Por favor, intente nuevamente.";
  }
}

function validateName(firstName, lastName) {
  let nameValidated = false;
  document.querySelector("#register-error-fullName").innerHTML = "";

  if (
    firstName.charAt(0) === firstName.charAt(0).toUpperCase() ||
    lastName.charAt(0) === lastName.charAt(0).toUpperCase()
  ) {
    nameValidated = true;
  } else if (firstName === "" || lastName === "") {
    document.querySelector("#register-error-fullName").innerHTML =
      "";
  } else {
    document.querySelector("#register-error-fullName").innerHTML =
    "El Nombre y Apellido deben comenzar en mayúsculas <br>";
  }

  return nameValidated;
}

function validateUsername(username) {
  let usernameExists = false;
  document.querySelector("#register-error-username").innerHTML = "";

  for (let i = 0; i < mainApp.userList.length; i++) {
    if (username === mainApp.userList[i].username) {
      usernameValidated = true;
      document.querySelector("#register-error-username").innerHTML =
      "El nombre de usuario ya existe. <br>";
    }
  }

  return usernameExists;
}

function validatePassword(password) {
  let passwordValidated = false;
  let passwordUppercaseCount = 0;
  let passwordLowercaseCount = 0;
  let passwordNumberCount = 0;
  document.querySelector("#register-error-password").innerHTML = "";

  for (let i = 0; i < password.length; i++) {
    if (password.charCodeAt(i) >= 65 && password.charCodeAt(i) <= 90) {
      passwordUppercaseCount++;
    }
    if (password.charCodeAt(i) >= 97 && password.charCodeAt(i) <= 122) {
      passwordLowercaseCount++;
    }
    if (!isNaN(password.charAt(i))) {
      passwordNumberCount++;
    }
  }

  if (
    password.length < 5 ||
    passwordLowercaseCount === 0 ||
    passwordUppercaseCount === 0 ||
    passwordNumberCount === 0
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

function validateCard(creditCard) {
  let addedUpNumber = 0;
  let cardValidated = false;
  document.querySelector("#register-error-card").innerHTML = "";
  
  for (let pos = creditCard.length - 1; pos >= 0; pos -= 2) {
    let digit = Number(creditCard.charAt(pos)) * 2;
    if (digit >= 10) {
      addedUpNumber += digit - 9;
    } else {
      addedUpNumber += digit;
    }
  }

  for (let pos = creditCard.length - 2; pos >= 0; pos -= 2) {
    addedUpNumber += Number(creditCard.charAt(pos));
  }

  if (addedUpNumber % 10 === 0) {
    cardValidated = true;
  } else {
    cardValidated = false;
    document.querySelector("#register-error-card").innerHTML =
      "La tarjeta ingresada es incorrecta. <br>";
  }

  return cardValidated;
}

function validateCVC(cvc) {
  let cvcValidated = false;
  let stringCVC = cvc.toString();
  document.querySelector("#register-error-cvc").innerHTML = "";

  for (let i = 0; i < stringCVC.length; i++) {
    if (stringCVC.length === 3) {
      cvcValidated = true;
    } else {
      document.querySelector("#register-error-cvc").innerHTML =
        "El CVC solamente puede tener 3 digitos";
    }
  }

  return cvcValidated;
}

function preloadUsers() {
  let preloadedUser = new User(
    "Martin",
    "Leib",
    "mleib",
    "1234",
    "4111111111111111",
    "999",
    "root"
  );
  mainApp.userList.push(preloadedUser);
  preloadedUser = new User(
    "Martin",
    "Etchebarne",
    "tinchoet",
    "1234",
    "4111111111111111",
    "999",
    "root"
  );
  mainApp.userList.push(preloadedUser);
  preloadedUser = new User(
    "Juan",
    "Perez",
    "jperez",
    "1234",
    "4111111111111111",
    "999",
    "user"
  );
  mainApp.userList.push(preloadedUser);
  preloadedUser = new User(
    "Carlos",
    "Rodriguez",
    "crodriguez",
    "1234",
    "4111111111111111",
    "999",
    "user"
  );
  mainApp.userList.push(preloadedUser);
  preloadedUser = new User(
    "Marcos",
    "Gonzales",
    "mgonzales",
    "1234",
    "4111111111111111",
    "999",
    "user"
  );
  mainApp.userList.push(preloadedUser);

  console.log(
    `Cantidad de usuarios en la base de datos: ${mainApp.userList.length}.`
  );
  console.log(mainApp.userList);
}

function checkVoidInputs(input1, input2, input3, input4, input5, input6) {
  let voidInputs = false;
  document.querySelector("#register-blank-inputs").innerHTML = "";

  if (
    input1 === "" ||
    input2 === "" ||
    input3 === "" ||
    input4 === "" ||
    input5 === "" ||
    input6 === ""
  ) {
    voidInputs = true;
    document.querySelector("#register-error-fullName").innerHTML = "";
    document.querySelector("#register-error-username").innerHTML = "";
    document.querySelector("#register-error-password").innerHTML = "";
    document.querySelector("#register-error-card").innerHTML = "";
    document.querySelector("#register-error-cvc").innerHTML = "";
    document.querySelector("#register-success").innerHTML = "";
    document.querySelector("#register-blank-inputs").innerHTML = "No pueden haber espacios vacios";
  }

  return voidInputs;
}

function createNewUser(
  firstName,
  lastName,
  password,
  username,
  creditCard,
  cvc
) {
  let newUser = new User(
    firstName,
    lastName,
    password,
    username,
    creditCard,
    cvc,
    "user"
  );
  mainApp.userList.push(newUser);
}
