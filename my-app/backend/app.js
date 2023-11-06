import fs from "node:fs/promises";
import bodyParser from "body-parser";
import express from "express";
import { fuzzySearch } from "./utils/fuzzy-search.js";

const app = express();

app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, OPTIONS"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type"
  );
  next();
});

app.get("/options", async (req, res) => {
  const { max, search } = req.query;
  const eventsFileContent = await fs.readFile("./data/options.json");
  let options = JSON.parse(eventsFileContent);
  const fuzzyOptions = fuzzySearch(options, ["text"]);

  console.log("here");

  if (search) {
    options = fuzzyOptions(search);
    console.log(options);
    // options = options.filter((options) => {
    //   return options.text.toLowerCase().includes(search.toLowerCase());
    // });
  }

  if (max) {
    options = options.slice(options.length - max, options.length);
  }

  console.log(options, search);

  res.json({
    options: options.map((options) => ({
      id: options.item.id,
      text: options.item.text,
    })),
  });
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
