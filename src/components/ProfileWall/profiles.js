import React from 'react';
import {toJS} from "mobx";
import { observer } from 'mobx-react';

import Gallery from 'react-grid-gallery';
import ProfileStore from "../../stores/profileStore";

const Profiles = observer((props) => {
    const profiles = ProfileStore.instance().profiles || [];
    console.log("props", toJS(profiles));
    const tagStyle = {
        display: "inline",
        padding: "0.2em 0.6em 0.3em",
        fontSize: "47%",
        fontWeight: "600",
        lineHeight: "8",
        color: "yellow",
        background: "rgba(0, 0, 0, 0.65)",
        textAlign: "center",
        whiteSpace: "nowrap",
        verticalAlign: "baseline",
        borderRadius: "0.25em",
        boxShadow: "0 0 black",
        backgroundColor: "#00415b",
    };

    return(
        <div>
            <Gallery
                images={profiles}
                enableImageSelection={false}
                tagStyle={tagStyle}
                margin={15}
            />
        </div>
    )
})

export default Profiles