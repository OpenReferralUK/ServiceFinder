import React from 'react';
import { components } from 'react-select';
import { sortList } from '../../../../../functions/GeneralFunctions';
import { getCircumstancesAction, getGenderAction } from '../../../../../Store/Actions/actions';
import store from '../../../../../Store/store';
import AlertModal from '../../../../shared/Elements/AlertModal';
import TagSelector from '../../../../shared/Elements/TagSelector';
import { getDataFromLocalStorage } from '../functions';

export default class CircumstancesComponent extends React.Component {

    state = {
        ...this.getCurrentStateFromStore(),
        isLoaded: false,
        cData: []
    }

    async componentDidMount() {
        this.unsubscribeStore = store.subscribe(this.updateStateFromStore);
        const data = getDataFromLocalStorage('circumstancesData');
        if (data.error) {
            this.setState({
                isLoaded: true
            })
        } else {
            const finalData = data.content.filter(item => item.parent === null);
            this.setState({
                cData: sortList(finalData),
                isLoaded: true
            })
        }
    }

    componentWillUnmount() {
        this.unsubscribeStore();
    }

    getCurrentStateFromStore() {
        return {
            circumstances: store.getState().Interacted.circumstances,
        }
    }

    updateStateFromStore = () => {
        const currentState = this.getCurrentStateFromStore();
        if (this.state !== currentState) {
            this.setState(currentState);
        }
    }

    addCircumstance = async (value, action) => {
        try {
            if ((value === null) || (value.length === 0)) {
                if (action.action !== 'clear') {
                    if (action.removedValue !== undefined) {
                        if ((action.removedValue.value === 'circumstance:192') || (action.removedValue.value === 'circumstance:193') || (action.removedValue.value === 'circumstance:194')) {
                            await store.dispatch(getGenderAction({
                                value: '', label: ''
                            }));
                        }
                    }
                } else {
                    await store.dispatch(getGenderAction({
                        value: '', label: ''
                    }));
                }
            }
            await store.dispatch(getCircumstancesAction(value));
        } catch (e) {
            await this.setState({ error: JSON.stringify(e) });
            window.$('#circumstances').appendTo('body').modal('show');
        }
    }

    render() {
        const DropdownIndicator = props => {
            return (
                components.DropdownIndicator && (
                    <components.DropdownIndicator {...props}>
                        <i className="material-icons">add</i>
                    </components.DropdownIndicator>
                )
            );
        };
        return (
            <>
                <AlertModal name="circumstances" id="circumstances" error={this.state.error} />
                {this.state.isLoaded &&
                    <TagSelector
                        title="Circumstances:"
                        id="circumstancesSelector"
                        isMulti={true}
                        name="circumstances"
                        data_selected={this.state.circumstances.data}
                        data={this.state.cData && this.state.cData.map(item => ({ value: item.id, label: item.name, original: item }))}
                        isSearchable={true}
                        placeholder="Select circumstance"
                        onChange={this.addCircumstance}
                        components={{ DropdownIndicator }}
                    />
                }
            </>
        )
    }
}