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
  
  document.querySelector("#register-error").innerHTML = "";

  if (
    validateName(firstName, lastName) === true &&
    validateUsername(username) === true &&
    validatePassword(password) === true &&
    validateCard(creditCard) === true &&
    validateCVC(cvc) === true &&
    checkVoidInputs === false
  ) {
    createNewUser(firstName, lastName, password, username, creditCard, cvc);
    document.querySelector("#register-success").innerHTML =
      "Usuario registrado con éxito";
  }
}

function validateName(firstName, lastName) {
  let nameValidated = false;

  if (
    firstName.charAt(0) === firstName.charAt(0).toLowerCase() ||
    lastName.charAt(0) === lastName.charAt(0).toLowerCase()
  ) {
    document.querySelector("#register-error").innerHTML =
      "El Nombre y Apellido deben comenzar en mayúsculas <br>";
  } else {
    nameValidated = true;
  }

  return nameValidated;
}

function validatePassword(password) {
  let passwordValidated = false;
  let passwordUppercaseCount = 0;
  let passwordLowercaseCount = 0;
  let passwordNumberCount = 0;

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
      document.querySelector("#register-error").innerHTML +=
        "La contraseña debe contener al menos 5 caracteres. <br>";
    }
    if (passwordUppercaseCount === 0) {
      document.querySelector("#register-error").innerHTML +=
        "La contraseña debe contener al menos una mayúscula. <br>";
    }
    if (passwordLowercaseCount === 0) {
      document.querySelector("#register-error").innerHTML +=
        "La contraseña debe contener al menos una minúscula. <br>";
    }
    if (passwordNumberCount === 0) {
      document.querySelector("#register-error").innerHTML +=
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
    document.querySelector("#register-error").innerHTML +=
    "La tarjeta ingresada es incorrecta. <br>"
  }

  return cardValidated;
}

function validateUsername(username) {
  let usernameValidated = true;

  for (let i = 0; i < mainApp.userList.length; i++) {
    if (username === mainApp.userList[i].username) {
      usernameValidated = false;
    } else {
      document.querySelector("#register-error").innerHTML +=
      "El nombre de usuario ya existe. <br>";
    }
  }

  return usernameValidated;
}

function validateCVC(cvc) {
  let cvcValidated = false;
  
  for (let i = 0; i < cvc.length; i++) {
    if (cvc.length === 3) {
      cvcValidated = true;
    } else {
      document.querySelector("#register-error").innerHTML +=
      "El CVC solamente puede tener 3 digitos"
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

  if (
    input1 === "" ||
    input2 === "" ||
    input3 === "" ||
    input4 === "" ||
    input5 === "" ||
    input6 === ""
  ) {
    voidInputs = true;
    document.querySelector("#register-error").innerHTML += "No pueden haber campos vacios. <br>";
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
