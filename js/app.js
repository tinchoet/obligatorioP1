window.addEventListener("load", init);

function init() {
  document.querySelector("#hideLogin").addEventListener("click", showRegister); // función para esconder login al hacer click en 'registrarse'
  document
    .querySelector("#register-button")
    .addEventListener("click", registerFunction); // función para validar registro
  document
    .querySelector("#arrow-container")
    .addEventListener("click", showLogin); // función para mostrar login al clickear en la flecha para ir hacia atrás en el registro
}

function showRegister() {
  document.querySelector("#login-container").style.display = "none";
  document.querySelector("#register-container").style.display = "block";
  document.querySelector("#arrow-container").style.display = "block"; // flecha para ir hacia atrás
  document.querySelector("#logo-container").style.display = "block"; // logo de la tienda
}

// Mostrar el LogIn al hacer click en la flecha para ir hacia atrás en el registro
function showLogin() {
  document.querySelector("#login-container").style.display = "block";
  document.querySelector("#register-container").style.display = "none";
  document.querySelector("#arrow-container").style.display = "none"; // flecha para ir hacia atrás
  document.querySelector("#logo-container").style.display = "none"; // logo de la tienda
}

// Funcion para validar el registro del usuario
function registerFunction() {
  let firstName = document.querySelector("#register-name").value;
  let lastName = document.querySelector("#register-surname").value;
  let username = document.querySelector("#register-username").value;
  let password = document.querySelector("#register-password").value;
  let creditCard = Number(document.querySelector("#register-card").value);
  let cvc = Number(document.querySelector("#register-cvc").value);

  validateName(firstName, lastName);
  validatePassword(password);
  // validateCard(creditCard);

  if (
    firstName == "" ||
    lastName == "" ||
    username == "" ||
    password == "" ||
    creditCard == "" ||
    cvc == ""
  ) {
    alert("Completa todos los campos");
  }
}

function validateName(firstName, lastName) {
  let nameValidated = false;

  if (
    firstName.charAt(0) != firstName.charAt(0).toLowerCase() ||
    lastName.charAt(0) != lastName.charAt(0).toLowerCase()
  ) {
    errorMessage = "El Nombre y Apellido deben comenzar en mayúsculas <br>";
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
      errorMessage += "La contraseña debe contener al menos 5 caracteres. <br>";
    }
    if (passwordUppercaseCount === 0) {
      errorMessage +=
        "La contraseña debe contener al menos una mayúscula. <br>";
    }
    if (passwordLowercaseCount === 0) {
      errorMessage +=
        "La contraseña debe contener al menos una minúscula. <br>";
    }
    if (passwordNumberCount === 0) {
      errorMessage += "La contraseña debe contener al menos un número.";
    }
  } else {
    errorMessage = "";
    successMessage = "";
    let passwordValidated = true;
  }

  document.querySelector("#register-errorMessage").innerHTML = errorMessage;
  document.querySelector("#register-success").innerHTML = successMessage;
  return passwordValidated;
}
// function validateCard(creditCard) {
//   for (let i = creditCard.length; i <= 0; i--) {
//     // tengo que convertir el string a un array AY DIO MIO
//   }
// }