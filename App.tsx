import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

const STEP_OPTIONS = [1, 5, 10];

export default function App() {
  const [count, setCount] = useState(0);
  const [stepSize, setStepSize] = useState(1);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Counter App</Text>

      <Text style={styles.counterText} testID="counter-value">
        Count: {count}
      </Text>

      <View style={styles.buttonRow}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => setCount(count - stepSize)}
          testID="decrement-button"
        >
          <Text style={styles.buttonText}>-{stepSize}</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.resetButton}
          onPress={() => setCount(0)}
          testID="reset-button"
        >
          <Text style={styles.buttonText}>Reset</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => setCount(count + stepSize)}
          testID="increment-button"
        >
          <Text style={styles.buttonText}>+{stepSize}</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.stepContainer}>
        <Text style={styles.stepLabel}>Step Size:</Text>
        <View style={styles.stepButtonRow}>
          {STEP_OPTIONS.map((step) => (
            <TouchableOpacity
              key={step}
              style={[
                styles.stepButton,
                stepSize === step && styles.stepButtonActive,
              ]}
              onPress={() => setStepSize(step)}
              testID={`step-button-${step}`}
            >
              <Text
                style={[
                  styles.stepButtonText,
                  stepSize === step && styles.stepButtonTextActive,
                ]}
              >
                {step}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 40,
  },
  counterText: {
    fontSize: 48,
    fontWeight: 'bold',
    marginVertical: 40,
    color: '#007AFF',
  },
  buttonRow: {
    flexDirection: 'row',
    gap: 15,
    marginTop: 20,
  },
  button: {
    backgroundColor: '#007AFF',
    width: 70,
    height: 70,
    borderRadius: 35,
    alignItems: 'center',
    justifyContent: 'center',
  },
  resetButton: {
    backgroundColor: '#FF9500',
    paddingHorizontal: 30,
    height: 70,
    borderRadius: 35,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 24,
    fontWeight: '600',
  },
  stepContainer: {
    marginTop: 40,
    alignItems: 'center',
  },
  stepLabel: {
    fontSize: 16,
    color: '#666',
    marginBottom: 10,
  },
  stepButtonRow: {
    flexDirection: 'row',
    gap: 10,
  },
  stepButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: '#007AFF',
    backgroundColor: 'white',
  },
  stepButtonActive: {
    backgroundColor: '#007AFF',
  },
  stepButtonText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#007AFF',
  },
  stepButtonTextActive: {
    color: 'white',
  },
});
