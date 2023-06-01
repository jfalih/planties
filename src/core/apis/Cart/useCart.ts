import firestore from '@react-native-firebase/firestore';
import Toast from 'react-native-toast-message';
import {useEffect, useState} from 'react';
import {useAuth} from '../../../services/context/Auth/Auth.context';

const useCart = () => {
  const [data, setData] = useState({
    description: '',
    total: 0,
    quantity: 0,
  });
  const [loading, setLoading] = useState(true);
  const {user} = useAuth();

  useEffect(() => {
    const subscriber = firestore()
      .collection('cart')
      .where('user_id', '==', user?.uid)
      .onSnapshot(querySnapshot => {
        querySnapshot.forEach(documentSnapshot => {
          let quantity = 0;
        });

        // data?.forEach(docPlants => {
        //   docPlants?.onSnapshot(documentsSnapshotPlants => {
        //     plants.push({
        //       ...documentsSnapshotPlants.data(),
        //       key: documentsSnapshotPlants.id,
        //     });
        //   });
        // });
        setLoading(false);
      });

    // Unsubscribe from events when no longer in use
    return () => subscriber();
  }, [user?.uid]);

  return {
    loading,
    data,
  };
};

export default useCart;

const addToCart = async (plant_id: string, user_uid?: string) => {
  const plantRef = firestore().collection('plants').doc(plant_id);
  if (user_uid) {
    try {
      await firestore().collection('cart').add({
        plant_id: plantRef,
        quantity: 1,
        user_id: user_uid,
      });
      Toast.show({
        type: 'success',
        text1: 'Yey berhasil nih!',
        text2: 'Kami berhasil menambahkan item ke cart',
      });
    } catch (e) {
      Toast.show({
        type: 'error',
        text1: 'Hmm, kami nemu error nih!',
        text2: (e as Error).message || 'Server Sedang Sibuk!',
      });
    }
  } else {
    Toast.show({
      type: 'error',
      text1: 'Hmm, kami nemu error nih!',
      text2: 'Silahkan login terlebih dahulu ya.. :(',
    });
  }
};

export {addToCart};
