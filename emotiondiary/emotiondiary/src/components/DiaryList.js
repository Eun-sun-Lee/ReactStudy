import { useState } from "react";

const sortOptionList = [
    {value : "latest", name: "최신순"},
    {value : "oldest", name: "오래된 순"},
]

const ControlMenu = ({value, onChange, optionList})=>{
    //value : select가 선택하고 있는 값, onChange : select가 선택하는게 변화했을 때 바꿀 기능을 할 함수, optionList: select tag 안에 들어갈 옵션
    return (<select value={value} onChange={(e)=>onChange(e.target.value)}>
        {optionList.map((it,idx)=> (
            <option key = {idx} value = {it.value}>
                {it.name}
            </option>))}
    </select>
    );
};

const DiaryList = ({diaryList}) => {
    const [sortType, setSortType] = useState('latest'); //정렬 기준을 저장할 state

    const getProcessedDiaryList = () => { //sort를 쓰면 원본 배열 자체가 정렬 -> 깊은 복사를 해서 정렬 ---> 정렬된 리스트 반환 함수
        const compare = (a,b) =>{
            if (sortType === "latest") {
                return parseInt(b.date) - parseInt(a.date);
            } else {
                return parseInt(a.date) - parseInt(b.date);
            }
        };

        const copyList = JSON.parse(JSON.stringify(diaryList)); //배열 ->  string -> 배열
        const sortedList = copyList.sort(compare);
        return sortedList;
    };

    return (
        <div>
            <ControlMenu value ={sortType} onChange={setSortType} optionList={sortOptionList}/>
            {getProcessedDiaryList().map((it)=>(
                <div key={it.id}>{it.content}</div>
            ))}
        </div>
    );
};

DiaryList.defaultProps = {
    diaryList : [],
};

export default DiaryList;