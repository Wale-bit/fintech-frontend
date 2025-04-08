import { format } from 'date-fns';
import { useState } from 'react';

interface Transaction {
  id: number;
  userId: number;
  amount: number;
  type: string;
  status?: string;
  senderEmail: string;
  receiverEmail: string | null;
  createdAt: string;
}

interface TransactionTableProps {
  transactions: Transaction[];
}

const TransactionTable = ({ transactions }: TransactionTableProps) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;
  const totalPages = Math.ceil(transactions.length / itemsPerPage);

  const paginatedTransactions = transactions.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="w-2/3 bg-white rounded-md border p-6 shadow-sm overflow-x-auto">
        <h2 className="text-lg font-semibold mb-4">Transaction History</h2>
        <div className="flex space-x-2 mb-4">
          <span className="px-3 py-1 bg-gray-100 rounded-full text-sm">{transactions.length}</span>
          <button className="border border-gray-300 px-3 py-1 rounded-lg text-sm hover:bg-gray-100">
            Pending
          </button>
          <button className="border border-gray-300 px-3 py-1 rounded-lg text-sm hover:bg-gray-100">
            History
          </button>
          <button className="border border-gray-300 px-3 py-1 rounded-lg text-sm hover:bg-gray-100">
            Filter by: Spot
            <svg className="w-4 h-4 inline ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
            </svg>
          </button>
        </div>
      
      
        <table className="w-full text-left">
          <thead>
            <tr className="border-b">
              <th className="py-3 px-4 text-sm font-medium text-gray-600">Transaction ID</th>
              <th className="py-3 px-4 text-sm font-medium text-gray-600">Transaction Type</th>
              <th className="py-3 px-4 text-sm font-medium text-gray-600">Amount (₦)</th>
              <th className="py-3 px-4 text-sm font-medium text-gray-600">Status</th>
              <th className="py-3 px-4 text-sm font-medium text-gray-600">Date</th>
              <th className="py-3 px-4 text-sm font-medium text-gray-600">Action</th>
            </tr>
          </thead>
          <tbody>
            {paginatedTransactions.map((transaction) => (
              <tr key={transaction.id} className="border-b hover:bg-gray-50">
                <td className="py-3 px-4 text-sm">TXN00{transaction.id}</td>
                <td className="py-3 px-4 text-sm">{transaction.type}</td>
                <td className="py-3 px-4 text-sm">₦{transaction.amount.toLocaleString()}</td>
                <td className="py-3 px-4 text-sm">
                  <span className="inline-flex items-center space-x-1">
                    <span
                      className={`w-2 h-2 rounded-full ${
                        transaction.status === 'Liquidated' ? 'bg-yellow-500' : 'bg-green-500'
                      }`}
                    ></span>
                    {transaction.status || 'Approved'}
                  </span>
                </td>
                <td className="py-3 px-4 text-sm">
                  {format(new Date(transaction.createdAt), 'yyyy-MM-dd')}
                </td>
                <td className="py-3 px-4 text-sm">
                  <button className="text-blue-600 hover:underline">View</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      
      <div className="flex items-center justify-between mt-4 text-sm">
        
          <span className="text-sm text-gray-600">
            Page {currentPage} of {totalPages}
          </span>
          <div className="flex space-x-1">
            <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="px-3 py-1 border rounded-lg disabled:opacity-50"
          >
            {'<'}
          </button>
          {[1, 2, 3, 4, 5].map((page) => (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              className={`px-3 py-1 rounded-lg ${
                currentPage === page ? 'bg-primary-yellow text-black' : 'border'
              }`}
            >
              {page}
            </button>
          ))}
          <button
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="px-3 py-1 border rounded-lg disabled:opacity-50"
          >
            {'>'}
          </button>
          </div>
          
        
      </div>
    </div>
  );
};

export default TransactionTable;