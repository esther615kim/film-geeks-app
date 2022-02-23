import React, { useState } from "react";
import { Text, View, StyleSheet, Platform, Button, Alert, useColorScheme } from "react-native";
import { TextInput, Headline } from "react-native-paper";
import { Link } from '@react-navigation/native';
import {
  getAuth,
  signInWithEmailAndPassword
} from "firebase/auth";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { db } from "./../firebase/config";
import GAuth from '../components/Auth/GAuth';

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const formData = { email, password };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);

    try {
      const auth = getAuth();

      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      const user = userCredential.user;
      if(userCredential.user){
          console.log("logged in!")
          // navigate to Main Page
      }

    } catch (err) {
      console.log(err);
    }
  };
  return (
    <>
      <form style={{ padding: 20 }}>
        <Headline style={{color:"#fff"}}>Login</Headline>
        <View>
          <Text style={styles.label}>Email</Text>
          <TextInput
            style={styles.input}
            value={email}
            onChangeText={(email) => {
              setEmail(email);
            }}
          ></TextInput>
        </View>

        <View>
          <Text style={styles.label}>Password</Text>
          <TextInput
            style={styles.input}
            value={password}
            secureTextEntry
            right={<TextInput.Icon name="eye" />}
            onChangeText={(password) => {
              setPassword(password);
            }}
          ></TextInput>
                  <br />
                  <br/>
        <Button style={styles.button} title="Log In" onPress={handleSubmit} />
        <br/>
        </View>
        <br/>
        <Text style={styles.label}>Sign Up?</Text>
      </form>
      <GAuth/>
    </>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    fontWeight: 500,
    padding: Platform.OS === "android" ? 12 : 10,
    paddingBottom: 40,
    textAlign: "center",
    color: "#fff",
  },
  label: {
    height: 40,
    width: "40%",
    color: "#fff",
    paddingTop: 15,
  },
  input: {
    width: "100%",
    height: 40,
  },
  password: {
    width: "100%",
    height: 40,
    marginTop: 20,
  },

  button: {
    width: "100%",
    height: 40,
  },
});
