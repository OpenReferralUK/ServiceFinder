import classNames from 'classnames';
import React from 'react';
import { getAgeAction } from '../../../../../Store/Actions/actions';
import store from '../../../../../Store/store';
import AlertModal from '../../../../shared/Elements/AlertModal';



export default class AgeComponent extends React.Component {
    state = {
        ...this.getCurrentStateFromStore(),
        isLoaded: false,
        minAge: '',
        maxAge: ''
    }

    classNameList = classNames("d-flex justify-content-between align-items-center form-control", { "ml-3": !this.mobile });

    componentDidMount() {
        this.classNameList = classNames("d-flex justify-content-between align-items-center form-control", { "ml-3": !this.mobile }, { "input-disabled": this.state.elementSelected === 0 ? true : false });
        this.unsubscribeStore = store.subscribe(this.updateStateFromStore);
        this.setState({ isLoaded: true });
    }

    componentWillUnmount() {
        this.unsubscribeStore();
    }

    getCurrentStateFromStore() {
        return {
            age: store.getState().Interacted.age,
        }
    }

    updateStateFromStore = async () => {
        const currentState = this.getCurrentStateFromStore();
        await this.setState({ ...currentState });
        if (!this.state.age.interacted) {
            await this.setState({
                minAge: '',
                maxAge: ''
            })
        }
    }

    handleChange = async (e) => {
        try {
            let value = e.target.value;
            if (value > 100) value = "100";
            if (e.target.id === "minAge") {
                await this.setState({
                    minAge: value ? parseInt(value) : ''
                })
            } else {
                await this.setState({
                    maxAge: value ? parseInt(value) : ''
                })
            }
            this.checkValues(value);
        } catch (e) {
            await this.setState({ error: JSON.stringify(e) });
            window.$('#age').appendTo('body').modal('show');
        }
    }

    toggleRangeView = async () => {
        await this.setState({
            showRange: !this.state.showRange,
            maxAge: ''
        });
        this.checkValues();
    }

    checkValues = async (value = '') => {
        if ((this.state.maxAge !== '') && (this.state.maxAge <= this.state.minAge)) return await this.setState({ errorInRange: true });
        else {
            this.setState({ errorInRange: '' });
            if ((this.state.showRange) && (this.state.maxAge !== '')) value = [this.state.minAge.toString(), this.state.maxAge.toString()];
            else {
                if (this.state.minAge !== '') {
                    value = this.state.minAge.toString();
                } else {
                    value = '';
                }
            }
            await store.dispatch(getAgeAction(value));
        }
    }

    render() {
        this.mobile = window.innerWidth < 767;
        return (
            <>
                <AlertModal name="age" id="age" error={this.state.error} />
                {
                    this.state.isLoaded &&
                    <>
                        <div className="col mb-2">
                            <label htmlFor="ageComponent" className="mb-0">Age:</label>
                            <div id="ageComponent" className="d-flex">
                                <input
                                    id="minAge"
                                    type="number"
                                    value={(this.state.age && this.state.age.interacted) && this.state.minAge || ''}
                                    onChange={this.handleChange}
                                    className={`form-control ${this.state.showRange ? `col-4` : `col-6`}`}
                                    placeholder={this.state.showRange ? "Type min age..." : 'Type age...'} />
                                {this.state.showRange ?
                                    <div className="col-8 d-flex justify-content-between">
                                        <input
                                            id="maxAge"
                                            type="number"
                                            value={(this.state.age && this.state.age.interacted) && this.state.maxAge || ''}
                                            onChange={this.handleChange}
                                            className={`form-control col-6 mr-1 ${this.state.errorInRange && `is-invalid`}`}
                                            placeholder="Type max age..." />
                                        <button className="col-6 btn btn-outline-danger ml-1" onClick={this.toggleRangeView}>Clear range</button>
                                    </div>
                                    :
                                    <div className="col-auto">
                                        <button className="btn btn-secondary" onClick={() => this.setState({ showRange: !this.state.showRange })}>Add range</button>
                                    </div>
                                }
                            </div>
                        </div>
                    </>
                }
            </>
        )
    }
}