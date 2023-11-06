import User from './User';

class Client extends User {
  constructor(name, gardens = []) {
    this.name = name;
    this.gardens = gardens;
  }

  public addGarden(garden) {
    if (garden instanceof Garden) {
      this.gardens.push(garden);
    } else {
      console.log('Invalid garden object');
    }
  }

  public removeGarden(garden) {
    const index = this.gardens.indexOf(garden);
    if (index !== -1) {
      this.gardens.splice(index, 1);
    }
  }
}
