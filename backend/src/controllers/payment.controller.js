import axios from "axios"
import { PAYPAL_API, PAYPAL_API_CLIENT, PAYPAL_API_SECRET } from "../config.js"
import User from "../models/user.model.js";
import { createAccessToken } from "../libs/jwt.js";

const generateAccessToken = async () => {

  try {
    if (!PAYPAL_API_CLIENT || !PAYPAL_API_SECRET) {
      throw new Error("MISSING_API_CREDENTIALS");
    }

    const params = new URLSearchParams()
    params.append('grant_type', 'client_credentials')
    
    const { data: { access_token } } = await axios.post(`${PAYPAL_API}/v1/oauth2/token`, params,{
        auth: {
            username: PAYPAL_API_CLIENT,
            password: PAYPAL_API_SECRET
        }
    })
    return access_token
  } catch (error) {
    console.error("Failed to generate Access Token:", error);
  }
};

  
export const createOrder = async (req, res) => {
  try{
    const { cart } = req.body;
    const accessToken = await generateAccessToken();
    
    let expiration_time = new Date()
    expiration_time.setMonth( new Date().getMonth() + 1 )
    const order = {
      intent: "CAPTURE",
      purchase_units: [
        {
          amount: {
            currency_code: "USD",
            value: cart.product.cost,
          },
          expiration_time: expiration_time.toISOString()
        },
      ],
    };

    const response = await axios.post(`${PAYPAL_API}/v2/checkout/orders`, order,{
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    });
    res.status(response.status)
    return res.json(response.data);
  }catch(error){
    console.log(error)
  }

};

export const captureOrder = async (req, res) => {
  try{
    const { orderID } = req.body;
    const accessToken = await generateAccessToken();
    const response = await axios.post(`${PAYPAL_API}/v2/checkout/orders/${orderID}/capture`,{}, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      },
    });
    res.status(response.status)
    return res.json(response.data);
  }catch(error){
    console.log(error)
  }
};

export const completeOrder = async (req, res) => {
  try{
    const { id, paymentID } = req.body;
    const user = await User.findByIdAndUpdate(id, {
      paymentID  
    })
    const token = await createAccessToken({ id });

    return res.status(200).json({
      id: user._id,
      username: user.username,
      email: user.email,
      paymentID: user.paymentID,
      token
    })
  }catch(error){
    console.log(error)
  }
}