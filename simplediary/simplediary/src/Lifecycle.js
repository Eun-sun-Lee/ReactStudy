import React, {useEffect, useState} from 'react';

const Lifecycle = () => {

    const [count, setCount]=useState(0);
    const [text,setText]=useState("");

    useEffect(()=>{
        console.log("Mount!");
    },[]); //Mount 시점에 무언가 하고 싶으면 useEffect 두번째 인자인 dependency array에 빈배열 전달
    //첫번째 인자에는 하고 싶은 일

    useEffect(() => {
        console.log("Updage!");
    });
    
    useEffect(()=>{
        console.log("count is update : ${count}");
        if (count>5){
            alert("count가 5를 넘었습니다. 따라서 1로 초기화합니다.");
            setCount(1);
        }
    },[count])

    useEffect(()=>{
        console.log("text is update : ${text}");
    },[text]);
    //dependency array의 값이 변하는 순간 callback 함수 수행


    return <div style={{padding: 20}}>
        <div>
            {count}
            <button onClick={()=>setCount(count+1)}>+</button>
        </div>
        <div>
            <input value={text} onChange={(e)=>setText(e.target.value)}/>
        </div>
    </div>;
};
export default Lifecycle;