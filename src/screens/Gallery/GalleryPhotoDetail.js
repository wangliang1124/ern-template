import { observer } from 'mobx-react';
import React, { Component } from 'react';
import { Button, Image, Text, View } from 'react-native';
import { useTheme } from '~/styles/Theme';
import Router, { getRouteParams } from '~/utils/router';

class GalleryPhotoDetail extends Component {
  componentDidMount() {
    // getRouteParams();
  }

  //   get routeParams() {
  //     const { route } = this.props;
  //     return route.params;
  //   }

  render() {
    const { colors } = useTheme();
    const {
      image: { largeImageURL, user, favorites, likes },
    } = getRouteParams();

    return (
      <View style={{ flex: 1 }}>
        <Image
          source={{ uri: largeImageURL }}
          style={{ flex: 2, backgroundColor: 'rgba(0,0,0,0.8)' }}
          resizeMode="contain"
        />

        <View style={{ flex: 1, alignItems: 'center', paddingTop: 20 }}>
          <Text style={{ color: colors.textDark }}>{`Author:${user}`}</Text>
          <Text style={{ color: colors.textDark }}>{`Likes:${likes}`}</Text>
          <Text style={{ color: colors.textDark }}>{`Favorites:${favorites}`}</Text>
          <Button title="Go Back" onPress={Router.pop} />
        </View>
      </View>
    );
  }
}

export default observer(GalleryPhotoDetail);

// export default function GalleryPhotoDetail(props) {
//   const {
//     image: { largeImageURL, user, favorites, likes },
//   } = getRouteParams();

//   return (
//     <View style={{ flex: 1 }}>
//       <Image
//         source={{ uri: largeImageURL }}
//         style={{ flex: 2, backgroundColor: 'rgba(0,0,0,0.8)' }}
//         resizeMode="contain"
//       />

//       <View style={{ flex: 1, alignItems: 'center', paddingTop: 20 }}>
//         <Text>{`Author:${user}`}</Text>
//         <Text>{`Likes:${likes}`}</Text>
//         <Text>{`Favorites:${favorites}`}</Text>
//         <Button title="Go Back" onPress={Router.pop} />
//       </View>
//     </View>
//   );
// }
