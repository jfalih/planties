import {useCallback, useEffect, useState} from 'react';
import Container from '../../components/organisms/Container';
import {
  CameraRoll,
  PhotoIdentifier,
} from '@react-native-camera-roll/camera-roll';
import {Box} from '../../components/atoms/Layout';

const Scan = () => {
  const [photos, setPhotos] = useState<PhotoIdentifier[]>([]);
  const onPressScanned = useCallback(() => {}, []);

  useEffect(() => {
    CameraRoll.getPhotos({
      first: 1,
      assetType: 'Photos',
    })
      .then(r => {
        setPhotos(r.edges);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  console.log(photos);
  return (
    <Container>
      <Box />
    </Container>
  );
};

export default Scan;
