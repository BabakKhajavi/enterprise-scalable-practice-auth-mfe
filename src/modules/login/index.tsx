import React, { useEffect } from 'react';
import { Box, Stack, Typography } from '@mui/material';
import {
  ContainedButton,
  Input,
  OptimizedImage,
  LinkButton,
} from 'enterprise_ui/atoms';
import { showToast } from 'enterprise_ui/molecules';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth, useBrand } from '../../hooks';
import { AuthPaths } from '../../types';

export default function Login() {
  const { brand, refreshBrand } = useBrand();
  const { goToSampleBrand } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const formik = useFormik({
    initialValues: {
      email: 'jane.doe@example.com',
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .trim()
        .email('Enter a valid email')
        .required('Email is required'),
    }),
    onSubmit: async (values) => {
      try {
        navigate(`${AuthPaths.VERIFY_OTP}`, {
          state: {
            email: values.email,
            source: 'login',
          },
        });
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
          disabled={formik.isSubmitting || !formik.isValid}
          loading={formik.isSubmitting}
        >
          Login
        </ContainedButton>
      </Box>
      <Typography variant="body2" sx={{ my: 3 }}>
        Sample Brands to test white labeling:
      </Typography>
      <Stack>
        <LinkButton
          onClick={() => {
            goToSampleBrand();
            refreshBrand();
          }}
        >
          Default Brand
        </LinkButton>
        <LinkButton
          onClick={() => {
            goToSampleBrand('companyA');
            refreshBrand('companyA');
          }}
        >
          Company A
        </LinkButton>
        <LinkButton
          onClick={() => {
            goToSampleBrand('companyB');
            refreshBrand('companyB');
          }}
        >
          Company B
        </LinkButton>
      </Stack>
    </Box>
  );
}
