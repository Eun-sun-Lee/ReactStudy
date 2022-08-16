import {useContext, useEffect, useState} from "react";
import { DiaryStateContext } from "../App";
import MyHeader from './../components/MyHeader';
import MyButton from './../components/MyButton';

const Home = () => {

    const diaryList = useContext(DiaryStateContext);

    const [data, setData] = useState([]); //diaryList를 curDate state의 날짜에 따라 가공하기 위해 새로운 state 추가
    const [curDate, setCurDate] = useState(new Date()); //날짜를 저장하는 State, 기본값: 현재 시간
    const headText = `${curDate.getFullYear()}년 ${curDate.getMonth()+1}월`

    useEffect(()=>{ //달별로 일기 필터링
        //달의 첫번째 날짜 구하기
        if (diaryList.length >=1 ){
            const firstDay = new Date(
                curDate.getFullYear(),
                curDate.getMonth(),
                1
            ).getTime();
    
            //달의 마지막 날짜 구하기
            const lastDay = new Date(
                curDate.getFullYear(),
                curDate.getMonth()+1,
                0
            ).getTime();

            setData(diaryList.filter((it)=> firstDay <= it.data && it.data <= lastDay));    
        }
    },[diaryList, curDate]); //diaryList, 현재 시간이 바뀌는 시점에만 update

    useEffect(()=>{
        console.log(data);
    },[data]);
    
    const increaseMonth = () => {
        //1달씩 증가시켜주는 함수
        setCurDate(new Date(curDate.getFullYear(), curDate.getMonth()+1, curDate.getDate()))
    }
    const decreaseMonth = () => {
        //1달씩 감소시켜주는 함수
        setCurDate(new Date(curDate.getFullYear(), curDate.getMonth()-1, curDate.getDate()))
    }

    return (
        <div>
            <MyHeader headText = {headText} 
            leftChild= {<MyButton text={"<"} onClick={decreaseMonth} />}
            rightChild = {<MyButton text={">"} onClick={increaseMonth}/>} />
        </div>
    );
};

export default Home;