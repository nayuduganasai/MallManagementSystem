import React, { useState } from 'react'
// import { useState } from 'react';
import useRazorpay from 'react-razorpay';

const Payment = () => {
    const [userName, setUserName] = useState('');
    const [email, setEmail] = useState('');
    const [contact, setContact] = useState('');
    const [amount, setAmount] = useState('');
  
    const createOrder = async () => {
      return await fetch('http://localhost:8080/payment/'+amount*100, {
      mode: 'no-cors',
      method: 'GET',
  });
  }
  const [Razorpay] = useRazorpay();
  
    const handlePayment = async () => {
    
    const order = await createOrder();
  
    const options = {
      key: "rzp_test_9bP9b4EHYATaXW",
      amount: amount*100, 
      currency: "INR",
      name: userName,
      description: "Test Transaction",
      image: "",
      order_id: order, 
      handler: function (response) {
        alert(response.razorpay_payment_id);
        alert(response.id);
        alert(response.razorpay_signature);
        console.log(response);
      },
      prefill: {
        name: userName,
        email: email,
        contact: contact,
      },
      notes: {
        address: "ABC, Delhi",
      },
      theme: {
        color: "#3399cc",
      },
    };
  
    const rzp1 = new Razorpay(options);
  
    rzp1.on("payment.failed", function (response) {
      alert(response.error.code);
      alert(response.error.description);
      alert(response.error.source);
      alert(response.error.step);
      alert(response.error.reason);
      alert(response.error.metadata.order_id);
      alert(response.error.metadata.payment_id);
    });
  
    rzp1.open();
  };
  
    return (
      <div className="App">
        <label>
          User Name:
          <input type="text" value={userName} onChange={(e) => setUserName(e.target.value)} />
        </label><br/>
  
        <label>
          Email:
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </label><br/>
  
        <label>
          Contact:
          <input type="tel" value={contact} onChange={(e) => setContact(e.target.value)} />
        </label><br/>
  
        <label>
          Amount:
          <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} />
        </label><br/>
        <button onClick={handlePayment}>pay Now</button>
  
      </div>
    );
}

export default Payment
