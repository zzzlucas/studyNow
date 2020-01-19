export default {
  token: state => state.App.token,
  isLogin: state => state.App.isLogin,
  parkId: state => state.User.parkId,
  custId: state => state.User.custId,
  userName: state => state.User.name,
  userId: state => state.User.id,
  userAvatar: state => state.User.avatar,
  userInfo: state => state.User,
}
