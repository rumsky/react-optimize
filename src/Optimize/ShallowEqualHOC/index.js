import React from 'react';

/*
* 比较的流程：
* 1. 如果this.state 和 next state 不相等 则 shouldComponentUpdate 返回 true
* 2. 如果this.props 和 next props 不相等而且当前比较的属性不是 React Elements 比如 this.props.child 则返回true
* 3.否则返回false (包括this.props===next props 且当前比较的属性对应的是 React Elements) ，即不进行Update
* 4.以上比较都是 shallow equal 即 浅比较
*
* */
export function useShallowEqual(WrappedComponent) {
    class ShallowEqualEnhancer extends WrappedComponent {
        shouldComponentUpdate(nextProps, nextState) {
            let shouldUpdate = false;
            if (!super.shouldComponentUpdate || super.shouldComponentUpdate(nextProps, nextState)) {
                shouldUpdate = shallowEqual(this.props, nextProps, this.state, nextState);
            }
            return shouldUpdate;
        }
    }
    ShallowEqualEnhancer.displayName = `ShallowEqualEnhanced${WrappedComponent.displayName || WrappedComponent.name || 'Component'}`;

    return ShallowEqualEnhancer;
}

/**
 * Use this function with your "this" in its context.
 * @example
 * return shouldComponentUpdate.call(this, nextProps, nextState);
 * @example
 * return shouldComponentUpdate.apply(this, [nextProps, nextState]);
 * @example
 * return shouldComponentUpdate.bind(this)(nextProps, nextState);
 * @param {Object} nextProps 
 * @param {Object} nextState 
 */
export function shouldComponentUpdate(nextProps, nextState) {
    return shallowEqual(this.props, nextProps, this.state, nextState);
}

/**
 * @param {Object} thisProps 
 * @param {Object} nextProps 
 * @param {Object} thisState 
 * @param {Object} nextState 
 */
export function shallowEqual(thisProps, nextProps, thisState, nextState) {
    return !shallowEqualState(thisState, nextState) || !shallowEqualWithoutReactElements(thisProps, nextProps);
}

/**
 * @param {Object} thisState
 * @param {Object} nextState
 * @returns {Boolean}
 */
export function shallowEqualState(thisState, nextState) {
    return thisState === nextState
}

/**
 * Perform a shallow equal to every prop that is not a React Element
 * This will return true for unchanged props (where the only changes are the react elements props like 'children')
 * @param {Object} thisProps
 * @param {Object} nextProps
 * @returns {Boolean}
 */
export function shallowEqualWithoutReactElements(thisProps, nextProps) {
    let equals = false;
    if (thisProps === nextProps) {
        equals = true;
    } else if (typeof thisProps === 'object' && typeof nextProps === 'object') {
        equals = true;
        const propNames = new Set(Object.keys(thisProps), Object.keys(nextProps));
        for (const propName of propNames) {
            if (thisProps[propName] !== nextProps[propName] && !isReactElement(thisProps[propName])) {
                // No need to check nextProps[propName] as well, as we know they are not equal
                equals = false;
                console.log(`shallowEqualWithoutReactElements return ${equals}, 
                thisProps is ${(thisProps.fiveTime.a)} 
                nextProps is ${(nextProps.fiveTime.a)}`);
                break;
            }
        }
    }
    console.log(`shallowEqualWithoutReactElements return ${equals}, 
                thisProps is ${(thisProps.fiveTime.a)} 
                nextProps is ${(nextProps.fiveTime.a)}`);
    return equals;
}

/**
 * If the provided argument is a valid react element or an array that contains at least
 * one valid react element in it
 * @param {*} suspectedElement
 * @returns {Boolean}
 */
function isReactElement(suspectedElement) {
    let isElem = false;
    if (React.isValidElement(suspectedElement)) {
        isElem = true;
    } else if (Array.isArray(suspectedElement)) {
        for (let i = 0, l = suspectedElement.length; i < l; i++) {
            if (React.isValidElement(suspectedElement[i])) {
                isElem = true;
                break;
            }
        }
    }
    return isElem;
}