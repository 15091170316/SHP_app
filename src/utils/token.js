// 用户token的设置与获取
const setToken = (token) => {
    localStorage.setItem('token', token)
}
const getToken = () => {
    return localStorage.getItem('token')
}
const removeToken = () => {
    localStorage.removeItem('token')
}
export {
    setToken,
    getToken,
    removeToken
}