import RNFS from 'react-native-fs';

/**
 * I write a litte util method to convert localIdentifier to assetURL in JavaScript
 * @param localIdentifier looks like 91B1C271-C617-49CE-A074-E391BA7F843F/L0/001
 * @param ext the extension: JPG, PNG, MOV
 * @returns {string}
 */

export const getAssetFileAbsolutePath = assetPath => {
  const dest = `${RNFS.TemporaryDirectoryPath}${Math.random()
    .toString(36)
    .substring(7)}.jpg`;

  return RNFS.copyAssetsFileIOS(assetPath, dest, 0, 0);

};
