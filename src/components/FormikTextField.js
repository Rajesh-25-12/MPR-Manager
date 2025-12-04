import React from 'react';
import { TextField } from '@mui/material';
import { useField } from 'formik';

const FormikTextField = ({ name, required, ...otherProps }) => {
  const [field, meta] = useField(name);

  const configTextField = {
    ...field,
    ...otherProps,
    fullWidth: true,
    error: false,
    helperText: '',
    required: required,
  };

  if (meta && meta.touched && meta.error) {
    configTextField.error = true;
    configTextField.helperText = meta.error;
  }

  if (required) {
    configTextField.InputLabelProps = {
      ...otherProps.InputLabelProps,
      sx: {
        ...otherProps.InputLabelProps?.sx,
        '& .MuiFormLabel-asterisk': {
          color: 'red',
        },
      },
    };
  }

  return <TextField {...configTextField} />;
};

export default FormikTextField;
