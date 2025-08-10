import express from "express";
import { addSchool, listSchools, clearRecords } from "./controllers.js";
import { dirname } from "path";
import { fileURLToPath } from "url";


const app = express();
app.use(express.json());

app.get('/', (_, res) => {
  const fileName = fileURLToPath(import.meta.url);
  const dirName = dirname(fileName);

  res.sendFile(`${dirName}/view/index.html`);
})

app.post('/addSchool', addSchool);
app.get('/listSchools', listSchools);
app.delete('/clearRecords', clearRecords);

app.listen(8080, () => {
  console.log("[+] http://localhost:8080");
})