import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

const titles = [
  'Sunset', 'Ocean', 'Forest', 'Mountain', 'City', 'Desert', 'River', 'Valley', 'Sky', 'Garden'
];
const descriptions = [
  'A beautiful view.',
  'Nature at its best.',
  'Peaceful and calm.',
  'Adventure awaits.',
  'Urban vibes.',
  'Sandy and vast.',
  'Flowing gently.',
  'Hidden gem.',
  'Endless blue.',
  'Blooming life.'
];

function getRandomItem(arr: string[]) {
  return arr[Math.floor(Math.random() * arr.length)];
}

const CardGrid: React.FC = () => {
  const [cards, setCards] = useState([
    [
      { title: getRandomItem(titles), desc: getRandomItem(descriptions) },
      { title: getRandomItem(titles), desc: getRandomItem(descriptions) },
    ],
    [
      { title: getRandomItem(titles), desc: getRandomItem(descriptions) },
      { title: getRandomItem(titles), desc: getRandomItem(descriptions) },
    ],
    [
      { title: getRandomItem(titles), desc: getRandomItem(descriptions) },
      { title: getRandomItem(titles), desc: getRandomItem(descriptions) },
    ],
  ]);

  const updateRandomCard = (rowIdx: number, colIdx: number) => {
    setCards(prev => prev.map((row, r) =>
      row.map((card, c) =>
        r === rowIdx && c === colIdx
          ? { title: getRandomItem(titles), desc: getRandomItem(descriptions) }
          : card
      )
    ));
  };

  return (
    <View style={styles.container}>
      {cards.map((row, rowIdx) => (
        <View style={styles.row} key={rowIdx}>
          {row.map((card, colIdx) => (
            <TouchableOpacity
              key={colIdx}
              style={colIdx === 0 ? styles.firstColumn : styles.secondColumn}
              onPress={() => updateRandomCard(rowIdx, colIdx)}
              activeOpacity={0.8}
            >
              <Text style={{ fontWeight: 'bold', fontSize: 18 }}>{card.title}</Text>
              <Text>{card.desc}</Text>
              <Text style={{ color: '#007AFF', marginTop: 8, fontSize: 12 }}>(Tap to randomize)</Text>
            </TouchableOpacity>
          ))}
        </View>
      ))}
    </View>
  );
};

export default CardGrid;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'red',
    gap: 20,
    padding: 20,
    justifyContent: 'center',
  },
  row: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'transparent', // Remove background to avoid white corners
    gap: 20,
    marginBottom: 10,
  },
  firstColumn: {
    flex: 1,
    backgroundColor: 'green',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 12,
    padding: 18,
    overflow: 'hidden', // Ensures content stays within rounded corners
  },
  secondColumn: {
    flex: 1,
    backgroundColor: 'pink',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 12,
    padding: 18,
    overflow: 'hidden', // Ensures content stays within rounded corners
  },
});
