class System {
  constructor() {
    let arrayUserbase = [];
    let arrayProducts = [];
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
    this.power = pPower // tipo de usuario. root o user
  }
}

class Products {
    constructor(pName, pPrice, pDescription, pImage, pStock) {
      this.name = pName;
      this.price = pPrice;
      this.description = pDescription;
      this.image = pImage;
      this.stock = pStock;
    }
  }
  