import { Outlet } from 'react-router';
import Header from './components/Header';
import Footer from './components/Footer';



const Layout = () => {
  return (
    <div className="min-h-screen flex flex-col bg-white text-black dark:bg-gray-900 dark:text-white">
      <Header />
      <main className="flex-grow p-4">
        <Outlet/>
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
