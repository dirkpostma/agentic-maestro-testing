import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView } from 'react-native';

type HistoryEntry = {
  id: number;
  action: string;
  from: number;
  to: number;
};

export default function App() {
  const [count, setCount] = useState(0);
  const [history, setHistory] = useState<HistoryEntry[]>([]);

  const addHistoryEntry = (action: string, from: number, to: number) => {
    setHistory(prev => [
      { id: Date.now(), action, from, to },
      ...prev.slice(0, 4), // Keep last 5 entries
    ]);
  };

  const handleIncrement = () => {
    addHistoryEntry('increment', count, count + 1);
    setCount(count + 1);
  };

  const handleDecrement = () => {
    addHistoryEntry('decrement', count, count - 1);
    setCount(count - 1);
  };

  const handleReset = () => {
    addHistoryEntry('reset', count, 0);
    setCount(0);
  };

  const clearHistory = () => {
    setHistory([]);
  };

  const getActionLabel = (action: string) => {
    switch (action) {
      case 'increment': return '+';
      case 'decrement': return '-';
      case 'reset': return 'R';
      default: return '*';
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Counter App</Text>

      <Text style={styles.counterText} testID="counter-value">
        Count: {count}
      </Text>

      <View style={styles.buttonRow}>
        <TouchableOpacity
          style={styles.button}
          onPress={handleDecrement}
          testID="decrement-button"
        >
          <Text style={styles.buttonText}>-</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.resetButton}
          onPress={handleReset}
          testID="reset-button"
        >
          <Text style={styles.buttonText}>Reset</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={handleIncrement}
          testID="increment-button"
        >
          <Text style={styles.buttonText}>+</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.historyContainer} testID="history-container">
        <View style={styles.historyHeader}>
          <Text style={styles.historyTitle}>History</Text>
          {history.length > 0 && (
            <TouchableOpacity onPress={clearHistory} testID="clear-history-button">
              <Text style={styles.clearButton}>Clear</Text>
            </TouchableOpacity>
          )}
        </View>

        <ScrollView style={styles.historyList} testID="history-list">
          {history.length === 0 ? (
            <Text style={styles.emptyHistory} testID="empty-history">No history yet</Text>
          ) : (
            history.map((entry, index) => (
              <Text key={entry.id} style={styles.historyEntry} testID={`history-entry-${index}`}>
                [{getActionLabel(entry.action)}] {entry.from} to {entry.to}
              </Text>
            ))
          )}
        </ScrollView>
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
    justifyContent: 'flex-start',
    paddingTop: 80,
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  counterText: {
    fontSize: 48,
    fontWeight: 'bold',
    marginVertical: 20,
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
  historyContainer: {
    marginTop: 40,
    width: '100%',
    maxHeight: 200,
    backgroundColor: '#f5f5f5',
    borderRadius: 12,
    padding: 15,
  },
  historyHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  historyTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  clearButton: {
    fontSize: 14,
    color: '#FF3B30',
    fontWeight: '500',
  },
  historyList: {
    maxHeight: 130,
  },
  emptyHistory: {
    color: '#999',
    fontStyle: 'italic',
    textAlign: 'center',
    paddingVertical: 20,
  },
  historyEntry: {
    fontSize: 16,
    paddingVertical: 6,
    color: '#555',
  },
});
