export const isLoggedIn = () => !!localStorage.getItem("token")

export const logOut = () => {
    localStorage.removeItem("token")
}