"use client"
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {Button} from "@nextui-org/button"
import {Input} from "@nextui-org/input"
import {Select, SelectItem} from "@nextui-org/select"
import countries from 'world-countries'
import { Card, CardFooter, CardHeader } from '@nextui-org/card';
import {Divider} from "@nextui-org/divider";

interface OnboardingStepProps {
  onNext: () => void;
}

const popularCountryCodes = ["US", "GB", "CA", "AU", "DE", "FR", "JP", "CN", "IN"]; // Add more as needed

const popularCountries = countries
  .filter(country => popularCountryCodes.includes(country.cca2))
  .map(country => ({
    key: country.cca2,
    label: country.name.common
  }));

const otherCountries = countries
  .filter(country => !popularCountryCodes.includes(country.cca2))
  .map(country => ({
    key: country.cca2,
    label: country.name.common
  }));

const countryOptions = [...popularCountries, ...otherCountries];

const WelcomeComponent: React.FC<OnboardingStepProps> = ({ onNext }) => (
  <motion.div
    initial={{ opacity: 0, y: 50 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -50 }}
    transition={{ duration: 0.5 }}
  >
    <div className='flex flex-col gap-5 justify-center items-center'>
      <div className="flex flex-col justify-center text-center items-center content-center w-full">
        <h3 className="text-xl">Welcome to</h3>
        <h1 className="text-4xl font-medium">Checky</h1>
        <p className="text-xl w-1/2">
          Checky is the all-in-one solution for checking in visitors and
          employees into offices.
        </p>
      </div>

      <Button size="lg" onClick={onNext} color="primary" className='w-1/3'>
        Setup
      </Button>
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
        <Input type="Company Name" variant="faded" label="Company Name" size='lg'/>
        </div>
        <Button onClick={onNext} color="primary" size='lg' className='mt-4'>Continue</Button>
      </div>
    </div>
  </motion.div>
);

const RegionComponent: React.FC<OnboardingStepProps> = ({ onNext }) => (
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
            <h3 className='text-2xl'>Where are you located?</h3>
          </div>
          <Select label="Country" className="max-w-xs" size='lg'>
            {countryOptions.map((country) => (
              <SelectItem key={country.key} value={country.key}>
                {country.label}
              </SelectItem>
            ))}
          </Select>
        </div>
        <Button onClick={onNext} color="primary" className='mt-4' >Continue</Button>
      </div>
    </div>
  </motion.div>
);
const PlanComponent: React.FC<OnboardingStepProps> = ({ onNext }) => (

  <motion.div 
    initial={{ opacity: 0, y: 50 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -50 }}
    transition={{ duration: 0.5 }}
  >
    <div className='flex flex-col gap-4'>
      <div className='flex flex-col justify-center text-center'>
        <h3 className='text-xl'>Pricing</h3>
        <h1 className='text-4xl font-medium'>Choose your Plan</h1>
        <p className='text-xl'>Find the plan for you</p>
      </div>
      <div className='flex flex-row justify-center gap-3'>
        <Card isBlurred className='w-1/4 p-5'  shadow="sm">
          <CardHeader className='flex flex-col items-start'>
            <h2 className='text-3xl font-medium'>Visitor</h2>
            <p className='w-5/8 text-gray-600 text-medium'>For Small Businesses keeping track of incoming visitors</p>
            <Divider className='mt-4 mb-4'></Divider>
            <h1 className='text-5xl font-semibold'>Free</h1>
          </CardHeader>
          <CardFooter className='flex justify-center'>
            <Button className='w-full' onClick={onNext}>Continue</Button>
          </CardFooter>
        </Card>
        <Card isBlurred className='w-1/4 p-5'  shadow="sm">
          <CardHeader className='flex flex-col items-start'>
            <h2 className='text-3xl font-medium'>Pro</h2>
            <p className='w-5/8 text-gray-600 text-medium'>For Businesses looking to streamline employees</p>
            <Divider className='mt-4 mb-4'></Divider>
            <div className='flex flex-row gap-2'>
              <h1 className='text-5xl font-semibold'>£3</h1>
              <div className='text-small flex flex-col justify-center'>
                <p>per user</p>
                <p>per month</p>
              </div>
            </div>
          </CardHeader>
          <CardFooter className='flex justify-center'>
            <Button className='w-full' color='primary'>Buy Now</Button>
          </CardFooter>
        </Card>

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
        {step === 0 && <WelcomeComponent key="Welcome" onNext={nextStep} />}
        {step === 1 && <FeatureComponent key="Company Name" onNext={nextStep} />}
        {step === 2 && <RegionComponent key="Region" onNext={nextStep} />}
        {step === 3 && <PlanComponent key="Plan" onNext={nextStep} />}

      </AnimatePresence>
    </div>
  );
};

export default OnboardingPage;
