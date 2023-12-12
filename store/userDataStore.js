import axios from '@/configs/axios';
import { makeAutoObservable } from 'mobx';
import { fromPromise } from 'mobx-utils';

const getUserData = async () => (await axios.get('/users')).data;

class UserDataStore {
    userData;

    constructor() {
        makeAutoObservable(this);
    }

    getUserData = async () => {
        this.userData = fromPromise(getUserData());
    }
}

export default new UserDataStore();