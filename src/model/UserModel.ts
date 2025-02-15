class UserModel{
    user_id :string
    email :string
    password :string
    role :string

    constructor(user_id: string, email: string, password: string, role: string) {
        this.user_id = user_id;
        this.email = email;
        this.password = password;
        this.role = role;
    }

}
export default UserModel;