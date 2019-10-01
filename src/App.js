import React, {useEffect} from 'react';
import { observer } from 'mobx-react';
import './App.css';
import ProfileWall from './components/ProfileWall'
import ProfileStore from "./stores/profileStore";

const App = observer(() => {
    //ComponentDidMount get the profiles
    useEffect(() => {
        ProfileStore.instance().loadProfiles()
    },[])
    const profiles = ProfileStore.instance().profiles || []
  return (
    <div className="App">
      <ProfileWall profiles={profiles} />
    </div>
  );
})

export default App;
