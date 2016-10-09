# react

##1강 연습 (10/08)

[예제파일](http://codepen.io/shuushu/pen/EgQpXQ)
- CODEPEN 설정 , ES6 클래스
- JSX의 syntax
- PROPS
```javascript
class Codelab extends React.Component {
  render(){
    // 3. JSX안에서 style을 설정 할때는, String형식을 사용하지 않고, key가 camelCase인 객체사 사용된다 */
    let style = {
      color : 'aqua',
      backgroundColor : 'black'
    }
    // 2. JSX안에서 javascript를 표현
    let text = "Hello"        
    /*  1. 컴포넌트에서 여러 엘리먼트를 렌더링 할 때 꼭 container element 안에 포함되어야 한다.*/
    return(
      <div>
        <div>CODE PEN</div>
        <div>{text}</div>
        <div style={style}>
          if Else 문은 JSX에서 사용 불가. 이에 대안은 삼항식이 있다. <br/>
          1과1은 같다 .{1===1 ? 'true' : 'false'}
        </div>
        {/* 4. 주석도 같은 규칙으로 container안에 있어야 오류가 나지 않는다. */}
        <div className="box">
          JSX안에서 class를 설정 할 때는 class= 가 아닌 className=을 사용한다.
        </div>
        <h1>props & state 이해</h1>
        <div>
          <p>{this.props.name}</p>
          {this.props.children}
        </div>
      </div>
    );
  }
}

// 앱을 불러오는 컴포넌트
class App extends React.Component{
  render(){
    return (
      <Codelab name={this.props.name} >{this.props.children}</Codelab>
    );
  }
}

// 렌더링
ReactDOM.render(<App name="value"> 여기 사이에 있는 값이 this.props.children 이 된다.</App>, document.getElementById('root'));


class CheckType extends React.Component {
  render() {
    return (
      <div>
        Hello {this.props.test_name} / 
        {this.props.test_value} /
        {this.props.children}
      </div>
    );
  }
}
// props typecheck
CheckType.propTypes = {
  test_name : React.PropTypes.string,
  test_value : React.PropTypes.number.isRequired
}
// propDefault
CheckType.defaultProps = {
  test_name : 'unknown',
  test_value : 57
}

ReactDOM.render (<CheckType />, document.getElementById('checkType'))
```

##2강 연습 (10/09)

> STATE는 컴포넌트에서 유동적인 데이터를 보내주는데 초기값을 설정해주는 것이 필수이다. 만약에 기본값 설정을 하지 않고 렌더링 부분(JSX내부)에서 this.state.stateName을 하면 에러가 발생한다.
또, props와 달리 this.setState({...})를 통하여 컴포넌트 내부에서 값을 변경할 수 있다. 렌더링이되기 전엔 steState메소드를 사용하지 못하며 (즉 constructor에서 사용 할 수 없다.), 렌더링이 된 다음에는 this.state= 형식으로 사용해서는 안된다.
그 이유는 setState메소드인 경우 state를 바로 수정하는게 아니라 리액트 개발자가 지정한 안정적인 프로세스를 통하여 값을 변경해줘야 된다. 직접 this.state를 변경하고 강제로 리렌더링을 업데이트 할 수는 있지만, 리액트의 장점인 바뀐 부분만 업데이트만 렌더링 해준다는 장점을 무시하는 것과 같으며 성능에도 영향이 있다.


[this.state 설정 및 event bind](http://codepen.io/shuushu/pen/BLAWJR)
``` javascript
class Counter extends React.Component {
  // 1. this.state 사용 할려면 초기값 설정이 필수이다.
  // 2. constructor(props) 는 counter가 만들어질 때 상속받는 props다.
  constructor(props){
    // 3. super를 통해 상속받은 class, React.Component 즉 parent의 생성자를 먼저 실행한다. super를 먼저 실행해주어야 this.state, props를 사용할 수 있다.
    super(props);
    this.state = {
      value : 0
    }
    // 5. <button onClick={this.handleClick}>press me</button> 실행을 하게 되면 오류가 나는데 this가 뭔지 모르기 때문에 따로 bind를 해준다. 컨벤션상 render에 바인딩을 해주는 것 보다, constructor에 바인딩을 해주는것이 더 좋다.
    this.handleClick = this.handleClick.bind(this);
  }
  // 버튼이 실행될때 사용하는 method
  handleClick(){
    this.setState({
      value : this.state.value + 1
    })
  }
  
  render () {
    return (
        <div>
        <h2>{this.state.value}</h2>
        {/* 4. React에서 실행되는 method는 브라우져에서 실행되는 javascript native event와  똑같은 인터페이스를 가진다. 
        6. Click={this.handleClick()}를 넣으면 렌더링을 할 때마다 그 함수를 실행하는데 렌더링 > 함수 실행 > 렌더링 > 함수실행 등 문제가 발생한다.
        */}
        <button onClick={this.handleClick}>press me</button>
        </div>
    );
  }
}

class App extends React.Component {
  render() {
    return (
      <Counter/>
    );
  }
};

ReactDOM.render(
  <App></App>,
  document.getElementById("root")
);
```
[this.state = 의 좋지 못한 예](http://codepen.io/shuushu/pen/pELZaV)

### 비슷한 코드를 반복 하는 예제

