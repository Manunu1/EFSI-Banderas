import { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet } from 'react-native';
import { useGame } from '../context/GameContext';

export default function GuessForm() {
  const { guess, resetScore, feedback } = useGame();
  const [text, setText] = useState(''); // estado local del input (no es dato del juego)

  const handleGuess = () => {
    guess(text);
    setText('');
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="¿De qué país es esta bandera?"
        value={text}
        onChangeText={setText}
        onSubmitEditing={handleGuess}
        autoCapitalize="words"
        autoCorrect={false}
      />
      <Button title="Adivinar" onPress={handleGuess} />

      {feedback === 'correct' && <Text style={styles.ok}>¡Correcto! +10</Text>}
      {feedback === 'wrong' && <Text style={styles.bad}>Incorrecto, -1</Text>}

      <View style={styles.reset}>
        <Button title="Reiniciar puntaje" color="#888" onPress={resetScore} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { width: '100%', paddingHorizontal: 24, gap: 12 },
  input: {
    borderWidth: 1,
    borderColor: '#999',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
  },
  ok: { color: 'green', textAlign: 'center', fontWeight: 'bold' },
  bad: { color: 'crimson', textAlign: 'center', fontWeight: 'bold' },
  reset: { marginTop: 16 },
});
