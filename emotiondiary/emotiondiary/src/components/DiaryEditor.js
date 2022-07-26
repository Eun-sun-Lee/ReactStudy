import { useNavigate } from "react-router";
import { useState,useRef,useContext, useEffect } from "react";
import MyHeader from './MyHeader';
import MyButton from './MyButton';
import EmotionItem from "./EmotionItem";
import { DiaryDispatchContext } from "../App";
import { getStringDate } from "../util/date";
import { emotionList } from "../util/emotion";

const env = process.env;
env.PUBLIC_URL = env.PUBLIC_URL || "";


const DiaryEditor = ({isEdit, originData}) =>{
    const navigate = useNavigate();
    const [date,setDate] = useState(getStringDate(new Date())); //input-box에 입력되는 date를 저장할 state
    const [emotion,setEmotion] = useState(3); //선택된 감정을 저장할 state

    const handleClickEmote= (emotion) =>{ //DiaryItem-onClick에서 전달한 emotion_id를 emotion으로 전달받음.
        setEmotion(emotion);
    } 
    
    const contentRef=useRef(); //content를 다 작성 안했을 때 focus하기 위함.
    const [content,setContent] = useState("");

    const {onCreate,onEdit} = useContext(DiaryDispatchContext);
    const handleSubmit = () => {
        if(content.length <1) {
            contentRef.current.focus();
            return;
        }

        if (window.confirm(isEdit? "일기를 수정하시겠습니까?" : "새로운 일기를 작성하시겠습니까?")){
            if(!isEdit){
                onCreate(date,content,emotion);
            } else{
                onEdit(originData.id, date, content, emotion);
            }
        }
        navigate('/',{replace: true}) //'/' page로 돌아가게 option을 줌.
    };

    useEffect(()=>{ //isEdit이 true일때만 수행 -> edit page에서 render하는 diaryEditor에서만 이 로직 동작
        if(isEdit){
            setDate(getStringDate(new Date(parseInt(originData.date))));
            setEmotion(originData.emotion);
            setContent(originData.content);
        }
    },[isEdit, originData])

    return (
        <div className="DiaryEditor">
            <MyHeader headText={isEdit ? "일기 수정하기" : "새 일기쓰기"} leftChild={<MyButton text={"< 뒤로가기"} onClick={()=> navigate(-1)}/>}/>
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
                <section>
                    <h4>오늘의 일기</h4>
                    <div className="input box text_wrapper">
                        <textarea placeholder="오늘은 어땠나요" ref={contentRef} value={content} onChange={(e)=>setContent(e.target.value)} />
                    </div>
                </section>
                <section>
                    <div className="control_box">
                        <MyButton text={"취소하기"} onClick={()=>navigate(-1)}/>
                        <MyButton text={"작성완료"} type={'positive'} onClick={handleSubmit}/>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default DiaryEditor;