// Ideally, these controllers should be in multiple files, however, since there are only two, they are in the same file for time being.

import db from "./db.js";

export const addSchool = (req, res) => {
  
  const { name, address, latitude, longitude } = req.body;

  // Validate Input
  if (!name || typeof name !== "string" || name.trim() === "") {
    return res.status(400).json({ error: "Name is required and must be a non-empty string." });
  }

  if (!address || typeof address !== "string" || address.trim() === "") {
    return res.status(400).json({ error: "Address is required and must be a string." });
  }

  if (typeof latitude !== "number" || latitude < -90 || latitude > 90) {
    return res.status(400).json({ error: "Latitude must be a number between -90 and 90." });
  }

  if (typeof longitude !== "number" || longitude < -180 || longitude > 180) {
    return res.status(400).json({ error: "Longitude must be a number between -180 and 180." });
  }

  // Request is valid - Add school to DB
  try {
    console.log(db.addSchool(name, address, latitude, longitude));
  } catch(err) {
    return res.status(500).json({error: "Internal Server Error."});
  }
  
  // School added to DB
  return res.status(201).json({message: "School has been added to database."})

}