import Cookies from 'js-cookie';

export default class Auth {
    static setToken(token, expires_in) {
        let now = new Date();
        let expiryDate = new Date(now.getTime() + (expires_in / 60) * 60 * 1000);
        Cookies.set('authToken', token);
        Cookies.set('authTokenExpires_in', expiryDate);
    }

    static destroyToken() {
        Cookies.remove('authToken');
        Cookies.remove('authTokenExpires_in');
    }

    static getToken() {
        var token = Cookies.get('authToken');
        var expiration = Cookies.get('authTokenExpires_in');
        if (!token || !expiration) return null;
        if (Date.now() > Date.parse(expiration)) {
            this.destroyToken();
            return null;
        }

        return token;
    }

    static loggedIn() {
        return this.getToken() != null;
    }
}
