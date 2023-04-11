import { createIndex } from '../../utils/userSchema';
// import { createIndex } from '../../utils/dishesSchema';

export default async function handler(req, res) {
    console.log("Request Body: ",req.body)
    const id = await createIndex(req.body);
    res.status(200).json({ id })
}