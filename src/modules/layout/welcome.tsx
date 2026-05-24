import React from 'react';

import { Box, Stack, Typography, styled } from '@mui/material';

const WelcomeContent = styled(Box)(({ theme }) => ({}));

const WelcomeHeadline = styled(Typography)(({ theme }) => ({
  ...theme.typography.h4,
  fontWeight: 700,
  marginBottom: theme.spacing(3),
  color: theme.palette.secondary.text,
}));

const WelcomePoints = styled(Stack)(({ theme }) => ({
  listStyle: 'disc',
  margin: 0,
  gap: theme.spacing(1.5),
}));

const WelcomePointTitle = styled(Typography)(({ theme }) => ({
  fontWeight: 600,
  display: 'inline',
  color: theme.palette.secondary.contrastText,
}));

const WelcomePointBody = styled(Typography)(({ theme }) => ({
  color: theme.palette.secondary.text,
  display: 'block',
}));
export const Welcome = () => {
  return (
    <WelcomeContent>
      <WelcomeHeadline>
        Building Enterprise-Ready Micro Frontends with React and Module
        Federation
      </WelcomeHeadline>
      <WelcomePoints>
        <Box>
          <WelcomePointTitle>
            Part 1: Decoupling Frontend Layers with Module Federation
          </WelcomePointTitle>
        </Box>
        <Box>
          <WelcomePointTitle>
            Part 2: Data Management Across Micro Frontends
          </WelcomePointTitle>
        </Box>
        <Box>
          <WelcomePointTitle>
            Part 3: Design System Architecture in Micro Frontends
          </WelcomePointTitle>
        </Box>
        <Box>
          <WelcomePointTitle>
            Part 4: White-Labeling and Branding in Micro Frontends
          </WelcomePointTitle>
        </Box>
        <Box>
          <WelcomePointTitle>
            Part 5: CI/CD and Independent Deployment in Micro Frontends
          </WelcomePointTitle>
        </Box>
        <Box>
          <WelcomePointTitle>
            Part 6: PWA Strategy in Micro Frontends
          </WelcomePointTitle>
        </Box>
        <Box>
          <WelcomePointTitle>
            Part 7: Performance Optimization in Micro Frontends
          </WelcomePointTitle>
        </Box>
        <Box>
          <WelcomePointTitle>
            Part 8: Common Production Challenges and Lessons Learned
          </WelcomePointTitle>
        </Box>
      </WelcomePoints>
    </WelcomeContent>
  );
};
