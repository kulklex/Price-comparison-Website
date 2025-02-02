import db from "./database";

export default async function handler(req, res) {
  if (req.method !== "GET") return res.status(405).json({ error: "Method Not Allowed" });

  const { q, page, pageSize } = req.query;
  if (!q) return res.status(400).json({ error: "Missing search term" });

  const pageNumber = parseInt(page) || 1;
  const limit = parseInt(pageSize) || 10;
  const offset = (pageNumber - 1) * limit;

  try {
    const countQuery = "SELECT COUNT(*) AS count FROM product WHERE name LIKE ?";
    const searchQuery = "SELECT * FROM product WHERE name LIKE ? LIMIT ? OFFSET ?";

    const totalResults = await db.query(countQuery, [`%${q}%`]);
    const searchResults = await db.query(searchQuery, [`%${q}%`, limit, offset]);

    res.status(200).json({
      totalCount: totalResults[0].count,
      page: pageNumber,
      pageSize: limit,
      totalPages: Math.ceil(totalResults[0].count / limit),
      data: searchResults,
    });
  } catch (error) {
    console.error("Database error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
