export type PlantStatus = 'good' | 'ok' | 'danger';
export type Plants = {
  plantName: string;
  scientificName: string;
  wateringFrequency: string;
  sunlightRequirements: string;
  idealTemperatureRange: string;
  maturePlantHeight: string;
  growthRate: string;
  soilTypePreference: string;
  fertilizationNeeds: string;
  propagationMethod: string;
  imageUrl: string;
  status: PlantStatus;
  position: Record<string, number>;
};
