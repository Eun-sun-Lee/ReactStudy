import { useNavigate } from "react-router";
import { useState } from "react";
import MyHeader from './MyHeader';
import MyButton from './MyButton';
import EmotionItem from "./EmotionItem";

const getStringDate = (date) => { //input-box에 default로 값 전달 위함. 
    return date.toISOString().slice(0,10); //2022-08-16
}; 

const env = process.env;
env.PUBLIC_URL = env.PUBLIC_URL || "";

const emotionList = [
    {emotion_id: 1, emotion_img: process.env.PUBLIC_URL + `/assets/emotion1.png`,emotion_descript: '완전 좋음'},
    {emotion_id: 2, emotion_img: process.env.PUBLIC_URL + `/assets/emotion2.png`,emotion_descript: '좋음'},
    {emotion_id: 3, emotion_img: process.env.PUBLIC_URL + `/assets/emotion3.png`,emotion_descript: '그럭저럭'},
    {emotion_id: 4, emotion_img: process.env.PUBLIC_URL + `/assets/emotion4.png`,emotion_descript: '나쁨'},
    {emotion_id: 5, emotion_img: process.env.PUBLIC_URL + `/assets/emotion5.png`,emotion_descript: '끔찍함'}
]

const DiaryEditor = () =>{
    const navigate = useNavigate();
    const [date,setDate] = useState(getStringDate(new Date())); //input-box에 입력되는 date를 저장할 state
    const [emotion,setEmotion] = useState(3); //선택된 감정을 저장할 state

    const handleClickEmote= (emotion) =>{ //DiaryItem-onClick에서 전달한 emotion_id를 emotion으로 전달받음.
        setEmotion(emotion);
    }

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
                <section>
                    <h4>오늘의 감정</h4>
                    <div className="input_box emotion_list_wrapper">
                        {emotionList.map((it)=>(<EmotionItem key={it.emotion_id} {...it} onClick={handleClickEmote} isSelected={it.emotion_id===emotion}/>))}
                    </div>
                </section>
            </div>
        </div>
    );
};

export default DiaryEditor;