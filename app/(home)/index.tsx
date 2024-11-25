import { SignedIn, SignedOut, useUser } from "@clerk/clerk-expo";
import { Link } from "expo-router";
import { useState } from "react";
import { Text, View, ImageBackground, StyleSheet } from "react-native";
import Entypo from "@expo/vector-icons/Entypo";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import SupportServices from "../components/modal/supportServices";
import { StatusBar } from "expo-status-bar";
import Logout from "../(auth)/sign-out";
import RecordingButton from "../components/recordingButton/recordingButton";
import CustomUserButton from "../components/userDetails/userDetails"
export default function Page() {
  const [support, setSupport] = useState(false);
  const { user } = useUser();

  const background = {
    uri: "https://img.freepik.com/premium-vector/gray-equalizer-isolated-white-background-vector-illustration-pulse-music-player-audio-wave-logo-vector-design-element-poster-sound-wave-template-visualization-signal-illustration-eps-10_299644-7588.jpg?w=740",
  };
  const showSupport = () => {
    setSupport(!support);
    console.log("user info:", user)
  };
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.logo}>
          <Entypo name="modern-mic" size={24} color="black" />
          <Text>Audio Rec</Text>
        </View>
        <View style={styles.menu}>
          {/* <MaterialIcons name="menu" size={28} color="black" /> */}
          <FontAwesome5
            name="info"
            size={24}
            color="black"
            onPress={showSupport}
          />
        </View>
      </View>
      <ImageBackground
        source={background}
        resizeMode="cover"
        style={styles.image}
      >
        {support && <SupportServices showSupport={showSupport} />}
        <SignedIn>
          {/* <Text>Hello {user?.emailAddresses[0].emailAddress}</Text> */}
          <RecordingButton />
          <CustomUserButton/>
          {/* <Logout /> */}
        </SignedIn>
        <SignedOut>
          <Link href="/sign-in">
            <Text>Sign In</Text>
          </Link>
          <Link href="/sign-up">
            <Text>Sign Up</Text>
          </Link>
        </SignedOut>
      </ImageBackground>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: 'blue',
    // alignItems: "center",
    // justifyContent: "center",
  },
  header: {
    // backgroundColor: 'black',
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
  logo: {
    flexDirection: "row",
  },
  menu: {
    marginRight: 20,
  },
});
