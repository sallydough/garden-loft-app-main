import { register } from '@videosdk.live/react-native-sdk';
import App from './App';
import { registerRootComponent } from 'expo';

// Register the service
register();

registerRootComponent(App);