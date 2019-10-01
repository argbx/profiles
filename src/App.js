import React, {useEffect} from 'react';
import './App.css';
import ProfileWall from './components/ProfileWall'
import ProfileStore from "./stores/profileStore";

const App = () => {
    //ComponentDidMount get the profiles
    useEffect(() => {
        ProfileStore.instance().loadProfiles()
    })
  return (
    <div className="App">
      <ProfileWall />
    </div>
  );
}

export default App;
