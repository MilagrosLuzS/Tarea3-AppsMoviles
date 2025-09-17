import { useState } from "react";
import {
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

export default function Perfil() {
  const [nombre, setNombre] = useState("Milagros Luz");
  const [modalVisible, setModalVisible] = useState(false);
  const [inputNombre, setInputNombre] = useState(nombre);

  const guardarNombre = () => {
    setNombre(inputNombre);
    setModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.profileText}>Name: {nombre}</Text>

      <Pressable
        onPress={() => setModalVisible(true)}
        style={({ pressed }) => [
          styles.button,
          pressed ? styles.buttonPressed : styles.buttonDefault,
        ]}
      >
        <Text style={[styles.buttonText, styles.textDefault]}>
          Update name
        </Text>
      </Pressable>

      <Modal
        transparent
        animationType="fade"
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <TextInput
              style={styles.input}
              placeholder="Nuevo nombre"
              value={inputNombre}
              onChangeText={setInputNombre}
            />
            <Pressable
              onPress={guardarNombre}
              style={({ pressed }) => [
                styles.button,
                pressed ? styles.buttonPressed : styles.buttonDefault,
              ]}
            >
              <Text style={[styles.buttonText, styles.textDefault]}>
                Save 
              </Text>
            </Pressable>
          </View>
        </View>
      </Modal>
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
  profileText: {
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
    marginTop: 10,
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
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: "#f7f5f0",
    padding: 20,
    borderRadius: 20,
    width: "80%",
    alignItems: "center",
  },
  input: {
    width: "100%",
    borderColor: "#968f7b",
    borderWidth: 2,
    borderRadius: 10,
    padding: 10,
    marginBottom: 15,
    color: "#333",
    backgroundColor: "#fff",
  },
});
