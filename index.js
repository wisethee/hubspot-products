import express from "express";

import axios from "axios";

const app = express();
const port = 3000;

const API_KEY = "pat-na1-10e1e42a-93bb-4858-b88b-9ae41a1be592";

app.get("/", async (req, res) => {
  try {
    const response = await axios.get(
      "https://api.hubapi.com/crm/v3/objects/products",
      {
        headers: {
          Authorization: `Bearer ${API_KEY}`,
        },
      }
    );
    res.json(response.data);
  } catch (error) {
    res.json({ error: error.toString() });
  }
});

app.listen(port, () => console.log(`Server is listening on port: ${port}`));
