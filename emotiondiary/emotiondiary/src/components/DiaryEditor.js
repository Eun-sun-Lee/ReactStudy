import { useNavigate } from "react-router";
import { useState } from "react";
import MyHeader from './MyHeader';
import MyButton from './MyButton';

const getStringDate = (date) => { //input-box에 default로 값 전달 위함. 
    return date.toISOString().slice(0,10); //2022-08-16
}; 

const DiaryEditor = () =>{
    const [date,setDate] = useState(getStringDate(new Date())); //input-box에 입력되는 date를 저장할 state
    const navigate = useNavigate();
    return (
        <div className="DiaryEditor">
            <MyHeader headText={"새 일기쓰기"} leftChild={<MyButton text={"< 뒤로가기"} onClick={()=> navigate(-1)}/>}/>
            <div>
                <section>  {/* div랑 하는일 동일 */}
                    <h4>오늘은 언제인가요?</h4>
                    <div className="input_box">
                        <input className= "input_date" value ={date} onChange={(e)=>setDate(e.target.value)} type="date"/>
                    </div>
                </section>
            </div>
        </div>
    );
}

export default DiaryEditor;