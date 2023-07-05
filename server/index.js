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

// Firebase initialization
const { initializeApp, cert } = require("firebase-admin/app");
const { getFirestore } = require("firebase-admin/firestore");
const serviceAccount = require("./firebase-adminsdk.json");
const { getStorage } = require("firebase-admin/storage");

initializeApp({
  credential: cert(serviceAccount),
  storageBucket: "gs://supplier-upload-rundoo.appspot.com",
});

const bucket = getStorage().bucket();
const db = getFirestore();
const stream = require("stream");

app.get("/", (request, response) => {
  response.send(
    "POST /submit to upload a record \n Get /suppliers to see all supplier records"
  );
});

app.post("/submit", async (request, response) => {
  const { name, address, logo } = request.body;
  let imagePath = "";

  try {
    var bufferStream = new stream.PassThrough();
    bufferStream.end(Buffer.from(logo, "base64"));

    const imageName = name + Date.now() + ".jpg";
    const file = bucket.file(imageName);

    bufferStream
      .pipe(
        file.createWriteStream({
          metadata: {
            contentType: "image/jpeg",
            metadata: {
              custom: "metadata",
            },
          },
          public: true,
          validation: "md5",
        })
      )
      .on("finish", async function () {
        imagePath =
          "https://storage.googleapis.com/supplier-upload-rundoo.appspot.com/" +
          imageName;

        const res = await db.collection("suppliers").add({
          address: address,
          name: name,
          logo: imagePath,
        });
        if (res) {
          response.sendStatus(600);
        } else {
          response.sendStatus(619);
        }
      });
  } catch (e) {
    console.log(e);
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
      "supplier-logo-as-base64": doc.data().logo,
    });
  });

  response.send(jsonResult);
});

app.listen(port, () => {
  console.log(`App running on port ${port}.`);
});
