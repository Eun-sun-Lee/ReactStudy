import "./App.css";
import DiaryEditor from "./DiaryEditor";
import DiaryList from "./DiaryList";
import {useMemo, useEffect, useRef,useState, useCallback} from "react";

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
    const initData = res.slice(0,20).map((it)=>{
      return {
        author : it.email,
        content : it.body,
        emotion : Math.floor(Math.random()*5)+1,
        created_date : new Date().getTime(),
        id : dataId.current++,
      };
    });
    setData(initData); 
  };

  useEffect(()=>{
    getData();
  },[])

  const onCreate=useCallback((author, content, emotion)=> {//일기 데이터 추가할 수 있는 함수
    const created_date=new Date().getTime();
    const newItem={
      author,
      content,
      emotion,
      created_date,
      id:dataId.current,
    };
    dataId.current+=1;
    setData((data)=>[newItem,...data]); //함수형 update, dependency 배열을 비워도 항상 최신의 값 유지 가능
    //setState에 callback 함수 전달

  },[]);
  const onRemove =useCallback((targetId)=>{
    setData(data=>data.filter((it)=>it.id!==targetId));
  },[]);

  const onEdit=useCallback((targetId,newContent)=>{
    setData((data)=>
      data.map((it)=>
      it.id===targetId ? {...it,content:newContent}:it
      )
    );
  },[]);

  const getDiaryAnalysis = useMemo(()=>{
    const goodCount = data.filter((it)=>it.emotion>=3).length;
    const badCount=data.length-goodCount;
    const goodRatio=(goodCount/ data.length)*100;
    return {goodCount,badCount,goodRatio};
  },[data.length]); 
  // data.length에 dependency -> data.length가 변할 때만 getDiaryAnalysis() 다시 실행
  const {goodCount,badCount,goodRatio}=getDiaryAnalysis; 
  //getDiaryAnalysis는 더이상 함수가 아닌 값


  return (
    <div className="App">
      <DiaryEditor onCreate={onCreate}/>
      <div> 전체 일기 : {data.length}</div>
      <div>기분 좋은 일기 개수 : {goodCount}</div>
      <div>기분 나쁜 일기 개수 : {badCount}</div>
      <div>기분 좋은 일기 비율 : {goodRatio}</div>
      <DiaryList onEdit={onEdit} onRemove={onRemove} diaryList={data}/>
    </div>
  );
}

export default App;
