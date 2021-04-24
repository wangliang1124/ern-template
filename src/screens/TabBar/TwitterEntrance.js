import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { StyleSheet, Animated, Easing } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import screen from '~/utils/screen';

const AnimatedIcon = Animated.createAnimatedComponent(Icon);

class TwitterEntrance extends Component {
  static propTypes = {
    hideThis: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      transformAnim: new Animated.Value(1),
      opacityAnim: new Animated.Value(1),
    };
  }

  componentDidMount() {
    Animated.timing(this.state.transformAnim, {
      toValue: 5,
      duration: 2200,
      delay: 1000,
      easing: Easing.elastic(2),
      useNativeDriver: false,
    }).start();

    Animated.timing(this.state.opacityAnim, {
      toValue: 0,
      duration: 800,
      easing: Easing.elastic(1),
      delay: 2200,
      useNativeDriver: false,
    }).start();

    setTimeout(() => {
      this.props.hideThis();
    }, 3300);
  }

  render() {
    return (
      <Animated.View style={[styles.entrance, { opacity: this.state.opacityAnim }]}>
        <AnimatedIcon
          size={60}
          style={[styles.twitter, { transform: [{ scale: this.state.transformAnim }] }]}
          name="twitter"
        />
      </Animated.View>
    );
  }
}

const styles = StyleSheet.create({
  entrance: {
    position: 'absolute',
    top: 0,
    left: 0,
    height: screen.size.height,
    width: screen.size.width,
    backgroundColor: '#1b95e0',
    alignItems: 'center',
    justifyContent: 'center',
  },
  twitter: {
    color: '#fff',
    position: 'relative',
    top: -20,
    textAlign: 'center',
  },
});

export default TwitterEntrance;
