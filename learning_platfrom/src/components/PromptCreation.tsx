// import { useEffect, useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import type { AppDispatch, RootState } from '../states/store';
// import { fetchCategories, fetchSubcategories } from '../states/categoriesSlice';
// import { sendPrompt } from '../states/promptsSlice';

// const PromptCreation = () => {
//   const dispatch = useDispatch<AppDispatch>();
//   const { categories, subcategories, loading: catLoading } = useSelector((s:RootState) => s.categories);
//   const promptState = useSelector((s:RootState) => s.prompts);

//   const [catId, setCatId] = useState<number | null>(null);
//   const [subCatId, setSubCatId] = useState<number | null>(null);
//   const [text, setText] = useState('');

//   useEffect(() => { dispatch(fetchCategories()); }, []);
//   useEffect(() => {
//     if (catId !== null) {
//       dispatch(fetchSubcategories(catId));
//       setSubCatId(null);
//     }
//   }, [catId]);

//   const handleSubmit = () => {
//     if (catId && subCatId && text.trim()) {
//       dispatch(sendPrompt({ category_id: catId, sub_category_id: subCatId, prompt: text }));
//       setText('');
//     }
//   };

//   return (
//     <div className="space-y-4">
//       <h2 className="text-2xl font-semibold">צור שיעור חדש</h2>
//       <div>
//         <label>קטגוריה</label>
//         <select value={catId ?? ''} onChange={e => setCatId(Number(e.target.value))}>
//           <option value="">--</option>
//           {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
//         </select>
//       </div>

//       {catLoading && <p>טוען קטגוריות...</p>}

//       {catId && (
//         <div>
//           <label>תת קטגוריה</label>
//           <select value={subCatId ?? ''} onChange={e => setSubCatId(Number(e.target.value))}>
//             <option value="">--</option>
//             {subcategories.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
//           </select>
//         </div>
//       )}

//       <div>
//         <label>הנחיה</label>
//         <textarea value={text} onChange={e => setText(e.target.value)} rows={4} />
//       </div>

//       <button disabled={promptState.loading} onClick={handleSubmit}>
//         {promptState.loading ? 'שולח...' : 'שלח'}
//       </button>

//       {promptState.error && <p className="text-red-600">שגיאה: {promptState.error}</p>}

//       {promptState.prompts.length > 0 && (
//         <div>
//           <h3 className="font-medium">תגובה אחרונה:</h3>
//           <p>{promptState.prompts[promptState.prompts.length - 1].response}</p>
//         </div>
//       )}
//     </div>
//   );
// };

// export default PromptCreation;







import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from '../states/store';
import { fetchCategories, fetchSubcategories } from '../states/categoriesSlice';
import { sendPrompt } from '../states/promptsSlice';

