import express from "express";
import { addSchool, listSchools, clearRecords } from "./controllers.js";


const app = express();
app.use(express.json());

app.get('/', (req, res) => {
  //TODO: Documentation site
  res.send("Hello, World!");
})

app.post('/addSchool', addSchool);
app.get('/listSchools', listSchools);
app.delete('/clearRecords', clearRecords);

app.listen(8080, () => {
  console.log("[+] http://localhost:8080");
})