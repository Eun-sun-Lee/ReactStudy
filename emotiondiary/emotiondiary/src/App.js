import './App.css';
import {BrowserRouter,Routes,Route} from 'react-router-dom';
import Home from './pages/Home'
import Diary from './pages/Diary'
import New from './pages/New'
import Edit from './pages/Edit'
import MyButton from './components/MyButton'; //Components
import MyHeader from './components/MyHeader';

function App() {

  return (
    <BrowserRouter>
    <div className="App">
      <MyHeader headText={"App"} 
      leftChild={<MyButton text={'왼쪽 버튼'} onClick={()=>alert("왼쪽 클릭")} />}
      rightChild={<MyButton text={"오른쪽 버튼"} onClick={()=>alert("오른쪽 클릭")} />}/>
      <h2>App.js</h2>

      <MyButton text={"버튼"} onClick={()=> alert("버튼 클릭")} type={"positive"}/>
      <MyButton text={"버튼"} onClick={()=> alert("버튼 클릭")} type={"negative"}/>
      <MyButton text={"버튼"} onClick={()=> alert("버튼 클릭")}/>
      <Routes> {/* Routes : 바뀔 부분을 감싸줌 */}
        <Route path="/" element = {<Home />} /> {/* Route : Url 경로와 컴포넌트 mapping */}
        <Route path="/new" element = {<New />} />
        <Route path="/diary/:id" element= {<Diary />}/>
        <Route path="/edit" element = {<Edit />}/>
      </Routes>
    </div>
    </BrowserRouter>
  );
}

export default App;
