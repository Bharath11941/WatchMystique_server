import User from "../models/userSchema.js";
import Product from "../models/productSchema.js";
import Offer from "../models/offerSchema.js";

const userEmail = () => {
  const email = "Demo@gmail.com";
  return email;
};

export const productList = async (req, res) => {
  try {
    const productData = await Product.find().populate("offer");
    res.status(200).json(productData);
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const addToCart = async (req, res) => {
  try {
    const email = userEmail();
    const { productId, quantity } = req.body;
    const productData = await Product.findById(productId);
    const userCart = await User.findOne(
      { email: email, "cart.productId": productId },
      { "cart.$": 1 }
    );
    if (userCart) {
      const cartQuantity = userCart.cart[0].quantity;
      if (cartQuantity < productData.quantity) {
        const existingProduct = await User.findOneAndUpdate(
          { email: email, "cart.productId": productId },
          {
            $inc: {
              "cart.$.quantity": parseInt(quantity),
            },
          },
          {
            new: true,
          }
        );

        res
          .status(200)
          .json({
            message: "added to cart",
            count: existingProduct.cart.length,
          });
      } else {
        res.status(200).json({ cartMessage: "Out of stock" });
      }
    } else {
      let cartUpdate = await User.findOneAndUpdate(
        { email: email },
        {
          $push: { cart: { productId, quantity } },
        },
        { new: true }
      );

      res
        .status(200)
        .json({
          message: "Product added to cart",
          count: cartUpdate.cart.length,
        });
    }
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getCart = async (req, res) => {
  try {
    const email = userEmail();
    const { cart } = await User.findOne({ email: email }).populate({
      path: "cart.productId",
      populate: {
        path: "offer",
        populate: {
          // Populate the buyOneGetOneProduct field if it exists
          path: "buyOneGetOneProduct",
          model: "product",
        },
      },
    });

    res.status(200).json(cart);
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const updateCartQuantity = async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    const email = userEmail();
    const updatedData = await User.findOneAndUpdate(
      { email: email, "cart.productId": productId },
      {
        $set: {
          "cart.$.quantity": quantity,
        },
      },{new: true}
    );

    const { cart } = await User.findOne({ email: email }).populate({
      path: "cart.productId",
      populate: {
        path: "offer",
        populate: {
          path: "buyOneGetOneProduct",
          model: "product",
        },
      },
    });
   

    res.status(200).json(cart);
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};


export const deleteCartProdut = async(req,res) => {
  try {
    const email = userEmail()
    const {cartId} = req.body

    await User.findOneAndUpdate(
      { email: email },
      { $pull: { cart: { _id: cartId } } },
      
    );
    const { cart } = await User.findOne({ email: email }).populate({
      path: "cart.productId",
      populate: {
        path: "offer",
        populate: {
          path: "buyOneGetOneProduct",
          model: "product",
        },
      },
    });

    res.status(200).json({cart,message:"Watch removed from the cart",count:cart.length})

  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}
