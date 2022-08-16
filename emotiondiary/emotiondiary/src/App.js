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

function App() {

  const [data,dispatch] = useReducer(reducer,[]);

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
    </DiaryStateContext.Provider>
  );
}

export default App;
