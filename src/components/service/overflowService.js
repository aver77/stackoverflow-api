//implicit
import Authentication from "./authentication";
import axios from 'axios';

class OverflowService extends Authentication {
    _apiBaseAuth = 'https://stackexchange.com';
    _apiBaseAccess = 'https://stackoverflow.com';
    _apiBaseReq = 'https://api.stackexchange.com/2.3';
    _Auth = new Authentication();

    //1 обращаемся по этому юрл для авторизации и получаем access token в ссылке после # (hash). Поработать с client id
    // https://stackexchange.com/oauth/dialog?client_id=22584&scope=no_expiry&redirect_uri=https://stackexchange.com/oauth/login_success/

    //2 со всеми запросами используем полученный access token и key
    //https://api.stackexchange.com/2.2/me?key=SzqKv0G3JEieYJvulOD89Q((&site=stackoverflow&order=desc&sort=reputation&access_token=93BDIFXlhbgeBBintJ7Nlg))&filter=default
    //https://api.stackexchange.com/2.2/me?key=KEY&site=stackoverflow&order=desc&sort=reputation&access_token=ACCESS_TOKEN&filter=default

    async auth() {
        const res = await axios.get(`${this._apiBaseAuth}/oauth/dialog?client_id=${this._Auth._clientId}&scope=write_access&redirect_uri=https://stackexchange.com/oauth/login_success/`);

        if (!res.ok) {
            throw new Error(`Couldn't get ${this._apiBaseAuth}, received: ${res.status}`);
        }

        return await res.json();
    }

    async logout() {
        const res = await axios.get(`${this._apiBaseReq}/access-tokens/{accessTokens}/invalidate`);

        if (!res.ok) {
            throw new Error(`Couldn't get ${this._apiBaseReq}, received: ${res.status}`);
        }

        this._Auth.preventJwtSecret();
    }

    async getAccess() {
        const access_token = await axios.post(`${this._apiBaseAccess}/oauth/access_token/json`, this.auth());

        if (!access_token.ok) {
            throw new Error(`Couldn't post ${this._apiBaseAuth}, received: ${access_token.status}`);
        }

        this._Auth.jwtSecret(access_token.access_token);
    }

    async getQuestionsList(id = '', answers ='', page = 1, pageSize = 5, sort = 'activity', order = 'desc') {
        const res = await axios.get(`${this._apiBaseReq}/questions${id}${answers}?page=${page}&pagesize=${pageSize}&order=${order}&sort=${sort}&site=stackoverflow`)

        if (!res.ok) {
            throw new Error(`Couldn't get ${this._apiBaseReq}, received: ${res.status}`);
        }

        return await res.json();
    }

    async getQuestionById(id, page = 1, pageSize = 5, sort = 'activity', order = 'desc') {
        this.getQuestionsList(id, page, pageSize, sort, order);
    }

    async getAnswersForQuestionById(id, page = 1, pageSize = 5, sort = 'activity', order = 'desc') {
        this.getQuestionsList(id, '/answers', page, pageSize, sort, order);
    }

    async addAnswerForQuestionById(id = 1, text) {
        const res = await axios.post(`${this._apiBaseReq}/questions/${id}/answers/add`, {
            body: text,
            access_token: this._Auth.jwtSecret(),
            key: this._Auth._key
        });

        if (!res.ok) {
            throw new Error(`Couldn't get ${this._apiBaseAuth}, received: ${res.status}`);
        }

        return await res.json();
    }
}

export default OverflowService;