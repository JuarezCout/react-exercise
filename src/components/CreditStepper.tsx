import { Box, Button, Step, StepLabel, Stepper, Typography } from '@mui/material';
import { useState } from 'react';
import Amount from './Amount';
import Duration from './Duration';
import useCreditSimulation from '../hooks/useCreditSimulation';
import CreditResume from './CreditResume';
import { DURATION_RANGE } from '../utils/constants';

export default function CreditStepper() {
  const [activeStep, setActiveStep] = useState(0);
  const [errorMessage, setErrorMessage] = useState('');

  const steps = ['Amount', 'Months', 'Resume'];

  const { limits, formData, updateData } = useCreditSimulation(3);

  const handleNext = () => {
    const error = validateStep();
    if (error) {
      setErrorMessage(error);
      return;
    }
    setErrorMessage('');
    setActiveStep(prev => prev + 1);
  };

  const handleBack = () => {
    setErrorMessage('');
    setActiveStep(prev => prev - 1);
  };

  const cleanErrorMessage = () => {
    setErrorMessage('');
  };

  const validateStep = () => {
    if (activeStep === 0) {
      if (formData.amount < limits.min || formData.amount > limits.max) {
        return `Amount must be between ${limits.min} and ${limits.max}`;
      }
    } else if (activeStep === 1) {
      if (formData.duration < DURATION_RANGE.min || formData.duration > DURATION_RANGE.max) {
        return `Duration must be between ${DURATION_RANGE.min} and ${DURATION_RANGE.max} months`;
      }
    }
    return '';
  };

  const renderStep = () => {
    switch (activeStep) {
      case 0:
        return (
          <Amount
            limits={limits}
            amount={formData.amount}
            setAmount={value => updateData({ ...formData, amount: value })}
            cleanErrorMessage={cleanErrorMessage}
          />
        );
      case 1:
        return (
          <Duration
            duration={formData.duration}
            setDuration={value => updateData({ ...formData, duration: value })}
            cleanErrorMessage={cleanErrorMessage}
          />
        );
      case 2:
        return <CreditResume simulation={formData} currency={limits.currency} />;
      default:
        return null;
    }
  };

  return (
    <Box sx={{ width: '50%', mx: 'auto', my: 4 }}>
      <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map(label => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>

      <Box sx={{ mt: 2 }}>
        {renderStep()}

        {errorMessage && (
          <Typography variant="body2" color="error" sx={{ mt: 1 }}>
            {errorMessage}
          </Typography>
        )}

        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
          <Button disabled={activeStep === 0} onClick={handleBack}>
            Back
          </Button>
          <Button variant="contained" onClick={handleNext}>
            {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
