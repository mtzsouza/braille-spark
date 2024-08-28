export const environment = {
    production: true,
    firebaseConfig: {
        apiKey: process.env['API_KEY'] || '',
        authDomain: "braille-spark.firebaseapp.com",
        projectId: "braille-spark",
        storageBucket: "braille-spark.appspot.com",
        messagingSenderId: "15881527129",
        appId: "1:15881527129:web:4c6193b57bd7b9845df648"
    }
  };