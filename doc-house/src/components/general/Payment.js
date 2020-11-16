import React,  {useState} from 'react';
import StripeCheckout from "react-stripe-checkout";
import axios from "../../axios";
import "react-toastify/dist/ReactToastify.css";
import Button from '@material-ui/core/Button';

function Payment({fee, parentCallback}) {
    const [checkout] = useState({
        name: "Appointment Fee",
        fee: fee*100
      });
    
    const handleToken = async (token, addresses) =>  {
        const response = await axios.post(
          "/payment/checkout",
          {token, checkout}
        );
        const { status } = response.data;
        // console.log("Response:", status);
        parentCallback(status);
      }


    return (
        <div>
           <StripeCheckout
                stripeKey="pk_test_51Hn21bJDJbmlLgF3ym7IoxLUh0yFnRfRQzMJjSiKmkdfjgjT205dUGuP9jil0AljtVqxMW1oVeIQsIGUhq3tnYEs00HqXjPYBi"
                token={handleToken}
                amount={checkout.fee}
                name={checkout.name}
                billingAddress
            >
                      <Button 
                      fullWidth
                      color="primary"
                      variant="contained" 
                      >
                          Pay with card
                      </Button>
            </StripeCheckout>
        </div>
    )
}

export default Payment;
