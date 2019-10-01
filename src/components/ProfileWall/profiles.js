import React from 'react';
import {toJS} from "mobx";
import Gallery from 'react-grid-gallery';

const Profiles = (props) => {
    console.log("props", toJS(props.profileList));

    return(
        <div>
            <Gallery images={props.profileList}/>
        </div>
    )
}

export default Profiles