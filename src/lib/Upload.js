export const upload = async (file) => {
  return new Promise((resolve, reject) => {
    if (!file) {
      reject("No file provided");
      return;
    }

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      const base64String = reader.result; // Convert image to Base64 string
      localStorage.setItem("profileImage", base64String); // Save to localStorage
      resolve(base64String); // Return Base64 URL
    };
    reader.onerror = () => {
      reject("Error reading file");
    };
  });
};






















// import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

// export const upload = (file) => {
    
//     const storage = getStorage();
//     const storageRef = ref(storage, `images/${Date.now() + file.name}`);
    
//     const uploadTask = uploadBytesResumable(storageRef, file);
    
//     return new Promise((resolve, reject) => {

//       uploadTask.on('state_changed', 
//         (snapshot) => {
         
//           const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
//           console.log('Upload is ' + progress + '% done');
//           switch (snapshot.state) {
//             case 'paused':
//               console.log('Upload is paused');
//               break;
//             case 'running':
//               console.log('Upload is running');
//               break;
//           }
//         }, 
//         (error) => {
         
//         }, 
//         () => {
         
//           getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
//             resolve(downloadURL);
//           });
//         }
//       );
//     })

// }

// export default upload
