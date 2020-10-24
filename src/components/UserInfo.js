export default class UserInfo {
  constructor(data) {
    this._nameProfileElement = data.name;
    this._jobProfileElement = data.userJob;
  }
  getUserInfo() {
    return {
      userName: this._nameProfileElement.textContent,
      userJob: this._jobProfileElement.textContent,
    };
  }

  setUserInfo(userName, userJob) {
    this._userName = userName;
    this._userJob = userJob;
    this._nameProfileElement.textContent = this._userName;
    this._jobProfileElement.textContent = this._userJob;
  }
}
