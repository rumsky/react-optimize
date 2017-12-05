import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import ShouldNotUpdate from './Optimize/ShouldNotUpdate'
import ShouldNotUpdatePureComponent from './Optimize/ShoudlNotUpdatePureComponent'
import ShouldNotUpdateBaseHOC from './Optimize/ShouldNotUpdateBaseHOC'
import BaseCollapse from './Optimize/ScaleUp/BaseCollapse'
let counteri = 0;
class App extends Component {

    constructor(props) {
        super(props);
        this.state = {isOpen: false};
        this.toggle = () => this.setState(s => ({isOpen: !s.isOpen}));

    }

    componentDidMount() {
        this.callMe();
    }

    callMe = () => {
        counteri++;
        if (counteri % 5 === 0) {
            this.setState({fiveTime: counteri});
        }
        console.log(counteri);
        console.log(counteri % 5);
        this.setState({time: Date.now()});
        setTimeout(this.callMe, 1000)
    }

    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo"/>
                    <h1 className="App-title">How to improve react app performence</h1>
                </header>
                {true && <div>
                    <h3>React Element Comparision</h3>
                        <ShouldNotUpdate fiveTime={this.state.fiveTime}>
                            <div/>
                    </ShouldNotUpdate>
                </div>}
                {false && <div>
                    <h3>PureComponent</h3>
                    <ShouldNotUpdatePureComponent fiveTime={this.state.fiveTime}>
                        <div/>
                    </ShouldNotUpdatePureComponent>
                </div>}
                {true && <div>
                    <h3>Based HOC II</h3>
                    <ShouldNotUpdateBaseHOC fiveTime={this.state.fiveTime}>
                        <div/>
                    </ShouldNotUpdateBaseHOC>
                </div>}
                {false  &&
                <div>
                    <h3>base collpase</h3>
                    <BaseCollapse/>
                </div>
                }
                {
                    false && <div>
                        <button onClick={this.toggle} style={buttonStyle}>Press me to toggle all</button>
                        <br/><br/>
                        {(new Array(200)).fill(0).map(() => <BaseCollapse isOpen={this.state.isOpen}/>)}
                    </div>
                }

            </div>
        );
    }
}

const buttonStyle = {fontSize: '28px', display: 'block', margin: 'auto'};

export default App;
