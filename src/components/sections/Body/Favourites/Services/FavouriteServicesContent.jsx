import React from 'react';
import { withRouter } from 'react-router-dom';
import { CLEAR_ALL_FAVOURITES_SERVICES } from '../../../../../Store/Actions/types';
import store from '../../../../../Store/store';
import { MODAL_SERVICE_LIST_COPIED } from '../../../../modal/ActionModal';
import ModalInfo from '../../../../shared/Elements/ModalInfo';
import { getHTMLServicesList, textToClipboard } from '../functions';
import FavouriteServiceCard from './FavouriteServiceCard';

class FavouriteServicesContent extends React.Component {

    state = this.getCurrentStateFromStore();

    async componentDidMount() {
        this.unsubscribeStore = store.subscribe(this.updateStateFromStore);
    }

    componentWillUnmount() {
        this.unsubscribeStore();
    }

    getCurrentStateFromStore() {
        return {
            favourites: store.getState().FavouritesServiceReducer
        }
    }

    updateStateFromStore = async () => {
        const currentState = this.getCurrentStateFromStore();
        if (this.state !== currentState) {
            await this.setState(currentState);
        }
    }

    clearFavouritesServices = async () => {
        try {
            await store.dispatch({ type: CLEAR_ALL_FAVOURITES_SERVICES });
        } catch (e) {
            console.log(e);
        }
    }

    copyServiceList = async () => {
        await getHTMLServicesList(this.state.favourites.slice());
        window.$(`#${MODAL_SERVICE_LIST_COPIED.id}`).modal('show');
    }

    sendServiceList = async () => {
        window.$('#textCopied').appendTo('#divButtonsFavList').modal('hide');
        let items = store.getState().FavouritesServiceReducer;
        let finalList = '';
        items.map((item, i) => {
            return finalList = finalList + `${item.id}&`;
        });
        this.props.history.push("/service-list/" + finalList + "/" + window.location.search);
    }

    copyShareLink = async () => {
        let items = store.getState().FavouritesServiceReducer;
        let finalList = '';
        this.moreThanTen = false;
        items.map((item, i) => {
            if (i < 9) {
                return finalList = finalList + `${item.id}&`;
            } else {
                return this.moreThanTen = true;
            }
        });
        let baseURL = window.location.origin;
        let finalURL = `${baseURL}/service-list/${finalList}`;
        if (textToClipboard(finalURL)) {
            window.$('#textCopied').appendTo('body').modal('show');
        }
    }

    closeTextCopiedModal = () => {
        window.$('#textCopied').appendTo('#divButtonsFavList').modal('hide');
        window.$('#servicesCopied').appendTo('#divButtonsFavList').modal('hide');
    }

    render() {
        return (
            <>
                {/* Modals */}
                <ModalInfo payload={MODAL_SERVICE_LIST_COPIED} />

                <div className="container my-3">
                    {this.state.favourites.length > 0 ?
                        <div className="accordion mb-4" id="accordionServicesFavourites">
                            <div className="d-flex w-100 justify-content-between mb-2 row mx-0">
                                <div className=" col-sm-6 px-0" id="divButtonsFavList">
                                    <div className={`d-flex justify-content-${window.innerWidth < 576 ? 'end mb-2' : 'start'} w-100`}>
                                        <div>
                                            <button type="button" className=" btn btn-secondary d-flex justify-content-center" onClick={() => this.copyServiceList()}>
                                                <i className="material-icons ">file_copy</i>
                                            </button>

                                        </div>
                                        <div>
                                            <button
                                                type="button"
                                                className="ml-1 btn btn-secondary d-flex justify-content-center"
                                                onClick={() => this.sendServiceList()}>
                                                <i className="material-icons">print</i>
                                            </button>
                                        </div>
                                        <div>
                                            <button
                                                type="button"
                                                className="ml-1 btn btn-secondary d-flex justify-content-center"
                                                onClick={() => this.copyShareLink()}>
                                                <i className="material-icons">share</i>
                                            </button>
                                            {/* Modal */}
                                            <div className="modal fade" id="textCopied" tabIndex="-1" role="dialog" aria-labelledby="textCopied" aria-hidden="true">
                                                <div className="modal-dialog" role="document">
                                                    <div className="modal-content border-success">
                                                        <div className="card-header">
                                                            <h3 className="mb-0">Text copied!</h3>
                                                        </div>
                                                        <div className="modal-body">
                                                            <p className="mb-0">A share link has been copied to your clipboard.</p>
                                                            {this.moreThanTen &&
                                                                <small>We can only share up to 10 services.</small>
                                                            }
                                                        </div>
                                                        <div className="modal-footer">
                                                            <button type="button" className="btn btn-link" onClick={this.sendServiceList} data-dismiss="modal">View page</button>
                                                            <button type="button" className="btn btn-secondary" onClick={this.closeTextCopiedModal}>Close</button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-sm-6 pr-0">
                                    <div className="d-flex justify-content-end w-100">
                                        <button type="button" className="ml-1 btn btn-danger" onClick={() => this.clearFavouritesServices()}>Clear Services</button>
                                    </div>
                                </div>
                            </div>

                            {this.state.favourites.map((item, i) => (
                                <FavouriteServiceCard item={item} index={i} favourites={this.state.favourites} openModal={this.openModal} />
                            ))}
                        </div>
                        :
                        <div className="w-100 d-flex justify-content-center my-3">
                            <h5 className="text-black-50">No favourite services</h5>
                        </div>
                    }
                </div>
            </>
        )
    }
}

export default withRouter(FavouriteServicesContent);
