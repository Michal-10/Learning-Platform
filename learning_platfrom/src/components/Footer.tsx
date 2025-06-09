const Footer= () => (
    <footer className="bg-gray-200 text-center p-2">
      &copy; {new Date().getFullYear()} AI Learning Platform 
      <a
          href="https://mail.google.com/mail/?view=cm&fs=1&to=michal64934@gmail.com&su=פנייה%20מאתר%20LearningPlatform&body=שלום,%20רציתי%20לפנות%20בנוגע%20ל..."
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: '#0077cc', textDecoration: 'none', marginLeft: '5px' }}
        >
          support@LearningPlatform.co.il
        </a>
    </footer>
);
  
export default Footer;
  