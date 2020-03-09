import React, { Component } from 'react';

import SmallBody from './SmallBody';
import BigBody from './BigBody';
import store from '../../../Store/store';

export default class Body extends Component {

    state = {
        windowWidth: 0,
    }

    componentDidMount() {
        this.updateWindowDimensions();
        window.addEventListener('resize', this.updateWindowDimensions);
        store.dispatch({ type: 'SET_HOME' });
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.updateWindowDimensions);
    }

    updateWindowDimensions = () => {
        this.setState({ windowWidth: window.innerWidth });
        this.forceUpdate();
    }

    render() {
        return (
            <>
                {this.state.windowWidth >= 992 ?
                    <div>
                        <BigBody />
                    </div>
                    :
                    <div>
                        <SmallBody />
                    </div>
                }
            </>
        )
    }
}