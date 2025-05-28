// import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";



export const environment = {

    PORT: 3000,
    // production: false,
    production: true,

    //local
    // base_url: 'http://localhost:3000/api',

    //produccion
    base_url: 'http://190.123.36.135:3000/api'
    // base_url : 'https://academia-backend-production.up.railway.app/api'

    //  firebase: {
    //   apiKey: 'AIzaSyBx0aqa7_32W_Dn1zQKPngzOEWrsklZGKs',
    //   authDomain: 'firechat-55f99.firebaseapp.com',
    //   projectId: 'firechat-55f99',
    //   storageBucket: 'firechat-55f99.appspot.com',
    //   messagingSenderId: '905988864376',
    //   appId: '1:905988864376:web:38e2bbd18c27135266f08d',
    //   measurementId: "G-07FD0GRE30"
    // }
};

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);