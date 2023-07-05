const {
  initializeApp,
  applicationDefault,
  cert,
} = require("firebase-admin/app");
const {
  getFirestore,
  Timestamp,
  FieldValue,
  Filter,
} = require("firebase-admin/firestore");
//const {ref, getStorage, uploadString} = require('firebase/storage')
const serviceAccount = require("./firebase-adminsdk.json");
//const { storage } = require("./firebase");
const { getStorage } = require("firebase-admin/storage");
const { ref, uploadBytes } = require("firebase/storage");
initializeApp({
  credential: cert(serviceAccount),
  storageBucket: "gs://supplier-upload-rundoo.appspot.com",
});
const db = getFirestore();
const storage = getStorage();

const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = 8080;
var cors = require("cors");
app.use(cors({ origin: true, credentials: true }));

app.use(bodyParser.json({ limit: Infinity }));
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.get("/", (request, response) => {
  response.send("POST /submit to upload a record");
});

app.post("/submit", async (request, response) => {
  const { name, address, logo } = request.body;
  /*
  const storageRef  = ref(storage, `${name}-logo`);
  uploadString(storageRef, logo, 'data_url').then((snapshot) => {
    console.log('Uploaded a data_url string!');
  });
  */
  const base64Response = await fetch(logo);
  const blob = await base64Response.blob();
  //const storageRef  = ref(storage, `logo`);
  const metadata = {
    contentType: "image/jpeg",
  };

  // Upload the file and metadata
  //uploadBytes(storageRef, blob, metadata);
  /*  
uploadBytes(storageRef, blob).then((snapshot) => {
    console.log('Uploaded a blob or file!');
  });
*/
  const res = await db.collection("suppliers").add({
    address: address,
    name: name,
    logo: logo,
  });
  if (res) {
    response.sendStatus(600);
  } else {
    response.sendStatus(619);
  }
});

app.get("/suppliers", async (request, response) => {
  const citiesRef = db.collection("suppliers");
  const snapshot = await citiesRef.get();
  const jsonResult = [];

  snapshot.forEach((doc) => {
    jsonResult.push({
      "supplier-name": doc.data().name,
      "supplier-address": doc.data().address,
      "supplier-logo-as-base64": doc.data().logo
    })
  });

  response.send(jsonResult)
});

app.listen(port, () => {
  console.log(`App running on port ${port}.`);
});
