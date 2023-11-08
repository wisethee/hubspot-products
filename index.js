import express from "express";
import axios from "axios";
import "dotenv/config";
import morgan from "morgan";

if (!process.env.API_KEY) {
  console.error("Missing API_KEY in environment variables");
  process.exit(1);
}

const app = express();
const port = 3000;

app.use(morgan("combined"));

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
    res.type("application/json");
    res.json(response.data);
  } catch (error) {
    console.error(error);
    res.type("application/json");
    res
      .status(500)
      .json({ error: "An error occurred while processing your request." });
  }
});

app.listen(port, () => console.log(`Server is listening on port: ${port}`));
