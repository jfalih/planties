import {useQuery} from '@tanstack/react-query';
import request from '../../http/request';
import url from '../../http/url';
import {useEffect, useState} from 'react';
import firestore from '@react-native-firebase/firestore';
import {PlantModel} from '../../mocks/models/PlantModel';

const plantsKey = {
  userPlant: url('https://planties.com', 'user/plants'),
};

const useRecommendationPlants = (category?: string) => {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let query = firestore().collection('plants');

    if (category) {
      const categoryDocRef = firestore().collection('categories').doc(category);
      query = query.where('category_id', '==', categoryDocRef);
    }

    const subscriber = query.onSnapshot(querySnapshot => {
      const data: any[] = [];
      querySnapshot.forEach(documentSnapshot => {
        data.push({
          ...documentSnapshot.data(),
          key: documentSnapshot.id,
        });
      });

      setData(data);
      setLoading(false);
    });
    // Unsubscribe from events when no longer in use
    return () => subscriber();
  }, [category]);

  return {
    loading,
    data,
  };
};

const usePlant = (plant: string) => {
  const [data, setData] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (plant) {
      let query = firestore().collection('plants').doc(plant);
      const subscriber = query.onSnapshot(querySnapshot => {
        setData({
          ...querySnapshot.data(),
          key: querySnapshot.id,
        });
        setLoading(false);
      });
      // Unsubscribe from events when no longer in use
      return () => subscriber();
    }
  }, [plant]);

  return {
    loading,
    data,
  };
};

const useUserPlants = () => {
  const result = useQuery([plantsKey.userPlant], () =>
    request(plantsKey.userPlant),
  );
  return result;
};

export {useUserPlants, usePlant, useRecommendationPlants};
