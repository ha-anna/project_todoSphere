<script setup>
import { ref, computed } from 'vue'

const email = ref('');
const password = ref('');
const passwordFieldType = ref('password');
const showPassword = ref(false);

const toggleShow = () => {
  showPassword.value = !showPassword.value;
  passwordFieldType.value = showPassword.value ? 'text' : 'password';
}

const eyeIcon = computed(() => showPassword.value ? ['fas', 'eye-slash'] : ['fas', 'eye']);
</script>

<template lang="pug">
.register-container
  h2.mb10 가입 하십시오
  form(@submit.prevent="register")
    label(for="email") 이메일
      input(type="text" :email="email" placeholder="이메일" required).input-el
    label(for="password") 비밀번호
      .password-container
        input(:type="passwordFieldType" :password="password" placeholder="비밀번호" required).input-el
        font-awesome-icon(:icon="eyeIcon" @click="toggleShow").password-show-icon
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
