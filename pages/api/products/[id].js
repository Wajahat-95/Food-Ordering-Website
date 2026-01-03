import dbConnect from "../../../utils/mongo";
import Product from "../../../models/Product";
import { products as mockProducts } from "../../../mocks/data";

export default async function handler(req, res) {
  const {
    method,
    query: { id },
    cookies,
  } = req;
  const token = cookies.token;
  const useMocks = process.env.USE_MOCKS === 'true' || !process.env.MONGODB_URL;

  if (method === "GET") {
    try {
      if (useMocks) {
        const product = mockProducts.find((p) => p._id === id);
        return res.status(200).json(product || {});
      }
      await dbConnect();
      const product = await Product.findById(id);
      res.status(200).json(product);
    } catch (err) {
      console.error("Error fetching product, falling back to mocks:", err);
      const product = mockProducts.find((p) => p._id === id);
      res.status(200).json(product || {});
    }
  }

  if (method === "PUT") {
    if (!token || token !== process.env.TOKEN) {
      return res.status(401).json("Not authenticated!");
    }
    try {
      if (useMocks) {
        // Find and update mock
        const index = mockProducts.findIndex((p) => p._id === id);
        if (index !== -1) {
             mockProducts[index] = { ...mockProducts[index], ...req.body };
             return res.status(201).json(mockProducts[index]);
        }
        return res.status(404).json("Product not found");
      }
      await dbConnect();
      const product = await Product.findByIdAndUpdate(id, req.body, {
        new: true,
      });
      res.status(201).json(product);
    } catch (err) {
      res.status(500).json(err);
    }
  }

  if (method === "DELETE") {
    if (!token || token !== process.env.TOKEN) {
      return res.status(401).json("Not authenticated!");
    }
    try {
        if (useMocks) {
             const index = mockProducts.findIndex((p) => p._id === id);
             if (index !== -1) {
                 mockProducts.splice(index, 1);
             }
            return res.status(200).json("The product has been deleted");
        }
      await dbConnect();
      await Product.findByIdAndDelete(id);
      res.status(200).json("The product has been deleted");
    } catch (err) {
      res.status(500).json(err);
    }
  }
}
