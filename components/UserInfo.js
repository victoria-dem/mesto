import {
  jobInput,
  jobProfile,
  nameInput,
  nameProfile,
} from "../utils/constants.js";

export default class UserInfo {
  constructor(data) {
    this._userName = data.name;
    this._userJob = data.userJob;
  }
  getUserInfo() {
    return { userName: this._userName, userJob: this._userJob };
  }

  setUserInfo(userName, userJob) {
    this._userName = userName;
    this._userJob = userJob;
    nameProfile.textContent = this._userName;
    jobProfile.textContent = this._userJob;
  }
}
