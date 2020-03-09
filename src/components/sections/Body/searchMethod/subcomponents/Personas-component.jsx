import React from 'react';

import SearchMethodSection from '../SearchMethodSection/SearchMethodSection';

import GridPersona from '../../../../shared/Elements/GridPersona';

import { handleChangePersona } from '../functions';

import initial_data from '../../../../../config';

export default class PersonasComponent extends React.Component {
    render() {
        return (
            <SearchMethodSection id="personaSection" title="Typical client grouping" description="This will add relevant needs and circumstances that can then be deleted as appropriate." >
                <GridPersona id="persona" data={initial_data.persona_profile.persona} onClick={async (e) => handleChangePersona(e)} />
            </SearchMethodSection>
        )
    }
}