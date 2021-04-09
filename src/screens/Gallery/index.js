import { observer } from 'mobx-react';
import React, { Component } from 'react';
import { FlatList, SafeAreaView, StyleSheet } from 'react-native';
import galleryStore from '~/stores/galleryStore';
import GalleryItem from './components/GalleryItem';
import GalleryListFooter from './components/GalleryListFooter';

class Gallery extends Component {
  componentDidMount() {
    galleryStore.resetStore();
    galleryStore.fetchImages();
  }

  componentWillUnmount() {
    galleryStore.resetStore();
  }

  render() {
    const { images, isRefreshing, refresh, fetchMore, completed } = galleryStore;
    // console.log('----render----');

    return (
      <SafeAreaView style={styles.container}>
        <FlatList
          data={images.slice()}
          numColumns={2}
          contentContainerStyle={styles.contentContainerStyle}
          columnWrapperStyle={styles.columnWrapperStyle}
          renderItem={({ item }) => <GalleryItem imageUri={item.previewURL} id={item.id} />}
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
