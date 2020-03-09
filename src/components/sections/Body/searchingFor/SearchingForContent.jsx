import React from 'react';
import Select from "react-select";
import { clearAllSelectedItems, getInteractedElements, getResults } from '../../../../functions/GeneralFunctions';
import { getGenderAction, getSaveElementsAction, getSaveTemporalSearchesAction, getServiceTypesAction, getTextAction } from '../../../../Store/Actions/actions';
import { SHOW_RESULTS } from '../../../../Store/Actions/types';
import store from '../../../../Store/store';
import { getDataWithText, getSearchByText, tagChange } from './functions';
import PreviousSearchesContent from './previousSearches/PreviousSearchesContent';
import ResultsContent from './Results/ResultsContent';

export default class SearchingForContent extends React.Component {

    state = {
        ...this.getCurrentStateFromStore(),
        showResults: false,
        data: {}
    };

    componentDidMount() {
        this.unsubscribeStore = store.subscribe(this.updateStateFromStore);
    }

    componentWillUnmount() {
        this.unsubscribeStore();
    }

    getCurrentStateFromStore() {
        const interacted = store.getState().Interacted;
        let interactedFinal = {}
        for (const obj in interacted) {
            if (interacted[obj].interacted) {
                interactedFinal[obj] = interacted[obj];
            }
        }
        return interactedFinal
    }

    updateStateFromStore = async () => {
        const originaData = this.getCurrentStateFromStore();
        const currentState = getDataWithText(originaData);
        const searchByText = getSearchByText(originaData);
        if (this.state !== currentState) {
            if (this.state.interacted) {
                if (this.state.interacted.length !== currentState.length) {
                    // this.clearResults();
                    await this.setState({
                        showResults: false
                    })
                }
            }
            await this.setState({ interacted: currentState, byText: searchByText.value, originaData: originaData, focus: true });
        }
    }

    openBox = async (category) => {
        switch (category) {
            case 'needs':
                window.$('#collapse_need').collapse('show');
                window.$('#searchMethodTab').tab('show');
                window.$('#searchMethodCollapse').collapse('show');
                break;
            case 'circumstances':
                window.$('#collapse_circumstances').collapse('show');
                window.$('#searchMethodTab').tab('show');
                window.$('#searchMethodCollapse').collapse('show');
                break;
            default: return;
        }
    }

    clearItems = async () => {
        await store.dispatch(getServiceTypesAction({
            value: '',
            label: ''
        }));
        this.setState({ byText: '' });
        return clearAllSelectedItems();
    }

    changeItems = async (value, action) => {
        if (action.action === 'clear') {
            await store.dispatch(getServiceTypesAction({
                value: '',
                label: ''
            }));
            return clearAllSelectedItems();
        }
        const storeAction = tagChange(value, action);
        await store.dispatch(getGenderAction({
            value: '',
            label: ''
        }));
        await store.dispatch(storeAction);
    }

    searchClick = async (e, page = 1, perPage = 10) => {
        e.preventDefault();
        await this.setState({ isFetching: true });
        await store.dispatch(getTextAction(!this.state.byText ? '' : this.state.byText));
        let interacted = await getInteractedElements(this.state.originaData, page, perPage);
        await store.dispatch(getSaveElementsAction(interacted));
        let results = await getResults(interacted.query);
        this.saveResults(interacted, results);
        this.gotoTopResults();
    }

    saveResults = (interacted, results) => {
        window.$('#historySearches').collapse('hide');
        store.dispatch(getSaveTemporalSearchesAction(results));
        store.dispatch({ type: SHOW_RESULTS, payload: true });
        this.setState({
            isFetching: false,
            query: interacted.query,
            results,
            data: interacted,
        });
    }

    changePage = async (page = 1, perPage = 10) => {
        await this.setState({ isFetching: true });
        let interacted = await getInteractedElements(this.state.originaData, page, perPage);
        let results = await getResults(interacted.query);
        this.saveResults(interacted, results);
    }

    gotoTopResults = (time = 200) => {
        window.$('html, body').animate({
            scrollTop: window.$(`#resultsDiv`).offset().top - 90
        }, time);
    }

    formatOptionLabel = (item) => (
        <div className="text-wrap" onClick={() => this.openBox(item.category)} key={`${item.category}`}>
            <p className="mb-0">{item.label}</p>
        </div>
    )

    render() {
        return (
            <>
                <div className="d-flex justify-content-end w-100 mt-3">
                    <button
                        disabled={!((this.state.interacted && this.state.interacted.length > 0) || (this.state.byText))}
                        className={`btn ${((this.state.interacted && this.state.interacted.length > 0) || (this.state.byText)) ? ('btn-danger') : ('btn-secondary')}`}
                        onClick={this.clearItems}>
                        Clear data
                        </button>
                </div>
                <form id="searchForm" onSubmit={this.searchClick}>
                    <div className="d-flex my-3">
                        <div className="d-flex flex-column col">
                            <div>
                                <Select
                                    className="mb-1"
                                    components={{ DropdownIndicator: () => null, IndicatorSeparator: () => null, Menu: () => null, }}
                                    isMulti={true}
                                    isClearable={true}
                                    value={this.state.interacted}
                                    formatOptionLabel={this.formatOptionLabel}
                                    isSearchable={false}
                                    placeholder='Searching for'
                                    onChange={(value, action) => this.changeItems(value, action)} />
                            </div>
                            <small className="text-muted">You can also optionally search for text in the service name:</small>
                            <input
                                id='searchInput'
                                type="text"
                                className="form-control"
                                placeholder="Insert text"
                                value={this.state.byText || ''}
                                onChange={(e) => this.setState({ byText: e.target.value })} />

                        </div>
                        <button type="submit" className="btn btn-success col-auto d-flex align-items-center" onClick={this.searchClick}>
                            <i className="material-icons p-0">search</i>
                            <p className="mb-0">Search</p>
                        </button>
                    </div>
                </form>
                <div id="resultsDiv">
                    {store.getState().tempSearches.showResults &&
                        <ResultsContent pagination={this.changePage} interacted={this.state.interacted} clearResults={() => store.dispatch({ type: SHOW_RESULTS, payload: false })} />
                    }
                </div>
                <div>
                    <PreviousSearchesContent />
                </div>
            </>
        )
    }
}