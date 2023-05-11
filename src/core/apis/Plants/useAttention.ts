import firestore from '@react-native-firebase/firestore';
import {useEffect, useState} from 'react';

const useAttention = (status?: string) => {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let query = firestore().collection('attention');

    if (status) {
      query = query.where('status', '==', status);
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
  }, [status]);

  return {
    loading,
    data,
  };
};

export default useAttention;
