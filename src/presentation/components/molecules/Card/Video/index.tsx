import Image from '../../../atoms/Image';
import {VStack} from '../../../atoms/Layout/Stack';
import Text from '../../../atoms/Text';

const Video = props => {
  const {title, ...rest} = props;
  return (
    <VStack>
      <Box as={<Image />} />
      <Text text={title} />
    </VStack>
  );
};
