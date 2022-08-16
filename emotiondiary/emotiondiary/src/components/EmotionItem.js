const EmotionItem = ({emotion_id,emotion_img, emotion_descript,onClick,isSelected}) =>{
    return (
        <div onClick={()=>onClick(emotion_id)} className={["EmotionItem",
        isSelected ? `EmotionItem_on_${emotion_id}` : `EmotionItem_off`].join(" ")}>
            {/* 눌렸을 때 emotion_id를 props로 전달, isSelected를 통해 css style 바꿔줌 */}
            <img src={emotion_img}/>
            <span>{emotion_descript}</span>
        </div>
    );
};

export default EmotionItem;