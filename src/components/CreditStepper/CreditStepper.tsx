import { Box, Step, StepLabel, Stepper } from "@mui/material";
import { useState } from "react";
import Amount from "../Amount/Amount";
import Duration from "../Duration/Duration";

type Simulation =  {amount: number, duration: number}

interface CreditStepperProps {
    limits: any
    simulation:Simulation
    setSimulation: (value: Simulation) => void
}
export default function CreditStepper(props: CreditStepperProps) {
    const [activeStep, setActiveStep] = useState(0);
    const [skipped, setSkipped] = useState(new Set<number>());
    
    const steps = ['Amount', 'Duration', 'Resume'];

    const {limits, simulation, setSimulation} = props

    const isStepSkipped = (step: number) => {
        return skipped.has(step);
      };

      const renderStep = () => {
        switch (activeStep) {
          case 0:
            return <Amount limits={limits} amount={simulation.amount} setAmount={(value) => setSimulation({...simulation, amount: value})} />
          case 1: 

          return <Duration duration={simulation.amount} setDuration={(value) => setSimulation({...simulation, duration: value})} />
          default:
            break;
        }
      }

    return (
      <Box sx={{ width: '100%' }}>
        <Stepper activeStep={activeStep}>
        {steps.map((label, index) => {
          const stepProps: { completed?: boolean } = {};
          const labelProps: {
            optional?: React.ReactNode;
          } = {};
          if (isStepSkipped(index)) {
            stepProps.completed = false;
          }
          return (
            <Step key={label} {...stepProps}>
              <StepLabel {...labelProps}>{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>

      <Box>
      {renderStep()}
      </Box>
      </Box>
    )
}