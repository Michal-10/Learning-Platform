// import { useDispatch, useSelector } from 'react-redux';
// import { type AppDispatch } from '../states/store';
// import { logout } from '../states/authSlice';

// const Header = () => {
//     const user = useSelector(s => s.user.user);
//     const dispatch = useDispatch<AppDispatch>();//////////////////

//     return (
//         <header className="bg-blue-600 p-4 text-white flex justify-between items-center">
//         // באיזה מקום ב-Header.tsx לדוגמה
//             <button onClick={() => {
//                 const html = document.documentElement;
//                 html.classList.toggle('dark');
//             }} className="ml-4 underline">
//                 מצב כהה / בהיר
//             </button>

//             <h1 className="text-xl font-bold">AI Learning Platform</h1>
//             {user ? (
//                 <div>
//                     <span className="mr-4">שלום, {user.name}</span>
//                     <button onClick={() => dispatch(logout())} className="underline">התנתק</button>
//                 </div>
//             ) : null}
//         </header>
//     );
// };

// export default Header;
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import type { AppDispatch, RootState } from '../states/store';
import { logout } from '../states/authSlice';

export default () => {
    const dispatch = useDispatch<AppDispatch>()
    // נניח שיש לך user ברדקס
    const user = useSelector((s: RootState) => s.auth.user);
    console.log("///////////////////");
    console.log(user);
    
    console.log("///////////////////");


    const navigate = useNavigate();

    const handleLogout = () => {
        dispatch(logout());
        navigate('/HomePage');
    };

    return (
        <header className="bg-blue-600 p-4 text-white flex justify-between items-center">
            <h1 className="text-xl font-bold">AI Learning Platform</h1>
            
            <nav>
                <Link to="/" className="mr-4 underline">בית</Link>

                {user.name ? (
                    <>
                        <Link to="/createPrompt" className="mr-4 underline">יצירת פרומפט</Link>
                        <Link to="/history" className="mr-4 underline">היסטוריה</Link>

                        {/* {user.isAdmin && ( */}
                            <Link to="/admin" className="mr-4 underline">ניהול</Link>
                        {/* )} */}

                        <button onClick={handleLogout} className="underline">התנתק</button>
                    </>
                ) : (
                    <>
                        <Link to="/login" className="mr-4 underline">התחבר</Link>
                        <Link to="/login" className="underline">הרשם</Link>
                        {/* <Link to="/register" className="underline">הרשם</Link> */}
                    </>
                )}
            </nav>
        </header>
    );
};
