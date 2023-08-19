// // import {  getFirestore } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-firestore.js";

// // import { initializeApp } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-app.js";
// // import { firestore } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-firestore.js";



// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDXEpcdD-Nk1PbYVh0phcln7mu1c4RkUEk",
  authDomain: "authentication-235e3.firebaseapp.com",
  projectId: "authentication-235e3",
  storageBucket: "authentication-235e3.appspot.com",
  messagingSenderId: "725330443862",
  appId: "1:725330443862:web:0995cd6cee26bcd4ec05f7",
  measurementId: "G-H1L1ZEPKCK"
};
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

const timestamp = firebase.firestore.FieldValue.serverTimestamp();
let button = document.getElementById("button");
button.addEventListener("click", function () {
  // Get the values of the title and text fields
  const tittle = document.getElementById("tittle").value;
  const text = document.getElementById("input").value;

  // Add the new message to the database
  db.collection("Blogs")
    .add({
      timestamp: timestamp,
      tittle: tittle,
      text: text,
      // userId: userId
    })
    .then(() => {
      console.log("Message added successfully");
      rendermsg(); // Refresh the messages
    })
    .catch((error) => {
      console.error("Error adding message:", error);
    });

  // Clear input fields
  document.getElementById("tittle").value = "";
  document.getElementById("input").value = "";
});
function rendermsg() {
  const container = document.querySelector(".main");

  db.collection("Blogs")
    .orderBy("timestamp", "desc")
    .get()
    .then((querySnapshot) => {
      container.innerHTML = "";

      if (querySnapshot.empty) {
        container.innerText = "No chat found";
      } else {
        const reversedDocs = querySnapshot.docs.reverse();

        reversedDocs.forEach((doc) => {
          const data = doc.data();
          //iske ander sab he
          const maindiv = document.createElement("div");
          maindiv.className = "datamain"
          container.appendChild(maindiv)
          //isme pic or tittel niche nam
          const tittlediv = document.createElement("div")
          tittlediv.className = "tittlediv"
          maindiv.appendChild(tittlediv);
          //image ka div
          const imagediv = document.createElement("div");
          imagediv.className = "imagediv";
          tittlediv.appendChild(imagediv);

          // Create an icon (avatar) element
          const imagee = document.createElement("i");
          imagee.className = "bi bi-person-lines-fill";
          imagee.id = "iid";
          imagediv.appendChild(imagee);

          //tittele div me ab name

          username = document.createElement("h2")
          username.className = "userdata"
          username.innerText = data.tittle
          tittlediv.appendChild(username)

          //time dhlwani he 
          timediv = document.createElement("p")
          timediv.className = "timediv"
          timediv.innerText = data.timestamp



          // AB MUJHA BLOG KI DIV BANANI HE 

          blogdiv = document.createElement('div')
          blogdiv.className = "blogdiv"
          blogdiv.innerText = data.text



          //    del1.addEventListener("click", () => deletePoll(doc.id));
          //    foter.appendChild(del1);



          // Attach the editPoll function to the "Edit" button
          //            editButton.addEventListener("click", () => {
          //              editPoll(doc.id);
          //            });
          container.insertBefore(maindiv, container.firstChild);

        });
      }
    })
    .catch((error) => {
      console.error("Error fetching chat:", error);
    });
}




document.addEventListener("DOMContentLoaded", function () {
  rendermsg();
});





function editPoll(docId) {
  currentUser = auth.currentUser; // Assign the current user to the global variable
  if (!currentUser) {
    alert("Please log in to edit this post.");
    return;
  }

  // Get the post document using the provided docId
  db.collection("Blogs")
    .doc(docId)
    .get()
    .then((doc) => {
      // Get the data from the post document
      const data = doc.data();

      // Check if the current user is the author of the post
      if (currentUser.uid === data.userId) {
        const updatedMessage = prompt("Enter the updated message:");
        if (updatedMessage !== null) {
          db.collection("Blogs")
            .doc(docId)
            .update({
              message: updatedMessage
            })
            .then(() => {
              console.log("Document updated with ID:", docId);
              rendermsg(); // Refresh the posts to update the UI
            })
            .catch((error) => {
              console.error("Error updating poll:", error);
            });
        }
      } else {
        // If the current user is not the author, show an alert
        alert("You are not authorized to edit this post.");
      }
    })
    .catch((error) => {
      console.error("Error fetching document from Firestore: ", error);
    });
}

function rendermsg() {
  const container = document.querySelector(".main");

  db.collection("Blogs")
    .orderBy("timestamp", "desc")
    .get()
    .then((querySnapshot) => {
      container.innerHTML = ""; // Clear existing content

      if (querySnapshot.empty) {
        container.innerText = "No chat found";
      } else {
        const reversedDocs = querySnapshot.docs.reverse();

        reversedDocs.forEach((doc) => {
          const data = doc.data();

          // Create a new div for the blog post
          const blogPostDiv = document.createElement("div");
          blogPostDiv.className = "blog-post"; // Add your desired class name

          // Create and set the content for the blog post
          const titleElement = document.createElement("h2");
          titleElement.innerText = data.tittle;
          blogPostDiv.appendChild(titleElement);

          const textElement = document.createElement("p");
          textElement.innerText = data.text;
          blogPostDiv.appendChild(textElement);

          const timestampElement = document.createElement("p");
          timestampElement.innerText = data.timestamp;
          blogPostDiv.appendChild(timestampElement);

          // Append the blog post div to the container
          container.appendChild(blogPostDiv);
        });
      }
    })
    .catch((error) => {
      console.error("Error fetching chat:", error);
    });
}