import React, { Component } from 'react';
import { getSaveButtonForModal, getSaveItemIdAction, getUpdateFavouriteServiceAction } from '../../../../../Store/Actions/actions';
import store from '../../../../../Store/store';

class FavouriteServiceCard extends Component {

    state = {
        isModalLoaded: false
    }

    showModal = async (item) => {
        await store.dispatch(getSaveItemIdAction(item.id));
        store.dispatch(getSaveButtonForModal('favourites'));
        window.$('#serviceModal').modal('show');
    }

    closeModal = async () => {
        await window.$(".modal").appendTo('#modal-favourite-div').modal('hide');
    }

    deleteFavourite = async (item) => {
        item.favourite = false;
        await store.dispatch(getUpdateFavouriteServiceAction(item));
        this.forceUpdate();
    }

    render() {
        return (
            <>
                <div className="card rounded" key={this.props.index}>
                    <div className="card-header collapsed d-flex ml-0 row w-100 justify-content-between" id={this.props.item.id}>
                        <button className="d-flex border-0 bg-transparent p-0 results-title col-xl p-2 w-100 align-items-center cursor-pointer" data-toggle="collapse" data-target={`#TabFavourites${this.props.index}`} aria-expanded="false" aria-controls={`TabFavourites${this.props.index}`}>
                            <span className="btn-content">
                                <p className="mb-0 ml-4">
                                    {this.props.item.name}
                                </p>
                            </span>
                        </button>
                        <div className="d-flex justify-content-end col p-2 w-100 align-items-center">
                            <button className="btn btn-secondary btn-sm mr-1 d-flex justify-content-center" type="button" onClick={() => this.deleteFavourite(this.props.item)}>
                                <i className="mb-0 material-icons" style={{ color: '#FFC900' }}>star</i>
                            </button>
                            <button className="btn btn-info btn-sm d-flex ml-1 justify-content-center" type="button" onClick={() => this.showModal(this.props.item)}>
                                <p className="mb-0 text-nowrap">View Details</p>
                            </button>
                        </div>
                    </div>

                    <div id={`TabFavourites${this.props.index}`} className="collapse" aria-labelledby={this.props.item.id} data-parent="#accordionServicesFavourites">
                        <div className="card-body">
                            {this.props.item.description}
                        </div>
                    </div>
                </div>
            </>
        );
    }
}

export default FavouriteServiceCard;