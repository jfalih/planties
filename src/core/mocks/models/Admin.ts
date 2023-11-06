import User from './User';
import database from '@react-native-firebase/firestore';

class Admin extends User {
  constructor(
    id: string,
    username: string,
    email: string,
    password: string,
    fullname: string,
    profileimage: string,
  ) {
    super(id, username, email, password, fullname, profileimage);
  }

  // Method to get popular plant
  public async getPopularPlant() {
    const plantsRef = database().ref('plants');
    try {
      // Fetch data from the "users" node and count the number of children
      const snapshot = await plantsRef.once('value');
      const userCount = snapshot.numChildren();
      return userCount;
    } catch (error) {
      return null;
    }
  }

  // Method to get user count
  public async getUserCount() {
    const usersRef = database().ref('users');
    try {
      // Fetch data from the "users" node and count the number of children
      const snapshot = await usersRef.once('value');
      const userCount = snapshot.numChildren();
      return userCount;
    } catch (error) {
      return null;
    }
  }

  // Method to update leader oxygen
  public updateLeaderOxygen() {}
}

export default Admin;
