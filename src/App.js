import './App.css';
import Form from './pages/Form';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Preview from './pages/Preview';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Form />} />
        <Route path='/preview' element={<Preview />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
