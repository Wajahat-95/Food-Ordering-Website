import dbConnect from "../../../utils/mongo";
import Product from "../../../models/Product";
import { products as mockProducts } from "../../../mocks/data";

export default async function handler(req, res) {
  const { method, cookies } = req;
  const token = cookies.token;
  const useMocks = process.env.USE_MOCKS === 'true' || !process.env.MONGODB_URL;

  if (method === "GET") {
    try {
      if (useMocks) {
        return res.status(200).json(mockProducts);
      }
      await dbConnect();
      const products = await Product.find();
      res.status(200).json(products);
    } catch (err) {
      console.error("Error fetching products, falling back to mocks:", err);
      // Fallback to mocks on error
      res.status(200).json(mockProducts);
    }
  }

  if (method === "POST") {
    if (!token || token !== process.env.TOKEN) {
      return res.status(401).json("Not authenticated!");
    }
    try {
      if (useMocks) {
        const newProduct = { ...req.body, _id: "mock_id_" + Date.now() };
        mockProducts.push(newProduct);
        return res.status(201).json(newProduct);
      }
      await dbConnect();
      const product = await Product.create(req.body);
      res.status(201).json(product);
    } catch (err) {
      res.status(500).json(err);
    }
  }
}
