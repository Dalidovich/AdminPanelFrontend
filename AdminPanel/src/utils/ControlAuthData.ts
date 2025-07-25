import { deleteCookie,setCookie } from './Cookies';

interface AuthData {
  jwtToken: string;
  accountId: string;
};

export const setAuthData= async ({ jwtToken, accountId }: AuthData) => 
{
  localStorage.setItem('jwtToken', jwtToken); 
  setCookie("accountId",accountId)
};

export const removeAuthData= async () => 
{
  localStorage.clear(); 
  deleteCookie("accountId")
};