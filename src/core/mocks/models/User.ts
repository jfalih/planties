import auth from '@react-native-firebase/auth';

class User {
  private id: string;
  private username: string;
  private email: string;
  private password: string;
  private fullname: string;
  private profileimage: string;

  constructor(
    id: string,
    username: string,
    email: string,
    password: string,
    fullname: string,
    profileimage: string,
  ) {
    this.id = id;
    this.username = username;
    this.email = email;
    this.password = password;
    this.fullname = fullname;
    this.profileimage = profileimage;
  }

  // Function to verify if a username is available
  private async verifyAvailableUsername(usernameToCheck) {
    try {
      // Check if the username is already in use
      const user = await auth().fetchSignInMethodsForEmail(usernameToCheck);
      // If the username exists, it's not available
      return false;
    } catch (error) {
      // If the username doesn't exist, it's available
      return true;
    }
  }

  // Function to verify if an email is available
  private async verifyAvailableEmail(emailToCheck) {
    try {
      // Check if the email is already in use
      const user = await auth().fetchSignInMethodsForEmail(usernameToCheck);
      // If the email exists, it's not available
      return false;
    } catch (error) {
      // If the email doesn't exist, it's available
      return true;
    }
  }

  // Method to add a new user and return the added user
  public async addUser(newUser: User) {
    try {
      const userCredential = await auth().createUserWithEmailAndPassword(
        newUser.email,
        newUser.password,
      );
      const user = userCredential.user;
      return user;
    } catch (error) {
      // Handle any registration errors here
      console.error('Error adding user:', error);
      return null;
    }
  }

  // Method to get the password for a given username
  private async getPasswordByUsername(usernameToFind) {
    try {
      // Retrieve user by their email (username)
      const user = await firebase.auth().getUserByEmail(usernameToFind);
      return user.password;
    } catch (error) {
      console.error('Error getting password:', error);
      return null;
    }
  }

  // Method to get the user ID for a given username
  private async getIdByUsername(usernameToFind) {
    try {
      const user = await auth().fetchSignInMethodsForEmail(usernameToFind);
      if (user.length > 0) {
        return user[0]; // Return the user's UID
      } else {
        return 'User not found';
      }
    } catch (error) {
      console.error('Error getting user ID:', error);
      return null;
    }
  }
}

export default User;
