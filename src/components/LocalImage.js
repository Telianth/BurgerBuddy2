import React from 'react';
import { Image, Dimensions } from 'react-native';

const LocalImage = ({ source, originalWidth, originalHeight }) => {
  const windowWidth = Dimensions.get('window').width;
  const widthChange = (windowWidth - 16) / originalWidth; //The number subtracted equals to the sum of all paddings in parent component
  const newWidth = originalWidth * widthChange;
  const newHeight = originalHeight * widthChange;

  return (
    <Image source={source} style={{ width: newWidth, height: newHeight }} />
  );
};

export default LocalImage;
