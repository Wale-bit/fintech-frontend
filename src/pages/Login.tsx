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
      <div className="hidden lg:flex hidden md:flex w-2/5 h-screen bg-[#0b0c0a] relative overflow-hidden">
  <svg
    viewBox="0 0 1440 800"
    xmlns="http://www.w3.org/2000/svg"
    preserveAspectRatio="none"
    className="absolute inset-0 w-full h-full object-cover opacity-80"
  >
    <defs>
      <linearGradient id="beamGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#1de372" />
        <stop offset="100%" stopColor="#e3ff1d" />
      </linearGradient>
    </defs>
    <g stroke="url(#beamGradient)" strokeWidth="0.5" fill="none">
      <path d="M0,600 Q360,400 720,600 T1440,600" />
      <path d="M0,550 Q360,350 720,550 T1440,550" />
      <path d="M0,500 Q360,300 720,500 T1440,500" />
      <path d="M0,450 Q360,250 720,450 T1440,450" />
      <path d="M0,400 Q360,200 720,400 T1440,400" />
      <path d="M0,350 Q360,150 720,350 T1440,350" />
      <path d="M0,300 Q360,100 720,300 T1440,300" />
    </g>
  </svg>

  <div className="z-10 p-12 flex flex-col justify-end text-white">
    <div className="mb-10">
      <div className="bg-yellow-400 text-black font-bold rounded-full w-8 h-8 flex items-center justify-center text-lg mb-4">
        B.
      </div>
      <h2 className="text-3xl font-semibold leading-tight">
        Unlock High Returns<br />
        with Collateralized<br />
        Equity Asset
      </h2>

      <ul className="mt-6 space-y-2 text-sm text-gray-300">
        <li className="flex items-center gap-2">
          <span>⚖️</span> Collateralized
        </li>
        <li className="flex items-center gap-2">
          <span>🔒</span> Secured
        </li>
        <li className="flex items-center gap-2">
          <span>🏛️</span> Licensed & Regulated
        </li>
      </ul>
    </div>
  </div>
</div>

      {/* Right Panel - Form */}
      <div className="w-1/2 flex items-center justify-center bg-white">
  <div className="w-full max-w-md px-6">
  <h2 className="text-3xl font-semibold text-gray-900 mb-2">Sign in to Beam.</h2>
    <p className="text-sm text-gray-500 mb-6">
      Please sign in with the your assigned login details
    </p>
          <form onSubmit={formik.handleSubmit}>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Email Address</label>
              <input
                type="email"
                name="email"
                placeholder="margnantistockbroker@"
                className="mt-1 block w-full rounded-md border border-gray-300 px-4 py-2 shadow-sm focus:border-black focus:ring-black"
                onChange={formik.handleChange}
                value={formik.values.email}
              />
              {formik.errors.email && <p className="text-red-500 text-sm mt-1">{formik.errors.email}</p>}
            </div>
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700">Password</label>
              <input
                type="password"
                name="password"
                placeholder="Password"
                className="mt-1 block w-full rounded-md border border-gray-300 px-4 py-2 shadow-sm focus:border-black focus:ring-black pr-10"
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
              className="w-full bg-black text-white py-2 rounded-full font-semibold hover:opacity-90 transition"
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