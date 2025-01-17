import React, { useCallback } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
} from "react-native";
import { useState } from "react";
import { Link, useRouter } from "expo-router";
import { SignedIn, useUser, useSignIn } from "@clerk/clerk-expo";
import RecordingButton from "../components/recordingButton/recordingButton";
import { Alert } from "react-native";

export default function LoginScreen() {
  const { signIn, setActive, isLoaded } = useSignIn();
  const router = useRouter();

  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");



  const onSignInPress = useCallback(async () => {
    if (!isLoaded) {
      return;
    }

    try {
      const signInAttempt = await signIn.create({
        identifier: emailAddress,
        password,
      });

      if (signInAttempt.status === "complete") {
        await setActive({ session: signInAttempt.createdSessionId });
        router.replace("/");
      } else {
        // See https://clerk.com/docs/custom-flows/error-handling
        // for more info on error handling
        console.error(JSON.stringify(signInAttempt, null, 2));
      }
    } catch (err: any) {
      // console.error(JSON.stringify(err, null, 2));
      Alert.alert("Error", err.message);
    }
  }, [isLoaded, emailAddress, password]);

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image
          source={require("../../assets/images/icon.png")}
          style={styles.logo}
        />
        <Text style={styles.brandText}>Audio Rec</Text>
      </View>

      <Text style={styles.welcomeText}>Welcome Back</Text>
      <Text style={styles.subText}>
        Welcome Back, Please enter Your details
      </Text>

      <View style={styles.tabContainer}>
        <TouchableOpacity style={[styles.tab, styles.activeTab]}>
          <View>
            <Text style={[styles.tabText, styles.activeTabText]}>Sign In</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tab}>
          {/* <Text style={styles.tabText}>Signup</Text> */}
          <Link href="/sign-up">
            <Text style={[styles.tabText, styles.signUp]}>Sign Up</Text>
          </Link>
        </TouchableOpacity>
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>Email Address</Text>
        <View style={styles.inputWrapper}>
          {/* <TextInput
            style={styles.input}
            placeholder="Email Address"
            placeholderTextColor="#ccc"
          /> */}
          <TextInput
            style={styles.input}
            autoCapitalize="none"
            value={emailAddress}
            placeholder="Email..."
            placeholderTextColor="white"
            onChangeText={(emailAddress) => setEmailAddress(emailAddress)}
          />
          {/* <FontAwesome name="check-circle" size={20} color="green" /> */}
        </View>
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>Password</Text>
        <View style={styles.inputWrapper}>
          {/* <TextInput
            style={styles.input}
            placeholder="Email Address"
            placeholderTextColor="#ccc"
          /> */}
          <TextInput
            style={styles.input}
            value={password}
            placeholder="Password..."
            placeholderTextColor="white"
            secureTextEntry={true}
            onChangeText={(password) => setPassword(password)}
          />
          {/* <FontAwesome name="check-circle" size={20} color="green" /> */}
        </View>
      </View>


      <TouchableOpacity style={styles.continueButton} onPress={onSignInPress}>
        <Text style={styles.continueText}>Continue</Text>
      </TouchableOpacity>

      <Text style={styles.footerText}>
        Join the millions of smart users who trust us to manage their voice
        journals. Log in to access your personalized voice journal, track your
        recordings, and capture your most valuable moments.
      </Text>

      <SignedIn>
        <RecordingButton />
      </SignedIn>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#171717",
    padding: 20,
    justifyContent: "center",
  },
  logoContainer: {
    alignItems: "center",
    marginBottom: 30,
  },
  logo: {
    width: 50,
    height: 50,
    marginBottom: 10,
  },
  brandText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
  },
  welcomeText: {
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    color: "white",
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
    backgroundColor: "#95D4AA",
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
    color: "white",
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
    fontSize: 16,
    color: "white",
  },
  continueButton: {
    backgroundColor: "#95D4AA",
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: "center",
    marginBottom: 20,
  },
  continueText: {
    color: "#000",
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
  signUp: {
    color: "#95D4AA",
  },
  footerText: {
    fontSize: 12,
    textAlign: "center",
    color: "#aaa",
    marginTop: 20,
  },
});
