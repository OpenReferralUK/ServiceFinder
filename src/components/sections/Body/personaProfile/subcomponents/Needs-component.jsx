import React from 'react';
import { components } from 'react-select';
import { sortList } from '../../../../../functions/GeneralFunctions';
import { getNeedsAction } from '../../../../../Store/Actions/actions';
import store from '../../../../../Store/store';
import AlertModal from '../../../../shared/Elements/AlertModal';
import TagSelector from '../../../../shared/Elements/TagSelector';
import { getDataFromLocalStorage } from '../functions';

export default class NeedsComponent extends React.Component {

    state = {
        ...this.getCurrentStateFromStore(),
        isLoaded: false,
        nData: []
    }

    componentDidMount() {
        this.unsubscribeStore = store.subscribe(this.updateStateFromStore);
        const data = getDataFromLocalStorage('needsData');
        if (data.error) {
            this.setState({
                isLoaded: true
            })
        } else {
            const finalData = data.content.filter(item => item.parent === null);
            this.setState({
                nData: sortList(finalData),
                isLoaded: true
            })
        }
    }

    componentWillUnmount() {
        this.unsubscribeStore();
    }

    getCurrentStateFromStore() {
        return {
            needs: store.getState().Interacted.needs,
        }
    }

    updateStateFromStore = () => {
        const currentState = this.getCurrentStateFromStore();
        if (this.state !== currentState) {
            this.setState(currentState);
        }
    }

    addNeed = async (value) => {
        try {
            await store.dispatch(getNeedsAction(value));
        } catch (e) {
            await this.setState({ error: JSON.stringify(e) });
            window.$('#needs').appendTo('body').modal('show');
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
                <AlertModal name="needs" id="needs" error={this.state.error} />
                {
                    this.state.isLoaded &&
                    <TagSelector
                        title="Needs:"
                        id="needsSelector"
                        isMulti={true}
                        name="needs"
                        data={this.state.nData && this.state.nData.map(item => ({ value: item.id, label: item.name, original: item }))}
                        data_selected={this.state.needs.data}
                        isSearchable={true}
                        placeholder="Select needs"
                        onChange={this.addNeed}
                        components={{ DropdownIndicator }}
                    />
                }
            </>
        )
    }
}