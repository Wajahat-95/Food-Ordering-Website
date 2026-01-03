import dbConnect from "../../../utils/mongo";
import Order from "../../../models/Order";
import { orders as mockOrders } from "../../../mocks/data";

const handler = async (req, res) => {
  const {
    method,
    query: { id },
  } = req;
  const useMocks = process.env.USE_MOCKS === 'true' || !process.env.MONGODB_URL;

  if (method === "GET") {
    try {
      if (useMocks) {
        const order = mockOrders.find((o) => o._id === id);
        return res.status(200).json(order || {});
      }
      await dbConnect();
      const order = await Order.findById(id);
      res.status(200).json(order);
    } catch (err) {
        console.error("Error fetching order, falling back to mocks:", err);
        const order = mockOrders.find((o) => o._id === id);
        res.status(200).json(order || {});
    }
  }
  if (method === "PUT") {
    try {
        if (useMocks) {
             const index = mockOrders.findIndex((o) => o._id === id);
             if (index !== -1) {
                 mockOrders[index] = { ...mockOrders[index], ...req.body };
                 return res.status(201).json(mockOrders[index]);
             }
             return res.status(404).json("Order not found");
        }
      await dbConnect();
      const order = await Order.findByIdAndUpdate(id, req.body, {
        new: true,
      });
      res.status(201).json(order);
    } catch (err) {
      res.status(500).json(err);
    }
  }
  if (method === "DELETE") {
  }
};

export default handler;
