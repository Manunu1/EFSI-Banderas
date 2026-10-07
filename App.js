import { ActivityIndicator, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";
import { GameProvider, useGame } from './src/context/GameContext';
import ScoreBoard from './src/components/ScoreBoard';
import Flag from './src/components/Flag';
import GuessForm from './src/components/GuessForm';

function Game() {
  const { loading, error } = useGame();

  if (loading) return <ActivityIndicator size="large" style={styles.center} />;
  if (error) return <Text style={styles.center}>{error}</Text>;

  return (
    <>
      <ScoreBoard />
      <Flag />
      <GuessForm />
    </>
  );
}

export default function App() {
  return (
    <GameProvider>
      <SafeAreaView style={styles.container}>
        <Game />
      </SafeAreaView>
    </GameProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  center: { flex: 1, textAlign: 'center', textAlignVertical: 'center' },
});
