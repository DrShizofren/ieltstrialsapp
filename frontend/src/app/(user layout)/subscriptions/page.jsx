'use client'
import React from 'react'
import "../subscriptions/styles.css"

const subscriptions = [
  {
    title: "Student Plan",
    price: "Free",
    features: ["-Free tests", "-Attend in any classes", "-Review your answers"],
  },
  {
    title: "Teacher Plan",
    price: "$399.99/mo",
    features: ["-5 trials monthly", "-Create and operate classes", "-Grade students"],
  },
  {
    title: "Creator Plan",
    price: "$499.99/mo",
    features: ["-Create your own tests", "-Unlimited trials", "-Developer ode available"],
  },
];

const Subs = () => {
  return <div className="card-container">
    {
      subscriptions.map((plan) => {
        return <div className="card">
          <h1>{plan.title}</h1>
          {
            plan.features.map((elem) => {
              return <p>{elem}</p>
            })
          }
          <p>{plan.price}</p>
          <button className='planbutton'>Choose plan</button>
        </div>
      })
    }
  </div>
}

export default Subs