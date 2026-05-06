import React, { FC, Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import {
  Box,
  Stack,
  Typography,
  styled,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { Welcome } from './welcome';
const Wrapper = styled(Stack)(({ theme }) => ({
  position: 'relative',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100vh',
  background: theme.palette.background.default,
}));
const WelcomeWrapper = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  background: theme.palette.secondary.main,
  color: theme.palette.background.paper,
  boxSizing: 'border-box',
  borderRadius: '0 20px 20px 0',
  padding: theme.spacing(4),
}));

const ContentWrapper = styled(Box)(({ theme }) => ({
  justifyContent: 'center',
  color: theme.palette.text.primary,
  padding: theme.spacing(4),
  boxSizing: 'border-box',
  background: theme.palette.background.paper,
  borderRadius: '20px 0 0 20px',
}));

const MobileWrapper = styled(Stack)(({ theme }) => ({
  background: theme.palette.background.paper,
  color: theme.palette.text.primary,
  height: '100vh',
  [theme.breakpoints.up('md')]: {
    padding: theme.spacing(2),
  },
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(1),
  },
}));

const Container = styled(Box)(({ theme }) => ({
  width: '100%',
  maxWidth: 1000,
  height: 650,
  color: theme.palette.text.primary,
  display: 'grid',
  gridTemplateColumns: '1fr 1fr',
  borderRadius: 20,
  boxSizing: 'border-box',
  border: `1px solid ${theme.palette.divider}`,
  boxShadow: '0 8px 32px rgba(0,0,0,0.12), 0 1.5px 4px rgba(0,0,0,0.08)',
}));

const Footer = styled(Stack)(({ theme }) => ({
  position: 'absolute',
  bottom: 0,
  width: '100%',
  padding: theme.spacing(2),
}));

export const Layout: FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  if (isMobile) {
    return (
      <MobileWrapper>
        <Box>
          <Suspense fallback={<div>Loading...</div>}>
            <Outlet />
          </Suspense>
        </Box>
      </MobileWrapper>
    );
  }

  return (
    <Wrapper>
      <Container>
        <ContentWrapper>
          <Suspense fallback={<div>Loading...</div>}>
            <Outlet />
          </Suspense>
        </ContentWrapper>
        <WelcomeWrapper>
          <Welcome />
        </WelcomeWrapper>
      </Container>
    </Wrapper>
  );
};
