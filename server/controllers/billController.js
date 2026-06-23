import Bill from "../models/Bill.js";

export const createBill = async (req, res) => {
  try {
    console.log("BODY:", req.body);
    const billNumber = "WB-" + Date.now().toString().slice(-6);

    const bill = await Bill.create({ ...req.body, billNumber });

    res.status(201).json(bill);
  } catch (error) {
    console.log("ERROR:", error);
    res.status(500).json({
      message: error.message,
    });
  }
};

export const getBills = async (req, res) => {
  try {
    const bills = await Bill.find().sort({
      createdAt: -1,
    });

    res.json(bills);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
