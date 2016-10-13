import React from 'react';

export default class ContactDetails extends React.Component {
	// 4-3-2 state설정
	constructor(props){
		super(props);
		// ContactCreat와 동일하게
		this.state = {
			isEdit : false,
			name : '',
			phone : ''
		};

		this.handleToggle = this.handleToggle.bind(this);		
		this.handleChange = this.handleChange.bind(this);
		this.handleEdit = this.handleEdit.bind(this);
		this.handleKeyPress = this.handleKeyPress.bind(this);
	}
	// 4-3-3 수정 메소드 생성
	handleToggle(){
		// 4-3-9 클릭했을 때 기존 값이 보이게 
		if(!this.state.isEdit){
			// 현재의 상태를 보여줌
			this.setState({
				name : this.props.contact.name,
				phone : this.props.contact.phone
			})
		} else {
			this.handleEdit();
		}
		// 4-3-4 flag 변경
		this.setState({
			isEdit : !this.state.isEdit
		});
		/* 4-3-4 처음이 false인 이유는 setState가 비동기라 
		 	setState가 끝나기전에 아래 코드가 실행되기 때문		
		console.log(this.state.isEdit)*/
	}
	// 4-3-7 수정을 할 수 있게
	handleChange(e){
		let nextState = {};
		nextState[e.target.name] = e.target.value;
		this.setState(nextState)
	}
	// 4-3-10 수정을 할수 있게 구현
	handleEdit(){
		// state를 그대로 전달 하기때문에 파라미터가 필요없다.
		// onEdit를  contact > ContactDetails 로 전달 
		this.props.onEdit(this.state.name, this.state.phone);
	}
	// 4-4-2 
	handleKeyPress(e){
		if(e.charCode == 13){
			this.handleToggle();
		}

	}

	render() {
		// 4-2-7 선택이 되었을 때와 아닐때를 구분해야 한다.
		const details = (
			<div>
				<p>{this.props.contact.name}</p>
				<p>{this.props.contact.phone}</p>
			</div>
		);

		// 4-3-6 ContactCreat에 있는 폼을 그대로 복사
		const edit = (			
			<div>
				<p>
				<input type="text"
					name="name"
					placeholder="name"
					value = {this.state.name}
					onChange = {this.handleChange}
				/>
				</p>
				<p>
				<input type="text"
					name="phone"
					placeholder="phone"
					value = {this.state.phone}
					onChange = {this.handleChange}
					onKeyPress = {this.handleKeyPress}
				/>
				</p>
			</div>
		);
		// 4-3-5 view가 Edit아래에 있어야 한다!
		const view = this.state.isEdit ? edit : details;

		

		const blank = (<p>이름을 선택하세요</p>);
		// 4-2-8 props 를 받는다.
		return(
			<div>
				<h2>Details</h2>
				<div>
					{this.props.isSelected ? view : blank}
					{/* toggle 기능 추가 */}			
					{this.props.isSelected ?  (
						<button onClick={this.handleToggle}>
							{this.state.isEdit ? 'Ok' : 'Edit'}
						</button>
					) : ''}					
					{/* 
						4-3-1 삭제 버튼 추기 > Contact.js로 가서 onRemove Props를 전달
						문제점 : 선택하지 않아도 삭제가 됨으로 handleRemove에서 예외상황 만듬
					*/}
					<button onClick={this.props.onRemove}>Remove</button>
				</div>
			</div>
		);
	}
}

// 4-2-10 초기값을 지정하지 않으면 오류가 발생하므로 지정한다.
ContactDetails.defaultProps = {
	contact : {
		name : '',
		phone : ''
	},
	onRemove : () => {
		console.error('onRemove not defined')
	},
	onEdit : () => {
		console.error('onEdit not defined')	
	}
}

ContactDetails.propTypes = {
	contact : React.PropTypes.object,
	onRemove : React.PropTypes.func,
	onEdit : React.PropTypes.func
}