import { useCallback, useEffect, useState } from 'react';
import {
  useLazyRegularSignUpQuery,
  useLazyRegularLoginQuery,
  useLazyVerifyOtpQuery,
  useLazyGetGoogleAuthUrlQuery,
} from 'enterprise_data/AuthApi';
import { auth$, authActions } from 'enterprise_data/Auth';

import { useNavigate } from 'react-router-dom';
import {
  AuthPaths,
  RegularLoginPayload,
  RegularSignUpPayload,
  User,
  VerifyGoogleSignInPayload,
  VerifyOtpPayload,
} from '../types';

export function useAuth() {
  const navigate = useNavigate();
  const [regularSignUp, regularSignUpState] = useLazyRegularSignUpQuery();
  const [regularLogin, regularLoginState] = useLazyRegularLoginQuery();
  const [verifyOtpFn, verifyOtpState] = useLazyVerifyOtpQuery();
  const [getGoogleAuthUrl, googleAuthUrlState] = useLazyGetGoogleAuthUrlQuery();

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

  const signUp = useCallback(
    async (payload: RegularSignUpPayload) => {
      try {
        const result = await regularSignUp(payload).unwrap();
        return result;
      } catch (error) {
        throw error;
      }
    },
    [regularSignUp],
  );

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

  const verifyGoogleSignIn = useCallback(
    async (payload: VerifyGoogleSignInPayload) => {
      try {
        authActions.login(payload.token, payload.user);
        console.log('navigate to dashboard after Google sign-in');
        navigate(AuthPaths.DASHBOARD, {
          state: null,
        });
      } catch (error) {
        throw error;
      }
    },
    [navigate],
  );

  const signupOrLoginWithGoogle = useCallback(async () => {
    try {
      const result = await getGoogleAuthUrl().unwrap();
      console.log('signupOrLoginWithGoogle result', result);
      window.location.href = result.url;
    } catch (error) {
      console.error('Error getting Google auth URL', error);
      navigate(AuthPaths.DASHBOARD, { state: null });
    }
  }, [getGoogleAuthUrl, navigate]);

  return {
    signUp,
    login,
    verifyOtp,
    signupOrLoginWithGoogle,
    verifyGoogleSignIn,
    authState,
    user: authState?.user as User,
    token: authState?.token,
    isLoadingRegularSignUp: regularSignUpState.isLoading,
    isLoadingRegularLogin: regularLoginState.isLoading,
    isLoadingVerifyOtp: verifyOtpState.isLoading,
    isLoadingGoogleAuthUrl: googleAuthUrlState.isLoading,
    errorRegularSignUp: regularSignUpState.error,
    errorRegularLogin: regularLoginState.error,
    errorVerifyOtp: verifyOtpState.error,
    errorGoogleAuthUrl: googleAuthUrlState.error,
  };
}
