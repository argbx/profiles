import React from 'react';
import {toJS } from 'mobx';

const ProfileWall = (props) => {
    console.log("props", toJS(props.profiles));
    return(
        <div>
            Profile Wall
        </div>
    )
}

export default ProfileWall