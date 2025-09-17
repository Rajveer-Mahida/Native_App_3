import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { ImageGrid } from '../../../components/pexels/ImageGrid';
// import { ImageGrid } from '../../../components/pexels/ImageMap';
import { ImageModal } from '../../../components/pexels/ImageModal';
import { usePexels } from '../../../hooks/usePexels';

export default function Pexels() {
  const {
    images,
    isLoading,
    isRefreshing,
    isLoadingMore,
    error,
    fetchImages,
    onRefresh,
    loadMore,
  } = usePexels();

  const [selectedImage, setSelectedImage] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    fetchImages(1);
  }, []);

  const handleImagePress = (image) => {
    setSelectedImage(image);
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
    setSelectedImage(null);
  };

  return (
    <View style={styles.container}>
      <ImageGrid
        images={images}
        isLoading={isLoading}
        isRefreshing={isRefreshing}
        isLoadingMore={isLoadingMore}
        error={error}
        onRefresh={onRefresh}
        onLoadMore={loadMore}
        onImagePress={handleImagePress}
      />

      <ImageModal
        visible={modalVisible}
        image={selectedImage}
        onClose={handleCloseModal}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
