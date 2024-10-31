"use client"
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {Button} from "@nextui-org/button"
import {Input} from "@nextui-org/input"
import {Select, SelectItem} from "@nextui-org/select"
import { countries } from './country';


interface OnboardingStepProps {
  onNext: () => void;
}

const WelcomeComponent: React.FC<OnboardingStepProps> = ({ onNext }) => (
  <motion.div 
    initial={{ opacity: 0, y: 50 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -50 }}
    transition={{ duration: 0.5 }}
  >
    <div className='flex flex-col items-center text-center space-y-4'>
      <h1 className='text-3xl font-bold'>Welcome to Checky!</h1>
      <p className='text-lg'>Checky is the all-in-one solution for checking in visitors and employees into offices.</p>
      <Button onClick={onNext} color="primary" className='mt-4'>Get Started</Button>
    </div>
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
    <div className='flex justify-center content-center items-center'>
      <div className='flex flex-col gap-1'>
      <div className='flex flex-col gap-3'>
        <div className='flex flex-col'>
          <h1 className='text-4xl font-semibold'>Company Name</h1>
          <h3 className='text-2xl'>What is your Companies name?</h3>
        </div>
        <Input type="Company Name" variant="faded" label="Company Name" />
        </div>
        <Button onClick={onNext} color="primary" className='mt-4'>Continue</Button>
      </div>
    </div>
  </motion.div>
);

const EndComponent: React.FC<OnboardingStepProps> = ({ onNext }) => (
  <motion.div 
    initial={{ opacity: 0, y: 50 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -50 }}
    transition={{ duration: 0.5 }}
  >
    <div className='flex justify-center content-center items-center'>
      <div className='flex flex-col gap-1'>
      <div className='flex flex-col gap-3'>
        <div className='flex flex-col'>
          <h1 className='text-4xl font-semibold'>Company Region</h1>
          <h3 className='text-2xl'>Where is are you located?</h3>
        </div>
        <Select 
        label="Country" 
        className="max-w-xs" 
      >
        {countries.map((animal) => (
          <SelectItem key={animal.key}>
            {animal.label}
          </SelectItem>
        ))}
      </Select>        </div>
        <Button onClick={onNext} color="primary" className='mt-4'>Continue</Button>
      </div>
    </div>
  </motion.div>
);

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
