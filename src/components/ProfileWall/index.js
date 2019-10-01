import React, {useState, useEffect} from 'react';
import Profiles from './profiles'
import '../../App.css';
import ProfileStore from "../../stores/profileStore";

const ProfileWall = (props) => {
    const [isFetching, setIsFetching] = useState(false);
    const [gallerySize, setgallerySize] = useState(36);

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        if (!isFetching) return;
        fetchMoreProfiles();
    }, [isFetching]);


    const fetchMoreProfiles = () => {
        setTimeout(() => {
            setgallerySize(gallerySize + 36)
            ProfileStore.instance().loadProfiles({size:gallerySize})
            setIsFetching(false);
        }, 500);
    };

    const handleScroll = () => {
        if (window.innerHeight + document.documentElement.scrollTop !== document.documentElement.offsetHeight) return;
        setIsFetching(true);
    };

    return(
        <div>
            <Profiles/>
            {isFetching && 'Fetching more Profiles...'}
        </div>
    )
}

export default ProfileWall