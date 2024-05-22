window.addEventListener("load", init);

function init() { //CAMBIE EL NOMBRE DE LA FUNCION PARA METER TODOS LOS BOTONES ACA Y OTRAS FUNCIONES QUE TENGAMOS QUE CARGAR ENSEGUIDA QUE CARGUE LA PAGINA

  document.querySelector("#hideLogin").addEventListener("click", showRegister); // función para esconder login al hacer click en 'registrarse'
  document.querySelector("#register-button").addEventListener("click", registerFunction); // función para validar registro
  document.querySelector("#arrow-container").addEventListener("click", showLogin); // función para mostrar login al clickear en la flecha para ir hacia atrás en el registro
}

//Listas que necesitamos para almacenar los datos de los objetos.
//Agregar mas a medida que las necesitemos.
const arrayAdmins = [{
  username: 'admin',
  password: 'admin'
}];

const arrayProducts = [];
let arrayUsers = [];
let arrayShopping = [];

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
  let creditCard = document.querySelector("#register-card").value;
  let cvc = Number(document.querySelector("#register-cvc").value);

  let errorMessage = "";
  let successMessage = "";

  let passwordUppercaseCount = 0;
  let passwordLowercaseCount = 0;
  let passwordNumberCount = 0;

  // Verificación contraseña
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
        "La contraseña debe contener al menos 5 caracteres. <br>";
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
    successMessage = `El registro fue un exito. Tu contraseña es: ${password}`
  }

  //verificación del nombre

  
  document.querySelector("#register-errorMessage").innerHTML = errorMessage;
  document.querySelector("#register-success").innerHTML = successMessage;
}
