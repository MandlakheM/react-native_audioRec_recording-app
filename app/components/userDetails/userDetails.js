import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useUser, useAuth } from "@clerk/clerk-expo";
import { Image } from 'react-native';

const CustomUserButton = () => {
  const { isLoaded, isSignedIn, user } = useUser();
  const { signOut } = useAuth();

  if (!isLoaded || !isSignedIn) {
    return null;
  }
  return (
    <View style={styles.container}>
      <TouchableOpacity 
        style={styles.button}
        onPress={() => {
          // Handle button press - could show a menu or profile options
          console.log("User button pressed");
        }}
      >
        {user?.imageUrl ? (
          <Image 
            source={{ uri: user.imageUrl }} 
            style={styles.avatar}
          />
        ) : (
          <View style={styles.avatarPlaceholder}>
            <Text style={styles.avatarText}>
              {user?.firstName?.[0] || user?.emailAddresses?.[0]?.emailAddress?.[0]?.toUpperCase()}
            </Text>
          </View>
        )}
        <Text style={styles.userName}>
          {user?.firstName || user?.emailAddresses?.[0]?.emailAddress}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 8,
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
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
    backgroundColor: '#E1E1E1',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    fontSize: 16,
    color: '#666',
  },
  userName: {
    marginLeft: 10,
    fontSize: 16,
    color: '#333',
  },
});

export default CustomUserButton;

