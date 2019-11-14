import axios from 'axios';
import AuthStore from '../stores/authStore'
import Settings from '../settings'

export default class BioService {
    _authStore;
    _settings;
    _config;
    _token;
    constructor(){
        this._config;
        this._settings = new Settings;
        this._authStore =  AuthStore;
        this._token = this._authStore.getToken();

        this.generateConfig();
    }
    generateConfig(){
        let config = {
            headers:{
                'Content-Type': 'application/json',
                'X-Requested-With':'XMLHttpRequest',
                'Authorization':this._token
            }
        };
        this._config = config;
    }
    setToken(token){
        this._token = token;
        this.generateConfig();
    }

    createLink(payload){
        const jsonStr = JSON.stringify(payload);
        return axios.post(this._settings.baseUrl + 'link/create', jsonStr, this._config);
    }
    getLinks(payload,tenant_id){
        return axios.post(this._settings.baseUrl + 'link/all/'+tenant_id, payload, this._config);
    }
    updateLink(payload,id){
        return axios.post(this._settings.baseUrl + 'link/update/'+id, payload, this._config);
    }
    deleteLink(payload,id){
        return axios.post(this._settings.baseUrl + 'link/delete/'+id, payload, this._config);
    }
    updateLinkStatus(payload,id)
    {
        return axios.post(this._settings.baseUrl + 'link/updatestatus/'+id, payload, this._config);
    }
    updateThumb(payload,id)
    {
        return axios.post(this._settings.baseUrl + 'link/updatethumb/'+id, payload, this._config);
    }
}


// WEBPACK FOOTER //
// ./src/services/BioService.js