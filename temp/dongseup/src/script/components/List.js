import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, Link, browserHistory, IndexRoute } from 'react-router'

class List extends React.Component {
    render() {
        const accumulate = this.props.contact.accumulate ? `(${this.props.contact.accumulate})` : '';

        const absence = this.props.contact.absence ? `absence` : '';

        const list = (
            <ul className="list">
                <li className={absence}>
                    <a href="#">
                        <strong>{this.props.contact.name}<span>{accumulate}</span></strong>
                        <sub>휴대전화</sub>
                        <time>오후 8:18</time>
                    </a>
                    <Link to="detail" className="info"><span className="blind">정보</span></Link>
                </li>
                {this.props.children}
            </ul>
        );

        const blank = (
            <div className="noData">리스트가 없습니다.</div>
        );

        return (
            <div>                
                {this.props.contact !== 'nodata' ? list : blank}
            </div>
        )
    }
}

export default List;