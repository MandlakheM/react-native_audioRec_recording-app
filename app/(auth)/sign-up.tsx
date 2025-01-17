import * as React from "react";
import {
  TextInput,
  View,
  Alert,
  StyleSheet,
  TouchableOpacity,
  Text,
} from "react-native";
import { useSignUp } from "@clerk/clerk-expo";
import { useRouter } from "expo-router";

export default function SignUpScreen() {
  const { isLoaded, signUp, setActive } = useSignUp();
  const router = useRouter();

  const [emailAddress, setEmailAddress] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [pendingVerification, setPendingVerification] = React.useState(false);
  const [code, setCode] = React.useState("");

  const onSignUpPress = async () => {
    if (!isLoaded) {
      return;
    }

    try {
      await signUp.create({
        emailAddress,
        password,
      });

      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });

      setPendingVerification(true);
    } catch (err: any) {
      // See https://clerk.com/docs/custom-flows/error-handling
      // for more info on error handling
      // console.error(JSON.stringify(err, null, 2));
      Alert.alert("Error", err.message);
    }
  };

  const onPressVerify = async () => {
    if (!isLoaded) {
      return;
    }

    try {
      const completeSignUp = await signUp.attemptEmailAddressVerification({
        code,
      });

      if (completeSignUp.status === "complete") {
        await setActive({ session: completeSignUp.createdSessionId });
        router.replace("/");
      } else {
        console.error(JSON.stringify(completeSignUp, null, 2));
      }
    } catch (err: any) {
      // See https://clerk.com/docs/custom-flows/error-handling
      // for more info on error handling
      // console.error(JSON.stringify(err, null, 2));
      Alert.alert("Error", err.message);
    }
  };

  return (
    <View style={styles.container}>
      {!pendingVerification && (
        <>
          <View style={styles.inputContainer}>
            <View style={styles.inputWrapper}>
              <TextInput
                style={styles.input}
                autoCapitalize="none"
                value={emailAddress}
                placeholder="Email..."
                placeholderTextColor="white"
                onChangeText={(email) => setEmailAddress(email)}
              />
            </View>

            <View style={styles.inputWrapper}>
              <TextInput
                style={styles.input}
                value={password}
                placeholder="Password..."
                placeholderTextColor="white"
                secureTextEntry={true}
                onChangeText={(password) => setPassword(password)}
              />
            </View>
          </View>

          <TouchableOpacity
            style={styles.continueButton}
            onPress={onSignUpPress}
          >
            <Text style={styles.continueText}>Sign Up</Text>
          </TouchableOpacity>
          {/* <Button title="Sign Up" onPress={onSignUpPress} /> */}
        </>
      )}
      {pendingVerification && (
        <>
          <View style={styles.inputWrapper}>
            <TextInput
              style={styles.input}
              value={code}
              placeholder="Code..."
              placeholderTextColor="white"
              onChangeText={(code) => setCode(code)}
            />
          </View>

          <TouchableOpacity
            style={styles.continueButton}
            onPress={onPressVerify}
          >
            <Text style={styles.continueText}>Verify Emai</Text>
          </TouchableOpacity>
        </>
      )}
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
});
