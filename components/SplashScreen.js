import * as React from 'react';
import { 
  Text,
  View,
  Image,
  StyleSheet,
  Animated,
  Easing 
} from 'react-native';

class SplashScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      opacity: new Animated.Value(1)
    };
  }

  componentDidMount() {
    Animated.loop(
      Animated.sequence([
        Animated.timing(this.state.opacity, {
          toValue: 0,
          duration: 1000,
          ease: Easing.linear,
          useNativeDriver: true
        }),
        Animated.timing(this.state.opacity, {
          toValue: 1,
          duration: 1000,
          ease: Easing.linear,
          useNativeDriver: true
        })
      ])
    ).start();
  }

  render() {
      return (
        <Animated.View style={[styles.container, {opacity: this.state.opacity}]}>
          <Image
        source={{
          uri:
            'https://th.bing.com/th/id/R.2f6caa5e1405dd95f964bd5e7e7e0c89?rik=xwcnHGjvVIiJcQ&pid=ImgRaw&r=0',
        }}
        style={{ width: 300, height: 100 }}
      />
        </Animated.View>
      );
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignSelf: 'center',
    backgroundColor: 'white',
    padding: 8,
  }
});

export default SplashScreen;
