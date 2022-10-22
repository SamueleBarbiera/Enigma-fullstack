import {
    UpdateUser,
    CreateUser,
    LoginInput,
    RegisterInput,
    ChangePasswordInput,
    ForgetPasswordInput,
    VerifyForgetPasswordTokenInput,
    ResetPasswordInput,
} from '@ts-types/generated'
import http from '@utils/api/http'
import Base from './base'

class User extends Base<CreateUser, UpdateUser> {
    public me = (url: string) => {
        return this.http(url, 'get')
    }

    public login = (url: string, variables: LoginInput) => {
        return this.http<LoginInput>(url, 'post', variables)
    }

    public logout = (url: string) => {
        return http.post(url)
    }

    public register = (url: string, variables: RegisterInput) => {
        return this.http<RegisterInput>(url, 'post', variables)
    }

    public changePassword = (url: string, variables: ChangePasswordInput) => {
        return this.http<ChangePasswordInput>(url, 'post', variables)
    }

    public forgetPassword = (url: string, variables: ForgetPasswordInput) => {
        return this.http<ForgetPasswordInput>(url, 'post', variables)
    }

    public verifyForgetPasswordToken = (url: string, variables: VerifyForgetPasswordTokenInput) => {
        return this.http<VerifyForgetPasswordTokenInput>(url, 'post', variables)
    }

    public resetPassword = (url: string, variables: ResetPasswordInput) => {
        return this.http<ResetPasswordInput>(url, 'post', variables)
    }

    public block = (url: string, variables: { id: number }) => {
        return this.http<{ id: number }>(url, 'post', variables)
    }

    public unblock = (url: string, variables: { id: number }) => {
        return this.http<{ id: number }>(url, 'post', variables)
    }
    public addWalletPoints = (url: string, variables: { customer_id: string; points: number }) => {
        return this.http<{ customer_id: string; points: number }>(url, 'post', variables)
    }
}

export default new User()
