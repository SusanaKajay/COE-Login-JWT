import {observable, action, computed, decorate,} from 'mobx';

class UserState {
    Member_ID = '';
    Token = '';

    get getid(){
        return this.Member_ID
    }

    get getTokenFromLogin(){
        return this.Token
    }

    setid(id) {
        this.Member_ID = id
    }

    setTokenFromLogin(token) {
        this.Token = token
    }
}

decorate(UserState,{
    Member_ID: observable, // ตัวแปรปกติ
    getid: computed, // get แบบ reRender
    setid: action, // เป็ฯ function ปกติ (ไม่ reRender)
})

const userState = new UserState() // สร้าง
export default userState // ให้คนอื่นใช้
