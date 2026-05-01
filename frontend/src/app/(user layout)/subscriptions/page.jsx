'use client'
import React from 'react'
import "../subscriptions/styles.css"
import { Check, GraduationCap, Briefcase, Sparkles, Star } from 'lucide-react'

const subscriptions = [
  {
    title: "Student Plan",
    tagline: "Get started for free",
    price: "Free",
    period: "",
    Icon: GraduationCap,
    accent: "student",
    features: [
      "Access to free practice tests",
      "Join any open classes",
      "Review your answers and scores",
    ],
    cta: "Get started",
  },
  {
    title: "Teacher Plan",
    tagline: "For educators and tutors",
    price: "$399.99",
    period: "/mo",
    Icon: Briefcase,
    accent: "teacher",
    popular: true,
    features: [
      "5 full-length trials each month",
      "Create and manage classes",
      "Grade and give feedback to students",
      "Detailed performance analytics",
    ],
    cta: "Start Teacher plan",
  },
  {
    title: "Creator Plan",
    tagline: "For test designers and schools",
    price: "$499.99",
    period: "/mo",
    Icon: Sparkles,
    accent: "creator",
    features: [
      "Build and publish your own tests",
      "Unlimited trial attempts",
      "Developer mode and API access",
      "Priority support",
    ],
    cta: "Start Creator plan",
  },
]

const Subs = () => {
  return (
    <div className="plans-page">
      <div className="plans-wrap">
        <div className="plans-header">
          <span className="plans-eyebrow"><Sparkles size={14} /> Subscriptions</span>
          <h1 className="plans-h1">Choose your plan</h1>
          <p className="plans-sub">
            Pick the plan that fits how you use IELTS Trials. Upgrade or change
            anytime — no hidden fees.
          </p>
        </div>

        <div className="plans-grid">
          {subscriptions.map((plan) => {
            const Icon = plan.Icon
            return (
              <div
                key={plan.title}
                className={`plan-card ${plan.accent} ${plan.popular ? "popular" : ""}`}
              >
                {plan.popular && (
                  <span className="plan-badge"><Star size={12} /> Most popular</span>
                )}

                <div className="plan-icon"><Icon size={22} /></div>

                <div className="plan-heading">
                  <h2 className="plan-title">{plan.title}</h2>
                  <p className="plan-tagline">{plan.tagline}</p>
                </div>

                <div className="plan-price">
                  <span className="price-amount">{plan.price}</span>
                  {plan.period && <span className="price-period">{plan.period}</span>}
                </div>

                <ul className="plan-features">
                  {plan.features.map((f, i) => (
                    <li key={i}>
                      <span className="feature-check"><Check size={13} /></span>
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>

                <button className={`plan-btn ${plan.popular ? "primary" : "ghost"}`}>
                  {plan.cta}
                </button>
              </div>
            )
          })}
        </div>

        <p className="plans-foot">
          All plans include cancellation anytime and full access to current features.
        </p>
      </div>
    </div>
  )
}

export default Subs
