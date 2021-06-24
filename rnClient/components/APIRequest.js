export default function APIRequest(url, method, body, token) {
    return fetch(url, {
      method: method,
      body: JSON.stringify({
            body
                            }),
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },

    });
  }