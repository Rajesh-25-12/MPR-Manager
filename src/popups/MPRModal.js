import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  IconButton,
  Grid,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { useStore } from '../store/useStore';
import FormikTextField from '../components/FormikTextField';

const validationSchema = Yup.object({
  requestedBy: Yup.string()
    .required('Requested By is required')
    .min(2, 'Name must be at least 2 characters')
    .max(50, 'Name must be less than 50 characters'),
});

const MPRModal = ({ job, onClose }) => {
  const createMPR = useStore((state) => state.createMPR);

  const initialValues = {
    requestedBy: '',
  };

  const handleSubmit = (values, { setSubmitting }) => {
    createMPR(job.id, values.requestedBy);
    setSubmitting(false);
    onClose();
  };

  return (
    <Dialog open={true} onClose={onClose} maxWidth='sm' fullWidth>
      <DialogTitle>
        Raise Manpower Request
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
      </DialogTitle>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form>
            <DialogContent>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField fullWidth label='Job ID' value={job.id} disabled />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label='Job Title'
                    value={job.title}
                    disabled
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label='Department'
                    value={job.department}
                    disabled
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label='Date of Request'
                    type='date'
                    value={new Date().toISOString().split('T')[0]}
                    disabled
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormikTextField
                    name='requestedBy'
                    label='Requested By'
                    required
                  />
                </Grid>
              </Grid>
            </DialogContent>
            <DialogActions>
              <Button onClick={onClose} disabled={isSubmitting}>
                Cancel
              </Button>
              <Button type='submit' variant='contained' disabled={isSubmitting}>
                Create MPR
              </Button>
            </DialogActions>
          </Form>
        )}
      </Formik>
    </Dialog>
  );
};

export default MPRModal;
