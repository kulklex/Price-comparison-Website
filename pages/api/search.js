import db from './database';

export default async function handler(req, res) {
    if (req.method !== "GET") return res.status(405).json({ error: "Method Not Allowed" });
  
    const { q } = req.query;
    if (!q) return res.status(400).json({ error: "Missing search term" });
  
    try {
      const results = await db.query("SELECT * FROM product WHERE name LIKE ?", [`%${q}%`]);
      res.status(200).json(results);
    } catch (error) {
      console.error("Database error:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }