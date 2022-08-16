import React, {useRef, useReducer} from "react";
import './App.css';
import {BrowserRouter,Routes,Route} from 'react-router-dom';
import Home from './pages/Home'
import Diary from './pages/Diary'
import New from './pages/New'
import Edit from './pages/Edit'

const reducer = (state,action)=>{
  let newState = [];
  switch(action.type){
    case 'INIT' : {
      return action.data;
    }
    case 'CREATE': {
      newState = [action.data, ...state]; 
      break;
    }
    case 'REMOVE' : {
      newState = state.filter((it)=> it.id!== action.targetId);
      break;
    }
    case 'EDIT' : {
      newState = state.map((it)=> it.id===action.data.id ? {...action.data} : it);
      break;
    }
    default: return state;
  }
  return newState;
};

export const DiaryStateContext = React.createContext();
export const DiaryDispatchContext = React.createContext();

const dummyData = [
  {
    id: 1,
    emotion : 1,
    content : "오늘의 일기 1번",
    date : 1660641307351
  },
  {
    id: 2,
    emotion : 2,
    content : "오늘의 일기 2번",
    date : 1660641307352
  },
  {
    id: 3,
    emotion : 3,
    content : "오늘의 일기 3번",
    date : 1660641307353
  },
  {
    id: 4,
    emotion : 4,
    content : "오늘의 일기 4번",
    date : 1660641307354
  },
  {
    id: 5,
    emotion : 5,
    content : "오늘의 일기 5번",
    date : 1660641307355 //가장 최신
  }
];

function App() {
  const [data,dispatch] = useReducer(reducer,dummyData);
  console.log(new Date().getTime());

  const dataId = useRef(0);

  //CREATE
  const onCreate = (date, content,emotion) => {
    dispatch({
      type : "CREATE",
      data : {
        id : dataId.current,
        date : new Date(date).getTime(),
        content,
        emotion,
      },
    });
    dataId.current += 1;
  };

  //REMOVE
  const onRemove = (targetId) => {
    dispatch({type : "REMOVE", targetId});
  };

  //EDIT
  const onEdit = (targetId, date, content, emotion) => {
    dispatch({
      type: "EDIT",
      data: {
        id : targetId,
        date : new Date(date).getTime(),
        content,
        emotion,
      },
    });
  };
   
  return (
    <DiaryStateContext.Provider value={data}>
      <DiaryDispatchContext.Provider value={{onCreate,onEdit,onRemove,}}>
    <BrowserRouter>
    <div className="App">
      <Routes> {/* Routes : 바뀔 부분을 감싸줌 */}
        <Route path="/" element = {<Home />} /> {/* Route : Url 경로와 컴포넌트 mapping */}
        <Route path="/new" element = {<New />} />
        <Route path="/diary/:id" element= {<Diary />}/>
        <Route path="/edit" element = {<Edit />}/>
      </Routes>
    </div>
    </BrowserRouter>
    </DiaryDispatchContext.Provider>
    </DiaryStateContext.Provider>
  );
}

export default App;
