import {React} from 'react';
import {Text, View, StyleSheet} from 'react-native';
import DepthCard from '../components/depthcard';

const CardsScreen = () => {
  return (
    <View style={styles.container}>
      <DepthCard />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
export default CardsScreen;
