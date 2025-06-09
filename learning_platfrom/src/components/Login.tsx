// import React, { useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { useNavigate } from 'react-router';
// import type { AppDispatch, RootState } from '../states/store';
// import { loginUser } from '../states/authSlice';
// import { Typography } from '@mui/material';

// const Login= () => {

//   const dispatch = useDispatch<AppDispatch>();
//   const { loading, error } = useSelector((s:RootState) => s.auth);
//   const navigate = useNavigate();
//   const [form, setForm] = useState({ name: '', phone: '' });

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
//     setForm({ ...form, [e.target.name]: e.target.value });

//   const handleSubmit = async () => {
//     if (!form.name || !form.phone)
//         return alert('יש למלא את כל השדות');
//     const res = await dispatch(loginUser(form));
//     if (res.meta.requestStatus === 'fulfilled') navigate('/');
//   };

//   return (
//     <div className="max-w-md mx-auto p-4 bg-white dark:bg-gray-800 rounded">
//       <h2 className="text-xl mb-4">התחברות</h2>
//       <input name="name" type="text" placeholder="שם" value={form.name} onChange={handleChange} className="input" />
//       <input name="phone" type="text" placeholder="טלפון" value={form.phone} onChange={handleChange} className="input" />
//       <button onClick={handleSubmit} disabled={loading} className="btn">
//         {loading ? 'טוען...' : 'התחבר'}
//       </button>
      
//     </div>
//   );
// };

// export default Login;



import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import type { AppDispatch, RootState } from '../states/store';
import { loginUser, registerUser } from '../states/authSlice';

const LoginRegister: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { loading, error } = useSelector((s: RootState) => s.auth);
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [form, setForm] = useState({ name: '', phone: '' });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async () => {
    if (!form.name || !form.phone)
      return alert('יש למלא את כל השדות');

    const action = isLogin ? loginUser : registerUser;
    const res = await dispatch(action(form));

    if (res.meta.requestStatus === 'fulfilled') {
      navigate(isLogin ? '/' : '/HomePage');
    }
  };

  return (
    <div className="max-w-md mx-auto p-4 bg-white dark:bg-gray-800 rounded shadow-md">
      <h2 className="text-xl mb-4 font-semibold text-center">
        {isLogin ? 'התחברות' : 'הרשמה'}
      </h2>
      <input
        name="name"
        type="text"
        placeholder="שם"
        value={form.name}
        onChange={handleChange}
        className="input mb-2 w-full p-2 border rounded"
      />
      <input
        name="phone"
        type="text"
        placeholder="טלפון"
        value={form.phone}
        onChange={handleChange}
        className="input mb-2 w-full p-2 border rounded"
      />
      <button
        onClick={handleSubmit}
        disabled={loading}
        className="btn w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
      >
        {loading ? 'טוען...' : isLogin ? 'התחבר' : 'הירשם'}
      </button>
      {/* {error && <p className="text-red-600 mt-2 text-center">{error}</p>} */}

      <p className="mt-4 text-sm text-center">
        {isLogin ? 'אין לך חשבון?' : 'כבר יש לך חשבון?'}{' '}
        <button
          onClick={() => setIsLogin(!isLogin)}
          className="text-blue-600 hover:underline"
        >
          {isLogin ? 'הירשם כאן' : 'התחבר כאן'}
        </button>
      </p>
    </div>
  );
};

export default LoginRegister;
