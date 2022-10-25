import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Loading from './components/Loading';
import Notification from './components/Notification';
import Home from './pages/Home';
import TeacherDetail from './pages/teachers/TeacherDetail';

function App() {
  return (
    <>
      <Loading />
      <Notification />
      <BrowserRouter>
        <Routes>
          <Route path='*' element={<Home />} />
          {/* <Route path='/details' element={<TeacherDetail />} /> */}
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
