import React from 'react';
import ContactInfo from './ContactInfo';
import ContactDetails from './ContactDetails';
import update from 'react-addons-update';
// 4-3-2 새로만든 컴포넌트는 불러온다
import ContactCreate from './ContactCreate';

export default class Contact extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			// 4-2-2 state 추가
			selectedKey : -1,
			// 4-1-2 공백으로 설정
			keyword : '',
			contactData : [{
				name : 'Abet',
				phone : '010-4738-2811'
			}, {
				name : 'Betty',
				phone : '010-5418-2121'
			}, {
				name : 'Chris',
				phone : '011-5777-9870'
			}, {
				name : 'David',
				phone : '010-2222-7511'
			}]
		}

		this.handleChange = this.handleChange.bind(this);
		this.handleClick = this.handleClick.bind(this);

		this.handleCreate = this.handleCreate.bind(this);
		this.handleRemove = this.handleRemove.bind(this);
		this.handleEdit = this.handleEdit.bind(this);
	}
	// 4-1-3 value를 변경할 메소드를 만들어 준다.
	handleChange(e){
		// 4-1-5 this가 뭔지 모르기 때문에 바인딩 해준다.
		this.setState({
			// 4-1-4 키워드 값을 타켓의 value로 설정 하겠다.
			keyword : e.target.value
		});
	}

	// 4-2-1 이메소드를 실행하면 state가 수정되는 클릭 메소드 추가, 키값을 파라미터로 가짐
	handleClick(key){
		this.setState({
			selectedKey : key
		})
	}

	handleCreate(contact) {
		this.setState({
			contactData : update(this.state.contactData, {$push:[contact]})
		});
	}

	handleRemove(){
		this.setState({
			contactData : update(this.state.contactData,{
				$splice : [[this.state.selectedKey, 1]]
			}),
			// 4-3-1 무효화 시킨다
			selectedKey : -1
		})
	}

	handleEdit(name, phone){
		this.setState({
			contactData : update(this.state.contactData,{
				[this.state.selectedKey] : {
					name : {$set : name},
					phone : {$set : phone}
				}
			})
		})
	}

	render(){
		const mapToComponent = (data) => {
			// 4.1.6 검색을 위해 먼저 데이터를 정렬 한다.
			data.sort();
			data = data.filter(
				// 4.1.7 contact를 파라미터로 가지는 함수를 만든다.
				(contact) => {
					// search에 있는 내용을 가질때만 true로 반환(대소문자 구분 없이)
					return contact.name.toLowerCase().indexOf(this.state.keyword) > -1;
				}
			)

			// 4-2-3 맵핑을 시켜주는데 컴포넌트에서는 onClick이 실행 되지 않는다.
			// 이벤트는 컴포넌트에는 적용 안되고, 네이티브 돔에만 적용이 된다.
			// 이유는 onClick이 props로 전달이되기 때문!
			// contactInfo 모듈에서 바인딩 해준다.
			return data.map((contact, i) => {
				return (<ContactInfo contact={contact} key={i}
					// 4-2-4 key를 받아야 하기 때문에 다음과 같이 작성
					// contact의 정보를 제공하기 위해 contactDeatils 컴포넌트를 만든다.
					onClick={()=>this.handleClick(i)}
				 />);
			});
		}
		return (
			<div>
				<h1>Contact</h1>
			{/* 4-1-1. 값을 state로 사용한다 */}
				{/*4-1-5. onChange이벤트로 handleChange 호출한다.*/}
				<input
					name="keyword"
					placeholder="Search"
					value={this.state.keyword}					
					onChange={this.handleChange}
				 />
				<div>{mapToComponent(this.state.contactData)}</div>
				{/* 4-2-5 ContactDetails 컴포넌트를 렌더링 */}
					{/* 4-2-9 props전달 : contact를 contactDeatils로 전달 */}
				<ContactDetails 
					isSelected={this.state.selectedKey != -1}
					contact={this.state.contactData[this.state.selectedKey]}
				 />
				{/* 4-3-6 props 전달 */}
				 <ContactCreate
				 	onCreate={this.handleCreate}
				 />
			</div>
		);
	}
}

