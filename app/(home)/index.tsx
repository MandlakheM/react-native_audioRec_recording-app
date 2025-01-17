import { SignedIn, SignedOut, useUser } from "@clerk/clerk-expo";
import { Link } from "expo-router";
import { useState } from "react";
import { Text, View, StyleSheet } from "react-native";
import Entypo from "@expo/vector-icons/Entypo";
import SupportServices from "../components/modal/supportServices";
import RecordingButton from "../components/recordingButton/recordingButton";
import CustomUserButton from "../components/userDetails/userDetails";
import LoginScreen from "../(auth)/auth";
import UserModal from "../components/modal/userModal";

export default function Page() {
  const [support, setSupport] = useState(false);
  const [showUserModal, setShowUserModal] = useState(false)
  const { user } = useUser();

  const showSupport = () => {
    setSupport(!support);
    console.log("user info:", user);
  };
  return (
    <View style={styles.container}>
      {support && <SupportServices showSupport={showSupport} />}
      <SignedIn>
        <View style={styles.header}>
          <View style={styles.logo}>
            <Entypo name="modern-mic" size={24} color="#21B357" />
            <Text style={styles.logoText}>Audio Rec</Text>
          </View>
          <View style={styles.menu}>
            <SignedIn>
              <CustomUserButton setShowUserModal={setShowUserModal}/>
              {showUserModal && <UserModal setShowUserModal={setShowUserModal}/>}
            </SignedIn>
          </View>
        </View>
        <RecordingButton />
      </SignedIn>
      <SignedOut>
        {/* <Link href="/sign-in">
            <Text>Sign In</Text>
          </Link>
          <Link href="/sign-up">
            <Text>Sign Up</Text>
          </Link> */}
        <LoginScreen />
      </SignedOut>
      {/* <UserDetails/> */}
      {/* </ImageBackground> */}
      {/* <StatusBar style="auto" /> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#171717",
    alignItems: "center",
    justifyContent: "center",
  },
  header: {
    backgroundColor: "#171717",
    height: 70,
    width: "100%",
    marginTop: 25,
    marginLeft: 10,
    marginRight: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  image: {
    flex: 1,
    justifyContent: "center",
  },
  logoText: {
    color: "#21B357",
  },
  menu: {
    marginRight: 10,
  },
  logoContainer: {
    alignItems: "center",
    marginBottom: 30,
  },
  logo: {
    width: 50,
    height: 50,
    marginBottom: 10,
    marginLeft: 20,
    flexDirection: "row",
  },
  brandText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#000",
  },
  welcomeText: {
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    color: "#000",
    marginBottom: 5,
  },
  subText: {
    fontSize: 14,
    textAlign: "center",
    color: "#888",
    marginBottom: 20,
  },
  tabContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 20,
  },
  tab: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  activeTab: {
    backgroundColor: "#f0f0f0",
  },
  tabText: {
    fontSize: 16,
    color: "#888",
  },
  activeTabText: {
    color: "#000",
    fontWeight: "bold",
  },
  inputContainer: {
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 14,
    color: "#555",
    marginBottom: 5,
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    paddingHorizontal: 10,
  },
  input: {
    flex: 1,
    height: 40,
    fontSize: 16,
    color: "#000",
  },
  continueButton: {
    backgroundColor: "#007BFF",
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: "center",
    marginBottom: 20,
  },
  continueText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  orText: {
    fontSize: 14,
    textAlign: "center",
    color: "#888",
    marginBottom: 20,
  },
  socialContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 20,
  },
  socialButton: {
    marginHorizontal: 10,
    padding: 10,
    borderRadius: 50,
    backgroundColor: "#f0f0f0",
  },
  footerText: {
    fontSize: 12,
    textAlign: "center",
    color: "#aaa",
    marginTop: 20,
  },
});
