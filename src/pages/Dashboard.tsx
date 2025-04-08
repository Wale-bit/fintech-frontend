// src/pages/Dashboard.tsx
import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { getBalance, getTransactions } from '../services/api';
import TransactionTable from '../components/TransactionTable';
import { FundWalletModal } from '../components/WalletOperations';

const Dashboard = () => {
  const { token, logout } = useAuth();
  const navigate = useNavigate();
  const [balance, setBalance] = useState<number | null>(null);
  const [transactions, setTransactions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showFundModal, setShowFundModal] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // For mobile sidebar toggle

  useEffect(() => {
    if (!token) {
      navigate('/');
      return;
    }

    const fetchData = async () => {
      try {
        const [balanceRes, transactionsRes] = await Promise.all([
          getBalance(),
          getTransactions(),
        ]);
        setBalance(balanceRes.data.balance);
        setTransactions(transactionsRes.data);
      } catch (err: any) {
        console.error('Error fetching data:', err);
        setError(err.response?.data?.message || 'Failed to load data. Please try again later.');
        if (err.response?.status === 401) {
          logout();
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [token, navigate, logout]);
  

  if (loading) return <div className="text-center mt-10">Loading...</div>;
  if (error) return <div className="text-center mt-10 text-red-500">{error}</div>;

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-background-dark text-white p-6 transform transition-transform duration-300 ease-in-out md:static md:transform-none ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        }`}
      >
        <div className="flex flex-col h-full">
          <div>
            <div className="flex items-center mb-8">
              <div className="w-10 h-10 bg-primary-yellow rounded-full flex items-center justify-center text-black font-bold text-xl">
                B
              </div>
              <span className="ml-2 text-xl font-semibold">BEAM</span>
            </div>
            <nav>
              <h3 className="text-gray-400 text-sm mb-2">MAIN</h3>
              <ul>
                <li className="mb-4">
                  <Link to="/dashboard" className="flex items-center gap-2 text-gray-300 hover:text-white">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                    </svg>
                    Overview
                  </Link>
                </li>
                <li className="mb-4">
                  <Link to="/customers" className="flex items-center gap-2 text-gray-300 hover:text-white">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                    Customers
                  </Link>
                </li>
                <li className="mb-4">
                  <Link to="/spot-orders" className="flex items-center gap-2 text-gray-300 hover:text-white">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                    </svg>
                    Spot Orders
                  </Link>
                </li>
                <li className="mb-4">
                  <Link to="/margin-orders" className="flex items-center gap-2 text-gray-300 hover:text-white">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3-.895 3-2-1.343-2-3-2zm0 8c-2.209 0-4-1.791-4-4s1.791-4 4-4 4 1.791 4 4-1.791 4-4 4z" />
                    </svg>
                    Margin Orders
                  </Link>
                </li>
                <li className="mb-4">
                  <Link to="/transactions" className="flex items-center gap-2 text-gray-300 hover:text-white">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                    </svg>
                    Transactions
                  </Link>
                </li>
                <li className="mb-4">
                  <Link to="/dashboard" className="flex items-center gap-2 text-white font-semibold">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                    </svg>
                    Wallet
                  </Link>
                </li>
              </ul>
              <h3 className="text-gray-400 text-sm mb-2 mt-6">OTHERS</h3>
              <ul>
                <li className="mb-4">
                  <Link to="/notifications" className="flex items-center gap-2 text-gray-300 hover:text-white">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                    </svg>
                    Notification
                  </Link>
                </li>
                <li className="mb-4">
                  <Link to="/settings" className="flex items-center gap-2 text-gray-300 hover:text-white">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37 1 .608 2.296.07 2.572-1.065z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    Settings
                  </Link>
                </li>
                <li className="mb-4">
                  <button onClick={logout} className="flex items-center gap-2 text-gray-300 hover:text-white">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                    </svg>
                    Logout
                  </button>
                </li>
              </ul>
            </nav>
          </div>
          <div>
            <a href="https://support.beam.com" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-gray-300 hover:text-white mb-4">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Help
            </a>
            <div className="flex items-center gap-2 text-gray-300">
              <span>Switch to dark mode</span>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" />
                <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:bg-primary-yellow peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
              </label>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Sidebar Toggle Button */}
      <button
        className="md:hidden fixed top-4 left-4 z-50 p-2 bg-background-dark text-white rounded-lg"
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
        </svg>
      </button>

      {/* Main Content */}
      <div className="flex-1 bg-background-light p-6 md:ml-0">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-4">
            <h1 className="text-2xl font-bold">Wallet</h1>
            <div className="relative">
              <input
                type="text"
                placeholder="Search"
                className="pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-background-dark"
              />
              <svg className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center text-black font-bold">
              M
            </div>
            <span>Magnartis LTD</span>
            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>

        {/* Wallet and Transaction Sections */}
        <div className="flex flex-wrap gap-6">
  {/* Wallet Section */}
  <div className="flex-1 bg-white p-6 rounded-lg shadow">
    <h2 className="text-lg font-semibold mb-4">Actual Balance</h2>
    <p className="text-3xl font-bold mb-2">₦{balance?.toLocaleString() || '0.00'}</p>
    <p className="text-gray-500 flex items-center gap-2 mb-6">
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
      </svg>
      Wema Bank 010 210 202
    </p>
    <h2 className="text-lg font-semibold mb-4">Pending Amount</h2>
    <p className="text-3xl font-bold mb-6">₦0.00</p>
    <div className="flex flex-wrap gap-4">
      <button
        onClick={() => setShowFundModal(true)}
        className="bg-primary-yellow text-black px-4 py-2 rounded-lg hover:bg-[#FFD54F]"
      >
        Add Funds
      </button>
      <button
        onClick={() => navigate('/dashboard/transfer')}
        className="border border-gray-300 px-4 py-2 rounded-lg hover:bg-gray-100"
      >
        Withdraw
      </button>
      <button className="border border-gray-300 px-4 py-2 rounded-lg hover:bg-gray-100">
        PND Amount
      </button>
      <button className="border border-gray-300 px-4 py-2 rounded-lg hover:bg-gray-100">
        Place Lien
      </button>
      <button className="border border-gray-300 px-4 py-2 rounded-lg hover:bg-gray-100">
        Freeze Wallet
      </button>
    </div>
  </div>

  {/* Transaction History Section */}
  <div className="flex-1 bg-white p-6 rounded-lg shadow">
    <h2 className="text-lg font-semibold mb-4">Transaction History</h2>
    <TransactionTable transactions={transactions} />
  </div>
</div>
      </div>

      {/* Fund Wallet Modal */}
      {showFundModal && <FundWalletModal onClose={() => setShowFundModal(false)} />}
    </div>
  );
};

export default Dashboard;