import axios from 'axios';
import AuthStore from '../stores/authStore'
import Settings from '../settings'

export default class TenantServices {
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

    createTenant(payload){
        return axios.post(this._settings.baseUrl + 'tenant/create/', payload, this._config);
    }
}
