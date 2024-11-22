<template>
  <div id="app">
    <div v-if="!login" class="login">
      <br>
      <br>
      <br>
      <br>
      <h2>Ты кто?</h2>
      <input v-model="proxyLogin" placeholder="Введи имя"/>
      <button @click="login = proxyLogin">Войти</button>
    </div>
    <template v-else>
      <div v-if="isAdmin" class="wish" >
        <textarea v-model="newWish" placeholder="Введи желание"/>
        <button @click="createWish">Создать</button>
      </div>
      <h1>Список желаний Сони Балдиной</h1>
      <div v-for="wish in wishes" class="wish" :key="wish.id">
        <h3 class="wish__label">{{ wish.label }}</h3>
        <div  v-if="!isAdmin"></div>
        <button v-if="!wish.presenter" @click="bookWish(wish.id)">Забронировать</button>
        <button v-else-if="wish.presenter === login" @click="unbookWish(wish.id)">Разбронировать</button>
        <button v-else disabled>Забронировано</button>
        <button v-if="isAdmin" @click="deleteWish(wish.id)">Удалить</button>
      </div>
    </template>
    <div v-if="isLoading" class="loader">
      <img class="loader__img" src="./assets/loader.png">
    </div>
  </div>
</template>
<script>
import api from '@/api'

export default {
  name: 'App',
  data() { 
    return {
      wishes: [],
      proxyLogin: '',
      login: '',
      newWish: '',
      isAdmin: false,
      isLoading: false,
    }
  },
  methods: {
    async createWish(){
      this.isLoading = true;
      await api.createWish(this.newWish)
      await this.getWishes()
    },
    async getWishes() {
      this.isLoading = true;
      this.wishes = await api.getWishes()
      this.isLoading = false;
    },
    async deleteWish(id) {
      this.isLoading = true;
      await api.deleteWish(id)
      await this.getWishes()
    },
    async bookWish(id) { 
      this.isLoading = true;
      await api.bookWish(id, this.login)
      await this.getWishes()
    },
    async unbookWish(id) {
      this.isLoading = true;
      await api.unbookWish(id)
      await this.getWishes() 
    }
  },
  mounted() {
    this.getWishes() 
    if (window.location.search === '?admin=sonya') {
      this.isAdmin =  true
    }
  }
}
</script>

<style>
body {
  background-color: #e6c9ff;
  background-image: url(./assets/sonya.png);
  background-position-x: center;
  background-size: 150px;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #f8eaf7;
  text-shadow: -1px -1px 0 #7c3177, 1px -1px 5px #7c3177, -1px 1px 5px #7c3177, 1px 1px 5px #7c3177;
  margin-top: 60px;
  max-width: 600px;
  margin: auto;
}

.wish {
  display: grid;
  grid-template-columns: 6fr 1fr 1fr;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  gap: 18px;
  margin-bottom: 10px;
}

.wish__label {
  margin: 0;
  padding: 0;
  text-align: left;
  word-break: break-word;
}

button {
  padding: 10px;
  border-radius: 5px;
  background: #f8eaf7;
  color:  #7c3177;
  border: 1px solid #7c3177;
  cursor: pointer;
}

button:disabled {
  background: #d3d3d3;
  color: #958594;
  border: 1px solid #6d586c;
  cursor: not-allowed;
}


textarea {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  width:calc(100% - 30px) ;
  height: 70px;
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #7c3177;
  resize: none;
}
.login {
  display: flex;
  width: 200px;
  margin: auto;
  flex-direction: column;
  align-items: stretch;
}

input {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #ccc;
  margin-bottom: 10px;
}

.loader {
  position: fixed;
  top: 0;
  left: 0;
  width: 100dvw;
  height: 100dvh;
  background: rgba(0, 0, 0, 0.5);
}

.loader__img {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 200px;
  height: 200px;
  animation: spin 1s linear infinite;
}

@keyframes spin { 
  0% { transform: translate(-50%, -50%) rotate(-360deg); }
}


</style>
