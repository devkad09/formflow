import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Check, X, Sparkles, Zap, Shield, Rocket, Globe, Users, BarChart3, Clock } from 'lucide-react';
import './Pricing.css';

const pricingPlans = [
  {
    name: 'Free',
    monthlyPrice: 0,
    yearlyPrice: 0,
    description: 'Ideal for personal projects and exploring our powerful form builder.',
    features: [
      { name: '3 Active Forms', included: true },
      { name: '100 Submissions / mo', included: true },
      { name: 'Basic Templates', included: true },
      { name: 'FormFlow Watermark', included: true },
      { name: 'Community Support', included: true },
      { name: 'Custom Domains', included: false },
      { name: 'Team Collaboration', included: false },
    ],
    buttonText: 'Get Started',
    isPopular: false,
    theme: 'base',
    icon: <Clock size={24} />
  },
  {
    name: 'Premium',
    monthlyPriceValue: 10,
    yearlyPrice: 8.50,
    description: 'Perfect for growing businesses and professional creators.',
    features: [
      { name: 'Unlimited Forms', included: true },
      { name: '5,000 Submissions / mo', included: true },
      { name: 'Premium UI Templates', included: true },
      { name: 'No Watermark', included: true },
      { name: 'Priority Support', included: true },
      { name: 'Advanced Analytics', included: true },
      { name: 'Custom Domains', included: false },
    ],
    buttonText: 'Start 1 Month Free Trial',
    isPopular: true,
    theme: 'popular',
    icon: <Sparkles size={24} />
  },
  {
    name: 'Business',
    monthlyPriceValue: 30,
    yearlyPrice: 25.50,
    description: 'Ultimate power for large teams and high-volume operations.',
    features: [
      { name: 'Unlimited Everything', included: true },
      { name: 'White-label Forms', included: true },
      { name: 'Custom Styling API', included: true },
      { name: 'Webhooks & SDKs', included: true },
      { name: 'Dedicated Support', included: true },
      { name: 'SLA Guarantee', included: true },
      { name: 'Team (Up to 10)', included: true },
    ],
    buttonText: 'Start 1 Month Free Trial',
    isPopular: false,
    theme: 'premium',
    icon: <Rocket size={24} />
  }
];

const Pricing = () => {
  const [isYearly, setIsYearly] = useState(false);
  const navigate = useNavigate();

  const handlePlanClick = (plan, price) => {
    navigate('/checkout', { state: { plan: plan.name, price, isYearly } });
  };

  return (
    <section id="pricing" className="pricing-section">
      <div className="pricing-glow-container">
        <div className="pricing-glow-1"></div>
        <div className="pricing-glow-2"></div>
      </div>
      
      <div className="pricing-container">
        <div className="pricing-header">
           <div className="pricing-badge">
             <Shield size={14} /> <span>1-month risk-free trial</span>
           </div>
          <h2 className="section-title">Plans that scale with your vision</h2>
          <p className="section-subtitle">Choose the perfect plan for your needs. No hidden fees, no long-term contracts. Upgrade or downgrade anytime.</p>
          
          <div className="billing-toggle-wrapper">
            <span className={!isYearly ? 'active' : ''}>Monthly</span>
            <button 
              className={`toggle-switch-pro ${isYearly ? 'yearly' : ''}`}
              onClick={() => setIsYearly(!isYearly)}
              aria-label="Toggle billing cycle"
            >
              <span className="toggle-slider-pro"></span>
            </button>
            <span className={isYearly ? 'active' : ''}>
              Yearly <span className="save-tag">Save 15%</span>
            </span>
          </div>
        </div>

        <div className="pricing-grid-premium">
          {pricingPlans.map((plan, idx) => {
             const price = isYearly ? plan.yearlyPrice : (plan.monthlyPriceValue || plan.monthlyPrice);
             
             return (
              <div key={idx} className={`pricing-card-premium theme-${plan.theme} ${plan.isPopular ? 'is-popular' : ''}`}>
                {plan.isPopular && (
                  <div className="popular-tag">
                    <Zap size={14} fill="currentColor" /> Most Popular
                  </div>
                )}
                
                <div className="pc-top">
                  <div className={`pc-icon-box ${plan.theme}`}>
                    {plan.icon}
                  </div>
                  <h3 className="pc-title">{plan.name}</h3>
                  <p className="pc-description">{plan.description}</p>
                </div>
                
                <div className="pc-pricing">
                  <div className="pc-price-box">
                    <span className="pc-currency">$</span>
                    <span className="pc-amount">{price}</span>
                    <span className="pc-duration">/month</span>
                  </div>
                  {isYearly && price > 0 ? (
                    <div className="pc-billing-note">Billed ${ (price * 12).toFixed(2) } annually</div>
                  ) : (
                    <div className="pc-billing-note">{price === 0 ? 'Free forever' : 'Billed monthly'}</div>
                  )}
                </div>
                
                <button 
                  className={`pc-action-btn ${plan.isPopular ? 'btn-primary' : 'btn-outline'}`}
                  onClick={() => handlePlanClick(plan, price)}
                >
                  {plan.buttonText}
                </button>
                
                <div className="pc-features-section">
                  <p className="pc-features-header">Core Features</p>
                  <ul className="pc-features-list">
                    {plan.features.map((feature, fIdx) => (
                      <li key={fIdx} className={`pc-feature-item ${!feature.included ? 'is-excluded' : ''}`}>
                        <div className="pc-feature-icon">
                          {feature.included ? (
                            <Check size={14} strokeWidth={3} />
                          ) : (
                            <X size={14} strokeWidth={3} />
                          )}
                        </div>
                        <span>{feature.name}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pc-footer">
                   {plan.name === 'Free' && <span>No credit card required</span>}
                   {plan.name === 'Premium' && <span>Cancel anytime</span>}
                   {plan.name === 'Business' && <span>Custom onboarding</span>}
                </div>
              </div>
            );
          })}
        </div>

        <div className="pricing-trust-section">
           <p>Trusted by over 10,000 teams worldwide</p>
           <div className="trust-icons-grid">
              <BarChart3 size={32} />
              <Globe size={32} />
              <Users size={32} />
              <Shield size={32} />
           </div>
        </div>
      </div>
    </section>
  );
};

export default Pricing;
