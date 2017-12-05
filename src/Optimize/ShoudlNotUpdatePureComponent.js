/**
 * Created by harry on 2017/12/4.
 */
import React from 'react';
class ShoudlNotUpdatePureComponent extends React.PureComponent{
    constructor(props){
        super(props);
        this.counter = 0;
    }

    render(){
        return (
            <p>I should be rendered only 1 time, actual times rendered: {++this.counter}</p>
        )
    }
}

export default ShoudlNotUpdatePureComponent;