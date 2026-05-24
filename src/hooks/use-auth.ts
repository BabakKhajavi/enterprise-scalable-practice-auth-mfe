import { useCallback, useEffect, useState } from 'react';
import {
  useRegularLoginMutation,
  useVerifyOtpMutation,
} from 'enterprise_data/AuthApi';
import { auth$, authActions } from 'enterprise_data/Auth';

import { useNavigate } from 'react-router-dom';
import {
  AuthPaths,
  RegularLoginPayload,
  User,
  VerifyOtpPayload,
} from '../types';

export function useAuth() {
  const navigate = useNavigate();
  const [regularLogin, regularLoginState] = useRegularLoginMutation();
  const [verifyOtpFn, verifyOtpState] = useVerifyOtpMutation();

  // Local state for auth
  const [authState, setAuthState] = useState<{
    user: User;
    token: string;
  } | null>(() => {
    let value: { user: User; token: string } | null = null;
    auth$.subscribe((v: any) => (value = v)).unsubscribe();
    return value;
  });

  // Subscribe to auth$ updates
  useEffect(() => {
    const subscription = auth$.subscribe(setAuthState);
    return () => subscription.unsubscribe();
  }, []);

  const login = useCallback(
    async (payload: RegularLoginPayload) => {
      try {
        const result = await regularLogin(payload).unwrap();
        return result;
      } catch (error) {
        throw error;
      }
    },
    [regularLogin],
  );

  const verifyOtp = useCallback(
    async (payload: VerifyOtpPayload) => {
      try {
        const result = await verifyOtpFn(payload).unwrap();
        console.log('OTP verification successful, result:', result);
        authActions.login(result.token, result.user);
        navigate(AuthPaths.DASHBOARD, {
          state: null,
        });
      } catch (error) {
        throw error;
      }
    },
    [verifyOtpFn, navigate],
  );

  const goToSampleBrand = (slug?: string) => {
    navigate(
      {
        pathname: AuthPaths.LOGIN,
        search: slug ? `?slug=${slug}` : '',
      },
      { state: null },
    );
  };

  return {
    login,
    verifyOtp,
    goToSampleBrand,
    user: authState?.user as User,
    isLoadingRegularLogin: regularLoginState.isLoading,
    isLoadingVerifyOtp: verifyOtpState.isLoading,
    errorRegularLogin: regularLoginState.error,
    errorVerifyOtp: verifyOtpState.error,
  };
}
