import { Text, StyleSheet } from 'react-native';
import { useGame } from '../context/GameContext';

export default function ScoreBoard() {
  const { score } = useGame();

  return <Text style={styles.score}>Puntaje: {score}</Text>;
}

const styles = StyleSheet.create({
  score: { fontSize: 28, fontWeight: 'bold', marginBottom: 8 },
});
