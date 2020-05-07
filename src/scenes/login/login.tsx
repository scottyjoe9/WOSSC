import 'react-native-gesture-handler';
import React, { Component } from 'react';
import { Text, View, Button } from 'react-native';
import { LoginScreenRouteProp, LoginScreenNavigationProp } from '../../utils/types';
import auth from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-community/google-signin';
import google_services from '../../../android/app/google-services.json';

GoogleSignin.configure({
  webClientId: google_services.client[0].oauth_client[2].client_id,
  offlineAccess: true
});

type Props = {
  route: LoginScreenRouteProp;
  navigation: LoginScreenNavigationProp;
};

export default class Login extends Component<Props>
{
  render()
  {
    return (
    <View>
    <Text></Text>
    <Button
      title="Sign in with Google"
      onPress={() => this.sign_in_with_google()}
    />
    </View>);
  }

  componentDidMount(){
    auth().onAuthStateChanged((user) => {
      if (user) {
        this.props.navigation.replace("Tabs");
      }
   });
  }

  async sign_in_with_google()
  {
    const { idToken } = await GoogleSignin.signIn();

    if (idToken)
    {
      // Create a Google credential with the token
      const googleCredential = auth.GoogleAuthProvider.credential(idToken);
      // Sign-in the user with the credential
      return auth().signInWithCredential(googleCredential);
    }
  }
}