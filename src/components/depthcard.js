import React, {useEffect, useState} from 'react';
import {View, StyleSheet, Text} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withDecay,
  withTiming,
  interpolate,
} from 'react-native-reanimated';
import {Image} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {
  SensorTypes,
  setUpdateIntervalForType,
  orientation,
} from 'react-native-sensors';

const BORDER_RADIUS = 30;
const CARD_WIDTH = 230;
const CARD_HEIGHT = 319;

export default function DepthCard() {
  const [coords, setCoords] = useState({x: 0, y: 0});

  useEffect(() => {
    let gyroscopeSubscription;

    setUpdateIntervalForType(SensorTypes.orientation, 50);

    gyroscopeSubscription = orientation.subscribe(({pitch, roll}) => {
      setCoords({x: Math.sin(roll), y: Math.sin(pitch)});
    });

    return () => {
      gyroscopeSubscription.unsubscribe();
    };
  }, []);

  const style = useAnimatedStyle(() => {
    const interpolatedTranslateX = interpolate(
      coords.x,
      [-0.3, 0.3],
      [24, -24],
      {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
      },
    );
    const interpolatedTranslateY = interpolate(
      coords.y,
      [-0.6, -0.01, 0, 0.4],
      [-35, 0, 0, 15],
      {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
      },
    );

    return {
      transform: [
        {
          translateX: withTiming(interpolatedTranslateX, {
            duration: 10,
          }),
        },
        {
          translateY: withTiming(interpolatedTranslateY, {
            duration: 10,
          }),
        },
        {perspective: 850},
      ],
    };
  });

  return (
    <View style={styles.container}>
      <Animated.Image
        style={[styles.animatedImageStyle, style]}
        source={require('../assets/Blur.png')}
      />

      <Image
        style={[styles.animatedViewStyle]}
        source={require('../assets/Normal.png')}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
  },
  animatedViewStyle: {
    width: 245,
    height: CARD_HEIGHT,

    position: 'absolute',
    borderRadius: BORDER_RADIUS,
  },
  animatedImageStyle: {
    width: 245,
    height: 339,
  },
});
