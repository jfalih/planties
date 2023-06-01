import firestore from '@react-native-firebase/firestore';
import {useEffect, useState} from 'react';
import {useAuth} from '../../../services/context/Auth/Auth.context';

const useGardens = () => {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const {user} = useAuth();

  useEffect(() => {
    if (!user) {
      return;
    }
    let query = firestore()
      .collection('gerdens')
      .where('userId', '==', user.uid);

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
  }, [user]);

  return {
    loading,
    data,
  };
};

const useGardenDetail = (garden: string) => {
  const [data, setData] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (garden) {
      let query = firestore().collection('gerdens').doc(garden);
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
  }, [garden]);

  return {
    loading,
    data,
  };
};

export {useGardenDetail};
export default useGardens;
