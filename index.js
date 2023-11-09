import express from "express";
import axios from "axios";
import cors from "cors";

import "dotenv/config";

const app = express();
const port = 3000;

app.use(cors());

if (!process.env.API_KEY) {
  console.error("Missing API_KEY in environment variables");
  process.exit(1);
}

app.get("/", async (req, res) => {
  try {
    const response = await axios.get(
      "https://api.hubapi.com/crm/v3/objects/products?limit=10&properties=hs_sku&archived=false",
      {
        headers: {
          Authorization: `Bearer ${process.env.API_KEY}`,
        },
      }
    );
    res.type("application/json");
    res.json(response.data);
  } catch (error) {
    res.json({ error: error.toString() });
  }
});

app.listen(port, () => console.log(`Server is listening on port: ${port}`));
