import firestore from '@react-native-firebase/firestore';
import {useEffect, useState} from 'react';

const useDiagnose = (diagnose: string) => {
  const [data, setData] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (diagnose) {
      let query = firestore().collection('diagnosis').doc(diagnose);
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
  }, [diagnose]);

  return {
    loading,
    data,
  };
};

export default useDiagnose;
