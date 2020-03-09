import { css } from '@emotion/core';
import React from 'react';
import { getAddFavouriteServiceAction, getSaveButtonForModal, getSaveItemIdAction, getUpdateFavouriteServiceAction } from '../../../../../Store/Actions/actions';
import store from '../../../../../Store/store';
import ResultsCard from './ResultsCard';
import ResultsContentPagination from './ResultsContentPagination';

class ResultsContent extends React.Component {

    override = css`
    display: flex;
    align-items: flex-start;
    justify-content: center;
    margin: 150px auto auto auto;
    height: 40vh;
`;

    state = {
        ...this.getCurrentStateFromStore(),
        page: 1,
        perPage: 10,
        item: '',
        isModalLoaded: false,
    }

    componentDidMount() {
        this.unsubscribeStore = store.subscribe(this.updateStateFromStore);

    }

    componentWillUnmount() {
        this.unsubscribeStore();
    }

    getCurrentStateFromStore() {
        return {
            results: store.getState().tempSearches.searches,
            favourites: store.getState().FavouritesServiceReducer
        }
    }

    updateStateFromStore = async () => {
        const currentState = this.getCurrentStateFromStore();
        await this.setState(currentState);
    }

    showModal = async (item) => {
        await store.dispatch(getSaveItemIdAction(item.id));
        store.dispatch(getSaveButtonForModal('search'));
        window.$(`#serviceModal`).modal('show');
    }

    changePage = (page) => {
        this.setState({
            page
        })
        this.props.pagination(page, this.state.perPage);
    }

    changePagination = (value) => {
        this.setState({
            page: 1,
            perPage: value.target.value
        });
        this.props.pagination(1, value.target.value);
    }

    getPagination = () => {
        if (this.state.results.totalPages > 1) {
            if (this.state.results.totalPages === 2) {
                if (this.state.page === 1) {
                    return (
                        <>
                            <li className="page-item cursor-pointer active" onClick={() => this.changePage(1)}><button className="page-link mb-0">1</button></li>
                            <li className="page-item cursor-pointer" onClick={() => this.changePage(2)}><button className="page-link mb-0">2</button></li>
                        </>
                    )
                } else {
                    return (
                        <>
                            <li className="page-item cursor-pointer" onClick={() => this.changePage(1)}><button className="page-link mb-0">1</button></li>
                            <li className="page-item cursor-pointer active" onClick={() => this.changePage(2)}><button className="page-link mb-0">2</button></li>
                        </>
                    )
                }
            } else if (this.state.results.totalPages >= 3) {
                if ((this.state.results.number !== this.state.results.totalPages) && (this.state.results.number > 1)) {
                    return (
                        <>
                            <li className="page-item cursor-pointer"><button type="button" className="page-link" onClick={() => this.changePage(1)}>&laquo;</button></li>
                            <li className="page-item cursor-pointer" onClick={() => this.changePage(this.state.results.number - 1)}><button className="page-link mb-0">{this.state.results.number - 1}</button></li>
                            <li className="page-item cursor-pointer active" onClick={() => this.changePage(this.state.results.number)}><button className="page-link mb-0">{this.state.results.number}</button></li>
                            <li className="page-item cursor-pointer" onClick={() => this.changePage(this.state.results.number + 1)}><button className="page-link mb-0">{this.state.results.number + 1}</button></li>
                            <li className="page-item cursor-pointer"><button type="button" className="page-link" onClick={() => this.changePage(this.state.results.totalPages)}>&raquo;</button></li>
                        </>
                    )
                } else if (this.state.results.number === this.state.results.totalPages) {
                    return (
                        <>
                            <li className="page-item cursor-pointer"><button type="button" className="page-link" onClick={() => this.changePage(1)}>&laquo;</button></li>
                            <li className="page-item cursor-pointer" onClick={() => this.changePage(this.state.results.number - 2)}><button className="page-link mb-0">{this.state.results.number - 2}</button></li>
                            <li className="page-item cursor-pointer" onClick={() => this.changePage(this.state.results.number - 1)}><button className="page-link mb-0">{this.state.results.number - 1}</button></li>
                            <li className="page-item cursor-pointer active" onClick={() => this.changePage(this.state.results.number)}><button className="page-link mb-0">{this.state.results.number}</button></li>
                            <li className="page-item cursor-pointer disabled"><button type="button" className="page-link">&raquo;</button></li>
                        </>
                    )
                } else if (this.state.results.number === 1) {
                    return (
                        <>
                            <li className="page-item cursor-pointer disabled"><button type="button" className="page-link">&laquo;</button></li>
                            <li className="page-item cursor-pointer active" onClick={() => this.changePage(this.state.results.number)}><button className="page-link mb-0">{this.state.results.number}</button></li>
                            <li className="page-item cursor-pointer" onClick={() => this.changePage(this.state.results.number + 1)}><button className="page-link mb-0">{this.state.results.number + 1}</button></li>
                            <li className="page-item cursor-pointer" onClick={() => this.changePage(this.state.results.number + 2)}><button className="page-link mb-0">{this.state.results.number + 2}</button></li>
                            <li className="page-item cursor-pointer"><button type="button" className="page-link" onClick={() => this.changePage(this.state.results.totalPages)}>&raquo;</button></li>
                        </>
                    )
                }
            }
        }
    }

    closeModal = async () => {
        await window.$("#modalInfo").modal('hide');
    }

    updateFavourite = async (item) => {
        let isFavItem = this.state.favourites.filter(favItem => favItem.id === item.id)[0];

        if (!isFavItem) await store.dispatch(getAddFavouriteServiceAction(item));
        else await store.dispatch(getUpdateFavouriteServiceAction(item));
        this.forceUpdate();
    }

    render() {
        return (
            <>
                <div>
                    {this.state.results &&
                        <>
                            <div className="container my-2" id="results">
                                <div className="mb-0 mt-4 w-100 d-flex align-items-center justify-content-between">
                                    <h4 className="mb-0">Results ({this.state.results.totalElements}):</h4>
                                    <button className="btn btn-danger" onClick={this.props.clearResults}>
                                        Clear Results
                            </button>
                                </div>
                                <hr className="my-2" />
                                <div>
                                    <div className="row d-flex align-items-center justify-content-between mb-2">
                                        {/* Results per page */}
                                        <ResultsContentPagination
                                            results={this.state.results}
                                            perPage={this.state.perPage}
                                            changePagination={this.changePagination}
                                        />
                                    </div>

                                    {/* Results */}
                                    <div className="accordion mb-4" id="accordionResults">
                                        <ResultsCard
                                            results={this.state.results}
                                            favourites={this.state.favourites}
                                            showModal={this.showModal}
                                            updateFavourite={this.updateFavourite}
                                        />
                                    </div>
                                    {/* Pagination */}
                                    <nav aria-label="Page navigation example" className="col-xl-auto my-2">
                                        <ul className="pagination justify-content-center align-items-center mb-0">
                                            {this.getPagination()}
                                        </ul>
                                    </nav>
                                </div>
                            </div>
                        </>

                    }
                </div>
            </>
        )
    }
}

export default ResultsContent;