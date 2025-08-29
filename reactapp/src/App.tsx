import TaskForm from './Components/Taskform'
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Taskpage from './Components/Taskpage';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Taskpage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;