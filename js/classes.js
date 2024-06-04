class App {
  constructor() {
    this.userList = new Array();
    this.productList = new Array()
    this.loggedUser = null;
  }
}

class User {
  constructor(pFirstName, pLastName, pUsername, pPassword, pCreditCard, pCvc, pPower) {
    this.firstName = pFirstName;
    this.lastName = pLastName;
    this.username = pUsername;
    this.password = pPassword;
    this.creditCard = pCreditCard;
    this.cvc = pCvc;
    this.power = pPower;
    // tipo de usuario. sudo o user
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
    this.id = 'PROD_ID_' + productCounter;
    productCounter++;
  }
}
