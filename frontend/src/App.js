import './App.css';
import Signup from './pages/Signup';
import { Routes, Route } from 'react-router-dom';
import UploadCenter from './pages/UploadCenter';

function App() {
  return (
    <div className='bg-gray-200 flex'>
      <Routes>
        <Route path='/' element={<Signup />} />
        <Route path='/uploads' element={<UploadCenter />} />
      </Routes>
    </div>
  );
}

export default App;
