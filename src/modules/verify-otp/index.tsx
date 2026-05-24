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
  const { verifyOtp, isLoadingVerifyOtp, goToSampleBrand } = useAuth();
  const { brand, refreshBrand } = useBrand();
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
      otp: '123456',
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
    let path: string = AuthPaths.LOGIN;
    if (brand?.slug && brand?.slug !== 'default') {
      path = `${AuthPaths.LOGIN}?slug=${brand.slug}`;
    }
    navigate(path, { state: location.state });
  };

  return (
    <Box component="form" onSubmit={formik.handleSubmit} sx={{ p: 3 }}>
      <Box mb={1}>
        <OptimizedImage src={brand?.logoUrl} alt="Hero" height="60px" />
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
      <Typography variant="body2" sx={{ my: 3 }}>
        Sample Brands to test white labeling:
      </Typography>
      <Stack>
        <LinkButton
          onClick={() => {
            goToSampleBrand();
            refreshBrand();
          }}
          color="error"
        >
          Default Brand
        </LinkButton>
        <LinkButton
          onClick={() => {
            goToSampleBrand('companyA');
            refreshBrand('companyA');
          }}
          color="error"
        >
          Company A
        </LinkButton>
        <LinkButton
          onClick={() => {
            goToSampleBrand('companyB');
            refreshBrand('companyB');
          }}
          color="error"
        >
          Company B
        </LinkButton>
      </Stack>
    </Box>
  );
}
