import "./App.css";
import DiaryEditor from "./DiaryEditor";
import DiaryList from "./DiaryList";
import Lifecycle from "./Lifecycle";
import {useRef,useState} from "react";

// const dummyList=[
//   {
//     id:1,
//     author:"이은선",
//     content:"하이 1",
//     emotion:5,
//     created_date: new Date().getTime() //현재 시간 기준
//   },
//   {
//     id:2,
//     author:"익명1",
//     content:"하이 1",
//     emotion:5,
//     created_date: new Date().getTime() //현재 시간 기준
//   },
//   {
//     id:3,
//     author:"익명3",
//     content:"하이 1",
//     emotion:3,
//     created_date: new Date().getTime() //현재 시간 기준
//   },
// ];

//https://jsonplaceholder.typicode.com/comments

function App() {
  const [data,setData]=useState([]);
  const dataId=useRef(0);

  const getData = async()=>{
    const res=await fetch('https://jsonplaceholder.typicode.com/comments').then((res)=>res.json());
    console.log(res);
  }

  const onCreate=(author, content, emotion)=> {//일기 데이터 추가할 수 있는 함수
    const created_date=new Date().getTime();
    const newItem={
      author,
      content,
      emotion,
      created_date,
      id:dataId.current,
    };
    dataId.current+=1;
    setData([...data,newItem]);

  };
  const onRemove =(targetId)=>{
    console.log("${targetId}가 삭제되었습니다.");
    const newDiaryList=data.filter((it)=>it.id!=targetId);
    setData(newDiaryList);
  };

  const onEdit=(targetId,newContent)=>{
    setData(
      data.map((it)=>
      it.id===targetId ? {...it,content:newContent}:it
      )
    );
  };

  return (
    <div className="App">
      <Lifecycle/>
      <DiaryEditor onCreate={onCreate}/>
      <DiaryList onEdit={onEdit} onRemove={onRemove} diaryList={data}/>
    </div>
  );
}

export default App;
