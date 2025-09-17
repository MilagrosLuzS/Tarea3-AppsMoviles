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
    title: "React T-Shirt",
    price: "$25",
    description: "Comfortable t-shirt with the React logo.",
    image: require("@/assets/images/react-shirt.png"), // local image
  },
  {
    id: "2",
    title: "Running Shoes",
    price: "$60",
    description: "Ultra-lightweight running shoes.",
    image: {
      uri: "https://images.unsplash.com/photo-1600185365929-3c3bb3f3a0b1",
    }, // remote image
  },
  {
    id: "3",
    title: "Blue Cap",
    price: "$15",
    description: "Adjustable visor cap.",
    image: require("@/assets/images/cap.png"),
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
    backgroundColor: "#f7f5f0",
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
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 12,
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
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
  },
  cardPrice: {
    fontSize: 14,
    color: "#666",
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
    backgroundColor: "#fff",
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
    backgroundColor: "#4a90e2",
  },
  resizeText: {
    color: "#333",
    fontWeight: "500",
  },
  closeButton: {
    marginTop: 10,
    backgroundColor: "#e74c3c",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 12,
  },
  closeText: {
    color: "#fff",
    fontWeight: "600",
  },
});
