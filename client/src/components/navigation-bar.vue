<script setup>
import JSConfetti from 'js-confetti'

const props = defineProps({
  completedCount: { type: Number, required: true },
  incompleteCount: { type: Number, required: true }
})

const fireConfetti = () => {
  const jsConfetti = new JSConfetti()
  if (props.completedCount === props.incompleteCount + props.completedCount) {
    jsConfetti.addConfetti({
      emojiSize: 30,
      emojis: ['✅', '🔥', '✨', '💫', '🎉',]
    })
  } else {
    jsConfetti.addConfetti({
      emojiSize: 30,
      emojis: ['❗', '⏱️', '⏳', '👀', '🤔']
    })
  }
}
</script>

<template lang="pug">
nav.navbar
  .menu-panel
    a(href="/" title="홈페이지").title
      font-awesome-icon(:icon="['fas', 'hand-sparkles']").logo-icon
      h1 TodoSphere
    button.btn-nav.dropdown.hidden-on-desktop
      .dropdown-content.left
        ul.menu-list
          li
            p.menu-link(@click="fireConfetti") 완료: {{ completedCount }} / {{ +incompleteCount + +completedCount }}
          li
            a.menu-link(href="") User님의 프로필
      font-awesome-icon(:icon="['fas', 'bars']").menu-icon
      span.visually-hidden 메뉴
  .user-panel.hidden-on-mobile
    .completed-tasks.tooltip(@click="fireConfetti")
      p {{ completedCount }} / {{ +incompleteCount + +completedCount }}
      span.tooltiptext {{completedCount == +incompleteCount + +completedCount ? '다 됐습니다! 수고하셨습니다!' : '할 수 있습니다!'}}
    button.btn-nav.dropdown
      .dropdown-content.right.user
        p.dropdown-text User님, 환영합니다
        ul.menu-list
          li
            a.menu-link(href="") 내프로필
          li
            a.menu-link(href="") 계정 관리
          li
            a.menu-link(href="") 로그아웃
      font-awesome-icon(:icon="['fas', 'user']").user-icon
      span.visually-hidden User님의 프로필
</template>

<style lang="less">
@import '@/assets/styles/dropdown.less';

.title {
  display: flex;
  align-items: center;
  font-size: 1.5rem;

  h1 {
    color: @text-nav;
  }

  .logo-icon {
    margin: 0 15px;
  }
}

.menu-list {
  list-style-type: none;
  padding: 0;
  margin: 0;
}

.menu-list li {
  margin: 0;
}

.menu-link {
  display: block;
  cursor: pointer;
  padding: 20px 20px;
  font-size: 1.1rem;
  color: @text-primary;
  text-decoration: none;
  overflow: hidden;
  font-weight: 400;
  margin: 0;
}

.navbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: @accent;
  width: 100vw;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  color: @text-nav;
  padding: 0px 10px;
  min-height: 65px;
}

.menu-panel,
.user-panel {
  display: flex;
  align-items: center;
  margin: 0 5px;
}

.btn-nav {
  border: none;
  background: none;
  margin: 0;
  padding: 0;
}

.user-icon {
  transform: scale(1);
  cursor: pointer;
  margin: 0 10px;
}

.completed-tasks {
  display: block;
  margin: 4px 3px 0px 3px;
  font-size: 1rem;
  cursor: pointer;
  min-width: max-content;
  transform: translatey(-2px);
}

.hidden-on-desktop {
  display: none;
}

@media only screen and (max-width: 499px) {
  .hidden-on-mobile {
    display: none;
  }

.hidden-on-desktop {
  display: unset;
}
}

@media only screen and (min-width: 800px) {
  .completed-tasks {
    font-size: 1.2rem;
  }

  .user-icon {
    transform: scale(1.2);
    cursor: pointer;
    margin: 0 20px;
  }

  .search {
    min-width: 300px;
  }
}
</style>
