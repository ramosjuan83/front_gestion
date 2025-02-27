import { useCookies } from "@vueuse/integrations/useCookies";
import {tokenExpireAt} from '@/utils'

const setToken = (token) => {
    const { set } = useCookies([import.meta.env.VITE_APP_TOKEN]);
    set(import.meta.env.VITE_APP_TOKEN, token, {
        expires: tokenExpireAt()
    });
}

const getToken = () => {
    const { get } = useCookies([import.meta.env.VITE_APP_TOKEN]);
    return get(import.meta.env.VITE_APP_TOKEN) 
}

const removeToken = () => {
    const { remove } = useCookies([import.meta.env.VITE_APP_TOKEN]);
    remove(import.meta.env.VITE_APP_TOKEN);
}

export { setToken, getToken, removeToken };