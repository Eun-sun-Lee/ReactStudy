import {useState} from "react";


const DiaryEditor = () => {

    const [author, setAuthor] =useState("이은선"); 

    return (
    <div className="DiaryEditor">
        <h2>오늘의 일기</h2>
        <div>
            <input
            value={author}
            onChange={(e)=>{
                console.log(e.target.value);
                setAuthor(e.target.value);
            }}    
            />
        </div>
    </div>
    );
};
export default DiaryEditor;