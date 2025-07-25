import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { deleteAccounts, getAccounts, updateAccountsStatus, updateLastActivityAccount } from '../utils/api/account';
import {removeAuthData} from '../utils/ControlAuthData'
import { getCookie } from '../utils/Cookies';

import {
  FRONT_ENDPOINT_LOGIN
} from '@config/api';

import {} from '@config/api';

export const AccountsPage = () => {
  const [accounts, setAccounts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('jwtToken');
        const accountsResponse = await getAccounts(token)
        if(accountsResponse.status===401){
          removeAuthData();
          navigate(FRONT_ENDPOINT_LOGIN)
        }
        const accountsData = await accountsResponse.json();
        setAccounts(accountsData);
      }
      catch (err) {
        setError('Loading data Error');
        console.error(err);
      }
      finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">{error}</div>;

  // select all
  const handleSelectAll = (e) => {
    const isChecked = e.target.checked;
    setAccounts(accounts.map(account => ({
      ...account,
      selected: isChecked
    })));
  };

  // select one
  const handleSelectAccount = (accountId) => {
    setAccounts(accounts.map(account => 
      account.id === accountId 
        ? { ...account, selected: !account.selected } 
        : account
    ));
  };

  const deleteSelectedIds = async () => {
    const selectedIds = accounts
      .filter(account => account.selected)
      .map(account => account.id);
    
    console.log('Selected IDs:', selectedIds);    

    try {
        const token = localStorage.getItem('jwtToken');
        const deleteResponse = await deleteAccounts(token,selectedIds)
        if(deleteResponse.status===401){
          removeAuthData();
          navigate(FRONT_ENDPOINT_LOGIN)
        }
        window.location.reload();
      }
      catch (err) {
        setError('Loading data Error');
        console.error(err);
      }
      finally {
        setLoading(false);
      }
  };

  const updateStatusSelectedIds = async (status) => {
    const selectedIds = accounts
      .filter(account => account.selected)
      .map(account => ({
        id: account.id,
        newStatus: status}));
    
    try {
        const token = localStorage.getItem('jwtToken');
        const deleteResponse = await updateAccountsStatus(token,selectedIds)
        if(deleteResponse.status===401){
          removeAuthData();
          navigate(FRONT_ENDPOINT_LOGIN)
        }
        
        window.location.reload();
      }
      catch (err) {
        setError('Loading data Error');
        console.error(err);
      }
      finally {
        setLoading(false);
      }
  };

  const logOut = async ()=> {
      const ownId = getCookie("accountId");
      const token = localStorage.getItem('jwtToken');
      const a=await updateLastActivityAccount(token,ownId);
      removeAuthData();
      navigate(FRONT_ENDPOINT_LOGIN);
    }    
  
  
  return (
    <div className="accounts-table" data-bs-theme="dark">
      <div className="container mt-4">
        {/* toolbar */}
        <div className="d-flex  flex-wrap gap-1 justify-content-start mb-3">
          <button 
            className="btn btn-outline-light"
            onClick={() => updateStatusSelectedIds(1)}>
            <i className="bi bi-check-circle me-1">block</i>
          </button>

          <button 
            className="btn btn-outline-light"
            onClick={() => updateStatusSelectedIds(0)}>
            <i className="bi bi-slash-circle me-1">unlock</i>
          </button>

          <button 
            className="btn btn-outline-danger"
            onClick={deleteSelectedIds}>
            <i className="bi bi-trash me-1">delete</i>
          </button>
        </div>

        {/* table */}
        <div className="table-container">
          <div className="table-responsive">
            <table className="table align-middle mb-0">
              <thead>
                <tr>
                  <th>
                    <input 
                      type="checkbox" 
                      id="selectAll"
                      onChange={handleSelectAll}
                      checked={accounts.length > 0 && accounts.every(account => account.selected)}
                    />
                  </th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {accounts.map(account => (
                  <tr key={account.id} className={account.status === 1 ? 'blocked' : ''}>
                    <td>
                      <input 
                        type="checkbox" 
                        className="row-checkbox"
                        checked={account.selected || false}
                        onChange={() => handleSelectAccount(account.id)}
                      />
                    </td>
                    <td>{account.name}</td>
                    <td>{account.email}</td>
                    <td>
                      <span className={`status-indicator ${account.status === 0 ? 'bi bi-check-circle-fill me-1 text-success' : 'bi bi-slash-circle-fill me-1 text-danger'}`}>
                        {account.status === 0 ? 'Active' : 'Block'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <nav className="d-flex justify-content-end p-3">
        <button 
            className="btn btn-sm btn-outline-light"
            onClick={() => logOut()}>
            <i className="bi bi-check-circle me-1">log out</i>
          </button>
      </nav>
    </div>
  );
};