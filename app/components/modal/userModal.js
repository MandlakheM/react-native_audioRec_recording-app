import React from "react";
import {
  Modal,
  View,
  Text,
  Pressable,
  StyleSheet,
} from "react-native";

const UserModal = () => {
  return (
    <Modal transparent={true} animationType="slide">
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>User Profile</Text>
          <Text >User Name: </Text>
          <Text >support@audiorec.com</Text>

          <View style={styles.modalButtons}>
            <Pressable
              style={[styles.button, styles.cancelButton]}
            >
              <Text style={styles.buttonText}>Close</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default UserModal;

const styles = StyleSheet.create({
  cancelButton: {
    backgroundColor: "#FF3B30",
  },

  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
  button: {
    padding: 10,
    borderRadius: 5,
    minWidth: 100,
    alignItems: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    padding: 10,
    borderRadius: 5,
    marginBottom: 15,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    width: "80%",
  },
  modalTitle: {
    textAlign: 'center',
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 15,
  },

  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  saveButton: {
    backgroundColor: "#007AFF",
  },
});
