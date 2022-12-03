export declare interface IFormInput {
    username: string,
    password: string,
    confirmPassword?: string
}

export interface IFile {
    filename: string,
    mimetype: string,
    location: string,
    size: string
}

export interface IUserStore {
    username: string,
    token: string,
    files: File[],
}

// export interface Error {
//     dirty: boolean,
//     error: boolean,
//     message: string
// }