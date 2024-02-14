import  express  from "express";
import { addToCart, deleteCartProdut, getCart, productList, updateCartQuantity } from "../controllers/userController.js";

const userRoute = express()


userRoute.get('/',productList)
userRoute.put('/addToCart',addToCart)

userRoute.get('/getCart',getCart)
userRoute.patch('/updateCart',updateCartQuantity)
userRoute.patch('/deleteProduct',deleteCartProdut)



export default userRoute