import express from "express";
import axios from "axios";
import "dotenv/config";

const app = express();
const port = 3000;

app.get("/", async (req, res) => {
  try {
    const response = await axios.get(
      "https://api.hubapi.com/crm/v3/objects/products",
      {
        headers: {
          Authorization: `Bearer ${process.env.API_KEY}`,
        },
      }
    );
    res.json(response.data);
  } catch (error) {
    res.json({ error: error.toString() });
  }
});

app.listen(port, () => console.log(`Server is listening on port: ${port}`));
