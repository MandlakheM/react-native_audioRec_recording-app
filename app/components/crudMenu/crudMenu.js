import React from "react";
import { Text, StyleSheet, View, Pressable, Alert } from "react-native";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";

export default function crudMenu({ selectedRec, onDelete, onRename }) {
  const handleRename = () => {
    onRename();
  };

  const handleDelete = () => {
    Alert.alert(
      "Delete Recording",
      "Are you sure you want to delete this recording?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete",
          onPress: () => onDelete(selectedRec),
          style: "destructive",
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <Pressable onPress={handleRename}>
        <View style={styles.menuItems}>
          <Text style={styles.menuItemsText}>Rename</Text>
          <FontAwesome5 name="edit" size={20} color="gainsboro" />
        </View>
      </Pressable>
      <Pressable onPress={() => alert("share recording: " + selectedRec.uri)}>
        <View style={styles.menuItems}>
          <Text style={styles.menuItemsText}>Share</Text>
          <FontAwesome5 name="share-square" size={20} color="gainsboro" />
        </View>
      </Pressable>
      <Pressable onPress={handleDelete}>
        <View style={styles.menuItems}>
          <Text style={styles.menuItemsText}>Delete</Text>
          <FontAwesome5 name="trash-alt" size={20} color="gainsboro" />
        </View>
      </Pressable>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-around",
    position: "absolute",
    backgroundColor: "#171717",
    bottom: 10,
  },
  menuItems: {
    alignItems: "center",
  },
  menuItemsText: {
    color: "gainsboro",
  },
});
