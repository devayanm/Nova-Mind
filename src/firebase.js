import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyC8-iBy_5HL83s78gSH9om6b68zI0VrZW8",
    authDomain: "nova-mind-d82e3.firebaseapp.com",
    projectId: "nova-mind-d82e3",
    storageBucket: "nova-mind-d82e3.appspot.com",
    messagingSenderId: "485126961680",
    appId: "1:485126961680:web:42013f36f445dc03292895",
    measurementId: "G-XF586YJH8Q"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export default app;