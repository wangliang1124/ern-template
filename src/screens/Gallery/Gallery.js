import { observer } from 'mobx-react';
import React, { Component } from 'react';
import { FlatList, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import galleryStore from '~/stores/galleryStore';
import { getCurrentOptions } from '~/utils/router';
import GalleryItem from './components/GalleryItem';
import GalleryListFooter from './components/GalleryListFooter';

class Gallery extends Component {
  state = { headerShown: true };

  componentDidMount() {
    galleryStore.resetStore();
    galleryStore.fetchImages();
    getCurrentOptions().then(({ headerShown }) => {
      this.setState({
        headerShown,
      });
    });
  }

  componentWillUnmount() {
    galleryStore.resetStore();
  }

  render() {
    const { headerShown } = this.state;
    const { images, isRefreshing, refresh, fetchMore, completed } = galleryStore;

    return (
      <SafeAreaView
        edges={headerShown ? ['bottom', 'left', 'right'] : ['top', 'bottom', 'left', 'right']}
        style={styles.container}
      >
        <FlatList
          data={images.slice()}
          numColumns={2}
          contentContainerStyle={styles.contentContainerStyle}
          columnWrapperStyle={styles.columnWrapperStyle}
          renderItem={({ item }) => <GalleryItem image={item} />}
          keyExtractor={(item, index) => String(item.id + index)}
          onRefresh={refresh}
          refreshing={isRefreshing}
          onEndReached={fetchMore}
          onEndReachedThreshold={0.7}
          ListFooterComponent={completed ? GalleryListFooter : null}
        />
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainerStyle: {
    alignItems: 'center',
  },
  columnWrapperStyle: {
    padding: 8,
  },
});

export default observer(Gallery);
