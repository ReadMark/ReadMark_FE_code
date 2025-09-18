import './mypage.css';

function Record(porps){
    return(
        <div className="my_center-each">
         <div className="my_center-top">{porps.title}</div>
         <div className="my_center-bottom">{porps.count}</div>
        </div>
    );
}

export default Record;