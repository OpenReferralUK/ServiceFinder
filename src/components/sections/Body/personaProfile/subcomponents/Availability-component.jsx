import React from 'react';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import initial_data from '../../../../../config';
import { getAvailabilityAction } from '../../../../../Store/Actions/actions';
import store from '../../../../../Store/store';
import AlertModal from '../../../../shared/Elements/AlertModal';
import DropdownElement from '../../../../shared/Elements/DropdownElement';
import { getDateArray } from '../functions';

export default class AvailabilityComponent extends React.Component {

    state = this.getCurrentStateFromStore();

    componentDidMount() {
        this.unsubscribeStore = store.subscribe(this.updateStateFromStore);
    }

    componentWillUnmount() {
        this.unsubscribeStore();
    }

    getCurrentStateFromStore() {
        return {
            availability: store.getState().Interacted.availability,
        }
    }

    updateStateFromStore = () => {
        const currentState = this.getCurrentStateFromStore();
        if (this.state !== currentState) {
            this.setState(currentState);
        }
    }

    handleChangeDay = async (e, elem) => {
        const availability = this.state.availability;
        availability[elem] = e;
        await this.setState({
            availability: availability
        });
    }

    addDay = async () => {
        if ((this.state.availability.day) && (this.state.availability.time)) {
            if ((this.state.availability.day !== '') && (+this.state.availability.time >= 0)) {
                const res = await getDateArray(this.state.availability);
                this.saveDay(res);
            }
        }
    }

    deleteDay = async (value) => {
        let data = this.state.availability.data.filter(item => item.value !== value);
        this.saveDay(data);
    }

    saveDay = async (data) => {
        try {
            const action = getAvailabilityAction(data);
            await store.dispatch(action);
        } catch (e) {
            await this.setState({ error: JSON.stringify(e) });
            window.$('#availability').appendTo('body').modal('show');
        }
    }

    render() {
        return (
            <>
                <AlertModal name="availability" id="availability" error={this.state.error} />
                <div className="row mx-3">
                    <legend className="col-form-label d-flex">My availability:</legend>
                    <DropdownElement id="day" onChange={this.handleChangeDay} default={this.state.availability.day} class="col-xl-auto" placeholder="Choose Day" data={initial_data.persona_profile.days.day} />
                    <DropdownElement id="time" onChange={this.handleChangeDay} default={this.state.availability.time} class="col-xl-auto" placeholder="Choose Time" data={initial_data.persona_profile.days.time} />
                    <button type="button" className="col-xl-auto mx-3 mb-3 btn btn-secondary text-nowrap" onClick={this.addDay}>Add day</button>
                </div>
                <div className="row mx-3">
                    <ReactTable
                        className="w-100 bg-white rounded"
                        id="availability-table"
                        showPageSizeOptions={false}
                        showPagination={true}
                        defaultPageSize={5}
                        sortable={false}
                        resizable={false}
                        data={this.state.availability.data}
                        columns={[
                            {
                                Header: "Day",
                                accessor: "day.label"
                            },
                            {
                                Header: "Time",
                                accessor: "time.label",
                            },
                            {
                                Header: () => (
                                    <span className="custom-column">Actions</span>
                                ),
                                minWidth: 75,
                                maxWidth: 150,
                                id: 'click-me-button',
                                Cell: (data) => (
                                    <div className="d-flex justify-content-center">
                                        <button className="md-24 d-flex justify-content-center align-items-center" style={{ cursor: 'pointer', border: 'none', background: 'none' }} onClick={() => this.deleteDay(data.original.value)}><i className="material-icons">indeterminate_check_box</i></button>
                                    </div>
                                )
                            }
                        ]} />
                </div>
            </>
        )
    }
}