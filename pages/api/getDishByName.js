import { getDishData } from "../../utils/dishesSchema";

export default async function handler(req, res) {
  console.log("Request Body: ", req.body);
  const { name } = req.body;
  console.log("Name:", name);
  const userData = await getDishData(name || "");
  res.status(200).json({ userData });
}
