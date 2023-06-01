const getRandomNumber = (lowest: number, highest: number) => {
  return Math.floor(Math.random() * (highest - lowest + 1)) + lowest;
};

export const diseaseData = [
  {
    status: 'scab',
    watering: 5,
    prob: 0.05,
    sunlight: {
      text: 'Shade',
      value: getRandomNumber(-20, -10),
    },
    temp: {
      text: 'Cold',
      value: getRandomNumber(65, 70),
    },
  },
  {
    status: 'rust',
    watering: 5,
    prob: 0.05,
    sunlight: {
      text: 'Partial',
      value: getRandomNumber(-20, -10),
    },
    temp: {
      text: 'Warm',
      value: getRandomNumber(-10, -5),
    },
  },
  {
    status: 'healthy',
    watering: 10,
    prob: 0.9,
    sunlight: {
      text: 'Full',
      value: getRandomNumber(15, 40),
    },
    temp: {
      text: 'Normal',
      value: getRandomNumber(15, 20),
    },
  },
];
const randomStatus = () => {
  const total = diseaseData.reduce(function (acc, prob) {
    return acc + prob.prob;
  }, 0);

  var random = Math.random() * total;
  var cumulativeProb = 0;

  for (var i = 0; i < diseaseData.length; i++) {
    cumulativeProb += diseaseData[i].prob;

    if (random < cumulativeProb) {
      return diseaseData[i]; // Return the index of the selected value
    }
  }
};

export default randomStatus;
