import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Button,
  IconButton,
  Box,
  Typography,
  Paper,
  Grid,
  Chip,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { useStore } from '../store/useStore';
import CandidateForm from '../components/CandidateForm';

const CandidatesModal = ({ mpr: initialMpr, onClose }) => {
  const mprs = useStore((state) => state.mprs);

  const mpr = mprs.find((m) => m.jobId === initialMpr.jobId) || initialMpr;

  const [showCandidateForm, setShowCandidateForm] = useState(false);
  const [selectedCandidate, setSelectedCandidate] = useState(null);

  const handleAddCandidate = () => {
    setSelectedCandidate(null);
    setShowCandidateForm(true);
  };

  const handleEditCandidate = (candidate) => {
    setSelectedCandidate(candidate);
    setShowCandidateForm(true);
  };

  const handleFormClose = () => {
    setShowCandidateForm(false);
    setSelectedCandidate(null);
  };

  return (
    <Dialog open={true} onClose={onClose} maxWidth='md' fullWidth>
      <DialogTitle>
        MPR Details - {mpr.jobTitle}
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

      {showCandidateForm ? (
        <CandidateForm
          mpr={mpr}
          candidate={selectedCandidate}
          onClose={handleFormClose}
          key={mpr.id}
        />
      ) : (
        <>
          <DialogContent>
            <Paper
              elevation={0}
              sx={{
                p: 2,
                mb: 3,
                bgcolor: 'grey.50',
              }}
            >
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <Typography variant='body2' color='text.secondary'>
                    Job ID
                  </Typography>
                  <Typography variant='body1' fontWeight={600}>
                    {mpr.jobId}
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant='body2' color='text.secondary'>
                    Date of Request
                  </Typography>
                  <Typography variant='body1' fontWeight={600}>
                    {mpr.dateOfRequest}
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant='body2' color='text.secondary'>
                    Requested By
                  </Typography>
                  <Typography variant='body1' fontWeight={600}>
                    {mpr.requestedBy}
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant='body2' color='text.secondary'>
                    Candidates
                  </Typography>
                  <Typography variant='body1' fontWeight={600}>
                    {mpr.candidates.length}
                  </Typography>
                </Grid>
              </Grid>
            </Paper>
            {mpr.candidates.length > 0 && (
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  mb: 2,
                }}
              >
                <Typography variant='h6'>Candidates</Typography>
                <Button
                  variant='contained'
                  startIcon={<AddIcon />}
                  onClick={handleAddCandidate}
                >
                  Add Candidate
                </Button>
              </Box>
            )}

            {mpr.candidates.length === 0 ? (
              <Paper
                elevation={0}
                sx={{
                  p: 4,
                  textAlign: 'center',
                  bgcolor: 'grey.50',
                  border: 2,
                  borderStyle: 'dashed',
                  borderColor: 'grey.300',
                }}
              >
                <Typography
                  variant='body1'
                  color='text.secondary'
                  sx={{ mb: 2 }}
                >
                  No candidates added yet.
                </Typography>

                <Button
                  variant='contained'
                  startIcon={<AddIcon />}
                  onClick={handleAddCandidate}
                >
                  Add First Candidate
                </Button>
              </Paper>
            ) : (
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                {mpr.candidates.map((candidate) => (
                  <Paper
                    key={candidate.id}
                    elevation={1}
                    sx={{
                      p: 2,
                      '&:hover': {
                        boxShadow: 3,
                        borderColor: 'primary.main',
                      },
                      border: 1,
                      borderColor: 'divider',
                    }}
                  >
                    <Box
                      sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        mb: 2,
                        pb: 1,
                        borderBottom: 1,
                        borderColor: 'divider',
                      }}
                    >
                      <Typography variant='h6'>{candidate.name}</Typography>
                      <Button
                        size='small'
                        startIcon={<EditIcon />}
                        onClick={() => handleEditCandidate(candidate)}
                      >
                        Edit
                      </Button>
                    </Box>
                    <Grid container spacing={2}>
                      <Grid item xs={6}>
                        <Typography variant='caption' color='text.secondary'>
                          Email
                        </Typography>
                        <Typography variant='body2'>
                          {candidate.email}
                        </Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <Typography variant='caption' color='text.secondary'>
                          Phone
                        </Typography>
                        <Typography variant='body2'>
                          {candidate.phone || 'N/A'}
                        </Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <Typography variant='caption' color='text.secondary'>
                          Experience
                        </Typography>
                        <Typography variant='body2'>
                          {candidate.experience || 'N/A'}
                        </Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <Typography variant='caption' color='text.secondary'>
                          Expected Salary
                        </Typography>
                        <Typography variant='body2'>
                          {candidate.expectedSalary || 'N/A'}
                        </Typography>
                      </Grid>
                      {candidate.description && (
                        <Grid item xs={12}>
                          <Typography variant='caption' color='text.secondary'>
                            Description
                          </Typography>
                          <Typography variant='body2'>
                            {candidate.description}
                          </Typography>
                        </Grid>
                      )}
                      {candidate.resume && (
                        <Grid item xs={12}>
                          <Typography variant='caption' color='text.secondary'>
                            Resume
                          </Typography>

                          <Box display='flex' alignItems='center' gap={1}>
                            <Chip
                              label='Uploaded'
                              color='primary'
                              size='small'
                            />

                            <Button
                              size='small'
                              variant='outlined'
                              startIcon={<VisibilityIcon />}
                              onClick={() => {
                                try {
                                  window.open(
                                    URL.createObjectURL(candidate.resume),
                                    '_blank',
                                    'noopener,noreferrer'
                                  );
                                } catch (err) {
                                  const a = document.createElement('a');
                                  a.href = candidate.resume;
                                  a.target = '_blank';
                                  a.rel = 'noopener noreferrer';
                                  a.click();
                                }
                              }}
                            >
                              Preview
                            </Button>
                          </Box>
                        </Grid>
                      )}
                    </Grid>
                  </Paper>
                ))}
              </Box>
            )}
          </DialogContent>
        </>
      )}
    </Dialog>
  );
};

export default CandidatesModal;
