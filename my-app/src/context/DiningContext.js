import React, { createContext, useContext, useState } from "react";

export const DiningHallContext = createContext(null);

export const DiningHallProvider = ({ children }) => {
  const [joinedHall, setJoinedHall] = useState(null); // Track the name of the joined dining hall

  return (
    <DiningHallContext.Provider value={{ joinedHall, setJoinedHall }}>
      {children}
    </DiningHallContext.Provider>
  );
};

export const useDiningHall = () => useContext(DiningHallContext);
