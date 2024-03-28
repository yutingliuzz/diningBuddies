import React, { useState, useEffect } from "react";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import InputAdornment from "@mui/material/InputAdornment";
import "./Home.css";
import CategoryCard from "./CategoryCard"; // Ensure this path is correct

function Home() {
  const [diningHalls, setDiningHalls] = useState([]);
  const [searchText, setSearchText] = useState(""); // State to keep track of search text

  // Firestore database instance
  const db = getFirestore();

  // Fetch dining hall data from Firestore when the component mounts
  useEffect(() => {
    const fetchDiningHalls = async () => {
      const querySnapshot = await getDocs(collection(db, "DiningHalls"));
      const halls = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setDiningHalls(halls);
    };

    fetchDiningHalls().catch(console.error);
  }, [db]);

  // Filter dining halls based on search text
  const filteredDiningHalls = diningHalls.filter((hall) =>
    hall.name.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <div className="Home">
      <div className="Home-header">
        <h1>Dining Halls</h1>
      </div>
      <div>
        <Box
          component="form"
          sx={{
            "& > :not(style)": {
              m: 1,
              width: "90%",
              paddingLeft: "10px",
              borderRadius: "5px",
            }, // Modify this line to full width
          }}
          noValidate
          autoComplete="off"
        >
          {/* Update the TextField to look more like a search bar */}
          <TextField
            style={{ fontFamily: "Montserrat, sans-serif" }}
            id="search-bar"
            label="Search"
            variant="outlined"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton>
                    <SearchIcon />
                  </IconButton>
                </InputAdornment>
              ),
              style: {
                // Apply styles directly to the input element
                borderRadius: "20px", // For rounded corners
                fontFamily: "Montserrat, sans-serif", // For font family
              },
            }}
            InputLabelProps={{
              style: {
                fontFamily: "Montserrat, sans-serif",
                paddingLeft: "10px",
              }, // Apply your font family to the label
            }}
          />
        </Box>
      </div>
      <main className="Home-main">
        {/* Render a CategoryCard for each filtered dining hall */}
        {filteredDiningHalls.map((hall) => (
          <CategoryCard
            key={hall.id}
            name={hall.name}
            imageUrl={hall.imageUrl}
            color={hall.color}
            description={hall.description}
            menu={hall.menu}
          />
        ))}
      </main>
    </div>
  );
}

export default Home;
