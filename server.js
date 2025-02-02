// const express = require('express');
// const next = require('next');
// const cors = require('cors'); 
// const bodyParser = require('body-parser');
// const db = require('./database');

// const dev = process.env.NODE_ENV !== 'production';
// const app = next({ dev });
// const handle = app.getRequestHandler();

// const PORT = process.env.PORT || 4000;

// app.prepare().then(() => {
//   const server = express();

//   // Use Middleware
//   server.use(cors());
//   server.use(bodyParser.json());
//   server.use(bodyParser.urlencoded({ extended: true }));

//   // Request Logging Middleware
//   server.use((req, res, next) => {
//     console.log(`[${req.method}] ${req.url}`);
//     next();
//   });

//   /** Get total count of products matching the search term */
//   async function getSearchCount(searchTerm) {
//     try {
//       const sql = `SELECT COUNT(*) AS count FROM product WHERE name LIKE ?`;
//       const result = await db.query(sql, [`%${searchTerm}%`]);
//       return result[0].count;
//     } catch (error) {
//       console.error("Database error in getSearchCount:", error);
//       return 0;
//     }
//   }

//   /** Search products with pagination */
//   async function search(searchTerm, numItems, offset) {
//     try {
//       const sql = `SELECT * FROM product WHERE name LIKE ? LIMIT ? OFFSET ?`;
//       return await db.query(sql, [`%${searchTerm}%`, numItems, offset]);
//     } catch (error) {
//       console.error("Database error in search:", error);
//       return [];
//     }
//   }

//   // Route: Search products
//   server.get("/api/search", async (req, res) => {
//     try {
//       const searchTerm = req.query.q;
//       const offset = parseInt(req.query.offset, 10);
//       const numItems = parseInt(req.query.numitems, 10);

//       if (!searchTerm) return res.status(400).json({ error: "Missing search term" });
//       if (isNaN(offset)) return res.status(400).json({ error: "Invalid offset" });
//       if (isNaN(numItems)) return res.status(400).json({ error: "Invalid number of items" });

//       const searchCount = await getSearchCount(searchTerm);
//       const searchResults = await search(searchTerm, numItems, offset);

//       res.json({ count: searchCount, data: searchResults });
//     } catch (error) {
//       console.error("Error while searching:", error);
//       res.status(500).json({ error: "Internal Server Error" });
//     }
//   });

//   // Route: Get product details
//   server.get("/api/product/:productID", async (req, res) => {
//     try {
//       const sql = `SELECT * FROM product WHERE id = ?`;
//       const product = await db.query(sql, [req.params.productID]);

//       res.json({ product });
//     } catch (error) {
//       console.error(`Error fetching product with id: ${req.params.productID}`, error);
//       res.status(500).json({ error: "Internal Server Error" });
//     }
//   });

//   // Route: Compare products
//   server.get("/api/compare/:productID", async (req, res) => {
//     try {
//       const productSql = `SELECT * FROM product WHERE id = ?`;
//       const comparisonSql = `SELECT * FROM comparison WHERE product_id = ?`;

//       const product = await db.query(productSql, [req.params.productID]);
//       const comparison = await db.query(comparisonSql, [req.params.productID]);

//       res.json({ product, comparison });
//     } catch (error) {
//       console.error(`Error fetching comparison for product id: ${req.params.productID}`, error);
//       res.status(500).json({ error: "Internal Server Error" });
//     }
//   });

//   // Route: Paginated search
//   server.get("/api/pagination", async (req, res) => {
//     try {
//       const searchTerm = req.query.q;
//       const page = parseInt(req.query.page, 10);
//       const pageSize = parseInt(req.query.pageSize, 10);

//       if (!searchTerm) return res.status(400).json({ error: "Missing search term" });
//       if (!page || page < 1) return res.status(400).json({ error: "Page must be a positive integer" });
//       if (!pageSize || pageSize < 1) return res.status(400).json({ error: "Page size must be a positive integer" });

//       const offset = (page - 1) * pageSize;
//       const totalCount = await getSearchCount(searchTerm);
//       const paginatedResults = await search(searchTerm, pageSize, offset);

//       res.json({
//         totalCount,
//         page,
//         pageSize,
//         totalPages: Math.ceil(totalCount / pageSize),
//         data: paginatedResults
//       });
//     } catch (error) {
//       console.error("Error in pagination route:", error);
//       res.status(500).json({ error: "Internal Server Error" });
//     }
//   });

//   // Next.js request handler (should be last)
//   server.all('*', (req, res) => {
//     return handle(req, res);
//   });

//   // Start the server
//   server.listen(PORT, (err) => {
//     if (err) throw err;
//     console.log(`> Ready on http://localhost:${PORT}`);
//   });
// });
