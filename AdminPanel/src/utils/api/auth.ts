import { API_BASE_URL, POST_ENDPOINT_AUTHENTICATE,POST_ENDPOINT_REGISTRATION } from '@config/api';

interface LoginParams {
  email: string;
  password: string;
}

export const authenticate = async ({ email, password }: LoginParams): Promise<Response> => {
  const url = `${API_BASE_URL}${POST_ENDPOINT_AUTHENTICATE}`;

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email,
      password
    })
  });
  
  if (!response.ok) {
    throw new Error('Authorization Error');
  }

  return response;
};

interface RegistrateParams {
  name: string;
  email: string;
  password: string;
}
export const registration = async ({ name, email, password }: RegistrateParams): Promise<Response> => {
  const url = `${API_BASE_URL}${POST_ENDPOINT_REGISTRATION}`;

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name,
      email,
      password
    })
  });
  
  if (!response.ok) {
    throw new Error('Authorization Error');
  }

  return response;
};