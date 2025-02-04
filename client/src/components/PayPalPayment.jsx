import { PayPalButtons } from "@paypal/react-paypal-js";
import axios from '../api/axios.js'
import { useAuth } from "../context/AuthContext"
import { verifyToken } from "../api/auth";
import { completeOrder } from "../api/paypal";

function PayPalPayment(){
  const { fetchUser } = useAuth()
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
          const token = window.localStorage.getItem('token')
          const res = await verifyToken(token)
          const order = await completeOrder({id: res.data.id, paymentID: response.data.id})
          
          window.localStorage.setItem('token', order.data.token)
          await fetchUser()
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