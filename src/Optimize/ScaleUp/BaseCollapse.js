/**
 * Created by harry on 2017/12/4.
 */
import React from 'react';
import fastdom from 'fastdom'
class BaseCollapse extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpen: props.isOpen
        };
        this.setContentRef = r => this.contentEl = r;
        this.setContainerRef = r => this.containerEl = r;
        this.toggle = () => this.setState(s => ({isOpen: !s.isOpen}));
    }
    componentWillReceiveProps(nextProps) {
        if(nextProps.isOpen !== this.props.isOpen && nextProps.isOpen !== this.state.isOpen) {
            this.toggle();
        }
    }
    componentDidMount() {

        this.updateHeight(this.state.isOpen);
    }

    componentDidUpdate() {
        this.updateHeight(this.state.isOpen);
    }

    updateHeight(isOpen) {
        if (isOpen) {
            this.containerEl.style.height = `${this.contentEl.scrollHeight}px`;
        } else {
            this.containerEl.style.height = '0px';
        }
    }

   /* updateHeight(isOpen) {
        this.lastRAF && cancelAnimationFrame(this.lastRAF);
        if (isOpen) {
            this.lastRAF = requestAnimationFrame(() => {
                const height =`${this.contentEl.scrollHeight}px`;
                this.lastRAF = requestAnimationFrame(() => {
                    this.lastRAF = requestAnimationFrame(() => {
                        this.containerEl.style.height = height;
                        this.lastRAF = null;
                    });
                });
            });
        } else {
            this.containerEl.style.height = '0px';
        }
    }*/

   /* updateHeight(isOpen){
        let eHeight=0;
        fastdom.measure(() => {
            eHeight=this.contentEl.scrollHeight;
        });

        fastdom.mutate(() => {
            if (isOpen) {
                this.containerEl.style.height = `${eHeight}px`;
            } else {
                this.containerEl.style.height = '0px';
            }
        });

    }*/

    render() {
        return (
            <div style={mainStyle}>
                <div onClick={this.toggle} style={toggleStyle}>Click me to open/close</div>
                <div ref={this.setContainerRef} style={containerStyle}>
                    <div ref={this.setContentRef} style={contentStyle}>
                        Inner content<br/>Inner content<br/>Inner content<br/>Inner content<br/>Inner content<br/>
                        Inner content<br/>Inner content<br/>Inner content<br/>Inner content<br/>Inner content<br/>
                    </div>
                </div>
            </div>
        );
    }
}

const mainStyle = {fontFamily: '"Lato", "Lucida Grande", "Lucida Sans Unicode", Tahoma, Sans-Serif', border: '1px solid black', display: 'inline-block', padding: '0 15px', borderRadius: '4px'};
const toggleStyle = {padding: '15px', cursor: 'pointer'};
const containerStyle = {transition: 'all 0.5s ease', overflow: 'hidden'};
const contentStyle = {paddingBottom: '15px'};

BaseCollapse.defaultProps = {
    isOpen: false
};

export default BaseCollapse;
