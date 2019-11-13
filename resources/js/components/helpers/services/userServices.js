import axios from 'axios';
import AuthStore from '../stores/authStore'
import Settings from '../settings'

export default class UserServices {
    _authStore;
    _settings;
    _config;
    _token;
    constructor(){
        this._config;
        this._settings = new Settings();
        this._authStore = AuthStore;
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

    getTenants(){
        return axios.get(this._settings.baseUrl + 'tenant/all', this._config);
    }
    
    uploadAvatar(payload)
    {
        console.log(payload);
        return axios.post(this._settings.baseUrl + 'auth/user/uploadAvatar', payload, this._config);
    }
}


// WEBPACK FOOTER //
// ./src/services/BioService.js