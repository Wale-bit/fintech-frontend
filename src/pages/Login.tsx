// src/pages/Login.tsx
import { useNavigate, Link } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { login } from '../services/api';
import { useAuth } from '../contexts/AuthContext';

const Login = () => {
  const navigate = useNavigate();
  const { login: setToken } = useAuth();

  const formik = useFormik({
    initialValues: { email: '', password: '' },
    validationSchema: Yup.object({
      email: Yup.string().email('Invalid email').required('Required'),
      password: Yup.string().required('Required'),
    }),
    onSubmit: async (values, { setSubmitting, setErrors }) => {
      try {
        const response = await login(values);
        setToken(response.data.access_token);
        navigate('/dashboard');
      } catch (error: any) {
        setErrors({ email: error.response?.data?.message || 'Login failed' }); // Updated error message
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <div className="min-h-screen flex">
      {/* Left Panel */}
      <div className="hidden md:flex w-2/5 bg-gradient-to-br from-background-#0C110D to-[#2A3A3B] text-white p-10 flex-col justify-between">
        <div>
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
          <h2 className="text-3xl font-bold mb-2">Sign in to Beam.</h2>
          <p className="text-gray-500 mb-6">Please sign in with your assigned login details</p>
          <form onSubmit={formik.handleSubmit}>
            <div className="mb-4">
              <label className="block text-gray-700 mb-1">Email Address</label>
              <input
                type="email"
                name="email"
                placeholder="margnantistockbroker@"
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
              <Link to="/forgot-password" className="text-blue-500 text-sm mt-2 inline-block">
                Forgot password?
              </Link>
            </div>
            <button
              type="submit"
              className="w-full bg-background-dark text-white p-3 rounded-lg hover:bg-[#2A3A3B]"
              disabled={formik.isSubmitting}
            >
              {formik.isSubmitting ? 'Logging in...' : 'Log in'}
            </button>
          </form>
          <p className="text-gray-500 mt-4 text-center">
            Don’t have an account?{' '}
            <Link to="/" className="text-blue-500">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;