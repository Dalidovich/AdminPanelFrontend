import { API_BASE_URL,ENDPOINT_ACCOUNT,ENDPOINT_ACCOUNT_VALID } from '@config/api';

export const getAccounts = async (token: string): Promise<Response> => {
    const response = await fetch(
        `${API_BASE_URL}${ENDPOINT_ACCOUNT}`, {
        method: "GET",
        credentials: 'include',
        headers: { 
            'Authorization': `Bearer ${token}`
        }
    });

  return response;
};

export const deleteAccounts = async (token: string, deleteIds:string[]): Promise<Response> => {
    const response = await fetch(
        `${API_BASE_URL}${ENDPOINT_ACCOUNT}`, {
        method: "DELETE",
        credentials: 'include',
        headers: { 
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(deleteIds)
    });

  return response;
};

interface UpdateAccountStatusDTO{
  id: string;
  status: number;
}

export const updateAccountsStatus = async (token: string, UpdateAccountStatusDTO:UpdateAccountStatusDTO[]): Promise<Response> => {
    const response = await fetch(
        `${API_BASE_URL}${ENDPOINT_ACCOUNT}`, {
        method: "PUT",
        credentials: 'include',
        headers: { 
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(UpdateAccountStatusDTO)
    });

  return response;
};

export const updateLastActivityAccount = async (token: string, id: string): Promise<Response> => {
    const url = new URL(`${API_BASE_URL}${ENDPOINT_ACCOUNT}/${id}`);
    const now = new Date();
    const response = await fetch(url.toString(), {
        method: "PUT",
        credentials: 'include',
        headers: { 
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(now)
    });

  return response;
};

