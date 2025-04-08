// src/components/WalletOperations.tsx
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { fundWallet, transfer } from '../services/api';
import { useState } from 'react';

interface FundWalletModalProps {
  onClose: () => void;
}

const FundWalletModal = ({ onClose }: FundWalletModalProps) => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [selectedMethod, setSelectedMethod] = useState<string | null>(null);

  const formik = useFormik({
    initialValues: { amount: 0, cardNumber: '', expiry: '', cvv: '' },
    validationSchema: Yup.object({
      amount: Yup.number().min(1, 'Minimum ₦1').required('Required'),
      cardNumber: Yup.string().when('step', {
        is: 2,
        then: (schema) => schema.required('Required'),
        otherwise: (schema) => schema,
      }),
      expiry: Yup.string().when('step', {
        is: 2,
        then: (schema) => schema.required('Required'),
        otherwise: (schema) => schema,
      }),
      cvv: Yup.string().when('step', {
        is: 2,
        then: (schema) => schema.required('Required'),
        otherwise: (schema) => schema,
      }),
    }),
    onSubmit: async (values, { setSubmitting, setErrors }) => {
      try {
        if (step === 1) {
          setStep(2);
        } else {
          await fundWallet({ amount: values.amount });
          navigate('/dashboard');
        }
      } catch (error: any) {
        setErrors({ amount: error.response?.data?.message || 'Funding failed' });
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">
            {step === 1 ? 'Payment Option' : 'Payment details'}
          </h2>
          <button onClick={onClose} className="text-gray-500">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        {step === 1 ? (
          <div>
            <p className="text-gray-500 mb-4">Please confirm the margin details</p>
            <button
              onClick={() => setSelectedMethod('bank')}
              className={`w-full p-3 border rounded-lg flex items-center gap-2 mb-2 ${
                selectedMethod === 'bank' ? 'border-blue-500' : ''
              }`}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
              </svg>
              Bank Transfer
              {selectedMethod === 'bank' && (
                <svg className="w-5 h-5 ml-auto text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
              )}
            </button>
            <button
              onClick={() => setSelectedMethod('card')}
              className={`w-full p-3 border rounded-lg flex items-center gap-2 mb-2 ${
                selectedMethod === 'card' ? 'border-blue-500' : ''
              }`}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
              </svg>
              Add Debit/Credit Card
              {selectedMethod === 'card' && (
                <svg className="w-5 h-5 ml-auto text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
              )}
            </button>
            <button
              onClick={() => setSelectedMethod('other')}
              className={`w-full p-3 border rounded-lg flex items-center gap-2 ${
                selectedMethod === 'other' ? 'border-blue-500' : ''
              }`}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
              </svg>
              Add Payment Method
              {selectedMethod === 'other' && (
                <svg className="w-5 h-5 ml-auto text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
              )}
            </button>
            <button
              onClick={() => setStep(2)}
              className="w-full bg-primary-yellow text-black p-3 rounded-lg mt-4 hover:bg-[#FFD54F]"
              disabled={!selectedMethod}
            >
              Continue
            </button>
          </div>
        ) : (
          <form onSubmit={formik.handleSubmit}>
            <p className="text-gray-500 mb-4">Please confirm the margin details</p>
            <div className="mb-4">
              <label className="block text-gray-700 mb-1">Card details</label>
              <input
                type="text"
                name="cardNumber"
                placeholder="5399"
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-background-dark"
                onChange={formik.handleChange}
                value={formik.values.cardNumber}
              />
              {formik.errors.cardNumber && <p className="text-red-500 text-sm mt-1">{formik.errors.cardNumber}</p>}
            </div>
            <div className="flex gap-4 mb-4">
              <div className="flex-1">
                <label className="block text-gray-700 mb-1">Expiry date</label>
                <input
                  type="text"
                  name="expiry"
                  placeholder="DD/MM/YY"
                  className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-background-dark"
                  onChange={formik.handleChange}
                  value={formik.values.expiry}
                />
                {formik.errors.expiry && <p className="text-red-500 text-sm mt-1">{formik.errors.expiry}</p>}
              </div>
              <div className="flex-1">
                <label className="block text-gray-700 mb-1">CVV</label>
                <input
                  type="text"
                  name="cvv"
                  placeholder="546"
                  className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-background-dark"
                  onChange={formik.handleChange}
                  value={formik.values.cvv}
                />
                {formik.errors.cvv && <p className="text-red-500 text-sm mt-1">{formik.errors.cvv}</p>}
              </div>
            </div>
            <button
              type="submit"
              className="w-full bg-primary-yellow text-black p-3 rounded-lg hover:bg-[#FFD54F]"
              disabled={formik.isSubmitting}
            >
              {formik.isSubmitting ? 'Processing...' : 'Pay Now'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

// Transfer Component
const Transfer = () => {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: { receiverId: 0, amount: 0, note: '' },
    validationSchema: Yup.object({
      receiverId: Yup.number().min(1, 'Invalid ID').required('Required'),
      amount: Yup.number().min(1, 'Minimum ₦1').required('Required'),
      note: Yup.string(),
    }),
    onSubmit: async (values, { setSubmitting, setErrors }) => {
      try {
        await transfer({ amount: values.amount, receiverId: values.receiverId });
        navigate('/dashboard');
      } catch (error: any) {
        setErrors({ amount: error.response?.data?.message || 'Transfer failed' });
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <div className="min-h-screen flex items-center justify-center bg-background-light">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Transfer</h2>
        <form onSubmit={formik.handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 mb-1">Recipient ID</label>
            <input
              type="number"
              name="receiverId"
              placeholder="Recipient ID"
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-background-dark"
              onChange={formik.handleChange}
              value={formik.values.receiverId}
            />
            {formik.errors.receiverId && <p className="text-red-500 text-sm mt-1">{formik.errors.receiverId}</p>}
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-1">Amount</label>
            <input
              type="number"
              name="amount"
              placeholder="Amount"
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-background-dark"
              onChange={formik.handleChange}
              value={formik.values.amount}
            />
            {formik.errors.amount && <p className="text-red-500 text-sm mt-1">{formik.errors.amount}</p>}
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 mb-1">Optional Note</label>
            <input
              type="text"
              name="note"
              placeholder="Optional Note"
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-background-dark"
              onChange={formik.handleChange}
              value={formik.values.note}
            />
          </div>
          <button
            type="submit"
            className="w-full bg-background-dark text-white p-3 rounded-lg hover:bg-[#2A3A3B]"
            disabled={formik.isSubmitting}
          >
            {formik.isSubmitting ? 'Transferring...' : 'Transfer'}
          </button>
        </form>
      </div>
    </div>
  );
};

export { FundWalletModal, Transfer };