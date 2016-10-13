import React from 'react';

export default class ContactCreate extends React.Component {
	// state를 초기화 하는 메소드
	constructor(props){
		super(props);
		this.state = {
			name : '',
			phone : ''
		}
		this.handleChange = this.handleChange.bind(this);
		this.handleClick = this.handleClick.bind(this);
		this.handleKeyPress = this.handleKeyPress.bind(this);
	}
	// 4-3-3 수정 메소드를 생성
	handleChange(e){
		// 4-3-3 빈객체 생성 : 여러개의 인풋을 처리 할 수 있음
		let nextState = {};
		// 4-3-4 e.target.name이 가리키는건 input의 name
		nextState[e.target.name] = e.target.value;
		this.setState(nextState)
	}

	handleClick(){
		// contact 객체 생성, 수정될일이 없기 떄문에 상수로 만든다.
		const contact = {
			name : this.state.name,
			phone : this.state.phone
		}
		this.props.onCreate(contact);
		this.setState({
			name : '',
			phone : ''
		});
		/* 4-4-3  생성후 자동으로 포커스 이동시키기 react의 ref!
		 document.getElementById(id).focus(); 로 DOM에 접근 할 수 있지만
		 컴포넌트가 여러개 렌더링이 될때 id가 중첩되는 문제점이 있다. 이럴때 react의 ref 속성을 이용한다. 
		 ref는 돔 이외에도 컴포넌트에도 설정이 가능하다. 만약에 contact에서 컴포넌트에 설정했을때
		 ref에 접근해서 컴포넌트의 내부 메소드를 실행 할수있다
		 하지만, ref를 사용하지 않고 다른 방법이 있을때는 그 방법을 택한다.
		 불가피한 경우에만 ref를 사용한다. 예) focus 접근
		 또한 render 메소드 내부와 constructor 내부에서는 ref에 접근 할 수 없다!
		*/
		this.nameInput.focus();
	}
	// 4-4-1 엔터를 눌렀을때
	handleKeyPress(e){
		if(e.charCode == 13){
			this.handleClick();
		}
	}

	render() {
		return(
			<div>
				<h2>Create Contact</h2>
				<p>
					{/* 4-4-4 ref의 callback function을 만든다 */}
					<input type="text"
						name="name"
						placeholder="name"
						value = {this.state.name}
						onChange = {this.handleChange}
						ref = {(ref)=>{this.nameInput = ref}}
					/>
					<input type="text"
						name="phone"
						placeholder="phone"
						value = {this.state.phone}
						onChange = {this.handleChange}
						onKeyPress = {this.handleKeyPress}
					/>
				</p>	
				{/* 클릭을 했을 때의 이벤트 생성  */}		
				<button onClick={this.handleClick}>create</button>
			</div>
		);
	}
}

// onCreate 라는 props 를 받았으니 디폴트를 설정 해준다.
ContactCreate.propTypes = {
	onCreate : React.PropTypes.func
}

ContactCreate.defaultProps = {
	onCreate : ()=> {console.erroe('onCreate not defiend')}
}