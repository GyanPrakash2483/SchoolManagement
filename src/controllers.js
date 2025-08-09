// Ideally, these controllers should be in multiple files, however, since there are only two, they are in the same file for time being.

import db from "./db.js";
import "./types.js";

export const addSchool = async (req, res) => {
  
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

/**
 * Calculates haversineDistance of school from given coordinates in meters.
 * @param {School} school - School object
 * @param {number} latitude - latitude of target location
 * @param {number} longitude - longitude of target location
 * @returns {number} Distance of school from given location
 */
const haversineDistance = (school, latitude, longitude) => {
  const toRad = deg => deg * Math.PI / 180;
  
  const lat1 = toRad(school.latitude);
  const lon1 = toRad(school.longitude);

  const lat2 = toRad(latitude);
  const lon2 = toRad(longitude);

  const R = 6378137; // Radius of earth in meters
  

  const halfChordSq = Math.sin((lat2 - lat1) / 2) ** 2 +
                      Math.cos(lat1 * Math.cos(lat2)) *
                      Math.sin(lon2 - lon1) ** 2;

  const circularDistance = 2 * Math.atan2(Math.sqrt(halfChordSq), Math.sqrt(1 - halfChordSq));

  const distance = R * circularDistance;

  return distance;

}

export const listSchools = async (req, res) => {
  
  const { latitude, longitude } = req.query;

  const lat = Number(latitude);
  const lon = Number(longitude);

  // Validate Input
  if (latitude === undefined || longitude === undefined) {
    return res.status(400).json({ error: "Both latitude and longitude are required." });
  }

  if (Number.isNaN(lat) || Number.isNaN(lon)) {
    return res.status(400).json({ error: "Latitude and longitude must be valid numbers." });
  }

  if (lat < -90 || lat > 90) {
    return res.status(400).json({ error: "Latitude must be between -90 and 90." });
  }
  if (lon < -180 || lon > 180) {
    return res.status(400).json({ error: "Longitude must be between -180 and 180." });
  }

  let schools;
  try {
    schools = await db.getSchools();
  } catch {
    return res.status(500).json({error: "Internal Server Error."})
  }
  schools.sort((a, b) => {
    return haversineDistance(a, latitude, longitude) - haversineDistance(b, latitude, longitude);  
  });

  return res.status(200).json({
    schools
  });

}