export default () => {
    const dispatch = useDispatch<AppDispatch>();
    const { categories, subcategories, loading: catLoading } = useSelector((s: RootState) => s.categories);
    const promptState = useSelector((s: RootState) => s.prompts);
    // const user = useSelector((s: RootState) => s.auth.user);

    // שמירה כ-string כדי למנוע NaN כאשר אין בחירה (ערך ריק)
    const [catId, setCatId] = useState<string>('');
    const [subCatId, setSubCatId] = useState<string>('');
    const [text, setText] = useState('');

    // טעינת קטגוריות בעת טעינת הקומפוננטה
    useEffect(() => {
        dispatch(fetchCategories());
    }, [dispatch]);

    useEffect(() => {
        console.log('categories inside useEffect:', categories);
        console.log(categories);
        
      }, [categories]);
      
    // טעינת תת-קטגוריות כאשר ה-catId משתנה
    useEffect(() => {
        console.log("catId");
        console.log(catId);
        console.log("----------------");
        
        if (catId) { // ודא ש-catId אינו ריק לפני שליפת תת-קטגוריות
            dispatch(fetchSubcategories(catId)); // המרה למספר לצורך שליחה ל-Redux
            setSubCatId(''); // איפוס תת-הקטגוריה בבחירת קטגוריה חדשה
        }
    }, [catId, dispatch]);

    const handleSubmit = () => {
        // ודא שכל השדות מלאים לפני שליחה
        if (catId && subCatId && text.trim()) {
            dispatch(sendPrompt({
               
                category_id: (catId),       // המרה למספר
                sub_category_id: (subCatId), // המרה למספר
                prompt: text
            })).then((data)=>{
                console.log(";;;;;;;;;;;;;;;;;;;;;;;;;;;;;");
                console.log(data.payload);//להדפיס אח"כ בצורה יפה את 
                console.log(";;;;;;;;;;;;;;;;;;;;;;;;;;;;;");
            }).finally(()=>{
                setText(''); // איפוס שדה הטקסט לאחר השליחה
            });
        }
    };

    return (
        <div className="space-y-4 p-4 max-w-xl mx-auto bg-white shadow-md rounded-lg">
            <h2 className="text-2xl font-semibold text-gray-800 border-b pb-2 mb-4">צור שיעור חדש</h2>

            <div>
                <label htmlFor="category-select" className="block text-gray-700 text-sm font-bold mb-2">
                    קטגוריה
                </label>
                <select
                    id="category-select"
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    value={catId}
                    onChange={e => setCatId(e.target.value)}
                >
                    <option value="">בחר קטגוריה</option>
                    {/* מציג את הקטגוריות הזמינות */}
                    {categories.map(c => (
                        <option key={c._id} value={(c._id)}>{c.name}</option>
                    ))}
                </select>
            </div>

            {/* הצגת הודעת טעינה כאשר הקטגוריות נטענות */}
            {catLoading && <p className="text-gray-600 text-sm">טוען קטגוריות...</p>}

            {/* הצגת בורר תת-קטגוריה רק אם נבחרה קטגוריה */}
            {catId && (
                <div>
                    <label htmlFor="subcategory-select" className="block text-gray-700 text-sm font-bold mb-2 mt-4">
                        תת קטגוריה
                    </label>
                    <select
                        id="subcategory-select"
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        value={subCatId}
                        onChange={e => setSubCatId(e.target.value)}
                    >
                        <option value="" disabled>בחר תת קטגוריה</option>
                        {/* מציג את תת-הקטגוריות הזמינות עבור הקטגוריה שנבחרה */}
                        {subcategories.map(s => (
                            <option key={s._id} value={(s._id)}>{s.name}</option>
                        ))}
                    </select>
                </div>
            )}

            {/* הצגת שדה ההנחיה רק אם נבחרה תת-קטגוריה */}
            {subCatId && (
                <div>
                    <label htmlFor="prompt-textarea" className="block text-gray-700 text-sm font-bold mb-2 mt-4">
                        הנחיה
                    </label>
                    <textarea
                        id="prompt-textarea"
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        value={text}
                        onChange={e => setText(e.target.value)}
                        rows={4}
                        placeholder="כתוב כאן את ההנחיה לשיעור..."
                    />
                </div>
            )}

            <button
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline disabled:opacity-50 disabled:cursor-not-allowed mt-4"
                // הכפתור יהיה לא פעיל אם אחד מהשדות חסר או אם מתבצעת שליחה
                disabled={!catId || !subCatId || !text.trim() || promptState.loading}
                onClick={handleSubmit}
            >
                {promptState.loading ? 'שולח...' : 'שלח'}
            </button>

            {/* הצגת הודעת שגיאה אם קיימת */}
            {/* {promptState.error && (
                <p className="text-red-600 text-sm mt-2">שגיאה: {promptState.error}</p>
            )} */}

            {/* הצגת התגובה האחרונה אם קיימות הנחיות שנשלחו */}
            {promptState.prompts.length > 0 && (
                <div className="bg-gray-50 p-4 mt-4 rounded-lg border border-gray-200">
                    <h3 className="font-semibold text-gray-800 mb-2">תגובה אחרונה:</h3>
                    <p className="text-gray-700">{promptState.prompts[promptState.prompts.length - 1].response}</p>
                </div>
            )}
        </div>
    );
};
