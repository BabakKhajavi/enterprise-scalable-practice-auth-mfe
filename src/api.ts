import {
  fetchBaseQuery,
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
} from '@reduxjs/toolkit/query';

const rawBaseQuery = fetchBaseQuery({
  baseUrl: 'https://api.example.com',
  prepareHeaders: (headers, { getState }) => {
    const state = getState() as { authReducer: { token: string } };
    const token = state.authReducer.token;
    if (token) {
      headers.set('Authorization', `Bearer ${token}`);
    }
    return headers;
  },
});

// 👇 Correctly type your wrapper as a BaseQueryFn
export const baseQuery: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  const result = await rawBaseQuery(args, api, extraOptions);

  if (
    (result as any)?.data?.errorMessage === 'Re-Login Required' ||
    (result as any)?.error?.data?.errorMessage === 'Re-Login Required'
  ) {
    localStorage.setItem('resetState', 'true');
    localStorage.removeItem('authState');
    window.location.href = '/login';
    return { error: { status: 401, data: 'Re-Login Required' } };
  }
  return result;
};
