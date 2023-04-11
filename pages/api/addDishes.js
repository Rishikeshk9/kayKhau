import { createDish, checkDishPresent } from '../../utils/dishesSchema';
import {addDishForUser} from '../../utils/userSchema';

export default async function handler(req, res) {
    console.log("Request Body: ",req.body)
    const { name, entityId, dishId, description, image } = req.body;
    const dishPresent = await checkDishPresent(name);
    console.log("Dishpresent: ", dishPresent);
    if (!dishPresent) {
    const id = await createDish({name,description,image});
    }
    const id = await addDishForUser(entityId, dishId);
    console.log('id', id)
    res.status(200).json({ id })
    
}