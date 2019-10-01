import React, {useEffect, useState} from 'react';
import { observer } from 'mobx-react';
import Dropdown from 'react-dropdown'
import './App.css';
import 'react-dropdown/style.css'
import ProfileWall from './components/ProfileWall'
import ProfileStore from "./stores/profileStore";

const App = observer(() => {
    const options = [
        {label:'Distance',value:'DISTANCE'}, {label:'Activity',value:'ACTIVITY'}
    ]
    const [sortValue, setSortValue] = useState(false);

    //ComponentDidMount get the profiles
    useEffect(() => {
        ProfileStore.instance().loadProfiles()
    },[]);

    const profiles = ProfileStore.instance().profiles || [];

    const onSelect = (param) => {
        setSortValue(param.value)
        ProfileStore.instance().loadProfiles(param.value)
    }

  return (
    <div className="App">
        <Dropdown options={options} onChange={onSelect} value={sortValue} placeholder="Select an option" />

        <ProfileWall profiles={profiles} />
    </div>
  );
})

export default App;
