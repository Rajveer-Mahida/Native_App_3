import React from 'react';
import {
  Dimensions,
  Image,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const { width, height } = Dimensions.get('window');

export const ImageModal = ({ visible, image, onClose }) => {
  if (!image) return null;

  const imageAspectRatio = image.width / image.height;
  const screenAspectRatio = width / height;

  let imageWidth = width;
  let imageHeight = width / imageAspectRatio;

  if (imageAspectRatio < screenAspectRatio) {
    imageHeight = height * 0.8;
    imageWidth = imageHeight * imageAspectRatio;
  }

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="fade"
      onRequestClose={onClose}
    >
      <StatusBar backgroundColor="rgba(0,0,0,0.9)" barStyle="light-content" />
      <SafeAreaView style={styles.modalContainer}>
        <View style={styles.header}>
          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <Ionicons name="close" size={30} color="white" />
          </TouchableOpacity>
        </View>

        <View style={styles.imageContainer}>
          <Image
            source={{ uri: image.src.large }}
            style={[styles.fullImage, { width: imageWidth, height: imageHeight }]}
            resizeMode="contain"
          />
        </View>

        <View style={styles.footer}>
          <Text style={styles.photographer}>
            Photo by {image.photographer}
          </Text>
        </View>
      </SafeAreaView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.9)',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    padding: 20,
  },
  closeButton: {
    padding: 10,
  },
  imageContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  fullImage: {
    maxWidth: width,
    maxHeight: height * 0.8,
  },
  footer: {
    padding: 20,
    alignItems: 'center',
  },
  photographer: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
  },
});
