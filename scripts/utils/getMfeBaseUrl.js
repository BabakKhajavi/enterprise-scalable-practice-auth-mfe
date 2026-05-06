const APP_ENV = process.env.NODE_ENV ?? 'local';

const BASES = {
  'enterprise-scalable-practice-design-mfe': {
    local: 'http://localhost:9002',
    staging:
      'https://stage.app.enterprise.io/enterprise-scalable-practice-design-mfe',
    production:
      'https://app.enterprise.io/enterprise-scalable-practice-design-mfe',
  },
  'enterprise-scalable-practice-data-mfe': {
    local: 'http://localhost:9003',
    staging:
      'https://stage.app.enterprise.io/enterprise-scalable-practice-data-mfe',
    production:
      'https://app.enterprise.io/enterprise-scalable-practice-data-mfe',
  },
};

export function getMfeBaseUrl(name) {
  const env = APP_ENV === 'development' ? 'local' : APP_ENV;
  const map = BASES[name];
  if (!map) throw new Error(`Unknown MFE: ${name}`);
  return map[env];
}
