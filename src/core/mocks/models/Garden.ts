import Plant from './Plant';

class Garden {
  constructor(name, type, photos = [], plants = [], reminders = []) {
    this.name = name;
    this.type = type;
    this.photos = photos;
    this.plants = plants;
    this.reminders = reminders;
  }

  addPhoto(photo) {
    if (photo instanceof Photo) {
      this.photos.push(photo);
    } else {
      console.log('Invalid photo object');
    }
  }

  getGardenDetail() {
    return this;
  }

  updateGarden(updatedGarden) {
    return updatedGarden;
  }

  getPlants() {
    return this.plants;
  }

  deletePlant(plantName) {
    const index = this.plants.findIndex(plant => plant.name === plantName);
    if (index !== -1) {
      const deletedPlant = this.plants.splice(index, 1);
      return deletedPlant[0];
    }
    return null;
  }

  addPlantToGarden(plantName, newPlant) {
    if (newPlant instanceof Plant) {
      const existingPlant = this.plants.find(plant => plant.name === plantName);
      if (existingPlant) {
        console.log(
          `A plant with the name '${plantName}' already exists in the garden.`,
        );
      } else {
        this.plants.push(newPlant);
      }
    } else {
      console.log('Invalid plant object');
    }
  }

  addReminder(reminder) {
    if (reminder instanceof Reminder) {
      this.reminders.push(reminder);
    } else {
      console.log('Invalid reminder object');
    }
  }

  getReminder(reminderDescription) {
    return this.reminders.find(
      reminder => reminder.description === reminderDescription,
    );
  }

  deleteReminder(reminderDescription) {
    const index = this.reminders.findIndex(
      reminder => reminder.description === reminderDescription,
    );
    if (index !== -1) {
      const deletedReminder = this.reminders.splice(index, 1);
      return deletedReminder[0];
    }
    return null;
  }
}
