import { useState, useEffect } from "react";
import { View, ScrollView, SafeAreaView, StyleSheet, Button, Image,TouchableOpacity,Text } from "react-native";
import { Stack, useRouter } from "expo-router";
import { COLORS, icons, images, SIZES } from "../constants";
import { Nearbyjobs, Popularjobs, ScreenHeaderBtn, Welcome } from "../components";
import "expo-dev-client";
import { GoogleSignin, GoogleSigninButton } from "@react-native-google-signin/google-signin";
import auth from "@react-native-firebase/auth";
import  CodeScoutIntro  from "../components/home/codeScoutIntro/CodeScoutIntro";


const Home = () => {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");

  GoogleSignin.configure({
    webClientId: "1018678846653-t0tub23j57h5518csjukilhkbs7tt7sv.apps.googleusercontent.com",
  });

  function onAuthStateChanged(user) {
    setUser(user);
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  const onGoogleButtonPress = async () => {
    await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
    const { idToken } = await GoogleSignin.signIn();
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);
    const user_sign_in = auth().signInWithCredential(googleCredential);
    user_sign_in
      .then((user) => {
        console.log(user);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const signOut = async () => {
    try {
      await GoogleSignin.revokeAccess();
      await auth().signOut();
      setUser(null); // Set user state to null after signing out
        } catch (error) {
      console.error(error);
    }
  };

  if (initializing) return null;

  if (!user) {
    return (
      <View style={styles.container}>
        <CodeScoutIntro />
        <View>
          <GoogleSigninButton style={styles.googleSignInButton} onPress={onGoogleButtonPress} />
        </View>
      </View>
    );
  }
  

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightWhite }}>
   
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{ flex: 1, padding: SIZES.medium }}>
          <Welcome
            setSearchTerm={setSearchTerm}
            searchTerm={searchTerm}
            handleClick={() => {
              if (searchTerm) {
                router.push(`/search/${searchTerm}`);
              }
            }}
            name={user.displayName}
            profileImage={user.photoURL}
          />
          <Popularjobs />
          <Nearbyjobs />
          <TouchableOpacity style={styles.signOutButton} onPress={signOut}>
  <Text style={styles.signOutButtonText}>Sign Out</Text>
</TouchableOpacity>
       </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentContainer: {
    flex: 1,
    padding: SIZES.medium,
  },
  signOutButton: {
    backgroundColor: '#ff5e57',
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 78,
    alignSelf: 'center',
    marginTop: 20,
  },
  signOutButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  googleSignInButton: {
    width: 192,
    height: 48,
  },
});

export default Home;
