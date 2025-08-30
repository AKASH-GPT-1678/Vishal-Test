import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Taskpage from './Components/Taskpage';
import NewsPage from './Components/Newspage';
import Login from './Components/Login';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Taskpage />} />
          <Route path='/news' element={<NewsPage/>}/>
          <Route path='/login' element={<Login/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;