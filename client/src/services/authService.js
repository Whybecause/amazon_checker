import axios from 'axios';

class AuthService {
    login = async (data) => {
        const result = await axios.post("/api/login", data)
        return (result);
    }

    logout() {
        localStorage.removeItem("user");
        // window.location.reload();
    }

    getCurrentUser() {
        return JSON.parse(window.localStorage.getItem('user'));
    }
}

export default new AuthService();

