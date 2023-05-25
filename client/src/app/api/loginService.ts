export interface LoginData {
    uid: string,
    name: string,
    token: string,
    expires: number,
}

export default class LoginService {
    public static GetLoginData(): LoginData | null {
        const userdata = localStorage.getItem("userdata");
        if(userdata == null) return null;

        const parsedData: LoginData = JSON.parse(userdata);
        if(parsedData.expires <= Date.now()) {
            localStorage.removeItem("userdata");
            return null;
        }
        return parsedData;
    }

    public static async Register(name: string, email: string, password: string): Promise<boolean> {
        let formData = new FormData();
        formData.append("name",     name);
        formData.append("email",    email);
        formData.append("password", password);

        const result = await fetch("http://localhost:8088/register", {
            method: 'post',
            body: formData,
        }).then(res => res.json());

        if(result.success) {
            const userdata: LoginData = {...result,
                                         expires: Date.now() + result.expiresin * 1000,
                                         expiresin: undefined,
                                         success: undefined};
            localStorage.setItem("userdata", JSON.stringify(userdata));
        }
        return result.success;
    }

    public static async Login(email: string, password: string): Promise<boolean> {
        let formData = new FormData();
        formData.append("email",    email);
        formData.append("password", password);

        const result = await fetch("http://localhost:8088/login", {
            method: 'post',
            body: formData,
        }).then(res => res.json());

        if(result.success) {
            const userdata: LoginData = {...result,
                                         expires: Date.now() + result.expiresin * 1000,
                                         expiresin: undefined,
                                         success: undefined};
            localStorage.setItem("userdata", JSON.stringify(userdata));
        }
        return result.success;
    }
    public static async Logout(): Promise<boolean> {
        const token = LoginService.GetLoginData()?.token;
        if(token == undefined) return false;

        let formData = new FormData();
        formData.append("token", token);

        const result = await fetch("http://localhost:8088/logout", {
            method: 'post',
            body: formData,
        }).then(res => res.json());
        
        if(result.success) {
            localStorage.removeItem("userdata");
        }
        return result.success;
    }
}