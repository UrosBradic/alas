export type User = {
    userName: string,
    password: string
}

export type Client = {
    firstName: string,
    lastName: string,
    zipCode: string
}

export const standardUser: User = {
    userName: "standard_user",
    password: "secret_sauce"
};

export const invalidUser: User = {
    userName: "standard_user",
    password: "secret_sauce1"
};

export const standardClient: Client = {
    firstName: "Uros",
    lastName: "Bradic",
    zipCode: "11000"
}