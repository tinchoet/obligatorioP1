window.addEventListener("load", register);
function register() {
  document
    .querySelector("#register-button")
    .addEventListener("click", registerFunction);
}

function registerFunction() {
  let firstName = document.querySelector("#register-name").value;
  let lastName = document.querySelector("#register-surname").value;
  let username = document.querySelector("#register-username").value;
  let password = document.querySelector("#register-password").value;
  let creditCard = document.querySelector("#register-card").value;
  let cvc = Number(document.querySelector("#register-cvc").value);

  let errorMessage = "";
  let successMessage = "";

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
      errorMessage +=
        "La contraseña debe contener al menos 5 caracteres. <br />";
    }
    if (passwordUppercaseCount === 0) {
      errorMessage +=
        "La contraseña debe contener al menos una mayúscula. <br />";
    }
    if (passwordLowercaseCount === 0) {
      errorMessage +=
        "La contraseña debe contener al menos una minúscula. <br />";
    }
    if (passwordNumberCount === 0) {
      errorMessage += "La contraseña debe contener al menos un número.";
    }
  } else {
    errorMessage = "";
    successMessage = `El registro fue un exito. Tu contraseña es: ${password}`
  }

  document.querySelector("#register-errorMessage").innerHTML = errorMessage;
  document.querySelector("#register-success").innerHTML = successMessage;
}
