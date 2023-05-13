import {useEffect, useState} from 'react';
import firestore from '@react-native-firebase/firestore';
import {useAuth} from '../../../services/context/Auth/Auth.context';

const useOxygen = () => {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let query = firestore().collection('oxygen').orderBy('oxygen', 'desc');
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
  }, []);

  return {
    loading,
    data,
  };
};

const useUserOxygen = () => {
  const [data, setData] = useState<any>();
  const [loading, setLoading] = useState(true);
  const {user} = useAuth();
  console.log(user?.displayName);
  useEffect(() => {
    let query = firestore().collection('oxygen').where('name', '==', user?.displayName);
    const subscriber = query.onSnapshot(querySnapshot => {
      querySnapshot.forEach(documentSnapshot => {
        setData({
          ...documentSnapshot.data(),
          key: documentSnapshot.id,
        });
      });
      setLoading(false);
    });
    // Unsubscribe from events when no longer in use
    return () => subscriber();
  }, [user?.displayName]);

  return {
    loading,
    data,
  };
};

export {useUserOxygen};
export default useOxygen;
