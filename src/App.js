import React, {useEffect, useState} from 'react';
import Dropdown from 'react-dropdown'
import './App.css';
import 'react-dropdown/style.css'
import ProfileWall from './components/ProfileWall'
import ProfileStore from "./stores/profileStore";

const App = () => {
    const options = [
        {label:'Distance',value:'DISTANCE'}, {label:'Activity',value:'ACTIVITY'}
    ]
    const [sortValue, setSortValue] = useState("DISTANCE");

    //ComponentDidMount get the profiles
    useEffect(() => {
        ProfileStore.instance().loadProfiles();
    },[]);

    // Switch between Distance and Activity Sorting
    const onSelect = (param) => {
        setSortValue(param.value)
        ProfileStore.instance().loadProfiles({sorting: param.value});
    };

  return (
    <div className="App">
        <Dropdown options={options} onChange={onSelect} value={sortValue} placeholder="Select an option" />
        <ProfileWall />
    </div>
  );
}

export default App;
