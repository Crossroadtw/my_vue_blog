// const serverUrl = 'http://127.0.0.1:8000/'
const serverUrl = 'http://124.70.44.128:8080/'
// const serverUrl = 'http://124.70.44.128:7899/'
module.exports = {
  about: {
    aboutMe: 'About Me',
    aboutBlog: 'About Blog',
    contactMe: 'Contact Me',
    blogSource: 'Blog Source',
    technology: 'Building Technology',
    other: 'Other',
    yourName: 'Name',
    email: 'Email',
    content: 'Content',
    nameTip: 'Please enter your name',
    emailTip1: 'Please enter your e-mail address',
    emailTip2: 'Please input the correct email address',
    contentTip: 'Please enter the message content',
    submit: 'Submit'
  },
  list_blog: serverUrl + 'list_blog/', // 博文列表
  up_blog: serverUrl + 'up_blog/', // 更新博文
  show_blog: serverUrl + 'show_blog/?id=', // 展示博文
  show_label: serverUrl + 'label_show/', // 展示标签
  show_file: serverUrl + 'file_show/', // 展示归档
  login: serverUrl + 'login/', // 登录
  logout: serverUrl + 'logout/', // 登录
  down_load: serverUrl + 'static/', // 下载
  down_delete: serverUrl + 'down_delete/', // 删除
  comment_message: serverUrl + 'leaving_message/', // 留言接口
  reply: serverUrl + 'reply/', // 留言回复接口
  language: serverUrl + 'language/', // 翻译接口
  // ws_socket: 'ws://124.70.44.128:8989/ws_co/'
  ws_socket: 'ws://124.70.44.128:8080/ws_co/' // 及时通讯
}
