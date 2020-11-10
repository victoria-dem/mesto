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

  setUserAvatar(element, avatar) {
    element.src = avatar;
  }

  setUserInfo(userName, userJob) {
    this._nameProfileElement.textContent = userName;
    this._jobProfileElement.textContent = userJob;
  }
}
