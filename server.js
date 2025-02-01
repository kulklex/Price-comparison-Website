const express = require('express');
const next = require('next');
const cors = require('cors'); 
const bodyParser = require('body-parser');
const db = require('./database')

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

const PORT = process.env.PORT || 4000;

app.prepare().then(() => {
  const server = express();

  // Use CORS middleware
  server.use(cors());

  // Use Body-Parser middleware
  server.use(bodyParser.json());
  server.use(bodyParser.urlencoded({ extended: true }));

  // Middleware example for logging
  server.use((req, res, next) => {
    console.log(`[${req.method}] ${req.url}`);
    next();
  });

  /** Function that gets the total count of product from search term */
async function getSearchCount(searchTerm) {
    const sql = `SELECT COUNT(*) FROM product WHERE name LIKE '%${searchTerm}%'`;
    let result = await db.query(sql);
    return result[0]["COUNT(*)"];
  }
  
/** Function that searches for product with search term */
 async function search(searchTerm, numItems, offset) {
    let sql = `SELECT * FROM product WHERE name LIKE '%${searchTerm}%' `;
  
    //Limit the number of results returned
    if (numItems !== undefined && offset !== undefined) {
      sql += `LIMIT ${numItems} OFFSET ${offset}`;
    }
  
    return db.query(sql);
  }

  // Route to perform a search based on query parameters
 server.get("/api/search", async (req, res) => {
    try {
      const searchTerm = req.query.q;
      const offset = req.query.offset;
      const numItems = req.query.numitems;
  
      //Check if parameters exist
      if (searchTerm === undefined) {
        res.json({ error: "Missing search term" });
      }
      if (offset === undefined) {
        res.json({ error: "Missing offset" });
      }
      if (numItems === undefined) {
        res.json({ error: "Missing number of items" });
      }
  
      //Get the total number of search items for pagination
      let searchCount = await getSearchCount(searchTerm);
  
      //Get search items
      let searchResults = await search(searchTerm, numItems, offset);
  
      //Combine into a single object
      const results = {
        count: searchCount,
        data: searchResults,
      };
      res.json({ results });
    } catch (error) {
      console.error("Error while searching", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  });
 

  // Route to fetch details of a specific product by ID
 server.get("/api/product/:productID", async (req, res) => {
    try {
      const product = await db.query(
        `SELECT * FROM product WHERE id=${req.params.productID}`
      );
      const results = {
        product,
      };
      res.json({ results });
    } catch (error) {
      console.error(
        `Error fetching product with id:${req.params.productID}`,
        error
      );
      res.status(500).json({ error: "Internal Server Error" });
    }
  });


 // Route to compare details of a specific product by ID
 server.get("/api/compare/:productID", async (req, res) => {
    try {
      const product = await db.query(
        `SELECT * FROM product WHERE id=${req.params.productID}`
      );
      const comparison = await db.query(
        `SELECT * FROM comparison WHERE product_id=${req.params.productID}`
      );
      const results = {
        product,
        comparison,
      };
      res.json({ results });
    } catch (error) {
      console.error(
        `Error fetching product with id:${req.params.productID}`,
        error
      );
      res.status(500).json({ error: "Internal Server Error" });
    }
  }); 


  server.get("/api/pagination", async (req, res) => {
    try {
      const searchTerm = req.query.q;
      const page = parseInt(req.query.page, 10);
      const pageSize = parseInt(req.query.pageSize, 10);
  
      // Check if parameters exist
      if (!searchTerm) {
        return res.status(400).json({ error: "Missing search term" });
      }
      if (!page || page < 1) {
        return res.status(400).json({ error: "Page must be a positive integer" });
      }
      if (!pageSize || pageSize < 1) {
        return res.status(400).json({ error: "Page size must be a positive integer" });
      }
  
      // Calculate offset and limit
      const offset = (page - 1) * pageSize;
  
      // Get the total count of items for pagination
      const totalCount = await getSearchCount(searchTerm);
  
      // Fetch paginated results
      const paginatedResults = await search(searchTerm, pageSize, offset);
  
      // Combine into a response object
      const results = {
        totalCount,
        page,
        pageSize,
        totalPages: Math.ceil(totalCount / pageSize),
        data: paginatedResults,
      };
  
      res.json({ results });
    } catch (error) {
      console.error("Error in pagination route", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  });

  server.all('*', (req, res) => {
    return handle(req, res);
  });

  
  server.listen(PORT, (err) => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${PORT}`);
  });
});
