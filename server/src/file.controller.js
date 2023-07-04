/* import { getStorage, ref, uploadString } from "firebase/storage";
import { router } from "../src/router";
const storage = getStorage();

router.post("/submit", (req, res) => {
  const { logo, name, address } = req.body;
  console.log(logo, name, address)

  const storageRef = ref(storage, name + "-logo");
  uploadString(storageRef, logo, "data_url").then((snapshot) => {
    console.log("Uploaded a data_url string!");
  });
});

 const upload = async (req, res) => {
    
  };
  
  const getListFiles = async (req, res) => {
    ...
  };
  
  const download = async (req, res) => {
    ...
  }; 

module.exports = {
  upload,
  getListFiles,
  download,
};
 */