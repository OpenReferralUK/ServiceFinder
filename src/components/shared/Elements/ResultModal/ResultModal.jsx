import Axios from 'axios';
import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import BeatLoader from 'react-spinners/BeatLoader';
import initial_data from '../../../../config';
import { API_directions } from '../../../../settings/settings';
import { getAddFavouriteServiceAction, getUpdateFavouriteServiceAction } from '../../../../Store/Actions/actions';
import store from '../../../../Store/store';
import { getDataWithText } from '../../../sections/Body/searchingFor/functions';
import ServiceContact from './ServiceContact';
import ServiceEmail from './ServiceEmail';
import ServicePhysicalAddresses from './ServicePhysicalAddresses';
import ServiceFeedbackButtons from './ServiceFeedbackButtons';
import ServiceDirections from './ServiceDirections';
import ServiceDescription from './ServiceDescription';


class ResultModal extends React.Component {

    state = this.getStateFromStore()

    componentDidMount() {
        this.unsubscribe = store.subscribe(this.updateStateFromStore);
    }

    componentWillUnmount() {
        this.unsubscribe();
    }

    getStateFromStore() {
        const interacted = store.getState().Interacted;
        let interactedFinal = {}
        for (const obj in interacted) {
            if (interacted[obj].interacted) {
                interactedFinal[obj] = interacted[obj];
            }
        }

        return {
            favourties: store.getState().FavouritesServiceReducer,
            interacted: getDataWithText(interactedFinal),
            itemID: store.getState().modalReducer.itemID
        }
    }

    updateStateFromStore = () => {
        let newItemID = this.getStateFromStore();
        this.getUserPostcode();
        if (this.state.itemID !== newItemID.itemID) {
            this.setState({
                item: null
            })
            Axios.get(`${API_directions.get.serviceId}${newItemID.itemID}`)
                .then(res => {
                    if (res.data) {
                        this.setState({
                            itemID: newItemID.itemID,
                            item: res.data,
                            interacted: newItemID.interacted,
                            favourties: newItemID.favourties
                        });
                    }
                    else (alert('Cant find the result'));
                })
                .then(() => this.forceUpdate())
                .catch(e => console.log(e));
        } else {
            this.setState({
                favourties: newItemID.favourties,
                interacted: newItemID.interacted
            })

        }
    }

    getUserPostcode = () => {
        const interactedPostCode = this.state.interacted.filter(item => item.category === 'postcode');
        const user_postcode = interactedPostCode[0] !== undefined ? interactedPostCode[0].value : undefined;
        this.user_postcode = user_postcode;
    }

    closeModal = async () => {
        window.$('#descriptionOneTab').collapse('hide');
        window.$('.modal').modal('hide');
    }

    updateFavourite = async (item) => {
        let isFavItem = this.state.favourties.filter(favItem => favItem.id === item.id)[0];

        if (!isFavItem) {
            await store.dispatch(getAddFavouriteServiceAction(item));
        } else {
            await store.dispatch(getUpdateFavouriteServiceAction(item));
        }
        this.forceUpdate();
    }

    render() {
        return (
            <>
                <div className="modal fade" id="serviceModal" tabIndex="-1" role="dialog" aria-labelledby={`modalTitle`} aria-hidden="true">
                    <div className="modal-dialog modal-dialog-scrollble modal-lg" role="document" >
                        <div className="modal-content">
                            <div className="modal-header">
                                {this.state.item &&
                                    <>
                                        <h5 className="modal-title col" id={`modalTitle`}>{this.state.item && this.state.item.name}</h5>
                                        <div className="col-auto px-0 d-flex justify-content-end align-items-center">
                                            {initial_data.general.allowFavouriteServices &&
                                                store.getState().modalReducer.from !== 'favourites' &&
                                                <button className="border-0 bg-transparent material-icons mx-2 my-1 cursor-pointer"
                                                    onClick={() => this.updateFavourite(this.state.item)}
                                                    style={{
                                                        color: this.state.favourties.filter(favItem => favItem.id === this.state.item.id)[0] && '#FFC900'
                                                    }}
                                                >star</button>
                                            }
                                            <Link style={{ color: '#212529' }} to={`/service/${this.state.item.id}/${window.location.search}`} onClick={this.closeModal}>
                                                <i className="material-icons mx-2 my-1 cursor-pointer">print</i>
                                            </Link>
                                            <button className="border-0 bg-transparent  material-icons mx-2 my-1 cursor-pointer text-danger" onClick={this.closeModal}>close</button>
                                        </div>
                                    </>
                                }
                            </div>
                            <div className="modal-body">
                                {this.state.item ?
                                    <div className="row my-2">

                                        {/* Left side */}
                                        <div className="col-lg-6 mb-3">
                                            <div className="flex-column">
                                                <div>
                                                    <h4>Contact</h4>
                                                    <hr />
                                                    <div>
                                                        {/* Phone number */}
                                                        <ServiceContact item={this.state.item} />

                                                        {/* Email info */}
                                                        <ServiceEmail item={this.state.item} />

                                                        {/* Physical direction */}
                                                        <ServicePhysicalAddresses item={this.state.item} />

                                                    </div>
                                                </div>


                                                <div>
                                                    <h4>Service Feedback</h4>
                                                    <hr />
                                                    <div>
                                                        {/* FeedBack Buttons */}
                                                        <ServiceFeedbackButtons />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Right Side */}
                                        <div className="col-lg-6">
                                            <h4>Addresses</h4>
                                            <hr />

                                            <div className="flex-column">
                                                {/* Directions */}
                                                <ServiceDirections item={this.state.item} user_postcode={this.user_postcode} />

                                                {/* Description */}
                                                <ServiceDescription item={this.state.item} />
                                            </div>
                                        </div>
                                    </div>
                                    :
                                    <div className="d-flex justify-content-center w-100">
                                        <BeatLoader
                                            css={this.override}
                                            sizeUnit={"px"}
                                            size={15}
                                            color={'#b3b300'}
                                            loading={this.state.loading}
                                        />
                                    </div>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}

export default withRouter(ResultModal);
