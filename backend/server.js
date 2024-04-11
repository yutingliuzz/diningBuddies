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

// Endpoint to fetch users with names and profile photos
app.get("/getUsers", async (req, res) => {
  try {
    const usersSnapshot = await db.collection("Users").get();
    const users = usersSnapshot.docs.map((doc) => {
      const user = doc.data();
      return { name: user.displayName, photoURL: user.photoURL };
    });
    res.status(200).json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).send(error);
  }
});

// Endpoint to join a dining hall
app.post("/joinDiningHall", async (req, res) => {
  const { userId, diningHallName } = req.body;
  try {
    const joinRef = db.collection("DiningHallUsers").doc(userId);
    await joinRef.set(
      {
        joinedDiningHalls:
          admin.firestore.FieldValue.arrayUnion(diningHallName),
      },
      { merge: true }
    );
    res.status(200).send("Joined dining hall successfully.");
  } catch (error) {
    console.error("Error joining dining hall:", error);
    res.status(500).send("Error joining dining hall");
  }
});

// Endpoint to leave a dining hall
app.post("/leaveDiningHall", async (req, res) => {
  const { userId, diningHallName } = req.body;
  try {
    const leaveRef = db.collection("DiningHallUsers").doc(userId);
    await leaveRef.set(
      {
        joinedDiningHalls:
          admin.firestore.FieldValue.arrayRemove(diningHallName),
      },
      { merge: true }
    );
    res.status(200).send("Left dining hall successfully.");
  } catch (error) {
    console.error("Error leaving dining hall:", error);
    res.status(500).send("Error leaving dining hall");
  }
});

// Endpoint to get user details for a specific dining hall
app.get("/getUsersForDiningHall/:diningHallName", async (req, res) => {
  const { diningHallName } = req.params;
  try {
    // First, get the user IDs who have joined the dining hall
    const joinedSnapshot = await db
      .collection("DiningHallUsers")
      .where("joinedDiningHalls", "array-contains", diningHallName)
      .get();

    // Then fetch each user's details
    const userDetailsPromises = joinedSnapshot.docs.map((doc) =>
      db.collection("Users").doc(doc.id).get()
    );
    const userDetailsSnapshots = await Promise.all(userDetailsPromises);
    const userDetails = userDetailsSnapshots.map((snapshot) => ({
      uid: snapshot.id,
      ...snapshot.data(),
    }));

    res.status(200).json(userDetails);
  } catch (error) {
    console.error("Error fetching users for dining hall:", error);
    res.status(500).send(error);
  }
});

// Endpoint to get details of a specific dining hall
app.get("/DiningHallDetail/:name", async (req, res) => {
  const { name } = req.params;
  try {
    const diningHallRef = db
      .collection("DiningHalls")
      .where("name", "==", name);
    const snapshot = await diningHallRef.get();
    if (snapshot.empty) {
      return res.status(404).send("Dining hall not found");
    }
    // Assuming there's only one dining hall with this name
    const diningHallData = snapshot.docs[0].data();
    res.status(200).json(diningHallData);
  } catch (error) {
    console.error("Error getting dining hall details:", error);
    res.status(500).send(error);
  }
});

// Start the server
const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
