import React from 'react';

class List extends React.Component{
    render() {
        return (
            <li>
                <a href="#">
                    <strong>용준형 <span>(2)</span></strong>
                    <sub>휴대전화1</sub>
                    <time>오후 8:18</time>
                </a>
                <a href="#" className="info"><span className="blind">정보</span></a>
            </li>
        )
    }
}

export default List;