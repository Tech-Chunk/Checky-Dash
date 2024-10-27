"use client"
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {Button} from "@nextui-org/button"

interface OnboardingStepProps {
  onNext: () => void;
}

// Welcome Component
const WelcomeComponent: React.FC<OnboardingStepProps> = ({ onNext }) => (
  <motion.div 
    initial={{ opacity: 0, y: 50 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -50 }}
    transition={{ duration: 0.5 }}
  >
    <h1 className='text-2xl font-bold'>Welcome to Checky!</h1>
    <Button onClick={onNext}>Next</Button>



  </motion.div>
);

// Feature Component
const FeatureComponent: React.FC<OnboardingStepProps> = ({ onNext }) => (
  <motion.div 
    initial={{ opacity: 0, y: 50 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -50 }}
    transition={{ duration: 0.5 }}
  >
    <h2>Discover Features</h2>
    <button onClick={onNext}>Next</button>
  </motion.div>
);

// End Component (No 'onNext' prop needed here)
const EndComponent: React.FC = () => (
  <motion.div 
    initial={{ opacity: 0, y: 50 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -50 }}
    transition={{ duration: 0.5 }}
  >
    <h2>You're all set!</h2>
  </motion.div>
);

// Main Onboarding Page
const OnboardingPage: React.FC = () => {
const [step, setStep] = useState(0);

  const nextStep = () => setStep((prevStep) => prevStep + 1);

  return (
    <div className="onboarding-container">
      <AnimatePresence mode="wait">
        {step === 0 && <WelcomeComponent key="welcome" onNext={nextStep} />}
        {step === 1 && <FeatureComponent key="feature" onNext={nextStep} />}
        {step === 2 && <EndComponent key="end" />}
      </AnimatePresence>
    </div>
  );
};

export default OnboardingPage;
