import { Link } from "expo-router";
import React from "react";
import { ActivityIndicator, Text, View } from "react-native";
import Logout from "./(auth)/sign-out";
import Page from "./(home)/index";

const StartPage = () => {
  return (
    <View style={{ flex: 1, justifyContent: "center" }}>
        <Page/>
      {/* <ActivityIndicator size="large" color="#0000ff" /> */}
      {/* <Text>this is the home page</Text> */}
      {/* <Link href="/sign-in">
        <Text>Sign in</Text>
      </Link> */}
      {/* <Logout /> */}
    </View>
  );
};

export default StartPage;
