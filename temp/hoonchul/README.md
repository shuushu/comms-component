# react

##1강 연습 (10/18)

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