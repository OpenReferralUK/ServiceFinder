import React, { Component } from 'react';
import initial_data from '../../../../../config';
import { getAddFavouriteSearchAction, getAgeAction, getAvailabilityAction, getCircumstancesAction, getClearPreviousSearchesByIDAction, getGenderAction, getNeedsAction, getPostcodeAction, getProximityAction, getServiceTypesAction, getTextAction, getUpdateFavouriteSearchAction } from '../../../../../Store/Actions/actions';
import store from '../../../../../Store/store';

class PreviousSearchCard extends Component {

    clearPreviousSearchesById = async (item) => {
        try {
            await store.dispatch(getClearPreviousSearchesByIDAction(item));
        } catch (error) {
            console.log('Error(clearPreviousSearchesById): ', error);
        }
    }

    addFavouriteSearch = async (item) => {
        item.favourite = !item.favourite;
        try {
            if (item.favourite) await store.dispatch(getAddFavouriteSearchAction(item));
            else await store.dispatch(getUpdateFavouriteSearchAction(item));
            this.forceUpdate();
        } catch (e) {
            console.log('Error(addFavouriteSearch): ', e)
        }
    }

    applySearch = async () => {
        window.$('div#searchingForCollapse').collapse('show');
        window.$('a[href="#searchingFor"]').tab('show');
        this.props.item.data.map(async deepItem => {
            switch (deepItem.category) {
                case 'age':
                    return await store.dispatch(getAgeAction(deepItem.value));
                case 'postcode':
                    return await store.dispatch(getPostcodeAction(deepItem.value));
                case 'proximity':
                    return await store.dispatch(getProximityAction(deepItem));
                case 'gender':
                    return await store.dispatch(getGenderAction(deepItem));
                case 'availability':
                    return await store.dispatch(getAvailabilityAction(deepItem.data));
                case 'needs':
                    return await store.dispatch(getNeedsAction(deepItem.data));
                case 'circumstances':
                    return await store.dispatch(getCircumstancesAction(deepItem.data));
                case 'serviceTypes':
                    return await store.dispatch(getServiceTypesAction(deepItem));
                case 'text':
                    return await store.dispatch(getTextAction(deepItem.value));
                default: return true;
            }
        })
    }

    render() {
        return (
            <>
                <div className="flex-column">
                    <h4 className="card-title mb-2">Add to Search:</h4>
                    <ul className="mb-1" style={{ paddingLeft: '15px' }}>
                        {this.props.item.data.map((deepItem, j) => {
                            let category = deepItem.category.replace(deepItem.category.charAt(0), deepItem.category.charAt(0).toUpperCase())
                            category = category.replace('_', " ");
                            const date = new Date();
                            if (category !== 'All Services') {
                                return (<li key={`${(j + 1) * date.getTime()}`}>{category}: {deepItem.label}</li>)
                            } else {
                                return (<li key={`${(j + 1) * date.getTime()}`}>{category}</li>);
                            }
                        })}
                    </ul>
                </div>
                <div className="row m-0 d-flex justify-content-between">
                    <div className="col-sm-auto px-0 d-flex align-items-center justify-content-start">
                        <p className="ml-1 mb-0 text-muted">{this.props.item.date}</p>
                    </div>
                    <div className="col-sm-6 px-0  d-flex justify-content-end">
                        <div className="d-flex justify-content-end">
                            <button className="btn btn-secondary card-link mb-0 cursor-pointer mr-1" onClick={this.applySearch}>Search</button>
                        </div>
                        <div className="d-flex justify-content-end">
                            {initial_data.general.allowFavouritesSearches &&
                                this.props.item.favourite ?
                                <button className="material-icons btn btn-secondary mr-1" onClick={() => this.addFavouriteSearch(this.props.item)} style={{ color: '#FFC900' }}>star</button>
                                :
                                <button className="material-icons btn btn-secondary mr-1" onClick={() => this.addFavouriteSearch(this.props.item)} >star</button>
                            }
                            <button className="material-icons btn btn-danger mr-1" onClick={() => this.clearPreviousSearchesById(this.props.item)}>delete</button>
                        </div>
                    </div>
                </div>
            </>
        );
    }
}
export default PreviousSearchCard;