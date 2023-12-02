import React from 'react';
import Feature from '../components/feature'
import iconChat from '../assets/icon-chat.webp';
import iconSecurity from '../assets/icon-security.webp';
import iconMoney from '../assets/icon-money.webp';
import '../styles/index.css';

const FeaturesData = [
  {
      image: iconChat,
      title: 'You are our #1 priority',
      description: 'Need to talk to a representative? You can get in touch through our 24/7 chat or through a phone call in less than 5 minutes.'
  },
  {
      image: iconMoney,
      title: 'More savings means higher rates',
      description: 'The more you save with us, the higher your interest rate will be!'
  },
  {
      image: iconSecurity,
      title: 'Security you can trust',
      description: 'We use top of the line encryption to make sure your data and money is always safe.'
  }
]

function Features() {
  return (
      <section className="features">
          <h2 className="sr-only">Features</h2>
          { FeaturesData.map(feature => (
              <Feature 
                  key= { feature.image }
                  image= { feature.image }
                  title= { feature.title }
                  description= { feature.description }
              />
          ))}
    </section>
  )
}

export default Features
