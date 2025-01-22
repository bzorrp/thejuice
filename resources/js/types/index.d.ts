export interface User {
    id: number;
    name: string;
    username: string;
    wallet_balance: number;
    email: string;
    email_verified_at?: string;
}

type Juice = {
    id: number;
    name: string;
    price: number;
}

type Cart = {
    id: number;
    items?: {
        id: number;
        juice: Juice;
        quantity: number;
    }[]
}

export type PageProps<
    T extends Record<string, unknown> = Record<string, unknown>,
> = T & {
    auth: {
        user: User;
    };
    cart: Cart;
};
