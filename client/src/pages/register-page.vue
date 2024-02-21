<script setup>
import { ref, computed } from 'vue'
import isEmail from 'validator/lib/isEmail'
import axios from 'axios'

const email = ref('')
const password = ref('')
const passwordConfirmation = ref('')
const passwordFieldType = ref('password')
const showPassword = ref(false)
const isError = ref(false)
const errorMessage = ref('')

const toggleShow = () => {
  showPassword.value = !showPassword.value
  passwordFieldType.value = showPassword.value ? 'text' : 'password'
}

const eyeIcon = computed(() => (showPassword.value ? ['fas', 'eye-slash'] : ['fas', 'eye']))

const validatePassword = () => {
  if (password.value.length < 8) {
    isError.value = true
    errorMessage.value = '비밀번호는 8자리 이상이어야 합니다'
    return false
  }

  if (password.value !== passwordConfirmation.value) {
    isError.value = true
    errorMessage.value = '비밀번호와 비밀번호 확인이 일치해야 합니다'
    return false
  }
  isError.value = false
  errorMessage.value = ''
  return true
}

const validateEmail = () => {
  if (!isEmail(email.value)) {
    isError.value = true
    errorMessage.value = '유효한 이메일 형식이 아닙니다'
    return false
  }
  isError.value = false
  errorMessage.value = ''
  return true
}

const registerUser = async () => {
  if (validateEmail(email.value) && validatePassword(password.value, passwordConfirmation.value)) {
    try {
      isError.value = false
      errorMessage.value = ''
      const userData = new FormData()
      userData.append('email', email.value)
      userData.append('password', password.value)
      userData.append('passwordConfirmation', passwordConfirmation.value)
      const response = await axios.post(`${import.meta.env.VITE_API_HOST}/api/users/register`, userData)
    } catch (error) {
      isError.value = true
      errorMessage.value = error.response.data.error
    }
  }
}
</script>

<template lang="pug">
.register-container
  h2.mb10 가입하십시오
  form(@submit.prevent="register")
    label(for="email") 이메일
      input(type="text" v-model="email" placeholder="이메일" required).input-el
    label(for="password") 비밀번호
      .password-container
        input(:type="passwordFieldType" v-model="password" placeholder="비밀번호" required).input-el
        font-awesome-icon(:icon="eyeIcon" @click="toggleShow").password-show-icon
    label(for="password") 비밀번호 확인
      .password-container
        input(:type="passwordFieldType" v-model="passwordConfirmation" placeholder="비밀번호 확인" required).input-el
        font-awesome-icon(:icon="eyeIcon" @click="toggleShow").password-show-icon
    span.error-message(v-if="isError") {{ errorMessage }}
    button(type="submit" @click="registerUser").long-btn 회원가입
    a.login-link(href="/login") 로그인
</template>

<style lang="less" scoped>
.register-container {
  text-align: left;
  align-self: flex-start;
  max-width: 400px;
  width: 100%;
  margin: 0 auto;
  margin-top: 100px;
  opacity: 1;

  .input-el {
    border: @input-border;
    border-radius: @input-border-radius;
    width: 100%;
    height: 45px;
    padding: 0 10px;
    padding-right: 25px;
    color: @text-primary;
    margin: 10px 0;
  }

  .password-container {
    position: relative;

    .password-show-icon {
      position: absolute;
      right: 10px;
      top: 25px;
      color: @text-secondary;
      cursor: pointer;
    }
  }

  form {
    display: flex;
    flex-direction: column;
  }
  .login-link {
    margin: auto;
    margin-top: 25px;
  }
}
</style>
