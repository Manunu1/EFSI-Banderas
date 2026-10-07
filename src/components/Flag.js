import { View, Image, StyleSheet } from 'react-native';
import { useGame } from '../context/GameContext';

export default function Flag() {
  const { currentCountry } = useGame();

  if (!currentCountry) return null;

  const uri = `https://flagcdn.com/w320/${currentCountry.iso2.toLowerCase()}.png`;

  return (
    <View style={styles.container}>
      <Image source={{ uri }} style={styles.flag} resizeMode="contain" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { alignItems: 'center', justifyContent: 'center', marginVertical: 24 },
  flag: { width: 260, height: 170 },
});