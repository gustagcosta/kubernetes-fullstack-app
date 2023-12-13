export async function doRequest(method: string, url: string, auth: boolean, body?: object) {
  const headers: any = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  };

  if (auth) {
    const token = window.localStorage.getItem('TOKEN');
    headers.authorization = `Bearer ${token!}`;
  }

  try {
    const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}${url}`, {
      method: method.toUpperCase(),
      headers,
      body: JSON.stringify(body),
    });

    return response;
  } catch (error) {
    throw error;
  }
}
