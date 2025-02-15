import { useState } from 'react';
import { Limits, useLimits } from '../context/LimitsContext';

export interface SimulationData {
  amount: number;
  duration: number;
}

export interface StepperHook {
  currentStep: number;
  formData: SimulationData;
  nextStep: () => void;
  prevStep: () => void;
  updateData: (newData: SimulationData) => void;
  resetStepper: () => void;
  limits: Limits;
}

const useCreditSimulation = (steps: number) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<SimulationData>({ amount: 0, duration: 3 });

  const limits = useLimits();

  if (!limits) {
    throw new Error('useCreditStepper must be used within a CreditStepperProvider');
  }

  const nextStep = () => {
    if (currentStep < steps - 1) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const updateData = (newData: SimulationData) => {
    setFormData(prevData => ({ ...prevData, ...newData }));
  };

  const resetStepper = () => {
    setCurrentStep(0);
    setFormData({ amount: 50, duration: 3 });
  };

  return {
    currentStep,
    formData,
    nextStep,
    prevStep,
    updateData,
    resetStepper,
    limits,
  };
};

export default useCreditSimulation;
