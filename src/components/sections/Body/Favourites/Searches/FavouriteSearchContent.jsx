import React from 'react';
import { CLEAR_ALL_FAVOURITES, CLEAR_ALL_FAVOURITES_SEARCHES } from '../../../../../Store/Actions/types';
import store from '../../../../../Store/store';
import FavouriteSearchCard from './FavouriteSearchCard';

export default class FavouriteSearchContent extends React.Component {

    state = this.getCurrentStateFromStore();

    async componentDidMount() {
        this.unsubscribeStore = store.subscribe(this.updateStateFromStore);
    }

    componentWillUnmount() {
        this.unsubscribeStore();
    }

    getCurrentStateFromStore() {
        return {
            favourites: store.getState().FavouritesSearchesReducer
        }
    }

    updateStateFromStore = async () => {
        const currentState = this.getCurrentStateFromStore();
        if (this.state !== currentState) {
            await this.setState(currentState);
        }
    }

    clearFavouritesSearches = async () => {
        try {
            await store.dispatch({ type: CLEAR_ALL_FAVOURITES_SEARCHES });
            await store.dispatch({ type: CLEAR_ALL_FAVOURITES });
        } catch (e) {
            console.log(e);
        }
    }

    render() {
        return (
            <>
                <div className="my-1">
                    {this.state.favourites &&
                        this.state.favourites.length > 0 ?
                        <>
                            <div>
                                <div className="d-flex w-100 justify-content-end">
                                    <button type="button" className="btn btn-danger" onClick={() => this.clearFavouritesSearches()}>Clear favourites</button>
                                </div>
                                <ul className="list-group mt-2">
                                    {this.state.favourites.map((item, i) => (
                                        <li className="list-group-item">
                                            <FavouriteSearchCard item={item} index={i} />
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </>

                        :
                        <div className="w-100 d-flex justify-content-center my-3">
                            <h5 className="text-black-50">No favourite searches</h5>
                        </div>
                    }
                </div>
            </>
        )
    }
}