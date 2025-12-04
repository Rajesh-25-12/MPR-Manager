import React from 'react';
import {
  Box,
  Button,
  Grid,
  IconButton,
  Stack,
  Typography,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { useStore } from '../store/useStore';
import FormikTextField from './FormikTextField';
import FileUploadField from './FileUploadField';

const validationSchema = Yup.object({
  name: Yup.string()
    .required('Name is required')
    .min(2, 'Name must be at least 2 characters')
    .max(100, 'Name must be less than 100 characters'),
  email: Yup.string()
    .required('Email is required')
    .email('Invalid email address'),
  phone: Yup.string()
    .required('Phone number is required')
    .matches(/^\d{10}$/, 'Phone number must be exactly 10 digits'),
  experience: Yup.number()
    .required('Experience is required')
    .max(20, 'Experience must be less than 20'),
  expectedSalary: Yup.number()
    .required('Expected salary is required')
    .max(1000000, 'Expected salary must be less than 1000000'),
  description: Yup.string().max(
    500,
    'Description must be less than 500 characters'
  ),
});

const CandidateForm = ({ mpr, candidate, onClose }) => {
  const addCandidate = useStore((state) => state.addCandidate);
  const updateCandidate = useStore((state) => state.updateCandidate);

  const initialValues = {
    name: candidate?.name || '',
    email: candidate?.email || '',
    phone: candidate?.phone || '',
    description: candidate?.description || '',
    experience: candidate?.experience || '',
    expectedSalary: candidate?.expectedSalary || '',
    resume: candidate?.resume || null,
  };

  const handleSubmit = (values, { setSubmitting }) => {
    if (candidate) {
      updateCandidate(mpr.id, candidate.id, values);
    } else {
      addCandidate(mpr.id, values);
    }
    setSubmitting(false);
    onClose();
  };

  return (
    <Box sx={{ p: 2 }}>
      <Stack
        direction='row'
        alignItems='center'
        justifyContent='space-between'
        sx={{ mb: 2 }}
      >
        <Typography variant='h6'>
          {candidate ? 'Edit Candidate' : 'Add New Candidate'}
        </Typography>
        <IconButton
          aria-label='close'
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
          }}
        >
          <CloseIcon />
        </IconButton>
      </Stack>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
        enableReinitialize
      >
        {({ isSubmitting }) => (
          <Form>
            <Box sx={{ mb: 3 }}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <FormikTextField
                    name='name'
                    label='Name'
                    placeholder='Enter candidate name'
                    required
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormikTextField
                    name='email'
                    label='Email'
                    type='email'
                    placeholder='candidate@email.com'
                    required
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormikTextField name='phone' label='Phone Number' required />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormikTextField
                    name='experience'
                    label='Experience'
                    placeholder='e.g., 5 years'
                    required
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormikTextField
                    name='expectedSalary'
                    label='Expected Salary'
                    placeholder='e.g. 120,000'
                    required
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormikTextField
                    name='description'
                    label='Description'
                    placeholder='Enter candidate description, skills, or notes...'
                  />
                </Grid>
                <Grid item xs={12}>
                  <FileUploadField name='resume' label='Upload Resume' />
                </Grid>
              </Grid>
            </Box>
            <Stack direction='row' spacing={2} justifyContent='flex-end'>
              <Button onClick={onClose} disabled={isSubmitting}>
                Cancel
              </Button>
              <Button type='submit' variant='contained' disabled={isSubmitting}>
                {candidate ? 'Update Candidate' : 'Add Candidate'}
              </Button>
            </Stack>
          </Form>
        )}
      </Formik>
    </Box>
  );
};

export default CandidateForm;
