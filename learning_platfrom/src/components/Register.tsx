// import React, { useState } from 'react';
// import { useNavigate } from 'react-router';
// import { useDispatch, useSelector } from 'react-redux';
// import type { AppDispatch, RootState } from '../states/store';
// import { registerUser } from '../states/authSlice';

// const Register: React.FC = () => {
//   const dispatch = useDispatch<AppDispatch>();
//   const { loading, error } = useSelector((s:RootState) => s.auth);
//   const navigate = useNavigate();
//   const [form, setForm] = useState({ name: '', phone: '' });

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
//     setForm({ ...form, [e.target.name]: e.target.value });

//   const handleSubmit = async () => {
//     if ( !form.phone || !form.name) return alert('יש למלא את כל השדות');
//     const res = await dispatch(registerUser(form));
//     if (res.meta.requestStatus === 'fulfilled') navigate('/HomePage');
//   };

//   return (
//     <div className="max-w-md mx-auto p-4 bg-white dark:bg-gray-800 rounded">
//       <h2 className="text-xl mb-4">הרשמה</h2>
//       <input name="name" placeholder="שם מלא" value={form.name} onChange={handleChange} className="input" />
//       {/* <input name="email" type="email" placeholder="אימייל" value={form.email} onChange={handleChange} className="input" /> */}
//       <input name="phone" type="text" placeholder="טלפון" value={form.phone} onChange={handleChange} className="input" />
//       <button onClick={handleSubmit} disabled={loading} className="btn">
//         {loading ? 'טוען...' : 'הירשם'}
//       </button>
//       {error && <p className="text-red-600 mt-2">{error}</p>}
//     </div>
//   );
// };

// export default Register;
