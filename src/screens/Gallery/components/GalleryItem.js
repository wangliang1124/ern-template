import { observer } from 'mobx-react';
import React, { useState } from 'react';
import { Image } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { createShimmerPlaceholder } from 'react-native-shimmer-placeholder';

const ShimmerPlaceholder = createShimmerPlaceholder(LinearGradient);

function GalleryItem({ imageUri, id }) {
  const [loaded, setLoaded] = useState(false);

  //   console.log('------ render item -----', id);

  return (
    <ShimmerPlaceholder width={180} height={100} visible={loaded}>
      <Image
        source={{ uri: imageUri }}
        style={{ width: 180, height: 100, backgroundColor: '#ccc' }}
        onLoadEnd={() => {
          setLoaded(true);
        }}
      />
    </ShimmerPlaceholder>
  );
}

export default observer(GalleryItem);
