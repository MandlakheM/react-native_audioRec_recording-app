import React, { useCallback } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  Pressable,
  ViewComponent,
} from "react-native";
import { useState } from "react";
import { FontAwesome } from "@expo/vector-icons";
import { Link, useRouter } from "expo-router";
import { SignedIn, SignedOut, useUser, useSignIn } from "@clerk/clerk-expo";
import RecordingButton from "../components/recordingButton/recordingButton";

export default function LoginScreen() {
  const { signIn, setActive, isLoaded } = useSignIn()
  const router = useRouter();

  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");

  const [support, setSupport] = useState(false);
  const { user } = useUser();

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
      console.error(JSON.stringify(err, null, 2));
    }
  }, [isLoaded, emailAddress, password]);

  return (
    <View style={styles.container}>
      {/* Logo Section */}
      <View style={styles.logoContainer}>
        {/* Replace this with an Image component if you have a logo */}
        <Image
          source={require("../../assets/images/icon.png")} // Replace with your logo file
          style={styles.logo}
        />
        <Text style={styles.brandText}>Audio Rec</Text>
      </View>

      {/* Welcome Text */}
      <Text style={styles.welcomeText}>Welcome Back</Text>
      <Text style={styles.subText}>
        Welcome Back, Please enter Your details
      </Text>

      {/* Tab Options */}
      <View style={styles.tabContainer}>
        <TouchableOpacity style={[styles.tab, styles.activeTab]}>
          {/* <Text style={[styles.tabText, styles.activeTabText]}>Sign In</Text> */}
          <Link href="/sign-in">
            <Text style={[styles.tabText, styles.activeTabText]}>Sign In</Text>
          </Link>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tab}>
          {/* <Text style={styles.tabText}>Signup</Text> */}
          <Link href="/sign-up">
            <Text style={[styles.tabText, styles.activeTabText]}>Sign Up</Text>
          </Link>
        </TouchableOpacity>
      </View>

      {/* Input Fields */}
      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>Email Address</Text>
        <View style={styles.inputWrapper}>
          {/* <TextInput
            style={styles.input}
            placeholder="Email Address"
            placeholderTextColor="#ccc"
          /> */}
          <TextInput
            autoCapitalize="none"
            value={emailAddress}
            placeholder="Email..."
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
            // autoCapitalize="none"
            value={password}
            placeholder="Password..."
            secureTextEntry={true}
            onChangeText={(password) => setPassword(password)}
          />
          {/* <FontAwesome name="check-circle" size={20} color="green" /> */}
        </View>
      </View>

      {/* Continue Button */}
      <TouchableOpacity style={styles.continueButton} onPress={onSignInPress}>
        <Text style={styles.continueText}>Continue</Text>
      </TouchableOpacity>

      {/* Social Login Options */}
      {/* <Text style={styles.orText}>Or Continue With</Text>
      <View style={styles.socialContainer}>
        <TouchableOpacity style={styles.socialButton}>
          <FontAwesome name="google" size={24} color="black" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.socialButton}>
          <FontAwesome name="apple" size={24} color="black" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.socialButton}>
          <FontAwesome name="facebook" size={24} color="black" />
        </TouchableOpacity>
      </View> */}

      {/* Footer Text */}
      <Text style={styles.footerText}>
        Join the millions of smart investors who trust us to manage their
        finances. Log in to access your personalized dashboard, track your
        portfolio performance, and make informed investment decisions.
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
    backgroundColor: "#fff",
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
