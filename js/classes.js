class App {
  constructor() {
    this.userList = new Array();
    this.productList = new Array();
    this.loggedUser = null;
  }

  preloadUsers() {
    let preloadedUser = new User(
      "Usuario administrador",
      "",
      "admin",
      "admin",
      "",
      "",
      true
    );
    this.userList.push(preloadedUser);
    preloadedUser = new User(
      "Martin",
      "Leib",
      "mleib",
      "Password123",
      "3566002020360505",
      "821",
      false
    );
    this.userList.push(preloadedUser);
    preloadedUser = new User(
      "Martín",
      "Etchebarne",
      "tinchoet",
      "Password123",
      "4012888888881881",
      "652",
      false
    );
    this.userList.push(preloadedUser);
    preloadedUser = new User(
      "Juan",
      "Perez",
      "jperez",
      "Password123",
      "6011000990139424",
      "362",
      false
    );
    this.userList.push(preloadedUser);
    preloadedUser = new User(
      "Carlos",
      "Rodriguez",
      "crodriguez",
      "Password123",
      "38520000023237",
      "990",
      false
    );
    this.userList.push(preloadedUser);
    preloadedUser = new User(
      "Marcos",
      "Gonzales",
      "mgonzales",
      "Password123",
      "378734493671000",
      "119",
      false
    );
    this.userList.push(preloadedUser);

    console.log(
      `Cantidad de usuarios en la base de datos: ${this.userList.length}.`
    );
    console.log(this.userList);
  }

  preloadProducts() {
    let id = this.productList.id;
    let preloadedProduct = new Product(
      "Air Zoom Pegasus",
      100,
      "Descripción del producto",
      "nike-air-zoom-pegasus.webp",
      7,
      true
    );
    this.productList.push(preloadedProduct);
    preloadedProduct = new Product(
      "Air Zoom Pegasus Shield",
      100, // precio
      "Descripción del producto",
      "nike-air-zoom-pegasus-shield.webp",
      4, // stock
      true // apagado o prendido
    );
    this.productList.push(preloadedProduct);
    preloadedProduct = new Product(
      "Air Zoom Structure",
      100,
      "Descripción del producto",
      "nike-air-zoom-structure.webp",
      8,
      false
    );
    this.productList.push(preloadedProduct);
    preloadedProduct = new Product(
      "Legend Essential 3",
      100,
      "Descripción del producto",
      "nike-legend-essential-3.webp",
      11,
      false
    );
    this.productList.push(preloadedProduct);
    preloadedProduct = new Product(
      "Quest 5",
      100,
      "Descripción del producto",
      "nike-quest-5.webp",
      21,
      true
    );
    this.productList.push(preloadedProduct);
  }

  productPush(
    pProductName,
    pProductPrice,
    pProductDescription,
    pFilePath,
    pProductStock
  ) {
    let newProduct = new Product(
      pProductName,
      pProductPrice,
      pProductDescription,
      pFilePath,
      pProductStock
    );
    this.productList.push(newProduct);
  }

  createNewUser(
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
      false
    );
    this.userList.push(newUser);
  }
}

class User {
  constructor(
    pFirstName,
    pLastName,
    pUsername,
    pPassword,
    pCreditCard,
    pCvc,
    pPower
  ) {
    this.firstName = pFirstName;
    this.lastName = pLastName;
    this.username = pUsername;
    this.password = pPassword;
    this.creditCard = pCreditCard;
    this.cvc = pCvc;
    this.balance = 3000;
    // Tipo de usuario. True es admin, false es user
    this.power = pPower;
  }
}
let productCounter = 1;
class Product {
  constructor(pName, pPrice, pDescription, pImage, pStock, pStatus) {
    this.name = pName;
    this.price = pPrice;
    this.description = pDescription;
    this.image = pImage;
    this.stock = pStock;
    this.status = pStatus;
    this.id = "PROD_ID_" + productCounter;
    productCounter++;
  }
}
