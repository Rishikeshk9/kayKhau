import { createUser } from '../../utils/userSchema';

export default async function handler(req, res) {
    console.log("Request Body: ",req.body)
    const id = await createUser(req.body);
    res.status(200).json({ id })
}