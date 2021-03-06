# react

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->


- [Lesson1. JSX syntax / props (10/08)](#lesson1-jsx-syntax--props-1008)
- [Lesson2. this.state (10/08)](#lesson2-thisstate-1008)
- [Lesson3. 작업환경 셋팅하기](#lesson3-%EC%9E%91%EC%97%85%ED%99%98%EA%B2%BD-%EC%85%8B%ED%8C%85%ED%95%98%EA%B8%B0)
- [Lesson4. 주소록](#lesson4-%EC%A3%BC%EC%86%8C%EB%A1%9D)
  - [Component LifeCycle API Method](#component-lifecycle-api-method)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->


## Lesson1. JSX syntax / props (10/08)
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
## Lesson2. this.state (10/08)

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


>Lesson2-1 비슷한 코드를 반복 하는 예제

>[react : component Mapping](http://codepen.io/shuushu/pen/NRYpBw)

```javascript
class ContactInfo extends React.Component {
  render(){
    return(
      <div>{this.props.address.name} / {this.props.address.phone}</div>
    );
  }
}

class Component extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      // 주소록 데이터
      contactData : [
        {name: 'Abet', phone: '010-5437-8601' },
        {name: 'Betty', phone: '011-5437-8601' },
        {name: 'Chris', phone: '016-5437-8601' },
        {name: 'David', phone: '017-5437-8601' },
        {name: 'Ember', phone: '019-5437-8601' }
      ]      
    }
  }
  render(){
    // 2. 렌더링 내부에 또 다른 함수를 만든다.
    const mapToComponent = (data) => {
      // 새로운 배열을 받아 리턴한다.
      // contact : data배열의 값을 받는다, i는 index
      return data.map((contact,i) => {
        // 컴포넌트를 리턴한다.
        // key : 각 데이터의 식별자
        return (<ContactInfo address={contact} key={i} />)
      }) 
    };
    
    return(
      // 1.mapToComponent함수를 실행한다 
      <div>
        {mapToComponent(this.state.contactData)}
      </div>
    );
  };
}

class App extends React.Component {
  render(){
    return(<Component / >);
  }
}
        
ReactDOM.render(<App/>,document.getElementById('root'))
```

## Lesson3. 작업환경 셋팅하기
>주의: Node.js를 설치 한 다음에, npm install -g npm 을 통하여 npm 버전을 최신버전으로 업데이트하세요. LTS 버전에서는 지금은 NPM을 2.15.9 을 사용하는데, 이는 모듈을 설치할때 nested 된 구조로 설치하기 때문에 React.js 프로젝트를 만들땐 정말, 정말, 오래걸립니다. (babel-preset-es2015 설치 할 때). 위 명령어로 최신버전인 3.10.6 을 사용하면 모듈설치가 훨씬 빨라집니다. (node_modules 의 용량차이가 어마어마합니다. babel-preset-es2015 의 경우 6.14MB, 구버전 NPM을 사용 했을땐, 144MB)
[작업환경 설치 안내](https://velopert.com/1980)

클라우드형 IDE 

- 1. https://nitrous.io/ (한달에 50시간 밖에 켜놓지 못한다.)
- 2. https://c9.io/ (또 다른 클라우드형 IDE, 가입할 때 VISA 카드 필요)
- 3. http://goorm.io (한국형IDE-인터넷속도가 제한이 되어있다)
- 4. http://codeanywhere.com (포트를 1개 밖에 열수 없는 단점)

설치 모듈

- webpack: 브라우저 위에서 import(require) 를 할 수 있게 해주고 자바스크립트 파일들을 하나로 합쳐줍니다
- webpack-dev-server: 별도의 서버를 구축하지 않고도 static 파일을 다루는 웹서버를 열 수 있으며 hot-loader 를 통하여 코드가 수정 될 때마다 자동으로 리로드 되게 할 수 있습니다.

```javascript
npm install --save react react-dom
```
> --save가 있어야 react react-dom를 package.json에 파일을 추가 한다.

개발 의존  모듈 설치
```javascript
npm install --save-dev react-hot-loader webpack webpack-dev-server
npm install --save-dev babel-core babel-loader babel-preset-es2015 babel-preset-react 
```
> --save-dev가 붙는데 개발과정에 필요한 패키지들인데, dev가 없어도 실행은 되나 나중에 패키지 관리할때 불편함이 따른다. react-hot-loader : 개발서버가 실행중에 특정 react가 변경되는 부분만 업데이트 해준다.

Hot Module Replacement | React Hot Loader (10/10)

> 주의: 최근 react-hot-loader 가 업데이트 되어서, 그냥 설치하시면 “react-hot-loader”: “^3.0.0-beta.3” 가 설치됩니다.
설치 하실 때, npm install --save react-hot-loader@1.3.0 을 하시거나, 버전 3을 쓰고 싶다면 webpack.config.js 와 src/index.js 파일 수정을 다음과 같이 하세요:
https://gist.github.com/velopert/c5b1f5f748d9aa8b78f729a321682230



Links:
– https://github.com/velopert/react-cod… (프로젝트 초기 코드)
– https://velopert.com/2037 (쉽게 프로젝트를 만들 수 있는 create-react-app 사용기)

## Lesson4. 주소록

> 코드내 주석으로 표시

- 4-1. 검색기능
- 4-2. 선택기능 구현
- 4-3. 추가/수정/삭제/수정 구현
- 4-4. Cotact 엑시트라 기능 구현
- 4-5. Component LifeCycle API
> LifeCycle API는 컴포넌트가 DOM위에 생성되기 전과 후 그리고 데이터가 변경되어 상태를 업데이트 하기 전과 후 그다음 컴포넌트가 DOM에서 사라지기전에 실행되는 method이다.

### Component LifeCycle API Method
> constructor : 컴포넌트가 처음 만들어질때 실행/ 기본 state를 설정 할 수 있다.
```javascript
constructor(props){
  super(props);
  colsoe.log('constructor');
}
```
> componentWillMount : 컴포넌트가 DOM 위에 만들어지기 전에 실행된다
/ 여기서는 DOM처리를 할수 없다.
```javascript
componentWillMount(){
  console.log('componentWillMount');
}
```
> componentDidMount : 첫 렌더링 마치고 실행, 이안에서 다른 자바스크립트 프레임워크 연동 및 setTimeout, setInterval 및 Ajax사용 또한 DOM처리를 할 수 있다.
```javascript
componentDidMount(){
  console.log('componentDidMount');
}
```
> componentWillReceiveProps : 컴포넌트가 새로운 props를 받았을때 실행된다. props에 따라 state를 업데이트 할때 유용, 이안에서 setState를 사용해도 괜찮다.
```javascript
componentWillReceiveProps(nextProps){
  console.log('componentWillRecevieProps:' + JSON.stringify(nextProps));
}
```
> shouldComponentUpdate : 컴포넌트가 업데이트 실행여부 결정,
props/state 가 변경되었을 때 리렌더링을 할지말지 정한다
실제로 사용 할 때 는 필요한 비교를 하고 값을 반환해야 한다
예: return nextProps.id !== this.props.id
JSON.stringify 를 사용하여 여러 field 를 편하게 비교
```javascript
shouldComponentUpdate(nextProps, nextState){
    console.log("shouldComponentUpdate: " + JSON.stringify(nextProps) + " " + JSON.stringify(nextState));
    return true;
}
```
> componentWillUpdate : 컴포넌트가 업데이트가 실행되기 전, 
여기서 setState 절대 사용하지 말 것. 무한루프에 빠진다.
```javascript
componentWillUpdate(nextProps, nextState){
    console.log("componentWillUpdate: " + JSON.stringify(nextProps) + " " + JSON.stringify(nextState));
}
```
> componentDidUpdate : 컴포넌트가 업데이트가 실행된 후, 여기서도 setState 사용 하지 말 것
```javascript
componentDidUpdate(prevProps, prevState){
    console.log("componentDidUpdate: " + JSON.stringify(prevProps) + " " + JSON.stringify(prevState));
}
```
> componentWillUnmount : 컴포넌트가 DOM 에서 사라진 후 실행된다
```javascript
componentWillUnmount(){
    console.log("componentWillUnmount");
}
```
[예제](https://codepen.io/velopert/pen/OXRbRj)

![](https://s3.amazonaws.com/media-p.slid.es/uploads/530172/images/2936545/final.png)
