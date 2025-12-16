import axios from "axios";

let getTokenFn: (() => Promise<string | null>) | null = null;

//  Call this once from App.tsx to inject Clerk's getToken 
export const setAuthTokenGetter = (
    fn: () => Promise<string | null>
) => {
    getTokenFn = fn;
};

const api = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
});

//  Attach Authorization header automatically
api.interceptors.request.use(
    async (config) => {
        if (getTokenFn) {
            const token = await getTokenFn();
            if (token) {
                config.headers.Authorization = `Bearer ${token}`;
            }
        }
        return config;
    },
    (error) => Promise.reject(error)
);

export default api;
