import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepButton from '@mui/material/StepButton';
import Button from '@mui/material/Button';

export default function ModalStepper({
                                         steps,
                                         activeStep,
                                         setActiveStep,
                                         completed,
                                         setCompleted,
                                         saveChemicals,
                                         saveCrops,
                                         saveSites,
                                         saveResponsible,
                                         submitSprayCardData,
                                         closeModal,
                                         buttonText
                                     }) {
    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleStep = (step) => () => {
        setActiveStep(step);
    };

    const completeStep = () => {
        const newCompleted = completed;
        newCompleted[activeStep] = true;
        setCompleted(newCompleted);
    };

    const handleComplete = () => {
        if (activeStep === 0 && saveChemicals()) {
            completeStep();
        } else if (activeStep === 1 && saveCrops()) {
            completeStep();
        } else if (activeStep === 2 && saveSites()) {
            completeStep();
        } else if (activeStep === 3 && saveResponsible()) {
            completeStep();
        }
    };

    return (
        <Box sx={{width: '100%'}}>
            <Stepper nonLinear activeStep={activeStep}>
                {steps.map((label, index) => (
                    <Step key={label} completed={completed[index]}>
                        <StepButton color="inherit" onClick={handleStep(index)}>
                            {label}
                        </StepButton>
                    </Step>
                ))}
            </Stepper>
            <div>
                <React.Fragment>
                    <Box sx={{display: 'flex', flexDirection: 'row', pt: 2}}>
                        <Button
                            color="inherit"
                            onClick={closeModal}
                            sx={{mr: 1}}
                        >
                            Later
                        </Button>
                        <Button
                            color="inherit"
                            disabled={activeStep === 0}
                            onClick={handleBack}
                            sx={{mr: 1}}
                        >
                            Back
                        </Button>
                        <Box sx={{flex: '1 1 auto'}}/>
                        <Button
                            disabled={completed[activeStep]}
                            onClick={handleComplete}
                            sx={{mr: 1}}>
                            Save
                        </Button>
                        <Button
                            disabled={activeStep === 3}
                            onClick={handleNext}
                            sx={{mr: 1}}>
                            Next
                        </Button>
                        <Button
                            disabled={Object.values(completed).some(value => value === false)}
                            onClick={submitSprayCardData}
                        >
                            {buttonText}
                        </Button>
                    </Box>
                </React.Fragment>
            </div>
        </Box>
    );
}