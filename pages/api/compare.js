import db from "./database";

export default async function handler(req, res) {
  if (req.method !== "GET") return res.status(405).json({ error: "Method Not Allowed" });

  const { id } = req.query;
  if (!id) return res.status(400).json({ error: "Missing product ID" });

  try {
    const productSql = "SELECT * FROM product WHERE id = ?";
    const comparisonSql = "SELECT * FROM comparison WHERE product_id = ?";

    const product = await db.query(productSql, [id]);
    const comparison = await db.query(comparisonSql, [id]);

    res.status(200).json({ product, comparison });
  } catch (error) {
    console.error("Database error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
