import { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

export default function Contador() {
  const [count, setCount] = useState(0);

  return (
    <View style={styles.container}>
      <Text style={styles.counterText}>Counter: {count}</Text>
      <Pressable
        onPress={() => setCount(count + 1)}
        style={({ pressed }) => [
          styles.button,
          pressed ? styles.buttonPressed : styles.buttonDefault,
        ]}
      >
        <Text
          style={[
            styles.buttonText,
            count % 2 === 0 ? styles.textDefault : styles.textPressed,
          ]}
        >
          Increment
        </Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ccc8be",
    justifyContent: "center",
    alignItems: "center",
  },
  counterText: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#968f7b",
  },
  button: {
    justifyContent: "center",
    alignItems: "center",
    height: 50,
    width: "40%",
    borderRadius: 30,
    borderWidth: 3,
    borderColor: "#e3e0d8",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
  },
  buttonText: {
    fontSize: 20,
    fontWeight: "bold",
  },
  textPressed: {
    color: "#f7f5f0",
  },
  textDefault: {
    color: "#968f7b",
  },
  buttonPressed: {
    backgroundColor: "#968f7b",
  },
  buttonDefault: {
    backgroundColor: "#f7f5f0",
  },
});
