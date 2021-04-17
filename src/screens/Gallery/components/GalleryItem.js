import { useNavigation } from '@react-navigation/native';
import { observer } from 'mobx-react';
import React, { useState } from 'react';
import { TouchableOpacity, Image } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { createShimmerPlaceholder } from 'react-native-shimmer-placeholder';
import { Screens } from '~/router/Screens';
import Router from '~/utils/router';

const ShimmerPlaceholder = createShimmerPlaceholder(LinearGradient);

function GalleryItem({ image }) {
  const [loaded, setLoaded] = useState(false);
  const { previewURL } = image;
  // console.log('------ render item -----', id);
  //   const navigation = useNavigation();
  return (
    <ShimmerPlaceholder width={180} height={100} visible={loaded}>
      <TouchableOpacity
        onPress={() => {
          Router.push(Screens.GalleryPhotoDetail, {
            image,
          });
          //   navigation.navigate('GalleryPhotoDetail', {
          //     image,
          //   });
        }}
      >
        <Image
          source={{ uri: previewURL }}
          style={{ width: 180, height: 100, backgroundColor: '#ccc' }}
          onLoadEnd={() => {
            setLoaded(true);
          }}
        />
      </TouchableOpacity>
    </ShimmerPlaceholder>
  );
}

export default observer(GalleryItem);
