import React, { useState } from "react";
import { BottomNavigation, BottomNavigationAction } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useNavigate } from "react-router-dom";

export default function Navigation() {
  const [value, setValue] = useState(0);
  const navigate = useNavigate();

  const handleChange = (event, newValue) => {
    setValue(newValue);

    switch (newValue) {
      case 0:
        navigate("/home");
        break;
      case 1:
        navigate("/friends");
        break;
      case 2:
        navigate("/profile");
        break;
      default:
        break;
    }
  };

  return (
    <div
      style={{
        position: "fixed",
        bottom: 0,
        width: "100%",
        zIndex: 1000,
      }}
    >
      <BottomNavigation
        showLabels
        value={value}
        onChange={handleChange}
        sx={{
          height: "80px",
          backgroundColor: "white",
          borderTopLeftRadius: "12px",
          borderTopRightRadius: "12px",
          "& .MuiBottomNavigationAction-label": {
            // This targets the label of the BottomNavigationAction
            fontFamily: "Montserrat, sans-serif",
          },
          "& .MuiBottomNavigationAction-root.Mui-selected": {
            color: "#FFAC4B",
          },
        }}
      >
        <BottomNavigationAction
          label="Home"
          icon={<HomeIcon />}
          sx={{
            "&:hover": {
              color: "#FFAC4B", // Change to your desired hover color
            },
          }}
        />
        <BottomNavigationAction
          label="Friends"
          icon={<PeopleAltIcon />}
          sx={{
            "&:hover": {
              color: "#FFAC4B", // Change to your desired hover color
            },
          }}
        />
        <BottomNavigationAction
          label="Profile"
          icon={<AccountCircleIcon />}
          sx={{
            "&:hover": {
              color: "#FFAC4B", // Change to your desired hover color
            },
          }}
        />
      </BottomNavigation>
    </div>
  );
}
