window.addEventListener("load", init);

function init() {
  document
    .querySelector("#hideLogin").addEventListener("click", showRegister); // esconder login al hacer click en 'registrarse'
  document
    .querySelector("#register-button")
    .addEventListener("click", registerFunction); // función registro
  document
    .querySelector("#login-button")
    .addEventListener("click", loginFunction); // función login
  document
    .querySelector("#arrow-container")
    .addEventListener("click", showLogin); // mostrar login al clickear en la flecha para ir hacia atrás en el registro
  document
    .querySelector("#register-success-login")
    .addEventListener("click", showLogin); // mostrar login al hacer click en 'iniciar sesión' post-registro
  preloadUsers();
}

function showRegister() {
  document.querySelector("#login-container").style.display = "none"; // esconde login
  document.querySelector("#register-container").style.display = "flex"; // muestra registro
  document.querySelector("#arrow-container").style.display = "block"; // flecha para ir hacia atrás
  document.querySelector("#logo-container").style.display = "block"; // logo de la tienda
}

function showLogin() {
  document.querySelector("#login-container").style.display = "flex"; // muestra login
  document.querySelector("#register-container").style.display = "none"; // esconde registro
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
      createNewUser(firstName, lastName, username, password, creditCard, cvc);
      document.querySelector("#register-messages").innerHTML =
        "Usuario registrado con éxito";
      document.querySelector("#register-success-login").innerHTML =
        "Iniciar sesión";
      console.log('Usuario creado:' + mainApp.userList[length-1]);
    }
  } else {
    document.querySelector("#register-messages").innerHTML =
      "No pueden haber espacios vacíos";
  }
}

function loginFunction() {
  let username = document.querySelector("#login-username").value;
  let password = document.querySelector("#login-password").value;
  let foundUser = false;

  for (let i = 0; i < mainApp.userList.length; i++) {
    if (
      username === mainApp.userList[i].username &&
      password === mainApp.userList[i].password
      // busco si dentro de un mismo Objeto user hay un nombre y contraseña
      // coincidente con la que acabo de ingresar
    ) {
      mainApp.loggedUser = mainApp.userList[i];
      document.querySelector("#login-messages").innerHTML = "Login con exito";
      foundUser = true;
    }
  }

  if (!foundUser) {
    document.querySelector("#login-messages").innerHTML =
      "Credenciales incorrectas, intenta otra vez";
  }
}

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

function validateCard(creditCard) {
  creditCard = creditCard.toString(); // convierto a string para tratar el número de forma más consistente

  let addedUpNumber = 0;
  let cardValidated = false;

  document.querySelector("#register-error-card").innerHTML = "";

  // recorrer string de derecha a izquierda
  for (let pos = creditCard.length - 1; pos >= 0; pos--) {
    let digit = Number(creditCard.charAt(pos));

    // verificar si la posición actual (contando desde la derecha) es par
    if ((creditCard.length - pos) % 2 === 0) {
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

function preloadUsers() {
  let preloadedUser = new User(
    "Usuario administrador",
    "",
    "admin",
    "admin",
    "",
    "",
    "sudo"
  );
  mainApp.userList.push(preloadedUser);
  preloadedUser = new User(
    "Martin",
    "Leib",
    "mleib",
    "Password1!",
    "3566002020360505",
    "821",
    "user"
  );
  mainApp.userList.push(preloadedUser);
  preloadedUser = new User(
    "Martín",
    "Etchebarne",
    "tinchoet",
    "Password1!",
    "4012888888881881",
    "652",
    "user"
  );
  mainApp.userList.push(preloadedUser);
  preloadedUser = new User(
    "Juan",
    "Perez",
    "jperez",
    "Password1!",
    "6011000990139424",
    "362",
    "user"
  );
  mainApp.userList.push(preloadedUser);
  preloadedUser = new User(
    "Carlos",
    "Rodriguez",
    "crodriguez",
    "Password1!",
    "38520000023237",
    "990",
    "user"
  );
  mainApp.userList.push(preloadedUser);
  preloadedUser = new User(
    "Marcos",
    "Gonzales",
    "mgonzales",
    "Password1!",
    "378734493671000",
    "119",
    "user"
  );
  mainApp.userList.push(preloadedUser);

  console.log(
    `Cantidad de usuarios en la base de datos: ${mainApp.userList.length}.`
  );
  console.log(mainApp.userList);
}

function createNewUser(
  firstName,
  lastName,
  username,
  password,
  creditCard,
  cvc
) {
  let newUser = new User(
    firstName,
    lastName,
    username,
    password,
    creditCard,
    cvc,
    "user"
  );
  mainApp.userList.push(newUser);
}
