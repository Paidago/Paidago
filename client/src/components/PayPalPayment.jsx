import { PayPalButtons } from "@paypal/react-paypal-js";
import axios from '../api/axios.js'
import Cookies from 'js-cookie'
import { verifyToken } from "../api/auth";
import { completeOrder } from "../api/paypal";

function PayPalPayment(){
    const createOrder = async () => {
      try{
        const response = await axios.post(`/create-order`, {
          cart: {
            product: {
              description: 'Membresia',
              cost: '10.00'
          }
        }})
        return response.data.id
      }catch(error){
        console.log(error)
      }
    };

      const onApprove = async (data) => {
        try{
          const response = await axios.post(`/capture-order`, {
            orderID: data.orderID
          })
          const token = Cookies.get('token')
          const res = await verifyToken(token)
          await completeOrder({id: res.data.id, paymentID: response.data.id})
          return response
        }catch(error){
          console.log(error)
        }
      };

    return(
        <PayPalButtons
            createOrder={(data, actions) => createOrder(data, actions)}
            onApprove={(data, actions) => onApprove(data, actions)}
        />
    )
}

export default PayPalPayment