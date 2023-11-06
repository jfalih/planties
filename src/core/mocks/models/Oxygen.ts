class Oxygen {
  private oxygen: number;

  constructor(oxygen: number) {
    this.oxygen = oxygen;
  }

  public getOxygen(): number {
    return this.oxygen;
  }

  public setOxygen(oxygen: number): void {
    this.oxygen = oxygen;
  }
}

export default Oxygen;
