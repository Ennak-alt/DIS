import LoginService from "./loginService";

export interface UserData {
    uid: string,
    name: string,
    email: string,
    phone: string,
    rating: number,
    numRatings: number,
    userRating?: number,
}

export default class UserService {
    static readonly DefaultUser: UserData = {
        uid: "",
        name: "",
        email: "",
        phone: "",
        rating: -1,
        numRatings: 0,
        userRating: -1,
    }

    public static async GetUser(uid: string): Promise<UserData> {
        const userdata = LoginService.GetLoginData();
        const headers = userdata ? { "Token": userdata.token } : undefined;
        
        return await fetch("http://localhost:8088/users/" + uid, {
            method: 'get',
            headers
        }).then(res => res.json());
    }
    public static async SetRating(uid: string, rating: number) {
        const userdata = LoginService.GetLoginData();
        if(userdata == null) return false;
        const headers = userdata ? { "Token": userdata.token } : undefined;

        let formData = new FormData();
        formData.append("uid", uid);
        formData.append("rating", rating.toString());

        const result = await fetch(`http://localhost:8088/users/${uid}/ratings`, {
            method: 'post',
            headers,
            body: formData,
        }).then(res => res.json());
        
        return result.success;
    }
}