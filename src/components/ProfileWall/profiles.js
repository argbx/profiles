import React from 'react';
import {toJS} from "mobx";

const Profiles = (props) => {
    console.log("props", toJS(props.profileList));

    return(
        <div>
            Profiles Component
        </div>
    )
}

export default Profiles