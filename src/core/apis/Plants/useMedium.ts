import {useEffect, useState} from 'react';
import firestore from '@react-native-firebase/firestore';

const useMedium = (category?: string) => {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let query = firestore().collection('medium');

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

export {useMedium};
