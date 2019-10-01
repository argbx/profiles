import { action,observable,toJS } from 'mobx';
// Import API
import API from '../utils/api';

export default class ProfileStore {
    static _instance: ProfileStore;

    @observable profiles = [];

    constructor() {
        this.profiles = [];
    }

    static instance = () => (ProfileStore._instance = ProfileStore._instance || new ProfileStore());
    /**
     * LOAD ProfileWall ACTIONS
     */
    @action
    loadProfiles(sort) {

        API.get('init',sort)
            .then((result) => {
                console.log("result",toJS(result))
            })
            .fail((err) => {
                console.log("err", err);
            });
    }


}

