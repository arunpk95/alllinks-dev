
export default class AuthStore {
   static STORAGE_KEY = 'accessToken';
   static EXPIRES_AT = 'expires_at';
   static PROFILE = 'linksProfile';
   static TOKEN_FLAG = 'tokenFlag';

    static clearAuth(){
        localStorage.removeItem(this.STORAGE_KEY);
        localStorage.removeItem(this.EXPIRES_AT);
        localStorage.removeItem(this.PROFILE);
    }
    static getExpiresAt(){
        let expiresAt = window.localStorage.getItem(this.EXPIRES_AT),
            result = expiresAt ? +expiresAt : 0;

        return result;
    }
    static getProfile(){
        const profileStr = localStorage.getItem(this.PROFILE),
            profile = profileStr ? JSON.parse(profileStr) : null;
        return profile;
    }
   static getToken() {
        const flag = window.localStorage.getItem(this.STORAGE_KEY);
        if(flag){
            window.localStorage.setItem(this.TOKEN_FLAG, false);
            return window.localStorage.getItem(this.STORAGE_KEY);
        }
    }
    static setAuth(accessToken, expiresAt) {
        console.log(this.STORAGE_KEY);
        window.localStorage.setItem(this.STORAGE_KEY, accessToken);
        window.localStorage.setItem(this.EXPIRES_AT, expiresAt);
        
    }
    static setProfile(profile) {
        const profileStr = JSON.stringify(profile);
        localStorage.setItem(this.PROFILE, profileStr);
    }
}

