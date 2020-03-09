import React from 'react';
import { getClearAllSearchesAction } from '../../../../../Store/Actions/actions';
import store from '../../../../../Store/store';
import PreviousSearchCard from './PreviousSearchCard';

export default class PreviousSearchesContent extends React.Component {

    state = this.getCurrentStateFromStore();

    async componentDidMount() {
        this.unsubscribeStore = store.subscribe(this.updateStateFromStore);
    }

    componentWillUnmount() {
        this.unsubscribeStore();
    }

    getCurrentStateFromStore() {
        return {
            searches: store.getState().SearchesReducer
        }
    }

    updateStateFromStore = async () => {
        const currentState = this.getCurrentStateFromStore();
        if (this.state !== currentState) {
            await this.setState(currentState);
        }
    }

    clearPreviousSearches = async () => {
        try {
            await store.dispatch(getClearAllSearchesAction());
        } catch (error) {
            console.log('Error(clearPreviousSearches): ', error);
        }
    }

    render() {
        return (
            <>
                <div className="my-1">
                    {this.state.searches &&
                        this.state.searches.length > 0 ?
                        <>
                            <div className="card previousSearches" id="previousSearchesComponent">
                                <button className="card-header border-0 w-100 p-0 panel-title cursor-pointer" id="previousSearchesHeading" data-toggle="collapse" data-target="#historySearches" aria-expanded="false" aria-controls="historySearches">
                                    <span className="btn_content" tabIndex="-1">
                                        <div className="d-flex flex-column align-items-start">
                                            <h5 className="mb-0">Search history</h5>
                                        </div>
                                    </span>
                                </button>
                                <div id="historySearches" className="collapse" aria-labelledby="personaProfilleHeading" data-parent="#previousSearchesComponent">
                                    <div className="card-body">
                                        <div className="accordion" id="searchesAccordion">
                                            <div className="d-flex w-100 justify-content-end">
                                                <button type="button" className="btn btn-danger" onClick={() => this.clearPreviousSearches()}>Clear history</button>
                                            </div>
                                            <ul className="list-group mt-2">
                                                {this.state.searches.map((item, i) => (
                                                    <li className="list-group-item">
                                                        <PreviousSearchCard item={item} index={i} />
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </>
                        :
                        <div className="w-100 d-flex justify-content-center my-3">
                            <h5 className="text-black-50">No previous searches</h5>
                        </div>
                    }
                </div >
            </>
        )
    }
}