

/*const admin = require("firebase-admin");
const serviceAccount = require("./firebase-adminsdk.json");
const myRouter = require("./router");

// Firebase configuration
const firebaseConfig = {
  apiKey: process.env.REACT_APP_APIKEY,
  authDomain: process.env.REACT_APP_AUTHDOMAIN,
  projectId: process.env.REACT_APP_PROJECTID,
  storageBucket: process.env.REACT_APP_STORAGEBUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGINGSENDERID,
  appId: process.env.REACT_APP_APPID,
  measurementId: process.env.REACT_APP_MEASUREMENTID,
};

// Initialize Firebase
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

module.exports = admin;

myRouter.put("/getSuppliers", (req, res) => {
    
  const db = admin.firestore();
  const a = db.collection('suppliers')
  
    const docRef = a.doc(req.body.name)
    
    res.send("done")
  });
  */

  /*
  ./firebasejson
{
  "type": "service_account",
  "project_id": "supplier-upload-rundoo",
  "private_key_id": "7415c534a569fdc3f1386e2766a065bfc14584c2",
  "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQDBrpfM8x6vYhoC\nFchpMcgTZeVUFG06MeQfRJVeq6VA3cujFtyGsCtdjAVwHBiPhicTb7GQWRvVMoBX\n6Rh5zBqt8EYSosrveFCb2NfI6r5eIBqOyUj1q4TiwpNb/ZbVR+GiJhWsLAOe5bBc\nt+k7DMg7Oc36ciMj51/nZqNMffqaCV70Hot5tmfnIy7DDJHZccAyT9z3x9iGhbEZ\n13itEM8GM0HOYvs56GshhYiHukIxDxe0iKKZqTKGuH69i16avYND8uCB72J91qXF\nuht05qBrtUv2h3YMzRtrYOSTe1+mJS7Kj69GFO4nVb+GFmEhpNkllFgkAG8fKv5E\n4ZNMMHCRAgMBAAECggEABqQVCCXbat3RILpsul+mubSMGBWRt7W7ec99FCeMRWS9\nfWB0rAkZGY5qJtGNzYkG6LmTE+0cQVOHl0wSpuV20jk7e9rZXLvqPqfBIV5cK+fL\npVL1RZgtmKVdjmFL9VDvRYMrCdHiB2YehZVYQcoyyOYW4BQfDJV7wjhQl9g3eiXS\nBpcDcheFvGsmlBjPCoHHDh8WEvBKis0pnmlHTJ885yOn4sOdBG5K2LK9ZEVKUbmO\nk4WjiilYV1li/A/LEQKfym0yrm5u8qheSoUYpbNpWCI946x//thdEsPo+iI2DYHX\n38Bn7fkZIXE4DALlTC3Z/CX+3uIOohpCAke0pCtowQKBgQDzycC41VgNanwo/cVT\nnjVByHxJv9D8lwibjVANHGSsZu7WNNsSFY1d7gQ1BCYW5ZR3idq5YYawQm7WdKOE\nI17M3WzkKtof4imtcHnNibrp+0BRoq4SxGyL4qLJChZEYYcO7BxNfjXcrz/P9uwy\nNXdQ6mRIxS1fjLfMRfkRFijEoQKBgQDLYkxjdIKZxy95fRBQ+oF7RxtA2WURYiv+\nfDxDhKY1WRkZHTZPPaPNgT9/LIVHE3/yHH/24mRifQ10HSChK8Y8CoDKNqFbYEV2\nWE+8di3UT36sRWwH1YtVfWFyL0Y9k6nxfciIg6RxX6qQcyHGVRk4irVcx+molNct\nxrg2zto18QKBgHBlOPQ+cC0nRf0EGuDVVQpyK1M5G1oJLA/DU//nckbF4iFiFwo8\nY4PFw6zJr+HokM2YAf5sB1PmHQHEnsrCH+flwlljpFMEy2BKNe3cLQ/JJbs9fHHs\nm3rWz2ROwTtfl4v6sYXMxXpsVchEuFrhqZPlrLycI7Ikx2xnalBFXiBhAoGAbAlq\nZIZWfdOGD3X0vd9j+pVaD8erXWGV1xgtdvw2wi3zHBkdaVhn89lNXoPKxGfCVlz3\nSLEX/A1LoTt7wsGbCvfVVBVS/1QTcfsVWBo63AXiVyaFbV/tJNt2cQ5VtI4E/0f+\nxy2Oo77avuK5tT4tKJDeKEv1fdyatTFTV6Hn3jECgYA7soXU9acN0sxSKCNGyQ/z\nlhXyukyc9QRIX0j0Jw/iVN6HNtVrn6AqEV3zj7t24uhcRdtzYOuVUabLg0Pgijyc\nD2ZM4+FzxbCU0FtdeuGRNKooEvPFuN9zo/10RmgzpF3P/pjHRaIxpClsJWI4+Xgl\ngJLzoDsMi82Bcf45MM6lZg==\n-----END PRIVATE KEY-----\n",
  "client_email": "firebase-adminsdk-yxh2j@supplier-upload-rundoo.iam.gserviceaccount.com",
  "client_id": "109537791167339150786",
  "auth_uri": "https://accounts.google.com/o/oauth2/auth",
  "token_uri": "https://oauth2.googleapis.com/token",
  "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
  "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-yxh2j%40supplier-upload-rundoo.iam.gserviceaccount.com",
  "universe_domain": "googleapis.com",
  "storageBucket": "supplier-upload-rundoo.appspot.com"
}
*/