import React from 'react';

class Detail extends React.Component{
    render() {
        return (
            <div className="detail">
                <div className="header">
                    <h1>새로운 연락처</h1>
                    <a href="#" className="cancel">취소</a>
                    <a href="#" className="complete">완료</a>
                </div>
                <ul className="inputArea">
                    <li><input type="text" name="firstName" placeholder="성"/></li>
                    <li><input type="text" name="lastName" placeholder="이름"/></li>
                    <li><input type="text" name="company" placeholder="직장"/></li>
                </ul>
            </div>
        );
    }
}

export default Detail;