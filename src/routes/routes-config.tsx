import React, { lazy } from 'react';
import { RouteObject } from 'react-router-dom';
import { AuthPaths } from '../types';
import { Layout } from '../modules';

const Login = lazy(() => import('../modules/login'));
const VerifyOtp = lazy(() => import('../modules/verify-otp'));

export const routes: RouteObject[] = [
  {
    path: AuthPaths.ROOT,
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Login />,
      },
      {
        path: AuthPaths.VERIFY_OTP,
        element: <VerifyOtp />,
      },
    ],
  },
];
