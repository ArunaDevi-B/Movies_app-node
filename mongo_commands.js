[
  {
    _id: 0,
    productName: "steel",
    status: "new",
    quantity: 20,
  },
  {
    _id: 1,
    productName: "steel",
    status: "urgent",
    quantity: 25,
  },
  {
    _id: 2,
    productName: "steel",
    status: "urgent",
    quantity: 10,
  },
  {
    _id: 3,
    productName: "iron",
    status: "new",
    quantity: 15,
  },
  {
    _id: 4,
    productName: "iron",
    status: "urgent",
    quantity: 22,
  },
  {
    _id: 5,
    productName: "iron",
    status: "urgent",
    quantity: 10,
  },
];
db.orders.aggregate([
  { $match: { status: "urgent" } },
  {
    $group: { id: "$productName", totalurgentproducts: { $sum: "$quantity" } },
  },
]);
db.orders.aggregate([
  { $match: { status: "urgent" } },
  {
    $group: { id: "$productName", totalurgentquantity: { $sum: "$quantity" } },
  },
]);
