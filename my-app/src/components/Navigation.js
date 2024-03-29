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
          backgroundColor: "#393939",
          borderTopLeftRadius: "12px",
          borderTopRightRadius: "12px",
        }}
      >
        <BottomNavigationAction
          label="Home"
          icon={<HomeIcon />}
          sx={{
            "&:hover": {
              color: "#FFAC4B", // Change to your desired hover color
            },
            ".MuiBottomNavigationAction-label": {
              fontFamily: '"Merriweather Sans", sans-serif',
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
            ".MuiBottomNavigationAction-label": {
              fontFamily: '"Merriweather Sans", sans-serif',
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
            ".MuiBottomNavigationAction-label": {
              fontFamily: '"Merriweather Sans", sans-serif',
            },
          }}
        />
      </BottomNavigation>
    </div>
  );
}
