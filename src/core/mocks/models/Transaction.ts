class Transaction {
  private date: Date;
  private shipment: any;
  private address: any;
  private cart: any;
  private price: number;
  private discount: number;

  constructor(
    date: Date,
    shipment: any,
    address: any,
    cart: any,
    price: number,
    discount: number,
  ) {
    this.date = date;
    this.shipment = shipment;
    this.address = address;
    this.cart = cart;
    this.price = price;
    this.discount = discount;
  }

  // New function to notify the user about the transaction
  public notifyUser() {
    console.log('Transaction has been completed.');
    // You can implement more specific notification logic here.
  }
}

export default Transaction;
