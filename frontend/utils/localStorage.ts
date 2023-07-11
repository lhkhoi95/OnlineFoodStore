import Cookies from 'js-cookie';

const localStorage = {
    getItem: (key: string) => {
        if (typeof window !== 'undefined') {
            return window.localStorage.getItem(key) || Cookies.get(key);
        }
        return null;
    },
    setItem: (key: any, value: any) => {
        if (typeof window !== 'undefined') {
            window.localStorage.setItem(key, value);
            Cookies.set(key, value);
        }
    },
    removeItem: (key: any) => {
        if (typeof window !== 'undefined') {
            window.localStorage.removeItem(key);
            Cookies.remove(key);
        }
    },
};

export default localStorage;