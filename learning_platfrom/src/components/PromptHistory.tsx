import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from '../states/store';
import { fetchPromptHistory } from '../states/promptsSlice';

const PromptHistory: React.FC = () => {
    
  const dispatch = useDispatch<AppDispatch>();
  const { prompts, loading, error } = useSelector((s:RootState) => s.prompts);

  useEffect(() => { dispatch(fetchPromptHistory()); }, []);

  if (loading) return <p>טוען היסטוריה...</p>;
//   if (error) return <p className="text-red-600">שגיאה: {error}</p>;

  return (
    <div>
      <h2 className="text-2xl font-semibold">היסטוריית שיעורים</h2>
      <ul className="space-y-4">
        {prompts.map(p => (
          <li key={p.id} className="border p-3 rounded">
            <p><strong>קטגוריה:</strong> {p.categoryId} / <strong>תת-קטגוריה:</strong> {p.subCategoryId}</p>
            <p><strong>הנחיה:</strong> {p.prompt}</p>
            <p><strong>תשובה:</strong> {p.response}</p>
            <p className="text-gray-500"><em>{new Date(p.createdAt).toLocaleString()}</em></p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PromptHistory;
