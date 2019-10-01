import React from 'react';
import {toJS } from 'mobx';
import Profiles from './profiles'

const ProfileWall = (props) => {
    return(
        <div>
            <Profiles profileList={props.profiles} />
        </div>
    )
}

export default ProfileWall