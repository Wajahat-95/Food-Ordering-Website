export const products = [
  {
    _id: "63f5c1a1234567890abcdef1",
    title: "Classic Fries",
    desc: "Crispy and golden, salted to perfection.",
    img: "/img/fries.png",
    prices: [50, 80, 100],
    extraOptions: [
      { text: "Spicy Masala", price: 10, _id: "1a" },
      { text: "Cheese Sauce", price: 20, _id: "1b" },
    ],
  },
  {
    _id: "63f5c1a1234567890abcdef2",
    title: "Curly Fries",
    desc: "Twisted perfection with a seasoned coating.",
    img: "/img/fries.png",
    prices: [60, 90, 110],
    extraOptions: [
      { text: "Garlic Mayo", price: 15, _id: "2a" },
    ],
  },
  {
    _id: "63f5c1a1234567890abcdef3",
    title: "Peri Peri Fries",
    desc: "Spicy kick for the brave ones.",
    img: "/img/fries.png",
    prices: [70, 100, 130],
    extraOptions: [
      { text: "Extra Hot Sauce", price: 25, _id: "3a" },
    ],
  },
];

export const orders = [
  {
    _id: "63f5c1a1234567890order01",
    customer: "John Doe",
    address: "123 Main St, New York",
    total: 250,
    status: 0,
    method: 0, // 0: Cash, 1: Paid
  },
  {
    _id: "63f5c1a1234567890order02",
    customer: "Jane Smith",
    address: "456 Elm St, London",
    total: 500,
    status: 1,
    method: 1,
  }
];
