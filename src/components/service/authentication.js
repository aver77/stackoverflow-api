class Authentication {
    _key = 'SzqKv0G3JEieYJvulOD89Q((';
    _clientId = 22584;

    set jwtSecret (value) {
        localStorage.setItem('jwtSecret', value);
    }
    get jwtSecret () {
        return localStorage.getItem('jwtSecret');
    }
    preventJwtSecret() {
        localStorage.clear();
    }

    get clientId () {
        return this._clientId;
    }
    get key() {
        return this._key;
    }
}

export default Authentication;