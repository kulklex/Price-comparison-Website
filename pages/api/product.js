import db from "./database";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  const { id, page = 1, pageSize = 10 } = req.query;

  try {
    let result;

    if (id) {
      // Fetch a single product by ID
      result = await db.query("SELECT * FROM product WHERE id = ?", [id]);
    } else {
      // Fetch total count
      const totalCountResult = await db.query("SELECT COUNT(*) AS total FROM product");
      const totalCount = totalCountResult[0].total;

      // Fetch paginated products
      const offset = (parseInt(page) - 1) * parseInt(pageSize);
      result = await db.query("SELECT * FROM product LIMIT ? OFFSET ?", [parseInt(pageSize), offset]);

      return res.status(200).json({ data: result, totalCount });
    }

    res.status(200).json(result);
  } catch (error) {
    console.error("Database error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
