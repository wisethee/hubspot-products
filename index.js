// import express from "express";
// import axios from "axios";
// import cors from "cors";

// import "dotenv/config";

// const app = express();
// const port = 3000;
// const axiosUrl =
//   "https://api.hubapi.com/crm/v3/objects/products?limit=10&properties=hs_sku%2C%20hs_folder_name%2C%20name%2C%20description%2C%20price&archived=false";

// app.use(cors());

// if (!process.env.API_KEY) {
//   console.error("Missing API_KEY in environment variables");
//   process.exit(1);
// }

// app.get("/", async (req, res) => {
//   try {
//     const response = await axios.get(axiosUrl, {
//       headers: {
//         Authorization: `Bearer ${process.env.API_KEY}`,
//       },
//     });
//     res.type("application/json");
//     res.json(response.data);
//   } catch (error) {
//     res.json({ error: error.toString() });
//   }
// });

// app.listen(port, () => console.log(`Server is listening on port: ${port}`));

import express from "express";
import axios from "axios";
import cors from "cors";

import "dotenv/config";

const app = express();
const port = 3000;
const axiosUrl =
  "https://api.hubapi.com/crm/v3/objects/products?limit=10&properties=hs_sku%2C%20hs_folder_name%2C%20name%2C%20description%2C%20price%2C%20hs_price_usd%2C%20hs_price_gbp%2C%20hs_price_nok%2C%20hs_price_eur%2C%20standard_dealer_discount&archived=false";

app.use(cors());

if (!process.env.API_KEY) {
  console.error("Missing API_KEY in environment variables");
  process.exit(1);
}

app.get("/", async (req, res) => {
  try {
    let allResults = [];

    let url = axiosUrl;

    while (url) {
      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${process.env.API_KEY}`,
        },
      });

      const { results, paging } = response.data;
      allResults = allResults.concat(results);

      // Check if there is a next page
      if (paging && paging.next && paging.next.link) {
        url = paging.next.link;
      } else {
        // No more pages, break the loop
        url = null;
      }
    }

    res.type("application/json");
    res.json({ results: allResults });
  } catch (error) {
    res.json({ error: error.toString() });
  }
});

app.listen(port, () => console.log(`Server is listening on port: ${port}`));
