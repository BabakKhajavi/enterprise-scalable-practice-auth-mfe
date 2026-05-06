export enum AuthPaths {
  ROOT = '/',
  LOGIN = '/login',
  VERIFY_OTP = '/verify-otp',
  GOOGLE_CALLBACK = '/google-callback',
  DASHBOARD = '/dashboard',
}

export enum APIMethods {
  POST = 'POST',
  GET = 'GET',
  PUT = 'PUT',
  DELETE = 'DELETE',
  PATCH = 'PATCH',
}

export interface User {
  userId: string; // uuid
  tenantId?: string | null; // fk
  notificationSettingId?: string | null; // fk
  firstName?: string | null;
  lastName?: string | null;
  email: string;
  role: AppRole;
  avatarUrl?: string | null;
  phone?: string | null;
  title?: string | null;
  timezone?: string | null;
  emailVerified: boolean;
  lastLoginAt?: Date | null;
  isDeleted: boolean;
  createdAt: number;
  modifiedAt?: number | null;
  deletedAt?: number | null;
  modifiedBy?: string | null;
}

export enum AppRole {
  SUPER_ADMIN = 'SUPER_ADMIN',
  ADMIN = 'ADMIN',
  BUSINESS_ADMIN = 'BUSINESS_ADMIN',
  BUSINESS_ASSISTANT = 'BUSINESS_ASSISTANT',
  AGENT = 'AGENT',
}

export interface RegularSignUpPayload {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  timezone: string;
}

export interface RegularLoginPayload {
  email: string;
}
export interface VerifyOtpPayload {
  email: string;
  otp: string;
}
export interface VerifyGoogleSignInPayload {
  token: string;
  user: User;
}
