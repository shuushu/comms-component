import React from 'react';

export default class ContactDetails extends React.Component {
	render() {

		// 4-2-7 선택이 되었을 때와 아닐때를 구분해야 한다.
		const details = (
			<div>
				<p>{this.props.contact.name}</p>
				<p>{this.props.contact.phone}</p>
			</div>
		);
		const blank = (<div>이름을 선택하세요</div>);
		// 4-2-8 props 를 받는다.
		return(
			<div>
				<h2>Details</h2>
				{this.props.isSelected ? details : blank}
			</div>
		);
	}
}

// 4-2-10 초기값을 지정하지 않으면 오류가 발생하므로 지정한다.
ContactDetails.defaultProps = {
	contact : {
		name : '',
		phone : ''
	}
}