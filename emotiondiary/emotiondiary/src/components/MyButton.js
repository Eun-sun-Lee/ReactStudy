const MyButton = ({text,type,onClick}) => {

    const btnType = ["positive","negative"].includes(type) ? type : "default"; //positive, negative 이외의 type-> default type으로 만들기
    
    return (
        <button className={["MyButton",`MyButton_${btnType}`].join(" ")} onClick={onClick}>
            {text}
        </button>
    );
};

MyButton.defaultProps= {
    type: "default",
};

export default MyButton;