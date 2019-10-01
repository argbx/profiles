import _ from 'lodash';
import reqwest from 'reqwest';

/**
 * API class - handels all api related stuff
 */
class API {

    host() {
        return 'http://localhost:3000';
    }

    apiPath(resource, params) {
        switch(resource) {
            case 'init':
                return this.host() + '/api/search?length=32';
            default:
                throw new Error('no valid resource!');
        }
    }

    apiRequest(method, resource, params) {
        const path  =  this.apiPath(resource, params);
        const data  = _.get(params, 'data');

        const requestParams = {
            mode:       'no-cors',
            method:      method,
            url:         path,
            type:        'json',
            contentType: 'text/plain',
            crossOrigin: true,
        };

        if(!!data) {
            requestParams.data = JSON.stringify(data);
        }

        return reqwest(requestParams);
    }

    get(...params) {
        return this.apiRequest('get', ...params);
    }
}

const api = new API();
export default api;