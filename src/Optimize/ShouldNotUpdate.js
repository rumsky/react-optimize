/**
 * Created by harry on 2017/12/4.
 */
import React from 'react';
import shallowCompare from 'react-addons-shallow-compare';
class ShouldNotUpdate extends React.Component {
    constructor(props) {
        super(props);
        this.counter = 0;
    }

    shouldComponentUpdate(nextProps, nextState) {
        return this.props.children !==nextProps.children;
        //return shallowCompare(this, nextProps, nextState);

    }

    render() {
        return (
            <p>
                I should be rendered only {(this.props.fiveTime ? this.props.fiveTime : 0) / 5 + 1} time. actual times
                rendered: {++this.counter}
            </p>
        )
    }


}

export default ShouldNotUpdate;
