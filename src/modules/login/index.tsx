import React, { useEffect } from 'react';
import { Box, Stack, Typography, styled } from '@mui/material';
import { ContainedButton, Input, OptimizedImage } from 'enterprise_ui/atoms';
import { showToast } from 'enterprise_ui/molecules';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth, useBrand } from '../../hooks';
import { AuthPaths } from '../../types';

const SocialButtonsWrapper = styled(Box)(({ theme }) => ({
  flexDirection: 'column',
  display: 'flex',
  gap: theme.spacing(2),
  background: theme.palette.background.default,
  color: theme.palette.text.primary,
}));
export default function Login() {
  const {
    login,
    signupOrLoginWithGoogle,
    isLoadingRegularLogin,
    isLoadingGoogleAuthUrl,
  } = useAuth();
  const { tenantTheme, getBrandConfig } = useBrand();
  const navigate = useNavigate();
  const location = useLocation();
  const formik = useFormik({
    initialValues: {
      email: '',
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .trim()
        .email('Enter a valid email')
        .required('Email is required'),
    }),
    onSubmit: async (values) => {
      try {
        const result = await login(values);
        if (result) {
          navigate(`${AuthPaths.VERIFY_OTP}`, {
            state: {
              email: values.email,
              source: 'login',
            },
          });
        }
      } catch (error: any) {
        showToast.error(
          error?.data?.message || 'Failed to login. Please try again.',
        );
      }
    },
  });
  useEffect(() => {
    if (location.state) {
      formik.setFieldValue('email', location.state.email);
    }
    const timer = setTimeout(() => {
      formik.validateForm();
    }, 200);
    return () => clearTimeout(timer);
  }, [location.state, location.state?.email]);
  console.log('Tenant theme in Login component:', tenantTheme?.logoUrl);
  return (
    <Box component="form" onSubmit={formik.handleSubmit} sx={{ p: 3 }}>
      <Box mb={1}>
        <OptimizedImage src={tenantTheme?.logoUrl} alt="Hero" height="60px" />
      </Box>
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        sx={{ mb: 4, mt: 2 }}
      >
        <Typography variant="h4" sx={{}}>
          Login
        </Typography>{' '}
      </Stack>
      <Box height={70}>
        <Input
          fullWidth
          id="email"
          name="email"
          label="Email"
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.email && Boolean(formik.errors.email)}
          helperText={formik.touched.email && formik.errors.email}
          sx={{ mb: 2 }}
        />
      </Box>
      <Box my={1}>
        <ContainedButton
          fullWidth
          type="submit"
          sx={{ mt: 1 }}
          disabled={
            formik.isSubmitting || isLoadingRegularLogin || !formik.isValid
          }
          loading={isLoadingRegularLogin}
        >
          Login
        </ContainedButton>
      </Box>
    </Box>
  );
}
