import React from "react";
import {
  ActivityIndicator,
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
  Dimensions,
} from "react-native";

const { width } = Dimensions.get("window");
const imageWidth = (width - 32) / 3; // 3 columns with padding

export const ImageCard = ({ image, onPress }) => {
  const [isLoading, setIsLoading] = React.useState(true);
  const [hasError, setHasError] = React.useState(false);

  // Calculate aspect ratio and height
  const aspectRatio = image.height / image.width;
  const imageHeight = imageWidth * aspectRatio;

  // Limit max height to prevent extremely tall images
  const maxHeight = 200;
  const finalHeight = Math.min(imageHeight, maxHeight);

  const handleLoad = () => {
    setIsLoading(false);
    setHasError(false);
  };

  const handleError = () => {
    setIsLoading(false);
    setHasError(true);
  };

  const handlePress = () => {
    onPress(image);
  };

  return (
    <TouchableOpacity
      style={[styles.container, { height: maxHeight }]}
      onPress={handlePress}
      activeOpacity={0.8}
    >
      {isLoading && (
        <View style={[styles.loadingContainer, { height: maxHeight }]}>
          <ActivityIndicator size="small" color="#666" />
        </View>
      )}

      {!hasError ? (
        <Image
          source={{ uri: image.src.original }}
          style={[styles.image, { height: maxHeight }]}
          resizeMode="cover"
          onLoad={handleLoad}
          onError={handleError}
        />
      ) : (
        <View style={[styles.errorContainer, { height: finalHeight }]}>
          <View style={styles.errorPlaceholder} />
        </View>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: imageWidth,
    marginBottom: 8,
    borderRadius: 8,
    overflow: "hidden",
  },
  image: {
    width: "100%",
    backgroundColor: "#f0f0f0",
  },
  loadingContainer: {
    position: "absolute",
    width: "100%",
    backgroundColor: "#f0f0f0",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1,
  },
  errorContainer: {
    width: "100%",
    backgroundColor: "#f0f0f0",
    justifyContent: "center",
    alignItems: "center",
  },
  errorPlaceholder: {
    width: 30,
    height: 30,
    backgroundColor: "#ccc",
    borderRadius: 15,
  },
});
