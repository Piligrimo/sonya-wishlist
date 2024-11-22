const axios = require('axios');
const instance = axios.create(
    {
        baseURL:  "https://crocus-mammoth-park.glitch.me/",
        withCredentials: false,
        headers: {
            'Access-Control-Allow-Origin' : '*',
            'Access-Control-Allow-Methods':'GET,PUT,POST,DELETE,PATCH,OPTIONS',   
        }
    })

export default {
    async getWishes() {
        try {
            const { data } = await instance.get('/wishes')
            return data
        } catch (e) {
            console.error(e)
        }
    },
    async createWish(label) {
        try {
            const { data } = await instance.post('/wishes', { label })
            return data
        } catch (e) {
            console.error(e)
        }
    },
    async deleteWish(id) {
        try {
            const { data } = await instance.delete('/wishes/'+id)
            return data
        } catch (e) {
            console.error(e)
        }
    },
    async bookWish(id,presenter) {
        try {
            const { data } = await instance.put('/wishes/'+id, { presenter })
            return data
        } catch (e) {
            console.error(e)
        }
    },
    async unbookWish(id) {
        try {
            const { data } = await instance.put('/unbook/'+id)
            return data
        } catch (e) {
            console.error(e)
        }
    },
}