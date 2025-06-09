import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from '../states/store';
import { fetchUsers } from '../states/userSlice';
import { fetchPromptHistory } from '../states/promptsSlice';

const AdminDashboard = () => {
  const dispatch = useDispatch<AppDispatch>();
  const usersState = useSelector((s:RootState) => s.users);
  const promptsState = useSelector((s:RootState) => s.prompts);

  useEffect(() => {
    dispatch(fetchUsers());
    dispatch(fetchPromptHistory());
  }, []);

  if (usersState.loading || promptsState.loading) 
    return <p>טוען...</p>;
//   if (usersState.error) return <p className="text-red-600">שגיאת משתמשים: {usersState.error}</p>;
//   if (promptsState.error) return <p className="text-red-600">שגיאת היסטוריה: {promptsState.error}</p>;

  return (
    <div>
      <h2 className="text-2xl font-semibold">לוח ניהול</h2>
      <table className="w-full border">
        <thead>
          <tr className="bg-gray-100">
            <th>User</th><th>Category</th><th>Subcat</th><th>Prompt</th><th>Response</th>
          </tr>
        </thead>
        <tbody>
          {promptsState.prompts.map(p => {
            const user = usersState.users.find(u => u.id === p.userId);
            return (
              <tr key={p.id} className="border-t">
                <td>{user ? user.name : p.userId}</td>
                <td>{p.categoryId}</td>
                <td>{p.subCategoryId}</td>
                <td>{p.prompt}</td>
                <td>{p.response}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default AdminDashboard;
