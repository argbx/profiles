import { action,observable } from 'mobx';
import _ from 'lodash';

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
    loadProfiles(params) {
        API.get('basicProfiles',params)
            .then((result) => this.loadProfilesSuccess(result,params))
            .fail((err) => {
                console.log("err", err);
            });
    }

    @action
    loadProfilesSuccess(result) {
        this.profiles=  _.size(result.items) < 36 ? result.items : _.merge(this.profiles,result.items);
        this.loadDetailedProfiles();
    }

    @action
    loadDetailedProfiles() {
        const ids = _.join(_.map(this.profiles,'id'),'&ids=')
        API.get('detailedProfiles',ids)
            .then((result) => this.loadDetailedProfilesSuccess(result))
            .fail((err) => {
                console.log("err", err);
            });
    }

    @action
    loadDetailedProfilesSuccess(result) {
        const currentDate = new Date();
        const one_day = 1000*60*60;

        // set profiles array as the react gallery requires
        this.profiles = _.map(_.merge(this.profiles,result),profile => {
            const lastLogin = new Date(profile.last_login)
            const passedTime = Math.round((currentDate - lastLogin) / one_day)
          return {
              src: _.get(profile,'picture.url','http://localhost:5000/images/noImage.png'),
              thumbnail: _.get(profile,'picture.url','http://localhost:5000/images/noImage.png'),
              thumbnailWidth: 250,
              thumbnailHeight: 250,
              thumbnailCaption: profile.name,
              caption:`${profile.headline}`,
              locationName: _.get(profile,'location.name'),
              lastLogin:passedTime,
              tags: [{value:_.get(profile,'personal.age'), title: _.get(profile,'personal.age')}, {value: profile.online_status, title: profile.online_status}, {value:`${_.get(profile,'location.distance')}m`, title:`${_.get(profile,'location.distance')}m`}],
          }
        });
    }
}

