import React from 'react';
import Select from 'react-select';
import initial_data from '../../../config';
import { getProximityAction } from '../../../Store/Actions/actions';
import store from '../../../Store/store';
import InputElement from '../Elements/InputElement';


export default class ProximityComponent extends React.Component {
    state = {
        ...this.getCurrentStateFromStore(),
        isLoaded: false,
        moreMiles: false
    }

    async componentDidMount() {
        this.unsubscribeStore = store.subscribe(this.updateStateFromStore);
        await this.setState({
            isLoaded: true
        });
    }

    componentWillUnmount() {
        this.unsubscribeStore();
    }

    getCurrentStateFromStore() {
        return {
            proximity: store.getState().Interacted.proximity,
        }
    }

    updateStateFromStore = async () => {
        const currentState = this.getCurrentStateFromStore();
        if (this.state !== currentState) {
            await this.setState(currentState);
        }
        if (this.state.proximity && this.state.proximity.value === '') {
            this.setState({
                valueSelected: undefined,
                moreMiles: false
            })
        }
    }


    changeProximity = async (value) => {
        if (value === null) {
            value = { value: '', label: '' }
        }
        if (value.value !== -1) {
            if (value.value <= 3) {
                await this.setState({ moreMiles: false, valueSelected: value.value });
            } else {
                await this.setState({ moreMiles: true, valueSelected: value.value });
            }
            this.saveProximity(value)
        }
        else {
            await this.setState({ moreMiles: true });
            window.$('#proximityInput').focus();
        }
    }

    saveProximity = async (value) => {
        await store.dispatch(getProximityAction(value));
    }

    render() {
        return (
            <>
                {this.state.isLoaded &&
                    <div className="col">
                        <label htmlFor="proximityComponent" className="mb-0">Distance in miles (up to):</label>
                        <div id="proximityComponent" className="row px-0">
                            <div className="col-xl w-100">
                                <Select
                                    options={initial_data.persona_profile.proximity}
                                    isClearable={true}
                                    value={this.state.moreMiles ? { value: '-1', label: 'Other distance...' } :
                                        this.state.valueSelected ? this.state.proximity : null}
                                    onChange={this.changeProximity}
                                />
                            </div>
                            <div className="col-xl w-100" style={{ display: this.state.moreMiles ? 'flex' : 'none' }}>
                                <InputElement
                                    type="number"
                                    id="proximityInput"
                                    value={this.state.proximity ? this.state.proximity.value : ''}
                                    placeholder="Insert proximity"
                                    onChange={(value) => this.changeProximity(+value === 0 ? null : { value: +value, label: `${value} Miles` })}
                                />
                            </div>
                        </div>
                    </div>
                }
            </>
        )
    }
}