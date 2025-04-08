// src/pages/Register.tsx
import { useNavigate, Link } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { register } from '../services/api';

const Register = () => {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: { name: '', email: '', password: '' },
    validationSchema: Yup.object({
      name: Yup.string().required('Required'),
      email: Yup.string().email('Invalid email').required('Required'),
      password: Yup.string().min(6, 'Must be at least 6 characters').required('Required'),
    }),
    onSubmit: async (values, { setSubmitting, setErrors }) => {
      try {
        await register(values);
        navigate('/login'); // Redirect to login page after successful registration
      } catch (error: any) {
        setErrors({ email: error.response?.data?.message || 'Registration failed' });
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <div className="min-h-screen flex">
  {/* Left Panel */}
  <div className="hidden md:flex w-2/5 bg-gradient-to-br from-background-#0C110D to-[#2A3A3B] text-white p-10 flex-col justify-between">
    <div className="flex flex-col gap-4">
      <div className="flex items-center mb-8">
        <div className="w-10 h-10 bg-primary-yellow rounded-full flex items-center justify-center text-black font-bold text-xl">
          B
        </div>
        <span className="ml-2 text-xl font-semibold">BEAM</span>
      </div>
      <h1 className="text-3xl font-bold">Unlock High Returns with Collateralized Equity Asset</h1>
    </div>
    <div className="flex flex-col gap-4">
      <span className="flex items-center gap-2">
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
        </svg>
        Collateralized
      </span>
      <span className="flex items-center gap-2">
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
        </svg>
        Secured
      </span>
      <span className="flex items-center gap-2">
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
        </svg>
        Licensed & regulated
      </span>
        </div>
      </div>

      {/* Right Panel - Form */}
      <div className="w-full md:w-3/5 flex items-center justify-center bg-white p-10">
        <div className="w-full max-w-md">
          <h2 className="text-3xl font-bold mb-2">Create an Account</h2>
          <p className="text-gray-500 mb-6">Join Beam to start investing today</p>
          <form onSubmit={formik.handleSubmit}>
            <div className="mb-4">
              <label className="block text-gray-700 mb-1">Full Name</label>
              <input
                type="text"
                name="name"
                placeholder="John Doe"
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-background-dark"
                onChange={formik.handleChange}
                value={formik.values.name}
              />
              {formik.errors.name && <p className="text-red-500 text-sm mt-1">{formik.errors.name}</p>}
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-1">Email Address</label>
              <input
                type="email"
                name="email"
                placeholder="john.doe@example.com"
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-background-dark"
                onChange={formik.handleChange}
                value={formik.values.email}
              />
              {formik.errors.email && <p className="text-red-500 text-sm mt-1">{formik.errors.email}</p>}
            </div>
            <div className="mb-6">
              <label className="block text-gray-700 mb-1">Password</label>
              <input
                type="password"
                name="password"
                placeholder="Password"
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-background-dark"
                onChange={formik.handleChange}
                value={formik.values.password}
              />
              {formik.errors.password && <p className="text-red-500 text-sm mt-1">{formik.errors.password}</p>}
            </div>
            <button
              type="submit"
              className="w-full bg-background-dark text-white p-3 rounded-lg hover:bg-[#2A3A3B]"
              disabled={formik.isSubmitting}
            >
              {formik.isSubmitting ? 'Registering...' : 'Register'}
            </button>
          </form>
          <p className="text-gray-500 mt-4 text-center">
            Already have an account?{' '}
            <Link to="/login" className="text-blue-500">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;