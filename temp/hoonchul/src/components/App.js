import React from 'react';

class App extends React.Component {
	render (){
		return(
			<h1>hello</h1>
		);
	}
}
// ES5의 module.export = App; 같음
// 다른 코드에서 이 클래스를 불러서 사용할 수 있다.
export default App;