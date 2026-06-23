import Bill from "../models/Bill.js";

export const getAnalytics = async (req, res) => {
  try {
    const bills = await Bill.find();

    const totalRevenue = bills.reduce((sum, bill) => sum + bill.totalAmount, 0);

    const totalBills = bills.length;

    const totalProductsSold = bills.reduce(
      (sum, bill) =>
        sum + bill.items.reduce((itemSum, item) => itemSum + item.qty, 0),
      0,
    );

    const today = new Date();

    today.setHours(0, 0, 0, 0);

    const todaySales = bills
      .filter((bill) => new Date(bill.createdAt) >= today)
      .reduce((sum, bill) => sum + bill.totalAmount, 0);

    const productSales = {};

    bills.forEach((bill) => {
      bill.items.forEach((item) => {
        productSales[item.productName] =
          (productSales[item.productName] || 0) + item.qty;
      });
    });

    let topSeller = "-";

    let maxSold = 0;

    for (const product in productSales) {
      if (productSales[product] > maxSold) {
        maxSold = productSales[product];
        topSeller = product;
      }
    }

    res.json({
      todaySales,
      totalRevenue,
      totalBills,
      totalProductsSold,
      topSeller,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
