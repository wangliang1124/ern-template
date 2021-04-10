import React, { Component } from 'react';
import { Button, Image, Text, View } from 'react-native';
import Router, { getRouteParams } from '~/utils/router';

export default class GalleryPhotoDetail extends Component {
  componentDidMount() {
    // getRouteParams();
  }

  //   get routeParams() {
  //     const { route } = this.props;
  //     return route.params;
  //   }

  render() {
    const {
      image: { largeImageURL, user, favorites, likes },
    } = getRouteParams(this);

    return (
      <View style={{ flex: 1 }}>
        <Image
          source={{ uri: largeImageURL }}
          style={{ flex: 2, backgroundColor: 'rgba(0,0,0,0.8)' }}
          resizeMode="contain"
        />

        <View style={{ flex: 1, alignItems: 'center', paddingTop: 20 }}>
          <Text>{`Author:${user}`}</Text>
          <Text>{`Likes:${likes}`}</Text>
          <Text>{`Favorites:${favorites}`}</Text>
          <Button title="Go Back" onPress={Router.pop} />
        </View>
      </View>
    );
  }
}

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
