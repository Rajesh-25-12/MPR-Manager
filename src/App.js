import React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import { Container, Box, Typography } from '@mui/material';
import OrganizationChart from './pages/OrganizationChart';

function App() {
  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        py: 4,
      }}
    >
      <CssBaseline />
      <Container maxWidth='xl'>
        <Box sx={{ textAlign: 'center', color: 'white', mb: 4 }}>
          <Typography
            variant='h3'
            component='h1'
            sx={{ fontWeight: 700, mb: 1 }}
          >
            Organization Chart & Manpower Request Management
          </Typography>
          <Typography variant='h6' sx={{ opacity: 0.9, fontWeight: 300 }}>
            Manage your organization structure and recruitment process
          </Typography>
        </Box>
        <OrganizationChart />
      </Container>
    </Box>
  );
}

export default App;
