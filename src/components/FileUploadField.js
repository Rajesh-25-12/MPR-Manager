import React, { useState, useEffect } from 'react';
import {
  Paper,
  Typography,
  Stack,
  Button,
  IconButton,
  Avatar,
  Chip,
  Box,
  LinearProgress,
  Tooltip,
} from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import VisibilityIcon from '@mui/icons-material/Visibility';
import DeleteIcon from '@mui/icons-material/Delete';
import DescriptionIcon from '@mui/icons-material/Description';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import { useField } from 'formik';

const ACCEPTED_MIME_TYPES = [
  'application/pdf',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
];
const ACCEPTED_EXTENSIONS = '.pdf,.doc,.docx';
const EXTENSION_REGEX = /\.(pdf|docx?)$/i;

const formatBytes = (bytes) => {
  if (bytes === undefined || bytes === null) return '';
  if (bytes === 0) return '0 B';
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(1024));
  return `${(bytes / 1024 ** i).toFixed(1)} ${sizes[i]}`;
};

const FileIcon = ({ fileName, mime }) => {
  if (mime === 'application/pdf' || /\.pdf$/i.test(fileName || ''))
    return <PictureAsPdfIcon />;
  if (/\.docx?$/i.test(fileName || '')) return <DescriptionIcon />;
  return <InsertDriveFileIcon />;
};

export default function FileUploadField({ name, label, maxSizeMB = 10 }) {
  const [field, meta, helpers] = useField(name);
  const { setValue, setError, setTouched } = helpers;
  const currentValue = field.value;
  const isFileObject = currentValue instanceof File;

  const [dragActive, setDragActive] = useState(false);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(null);

  const fileName = isFileObject
    ? currentValue.name
    : currentValue || 'No file selected';
  const fileSize = isFileObject ? formatBytes(currentValue.size) : null;

  useEffect(() => {
    if (isFileObject && currentValue.type === 'application/pdf') {
      const url = URL.createObjectURL(currentValue);
      setPreviewUrl(url);
      return () => URL.revokeObjectURL(url);
    }
    setPreviewUrl(null);
    return undefined;
  }, [isFileObject, currentValue]);

  const validateFile = (file) => {
    if (!file) return 'No file selected';
    const accepted =
      ACCEPTED_MIME_TYPES.includes(file.type) ||
      EXTENSION_REGEX.test(file.name);
    if (!accepted) return 'Only PDF or Word documents are allowed';
    if (file.size > maxSizeMB * 1024 * 1024)
      return `File must be smaller than ${maxSizeMB} MB`;
    return null;
  };

  const startFakeUpload = () => {
    setUploadProgress(0);
    const id = setInterval(() => {
      setUploadProgress((p) => {
        if (p === null) return null;
        if (p >= 100) {
          clearInterval(id);
          setTimeout(() => setUploadProgress(null), 300);
          return 100;
        }
        return Math.min(100, p + Math.random() * 20 + 10);
      });
    }, 250);
  };

  const handleFileSelection = (file) => {
    const validationMessage = validateFile(file);
    setTouched(true, true);
    if (validationMessage) {
      setError(validationMessage);
      return;
    }
    setError(undefined);
    setValue(file);
    startFakeUpload();
  };

  const handleInputChange = (e) => {
    const file = e.currentTarget.files?.[0];
    if (file) handleFileSelection(file);
    e.currentTarget.value = '';
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragActive(false);
    const file = e.dataTransfer.files?.[0];
    if (file) handleFileSelection(file);
  };

  const handleRemove = () => {
    setValue(null);
    setError(undefined);
    setTouched(true, true);
  };

  return (
    <div>
      <Typography variant='subtitle2' sx={{ mb: 1 }}>
        {label}
      </Typography>

      <Paper
        variant='outlined'
        onDragOver={(e) => {
          e.preventDefault();
          setDragActive(true);
        }}
        onDragLeave={() => setDragActive(false)}
        onDrop={handleDrop}
        sx={{
          p: 2,
          borderStyle: 'dashed',
          borderWidth: 1,
          borderColor:
            meta.touched && meta.error
              ? 'error.main'
              : dragActive
              ? 'primary.main'
              : 'divider',
          bgcolor: dragActive ? 'action.hover' : 'background.paper',
          transition: 'all 160ms ease',
          borderRadius: 2,
        }}
      >
        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          spacing={2}
          alignItems={{ xs: 'flex-start', sm: 'center' }}
        >
          <Avatar
            variant='rounded'
            sx={{
              width: 64,
              height: 64,
              bgcolor: 'primary.light',
              color: 'primary.contrastText',
            }}
          >
            <FileIcon
              fileName={fileName}
              mime={isFileObject ? currentValue.type : undefined}
            />
          </Avatar>

          <Box sx={{ flex: 1, minWidth: 0 }}>
            <Typography noWrap variant='subtitle1'>
              {fileName}
            </Typography>
            <Typography variant='body2' color='text.secondary' noWrap>
              {isFileObject
                ? fileSize
                : `Drag & drop or browse — ${ACCEPTED_EXTENSIONS}`}
            </Typography>

            <Stack direction='row' spacing={1} sx={{ mt: 1 }}>
              <Chip
                size='small'
                label={`Max ${maxSizeMB}MB`}
                variant='outlined'
              />
              <Chip size='small' label='PDF / Word' variant='outlined' />
              {isFileObject && uploadProgress === null && (
                <Chip
                  size='small'
                  icon={<CheckCircleOutlineIcon fontSize='small' />}
                  label='Ready'
                  color='success'
                />
              )}
              {isFileObject && uploadProgress !== null && (
                <Chip
                  size='small'
                  icon={<CloudUploadIcon fontSize='small' />}
                  label={`Uploading ${Math.round(uploadProgress)}%`}
                  variant='outlined'
                />
              )}
            </Stack>

            {uploadProgress !== null && (
              <Box sx={{ mt: 1 }}>
                <LinearProgress variant='determinate' value={uploadProgress} />
              </Box>
            )}
          </Box>

          <Stack direction='row' spacing={1} alignItems='center'>
            {isFileObject && previewUrl && (
              <Tooltip title='Preview (PDF)'>
                <Button
                  size='small'
                  variant='outlined'
                  startIcon={<VisibilityIcon />}
                  onClick={() => {
                    try {
                      window.open(previewUrl, '_blank', 'noopener,noreferrer');
                    } catch (err) {
                      const a = document.createElement('a');
                      a.href = previewUrl;
                      a.target = '_blank';
                      a.rel = 'noopener noreferrer';
                      a.click();
                    }
                  }}
                >
                  Preview
                </Button>
              </Tooltip>
            )}

            {isFileObject && (
              <Tooltip title='Remove file'>
                <IconButton size='small' color='error' onClick={handleRemove}>
                  <DeleteIcon fontSize='small' />
                </IconButton>
              </Tooltip>
            )}
            {!isFileObject && (
              <Button
                component='label'
                variant='contained'
                startIcon={<CloudUploadIcon />}
                size='small'
              >
                Browse
                <input
                  hidden
                  type='file'
                  accept={ACCEPTED_EXTENSIONS}
                  onChange={handleInputChange}
                />
              </Button>
            )}
          </Stack>
        </Stack>
      </Paper>

      {meta.touched && meta.error && (
        <Typography
          variant='caption'
          color='error'
          sx={{ mt: 0.5, display: 'block' }}
        >
          <WarningAmberIcon
            fontSize='small'
            sx={{ mr: 0.5, verticalAlign: 'middle' }}
          />
          {meta.error}
        </Typography>
      )}
    </div>
  );
}
