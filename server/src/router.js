//const { admin } = require("./firebase");

const myRouter = require("express").Router();
/*
const {ref} = require("firebase/storage");
const {uploadString} = require("firebase/storage");
*/

myRouter.get("/", (req, res) => {
  res.send("POST /submit to upload a record");
});

myRouter.post("/submit", (req, res) => {
  console.log(req.body);
  const { logo, name, address } = req;

  const storageRef = ref(storage, name + "-logo");
  uploadString(storageRef, logo, "data_url").then((snapshot) => {
    console.log("Uploaded a data_url string!");
  });
});

//module.exports = myRouter;
