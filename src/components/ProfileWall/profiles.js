import React, {useState} from 'react';
import { observer } from 'mobx-react';
import _ from 'lodash'

import Gallery from 'react-grid-gallery';
import ProfileStore from "../../stores/profileStore";

const Profiles = observer((props) => {
    const [selectedProfile, setselectedProfile] = useState({});
    const profiles = ProfileStore.instance().profiles || [];

    const onProfileSelect = (index) => {
        setselectedProfile(profiles[index])
    };
    
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
        <div style={{
            padding: "2px",
            display: "block",
            minHeight: "1px",
            width: "100%",
            border: "1px solid #00415b",
            overflow: "auto",
            textAlign: "center",
            backgroundColor: "#00415b"
        }}>
            <Gallery
                images={profiles}
                enableImageSelection={false}
                tagStyle={tagStyle}
                showImageCount={false}
                margin={15}
                currentImageWillChange={onProfileSelect}
                customControls={[
                    <button key="lastLoggedin" style={{margin:'auto'}}>
                        {_.get(selectedProfile,'thumbnailCaption')} last logged in {_.get(selectedProfile,'lastLogin') > 24
                        ?  `${Math.round(_.get(selectedProfile,'lastLogin') / 24)} day(s)`
                        : `${_.get(selectedProfile,'lastLogin')} hour(s)`}  ago
                        from {_.get(selectedProfile,'locationName')}
                    </button>
                ]}
            />
        </div>
    )
})

export default Profiles