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
    public me = async (url: string) => {
        return this.http(url, 'get')
    }

    public login = async (url: string, variables: LoginInput) => {
        return this.http<LoginInput>(url, 'post', variables)
    }

    public logout = async (url: string) => {
        return http.post(url)
    }

    public register = async (url: string, variables: RegisterInput) => {
        return this.http<RegisterInput>(url, 'post', variables)
    }

    public changePassword = async (url: string, variables: ChangePasswordInput) => {
        return this.http<ChangePasswordInput>(url, 'post', variables)
    }

    public forgetPassword = async (url: string, variables: ForgetPasswordInput) => {
        return this.http<ForgetPasswordInput>(url, 'post', variables)
    }

    public verifyForgetPasswordToken = async (url: string, variables: VerifyForgetPasswordTokenInput) => {
        return this.http<VerifyForgetPasswordTokenInput>(url, 'post', variables)
    }

    public resetPassword = async (url: string, variables: ResetPasswordInput) => {
        return this.http<ResetPasswordInput>(url, 'post', variables)
    }

    public block = async (url: string, variables: { id: number }) => {
        return this.http<{ id: number }>(url, 'post', variables)
    }

    public unblock = async (url: string, variables: { id: number }) => {
        return this.http<{ id: number }>(url, 'post', variables)
    }
    public addWalletPoints = async (url: string, variables: { customer_id: string; points: number }) => {
        return this.http<{ customer_id: string; points: number }>(url, 'post', variables)
    }
}

export default new User()
