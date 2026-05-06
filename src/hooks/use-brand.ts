import React, { useCallback, useEffect, useState } from 'react';
import {
  useLazyGetBrandByIdQuery,
  useLazyGetBrandBySlugQuery,
} from 'enterprise_data/BrandApi';
import { useAuth } from './use-auth';
import { Brand } from '../types/brand';
import { useLocation } from 'react-router-dom';

export function useBrand() {
  const { user } = useAuth();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const slug = queryParams.get('slug');
  const [fetchBrandConfig] = useLazyGetBrandByIdQuery();
  const [fetchBrandBySlug] = useLazyGetBrandBySlugQuery();
  const [tenantTheme, setTenantTheme] = useState<Brand | undefined>(undefined);

  const fetchBrand = useCallback(async () => {
    console.log('Fetching brand config for:', user?.tenantId);
    try {
      if (user?.tenantId) {
        const { data } = await fetchBrandConfig(user?.tenantId).unwrap();
        localStorage.setItem('tenantBrand', JSON.stringify(data));
        setTenantTheme(data);
      } else if (slug) {
        const { data } = await fetchBrandBySlug(slug).unwrap();
        localStorage.setItem('tenantBrand', JSON.stringify(data));
        setTenantTheme(data);
      } else {
        setTenantTheme(undefined);
        localStorage.removeItem('tenantBrand');
      }
    } catch (error) {
      console.error('Error fetching brand config:', error);
    }
  }, [fetchBrandConfig, user?.tenantId]);

  useEffect(() => {
    if (!tenantTheme) {
      fetchBrand();
    }
  }, [fetchBrand, user?.tenantId, tenantTheme]);

  return { tenantTheme, getBrandConfig: fetchBrand };
}
