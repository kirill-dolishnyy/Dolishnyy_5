import React, { useRef, useEffect } from "react";
import {
  SafeAreaView,
  ScrollView,
  Text,
  StyleSheet,
  View,
  Button,
  ImageBackground,
  Animated,
  useWindowDimensions
} from "react-native";
 
const images = [
  'https://wroom.ru/i/carsmini/lada2108.jpg',
  'https://wroom.ru/i/carsmini/lada2109.jpg',
  'https://wroom.ru/i/carsmini/lada2105.jpg',
  'https://wroom.ru/i/carsmini/lada21099.jpg',
  'https://wroom.ru/i/carsmini/lada2112.jpg',
  'https://wroom.ru/i/cars2/lada_2114_1.jpg'
];
 
const Slider = () => {
  const scrollX = useRef(new Animated.Value(0)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current 
 
  const { width: windowWidth } = useWindowDimensions();

  useEffect(() => {
    Animated.timing(
      fadeAnim,
      {
        toValue: 1,
        duration: 1000,
      }
    ).start();
  }, [fadeAnim])

 
  return (
      <Animated.View style={[styles.scrollContainer, {opacity: fadeAnim}]}>
        <ScrollView
          horizontal={true}
          style={styles.scrollViewStyle}
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onScroll={Animated.event([
            {
              nativeEvent: {
                contentOffset: {
                  x: scrollX
                }
              }
            }
          ])}
          scrollEventThrottle={1}
        >
          {images.map((image, imageIndex) => {
            return (
              <View
                style={[{flex: 1, }, { width: windowWidth, height: 250 }]}
                key={imageIndex}
              >
                <ImageBackground source={{ uri: image }} style={styles.card}>
                </ImageBackground>
                <View style={{paddingHorizontal: 16, paddingTop: 5}}>
                  <Button
                    title="Раскрыть"
                    color="blue"
                  />
                </View>
              </View>
            );
          })}
        </ScrollView>
        <View style={styles.indicatorContainer}>
          {images.map((image, imageIndex) => {
            const width = scrollX.interpolate({
              inputRange: [
                windowWidth * (imageIndex - 1),
                windowWidth * imageIndex,
                windowWidth * (imageIndex + 1)
              ],
              outputRange: [8, 16, 8],
              extrapolate: "clamp"
            });
            return (
              <Animated.View
                key={imageIndex}
                style={[styles.normalDot, { width }]}
              />
            );
          })}
        </View>
      </Animated.View>
  );
}
 
const styles = StyleSheet.create({
  scrollContainer: {
    height: 400,
    alignItems: "center",
    justifyContent: "center"
  },
  card: {
    flex: 1,
    marginVertical: 4,
    marginHorizontal: 16,
    borderRadius: 0,
    overflow: "hidden",
    alignItems: "center",
    justifyContent: "center"
  },
  normalDot: {
    height: 8,
    width: 4,
    borderRadius: 0,
    backgroundColor: "blue",
    marginHorizontal: 4
  },
  indicatorContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center"
  },
});
 
export default Slider;
