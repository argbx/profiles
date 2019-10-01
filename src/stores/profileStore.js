import { action,observable,toJS } from 'mobx';
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
    loadProfiles(sort) {
        API.get('basicProfiles',sort)
            .then((result) => this.loadProfilesSuccess(result))
            .fail((err) => {
                console.log("err", err);
            });
    }

    @action
    loadProfilesSuccess(result) {
        this.profiles = result.items;
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

        this.profiles = _.map(_.merge(this.profiles,result),profile => {
          return {
              src: _.get(profile,'picture.url','http://localhost:5000/images/noImage.png'),
              thumbnail: _.get(profile,'picture.url','http://localhost:5000/images/noImage.png'),
              thumbnailWidth: 250,
              thumbnailHeight: 250,
              thumbnailCaption: profile.name,
              caption:`${profile.headline}`,
              tags: [{value:_.get(profile,'personal.age'), title: _.get(profile,'personal.age')}, {value: profile.online_status, title: profile.online_status}, {value:`${_.get(profile,'location.distance')}m`, title:`${_.get(profile,'location.distance')}m`}],

          }
        })

        // this.profiles = result
        console.log("r24", toJS(this.profiles),toJS(result));
    }



}

