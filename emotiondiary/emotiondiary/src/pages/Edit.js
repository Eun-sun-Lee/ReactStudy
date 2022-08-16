import { useContext,useEffect,useState } from "react";
import { useNavigate,useParams } from "react-router-dom";
import { DiaryStateContext } from "../App";
import DiaryEditor from "../components/DiaryEditor";

const Edit = () => {
    
    const navigate = useNavigate();
    const {id} = useParams();
    const diaryList = useContext(DiaryStateContext);
    const [originData,setOriginData] = useState(); //targetDiary data를 저장할 state

    useEffect(()=>{
        if(diaryList.length >=1){
            const targetDiary = diaryList.find((it)=>parseInt(it.id)===parseInt(id));

            if(targetDiary){
                setOriginData(targetDiary);
            }else{
                navigate('/',{replace:true}) //뒤로가기 막음.
            }
        }
    },[id,diaryList]); //id나 diaryList가 변하면 다른 data를 꺼내야함.
    
    return (
        <div>{originData && <DiaryEditor isEdit={true} originData={originData} />}</div> // 수정폼으로 변화시킴
    );
};

export default Edit;