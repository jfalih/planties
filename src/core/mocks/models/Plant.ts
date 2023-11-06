class Plant {
  private name: string;
  private banner: string;
  private status: string;

  constructor(name, banner, status) {
    this.name = name;
    this.banner = banner;
    this.status = status;
  }

  public getAllPlants(plantList) {
    return plantList;
  }

  public static updatePlant(plantList, plantName, updatedPlant) {
    const index = plantList.findIndex(plant => plant.name === plantName);
    if (index !== -1) {
      plantList[index] = updatedPlant;
      return updatedPlant;
    } else {
      console.log(`Plant with name '${plantName}' not found`);
      return null;
    }
  }

  public static deletePlant(plantList, plantName) {
    const index = plantList.findIndex(plant => plant.name === plantName);
    if (index !== -1) {
      const deletedPlant = plantList.splice(index, 1);
      return deletedPlant[0];
    } else {
      console.log(`Plant with name '${plantName}' not found`);
      return null;
    }
  }
}

export default Plant;
