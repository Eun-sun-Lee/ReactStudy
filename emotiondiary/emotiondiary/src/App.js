import './App.css';
import {BrowserRouter,Routes,Route} from 'react-router-dom';
import RouterTest from './components/RouterTest';
import Home from './pages/Home'
import Diary from './pages/Diary'
import New from './pages/New'
import Edit from './pages/Edit'

function App() {
  return (
    <BrowserRouter>
    <div className="App">
      <h2>App.js</h2>
      <Routes> {/* Routes : 바뀔 부분을 감싸줌 */}
        <Route path="/" element = {<Home />} /> {/* Route : Url 경로와 컴포넌트 mapping */}
        <Route path="/new" element = {<New />} />
        <Route path="/diary/:id" element= {<Diary />}/>
        <Route path="/edit" element = {<Edit />}/>
      </Routes>
      <RouterTest />
    </div>
    </BrowserRouter>
  );
}

export default App;
