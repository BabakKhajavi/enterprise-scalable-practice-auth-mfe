import React, { useEffect, useState } from 'react';
import { Box, Divider, Stack, Typography, styled } from '@mui/material';
import {
  ContainedButton,
  LinkButton,
  OptimizedImage,
  Input,
} from 'enterprise_ui/atoms';
import { showToast } from 'enterprise_ui/molecules';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useLocation, useNavigate } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';
import { useAuth, useBrand } from '../../hooks';
import { AuthPaths } from '../../types';
export default function VerifyOtp() {
  const navigate = useNavigate();
  const { login, verifyOtp, isLoadingVerifyOtp } = useAuth();
  const { tenantTheme } = useBrand();
  const [emailForOtp, setEmailForOtp] = useState<string>('');
  const [otpAvailableIn, setOtpAvailableIn] = useState(30);
  const location = useLocation();

  useEffect(() => {
    if (location.state?.email) {
      setEmailForOtp(location.state.email);
    }
  }, [location.state?.email]);

  const formik = useFormik({
    initialValues: {
      email: '',
      otp: '',
    },
    validationSchema: Yup.object({
      otp: Yup.string()
        .min(6, 'OTP must be 6 digits')
        .trim()
        .required('OTP is required'),
    }),
    onSubmit: async (values) => {
      try {
        await verifyOtp(values);
      } catch (error: any) {
        showToast.error(
          error?.data?.message || 'Failed to verify OTP. Please try again.',
        );
      }
    },
  });
  useEffect(() => {
    if (emailForOtp) {
      formik.setFieldValue('email', emailForOtp);
    }
  }, [emailForOtp]);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (otpAvailableIn > 0) {
        setOtpAvailableIn((prev) => prev - 1);
      }
    }, 1000);
    return () => clearTimeout(timer);
  }, [otpAvailableIn]);

  const handleBackToLogin = () => {
    const selectedSource = location.state?.source || 'login';
    navigate(
      `${selectedSource === 'signup' ? AuthPaths.ROOT : AuthPaths.LOGIN}`,
      { state: location.state },
    );
  };
  const handleResendOtp = async () => {
    await login({ email: emailForOtp });
  };
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
          Verify OTP
        </Typography>
        <LinkButton
          icon={<ChevronLeft size={16} />}
          onClick={handleBackToLogin}
        >
          Back
        </LinkButton>
      </Stack>
      <Box height={70}>
        <Input
          fullWidth
          id="otp"
          name="otp"
          label="OTP"
          placeholder="Enter 6-digit code"
          value={formik.values.otp}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            const value = e.target.value.replace(/\D/g, '').slice(0, 6);
            formik.setFieldValue('otp', value);
          }}
          onBlur={formik.handleBlur}
          error={formik.touched.otp && Boolean(formik.errors.otp)}
          helperText={formik.touched.otp && formik.errors.otp}
          inputProps={{
            maxLength: 6,
            style: { letterSpacing: '0.3em', textAlign: 'center' },
          }}
        />
      </Box>
      <Box my={1}>
        <ContainedButton
          fullWidth
          type="submit"
          sx={{ mt: 2 }}
          disabled={
            formik.isSubmitting || isLoadingVerifyOtp || !formik.isValid
          }
          loading={isLoadingVerifyOtp}
        >
          Verify OTP
        </ContainedButton>
      </Box>
      <Divider sx={{ my: 3 }} />
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        sx={{ mb: 8 }}
        spacing={1}
      >
        <Typography
          variant="caption"
          sx={{ color: (theme) => theme.palette.secondary.main }}
        >
          Resent otp in
          <Typography
            display="inline"
            sx={{
              fontWeight: 'bold',
              mx: 0.5,
              fontSize: 12,
            }}
          >
            {otpAvailableIn}
          </Typography>
          seconds
        </Typography>
        <LinkButton
          onClick={handleResendOtp}
          sx={{ fontSize: 12 }}
          disabled={otpAvailableIn > 0}
        >
          Resend Otp
        </LinkButton>
      </Stack>

      <Stack
        direction="row"
        alignItems="center"
        justifyContent="center"
        sx={{ mb: 3 }}
        spacing={0.5}
      >
        <Typography variant="caption" sx={{}}>
          Don't have an account? sign up
        </Typography>
        <LinkButton onClick={handleBackToLogin} sx={{ fontSize: 12 }}>
          here
        </LinkButton>
      </Stack>
    </Box>
  );
}
