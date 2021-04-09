const defaultParams = {
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
  body: {},
};

const Request = {
  get: (url, { headers } = defaultParams) =>
    fetch(url, {
      headers: {
        ...defaultParams.headers,
        ...headers,
      },
    })
      .then((response) => response.json())
      .catch((error) => {
        console.error('[GET]->[Error]', error);
      }),

  post: (url, { headers, body } = defaultParams) =>
    fetch(url, {
      method: 'POST',
      headers: {
        ...defaultParams.headers,
        ...headers,
      },
      body: JSON.stringify(body),
    })
      .then((response) => response.json())
      .catch((error) => {
        console.error('[POST]->[Error]', error);
      }),

  put: () => {},
  delete: () => {},
};

export default Request;
