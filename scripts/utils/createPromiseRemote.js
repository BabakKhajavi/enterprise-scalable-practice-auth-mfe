export function createPromiseRemote(globalName, url) {
  return `promise new Promise((resolve, reject) => {
    const remoteUrl = '${url}'.endsWith('/remoteEntry.js')
      ? '${url}'
      : '${url}/remoteEntry.js';
    const script = document.createElement('script');
    script.src = remoteUrl;
    script.type = 'text/javascript';
    script.async = true;

    script.onload = () => {
      if (!window['${globalName}']) {
        return reject(new Error('${globalName} container not found on window'));
      }
      const proxy = {
        get: (request) => window['${globalName}'].get(request),
        init: (arg) => {
          try { return window['${globalName}'].init(arg); }
          catch (e) { console.warn('${globalName} init failed', e); }
        },
      };
      resolve(proxy);
    };

    script.onerror = () => {
      reject(new Error('Failed to load remote: ' + remoteUrl));
    };

    document.head.appendChild(script);
  })`;
}
