import dbConnect from "../../../utils/mongo";
import Order from "../../../models/Order";
import { orders as mockOrders } from "../../../mocks/data";

const handler = async (req, res) => {
  const { method } = req;
  const useMocks = process.env.USE_MOCKS === 'true' || !process.env.MONGODB_URL;

  if (method === "GET") {
    try {
      if (useMocks) {
        return res.status(200).json(mockOrders);
      }
      await dbConnect();
      const orders = await Order.find();
      res.status(200).json(orders);
    } catch (err) {
      console.error("Error fetching orders, falling back to mocks:", err);
      res.status(200).json(mockOrders);
    }
  }
  if (method === "POST") {
    try {
      if (useMocks) {
        const newOrder = { ...req.body, _id: "mock_order_id_" + Date.now(), status: 0 };
        mockOrders.push(newOrder);
        return res.status(201).json(newOrder);
      }
      await dbConnect();
      const order = await Order.create(req.body);
      res.status(201).json(order);
    } catch (err) {
      res.status(500).json(err);
    }
  }
};

export default handler;
