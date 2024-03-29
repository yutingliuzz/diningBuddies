const express = require("express");
const admin = require("firebase-admin");
const app = express();
const cors = require("cors");
app.use(cors());
app.use(express.json());

// Initialize Firebase Admin SDK
const serviceAccount = require("./diningbuddies-firebase-adminsdk-kt26b-cbe6c85b31.json"); // Replace with path to your downloaded service account file

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();

// Endpoint to test if the server is running
app.get("/", (req, res) => {
  res.send("Hello World! The server is up and running!");
});

// Example endpoint to fetch documents from a Firestore collection
app.get("/DiningHalls", async (req, res) => {
  try {
    const snapshot = await db.collection("DiningHalls").get();
    const data = snapshot.docs.map((doc) => doc.data());
    res.status(200).json(data);
  } catch (error) {
    console.error("Error fetching documents:", error);
    res.status(500).send(error);
  }
});

app.post("/createOrUpdateUser", async (req, res) => {
  const { uid, email, displayName, photoURL } = req.body;

  try {
    const userRef = db.collection("Users").doc(uid);
    await userRef.set(
      {
        email: email,
        displayName: displayName,
        photoURL: photoURL,
      },
      { merge: true }
    );

    res.status(200).send("User created/updated successfully.");
  } catch (error) {
    console.error("Error creating/updating user:", error);
    res.status(500).send("Error creating/updating user");
  }
});

// Start the server
const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
