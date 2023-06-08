import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepButton from '@mui/material/StepButton';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import {object} from "prop-types";

export default function SprayCardStepper({
                                             steps,
                                             activeStep,
                                             setActiveStep,
                                             fieldValues,
                                             field_names,
                                             saveChemicals,
                                             saveCrops,
                                             saveSites
                                         }) {
    const [completed, setCompleted] = React.useState({});

    const totalSteps = () => {
        return steps.length;
    };

    const completedSteps = () => {
        return Object.keys(completed).length;
    };

    const allStepsCompleted = () => {
        return completedSteps() === totalSteps();
    };

    const handleNext = () => {
        if ((activeStep < 2) || (activeStep === 2 && completed[0] && completed[1])) {
            setActiveStep(activeStep + 1);
        }
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleStep = (step) => () => {
        if (step < 3 || (step === 3 && completed[0] && completed[1] && completed[2])) {
            setActiveStep(step);
        }
    };

    const handleComplete = () => {
        if (activeStep === 0 && saveChemicals()) {
            completeStep();
        } else if (activeStep === 1 && saveCrops()) {
            completeStep();
        } else if (activeStep === 2 && saveSites()) {
            completeStep();
        }
    };

    const completeStep = () => {
        const newCompleted = completed;
        newCompleted[activeStep] = true;
        setCompleted(newCompleted);
    };

    const handleReset = () => {
        setActiveStep(0);
        setCompleted({});
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
                {allStepsCompleted() ? (
                    <React.Fragment>
                        <Typography sx={{mt: 2, mb: 1}}>
                            All steps completed - you&apos;re finished
                        </Typography>
                        <Box sx={{display: 'flex', flexDirection: 'row', pt: 2}}>
                            <Box sx={{flex: '1 1 auto'}}/>
                            <Button onClick={handleReset}>Reset</Button>
                        </Box>
                    </React.Fragment>
                ) : (
                    <React.Fragment>
                        <Box sx={{display: 'flex', flexDirection: 'row', pt: 2}}>
                            <Button
                                color="inherit"
                                disabled={activeStep === 0}
                                onClick={handleBack}
                                sx={{mr: 1}}
                            >
                                Back
                            </Button>
                            <Box sx={{flex: '1 1 auto'}}/>
                            <Button onClick={handleNext} sx={{mr: 1}}>
                                Next
                            </Button>
                            {activeStep !== steps.length &&
                                (completed[activeStep] ? null : (
                                    <Button onClick={handleComplete}>
                                        {completedSteps() === totalSteps() - 1
                                            ? 'Submit Process'
                                            : 'Save'}
                                    </Button>
                                ))}
                        </Box>
                    </React.Fragment>
                )}
            </div>
        </Box>
    );
}