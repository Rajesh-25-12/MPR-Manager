import React, { useState } from 'react';
import {
  Card,
  CardContent,
  Typography,
  Chip,
  Avatar,
  Button,
  Box,
} from '@mui/material';
import { useStore } from '../store/useStore';
import MPRModal from '../popups/MPRModal';
import CandidatesModal from '../popups/CandidatesModal';

const JobNode = ({ job }) => {
  const getMPRByJobId = useStore((state) => state.getMPRByJobId);
  const [showMPRModal, setShowMPRModal] = useState(false);
  const [showCandidatesModal, setShowCandidatesModal] = useState(false);
  const mpr = getMPRByJobId(job.id);

  const handleMPRClick = () => {
    if (mpr) {
      setShowCandidatesModal(true);
    } else {
      setShowMPRModal(true);
    }
  };

  return (
    <>
      <Card
        sx={{
          width: 240,
          height: 320,
          display: 'flex',
          flexDirection: 'column',
          transition: 'all 0.3s ease',
          '&:hover': {
            boxShadow: 6,
            transform: 'translateY(-4px)',
          },
        }}
      >
        <CardContent
          sx={{
            display: 'flex',
            flexDirection: 'column',
            flex: 1,
            p: 2,
            '&:last-child': {
              pb: 2,
            },
          }}
        >
          <Box
            sx={{
              textAlign: 'center',
              mb: 2,
              pb: 2,
              borderBottom: 1,
              borderColor: 'divider',
            }}
          >
            <Typography
              variant='h6'
              component='h3'
              sx={{
                fontWeight: 600,
                mb: 1,
                fontSize: '1rem',
                lineHeight: 1.3,
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                display: '-webkit-box',
                WebkitLineClamp: 2,
                WebkitBoxOrient: 'vertical',
              }}
            >
              {job.title}
            </Typography>
            <Chip
              label={job.department}
              size='small'
              color='primary'
              variant='outlined'
            />
          </Box>

          <Box
            sx={{
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {job.employee ? (
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: 1,
                  width: '100%',
                }}
              >
                <Avatar
                  src={job.employee.photo}
                  alt={job.employee.name}
                  sx={{
                    width: 80,
                    height: 80,
                    border: 3,
                    borderColor: 'primary.main',
                  }}
                />
                <Typography
                  variant='body1'
                  sx={{
                    fontWeight: 500,
                    textAlign: 'center',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                    width: '100%',
                  }}
                >
                  {job.employee.name}
                </Typography>
                <Typography variant='caption' color='text.secondary'>
                  {job.employee.code}
                </Typography>
              </Box>
            ) : (
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: 1.5,
                  width: '100%',
                  justifyContent: 'center',
                }}
              >
                <Typography
                  variant='body2'
                  color='text.secondary'
                  sx={{ fontStyle: 'italic', mb: 1 }}
                >
                  No Employee Assigned
                </Typography>
                <Button
                  variant='contained'
                  onClick={handleMPRClick}
                  fullWidth
                  sx={{
                    background:
                      'linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)',
                    '&:hover': {
                      background:
                        'linear-gradient(135deg, #4338ca 0%, #6d28d9 100%)',
                    },
                    mt: 'auto',
                  }}
                >
                  {mpr ? `View MPR (${mpr.candidates.length})` : 'Raise MPR'}
                </Button>
                {mpr && (
                  <Typography
                    variant='caption'
                    color='success.main'
                    sx={{ fontWeight: 500, mt: 0.5 }}
                  >
                    MPR: {mpr.dateOfRequest}
                  </Typography>
                )}
              </Box>
            )}
          </Box>
        </CardContent>
      </Card>

      {showMPRModal && (
        <MPRModal job={job} onClose={() => setShowMPRModal(false)} />
      )}

      {showCandidatesModal && mpr && (
        <CandidatesModal
          mpr={mpr}
          onClose={() => setShowCandidatesModal(false)}
        />
      )}
    </>
  );
};

export default JobNode;
