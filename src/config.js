let baseUrl = 'http://localhost:5000/api';

if (window.location.host === 'screnr-admin-dev.falconweb.app') {
  baseUrl = 'https://screnr-api-dev.falconweb.app/api';
} else if (window.location.host === 'screnr-admin-qa.falconweb.app') {
  baseUrl = 'https://screnr-api-qa.falconweb.app/api';
} else if (window.location.host === 'screnr-admin-staging.falconweb.app') {
  baseUrl = 'https://screnr-api-staging.falconweb.app/api';
} else if (window.location.host === 'screnr-admin-prod.falconweb.app/') {
  baseUrl = 'https://screnr-api-prod.falconweb.app/api';
}

const getMediaUrl = (url) => {
  if (typeof url === 'string') {
    return baseUrl.replace('/api', '/') + url;
  }
  return URL.createObjectURL(url);
};

module.exports = { baseUrl, getMediaUrl };
