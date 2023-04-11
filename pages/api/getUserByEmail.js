import { getUserData } from '../../utils/userSchema';

export default async function handler(req, res) {
    console.log("Request Body: ",req.body)
    const {email} = req.body;
    console.log("Email:",email)
    const userData = await getUserData(email || '');
    res.status(200).json({ userData })
}