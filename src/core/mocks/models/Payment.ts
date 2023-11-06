import Transaction from './Transaction';

class Payment extends Transaction {
  private nama: string;
  private fee: number;
  private logo: string;

  constructor(
    date: Date,
    shipment: any,
    address: any,
    cart: any,
    price: number,
    discount: number,
    nama: string,
    fee: number,
    logo: string,
  ) {
    super(date, shipment, address, cart, price, discount);
    this.nama = nama;
    this.fee = fee;
    this.logo = logo;
  }

  getNama(): string {
    return this.nama;
  }

  getFee(): number {
    return this.fee;
  }

  getLogo(): string {
    return this.logo;
  }
}

export default Payment;
