import { useCallback, useEffect, useState } from 'react';

import { brand$, getCurrentBrand, setBrand } from 'enterprise_data/Brand';
import {
  useLazyGetBrandByTenantIdQuery,
  useLazyGetBrandBySlugQuery,
} from 'enterprise_data/BrandApi';

import { Brand } from '../types/brand';
import { useAuth } from './use-auth';

export const useBrand = () => {
  const { user } = useAuth();

  const [fetchBrandByTenantId] = useLazyGetBrandByTenantIdQuery();
  const [fetchBrandBySlug] = useLazyGetBrandBySlugQuery();

  const [brand, setBrandState] = useState<Brand | null>(() =>
    getCurrentBrand(),
  );

  useEffect(() => {
    const subscription = brand$.subscribe((nextBrand: Brand | null) => {
      setBrandState(nextBrand);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const refreshBrand = useCallback(
    async (slug?: string) => {
      try {
        const response = await fetchBrandBySlug(slug).unwrap();
        const brandData = 'data' in response ? response.data : response;
        setBrand(brandData);
        return brandData;
      } catch (error) {
        console.error('Error fetching brand config:', error);
        return null;
      }
    },
    [fetchBrandByTenantId, fetchBrandBySlug, user?.tenantId],
  );

  return {
    brand,
    refreshBrand,
  };
};
