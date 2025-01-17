import React, { useEffect } from "react";
import { Modal, View, Text, Pressable, StyleSheet, Button } from "react-native";
import { useUser, useAuth } from "@clerk/clerk-expo";
import { Image } from "react-native";

const UserModal = ({ setShowUserModal }) => {
  const { isLoaded, isSignedIn, user } = useUser();
  const { signOut } = useAuth();

  if (!isLoaded || !isSignedIn) {
    return null;
  }
  const handleSignOut = async () => {
    try {
      await signOut();
      // Redirect to your desired page
      Linking.openURL(Linking.createURL("/"));
    } catch (err) {
      // See https://clerk.com/docs/custom-flows/error-handling
      // for more info on error handling
    }
  };

  return (
    <Modal transparent={true} animationType="slide">
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>User Profile</Text>
          <Text>
            User Name:
            {user?.emailAddresses?.[0]?.emailAddress?.[0]?.toUpperCase()}
          </Text>

          {user?.imageUrl ? (
            <Image source={{ uri: user.imageUrl }} style={styles.avatar} />
          ) : (
            <View style={styles.avatarPlaceholder}>
              <Text style={styles.avatarText}>
                {user?.firstName?.[0] ||
                  user?.emailAddresses?.[0]?.emailAddress?.[0]?.toUpperCase()}
              </Text>
            </View>
          )}

          <Text>support@audiorec.com</Text>

          <View style={styles.modalButtons}>
            <Pressable
              style={[styles.button, styles.cancelButton]}
              onPress={() => {
                setShowUserModal(false);
              }}
            >
              <Text style={styles.buttonText}>Close</Text>
            </Pressable>
            <Button
              title="Sign out"
              onPress={handleSignOut}
              style={styles.button}
            />
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
    backgroundColor: "green",
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
    textAlign: "center",
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

  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  avatarPlaceholder: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#E1E1E1",
    justifyContent: "center",
    alignItems: "center",
  },
  avatarText: {
    fontSize: 16,
    color: "#666",
  },
  userName: {
    marginLeft: 10,
    fontSize: 16,
    color: "#333",
  },
});
