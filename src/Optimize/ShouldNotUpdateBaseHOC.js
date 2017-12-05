/**
 * Created by harry on 2017/12/4.
 */
import React from 'react';
//import {shallowEqual} from 'shouldcomponentupdate-children';
import {shallowEqual} from './ShallowEqualHOC';

class ShouldNotUpdateBaseHOC extends React.Component{
    constructor(props) {
        super(props);
        this.counter = 0;
    }

    shouldComponentUpdate(nextProps, nextState) {
        return shallowEqual(this.props, nextProps, this.state, nextState);
        //查看另外两种使用方法：https://github.com/NoamELB/shouldComponentUpdate-Children
    }

    render() {
        return (
            <div>
                <p>
                    I should be rendered only {(this.props.fiveTime.a ? this.props.fiveTime.a : 0) / 5 + 1} time. actual times
                    rendered: {++this.counter}
                </p>
                <a href="https://github.com/NoamELB/shouldComponentUpdate-Children" target="_blank">查看另外两种使用方法</a>
            </div>

        
            
        )
    }
}

export default ShouldNotUpdateBaseHOC;
