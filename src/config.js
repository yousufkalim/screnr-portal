let baseUrl = 'http://localhost:5000/api/v1';

if (window.location.host === 'screnr-admin-dev.falconweb.app') {
  baseUrl = 'https://screnr-api-dev.falconweb.app/api/v1';
} else if (window.location.host === 'screnr-admin-qa.falconweb.app') {
  baseUrl = 'https://screnr-api-qa.falconweb.app/api/v1';
} else if (window.location.host === 'screnr-admin-staging.falconweb.app') {
  baseUrl = 'https://screnr-api-staging.falconweb.app/api/v1';
} else if (window.location.host === 'screnr-admin-prod.falconweb.app/') {
  baseUrl = 'https://screnr-api-prod.falconweb.app/api/v1';
}

const getMediaUrl = (url) => {
  if (typeof url === 'string') {
    return baseUrl.replace('/api/v1', '/') + url;
  }
  return URL.createObjectURL(url);
};

module.exports = { baseUrl, getMediaUrl };
