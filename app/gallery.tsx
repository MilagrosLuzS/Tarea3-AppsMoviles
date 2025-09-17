import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  TextInput,
  Pressable,
  Modal,
  FlatList,
  StyleSheet,
} from "react-native";

const products = [
  {
    id: "1",
    title: "Mug Antique Blue x6",
    price: "$72",
    description: "A set of six ceramic mugs with a charming antique blue glaze, designed for coffee, tea, or hot beverages.",
    image: require("@/assets/images/mug.webp"), // local image
  },
  {
    id: "2",
    title: "Bowl Antique Blue x6",
    price: "$69",
    description: "A set of six versatile bowls featuring a rich blue antique finish, ideal for soups, salads, or side dishes.",
    image: { uri: "https://github.com/MilagrosLuzS/Tarea3-AppsMoviles/blob/main/assets/images/bowl.webp?raw=true" },
  },
  {
    id: "3",
    title: "Dessert Plate Antique Blue x6",
    price: "$69",
    description: "A set of six elegant dessert plates with a deep blue antique-style glaze, perfect for serving cakes, pastries, or small meals.",
    image: require("@/assets/images/plate.webp"),
  },
];

export default function GalleryScreen() {
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<any>(null);
  const [resizeMode, setResizeMode] = useState<"cover" | "contain" | "stretch">(
    "cover"
  );
  const [favorites, setFavorites] = useState<string[]>([]);

  const filtered = products.filter((p) =>
    p.title.toLowerCase().includes(search.toLowerCase())
  );

  const toggleFavorite = (id: string) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id]
    );
  };

  const renderItem = ({ item }: any) => {
    const isFav = favorites.includes(item.id);
    return (
      <Pressable
        onPress={() => setSelected(item)}
        onLongPress={() => toggleFavorite(item.id)}
        style={[styles.card, isFav && styles.favorite]}
      >
        <Image source={item.image} style={styles.cardImage} />
        <View style={styles.cardTextContainer}>
          <Text style={styles.cardTitle}>{item.title}</Text>
          <Text style={styles.cardPrice}>{item.price}</Text>
        </View>
        {isFav && <Text style={styles.favIcon}>★</Text>}
      </Pressable>
    );
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Search product..."
        value={search}
        onChangeText={setSearch}
        style={styles.input}
      />

      <FlatList
        data={filtered}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
      />

      <Modal visible={!!selected} animationType="slide" transparent>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            {selected && (
              <>
                <Image
                  source={selected.image}
                  style={styles.modalImage}
                  resizeMode={resizeMode}
                />
                <Text style={styles.modalTitle}>{selected.title}</Text>
                <Text style={styles.modalDesc}>{selected.description}</Text>

                <View style={styles.resizeButtons}>
                  {["cover", "contain", "stretch"].map((mode) => (
                    <Pressable
                      key={mode}
                      style={[
                        styles.resizeButton,
                        resizeMode === mode && styles.resizeButtonActive,
                      ]}
                      onPress={() =>
                        setResizeMode(mode as "cover" | "contain" | "stretch")
                      }
                    >
                      <Text style={styles.resizeText}>{mode}</Text>
                    </Pressable>
                  ))}
                </View>

                <Pressable
                  onPress={() => setSelected(null)}
                  style={styles.closeButton}
                >
                  <Text style={styles.closeText}>Close</Text>
                </Pressable>
              </>
            )}
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
    padding: 16,
  },
  input: {
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  list: {
    gap: 12,
  },
  card: {
    flexDirection: "row",
    backgroundColor: "#f7f5f0",
    borderRadius: 30,
    borderWidth: 3,
    borderColor: "#e3e0d8",
    padding: 9,
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 5 },
    shadowRadius: 6,
    elevation: 3,
  },
  favorite: {
    borderWidth: 2,
    borderColor: "#f5a623",
  },
  cardImage: {
    width: 60,
    height: 60,
    borderRadius: 12,
    marginRight: 12,
  },
  cardTextContainer: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: '#968f7b',
  },
  cardPrice: {
    fontSize: 14,
    color: "#968f7b",
  },
  favIcon: {
    fontSize: 20,
    color: "#f5a623",
    marginLeft: 8,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "center",
    padding: 20,
  },
  modalContent: {
    backgroundColor: "#f7f5f0",
    borderRadius: 20,
    padding: 20,
    alignItems: "center",
  },
  modalImage: {
    width: 200,
    height: 200,
    marginBottom: 16,
    borderRadius: 12,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 8,
    color: '#968f7b',
  },
  modalDesc: {
    fontSize: 14,
    color: "#666",
    textAlign: "center",
    marginBottom: 16,
  },
  resizeButtons: {
    flexDirection: "row",
    gap: 8,
    marginBottom: 16,
  },
  resizeButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    backgroundColor: "#eee",
  },
  resizeButtonActive: {
    backgroundColor: "#968f7b",
  },
  resizeText: {
    color: "#333",
    fontWeight: "500",
  },
  closeButton: {
    marginTop: 10,
    backgroundColor: "#968f7b",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 12,
  },
  closeText: {
    color: "#fff",
    fontWeight: "600",
  },
});
