import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './HeroSlider.css';

const slides = [
  {
    id: 1,
    image: '../images/hero.webp',
    title: 'Great products with',
    subtitle: 'best deals',
    description: 'No matter how far along you are in your sophistication as an amateur astronomer, there is always one. Browse our exclusive collection and find the perfect piece for you.',
    btnText: 'Shop Now'
  },
  {
    id: 2,
    image: '../images/hero.webp',
    title: 'Discover the',
    subtitle: 'latest tech',
    description: "Innovation is at the heart of what we do, bringing tomorrow's gadgets today. Stay ahead of the curve with our cutting-edge devices.",
    btnText: 'Explore'
  },
  {
    id: 3,
    image: '../images/hero.webp',
    title: 'Unbeatable',
    subtitle: 'offers await',
    description: 'Get the best prices on top-selling products every day. Limited time deals you won’t want to miss.',
    btnText: 'View Deals'
  }
];

const fadeUpVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

export default function HeroSlider() {
  const [index, setIndex] = useState(0);
  const count = slides.length;

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex(i => (i + 1) % count);
    }, 5000);
    return () => clearInterval(interval);
  }, [count]);

  return (
    <section className="hero-slider">
     
      {slides.map((slide, i) => (
        <div
          key={slide.id}
          className="hero-slide"
          style={{
            backgroundImage: `url(${slide.image})`,
            opacity: i === index ? 1 : 0,
            transition: 'opacity 1s ease-in-out',
          }}
        >
          <div className="overlay" />
        </div>
      ))}

      <AnimatePresence exitBeforeEnter>
        <motion.div
          key={slides[index].id}
          className="hero-content"
          initial="hidden"
          animate="visible"
          exit="hidden"
          variants={fadeUpVariants}
          transition={{ duration: 0.8 }}
        >
          <motion.h1
            className="hero-title"
            variants={fadeUpVariants}
            transition={{ delay: 0, duration: 0.8 }}
          >
            {slides[index].title}
            <br />
            <span className="highlight">{slides[index].subtitle}</span>
          </motion.h1>
          <motion.p
            className="hero-description"
            variants={fadeUpVariants}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            {slides[index].description}
          </motion.p>
          <motion.button
            className="hero-btn"
            variants={fadeUpVariants}
            transition={{ delay: 0.4, duration: 0.8 }}
            onClick={() => console.log(`Clicked ${slides[index].btnText}`)}
          >
            {slides[index].btnText}
          </motion.button>
        </motion.div>
      </AnimatePresence>
    </section>
  );
}