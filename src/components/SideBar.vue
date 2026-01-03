<script setup>
/* eslint-disable no-unused-vars */
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { useRouter } from 'vue-router'
import Profile from '../pages/Profile.vue'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faGrip, faList, faPiggyBank, faWallet, faUser } from '@fortawesome/free-solid-svg-icons'
import { useAuthStore } from '../store/authStore'

// -------------------- state --------------------
  
const authStore = useAuthStore()
const name = ref('')
onMounted(async () => {
  await authStore.fetchCurrentUser()
  name.value = authStore.user.profile.first_name ? authStore.user.profile.first_name   : ''
})
const showProfilePopUp = ref(false)
const showMobileSheet = ref(false)
const popupRef = ref(null)
const sheetRef = ref(null)
const router = useRouter()

// -------------------- isMobile reactive via matchMedia --------------------
const isMobile = ref(window.matchMedia('(max-width: 768px)').matches)
let mql = null
const onMediaChange = (e) => {
  isMobile.value = e.matches
  // close popups if switching modes
  showProfilePopUp.value = false
  showMobileSheet.value = false
}

onMounted(() => {

  mql = window.matchMedia('(max-width: 768px)')
  // modern API supports addEventListener on MediaQueryList, fallback to addListener
  if (mql.addEventListener) mql.addEventListener('change', onMediaChange)
  else mql.addListener(onMediaChange)
  
})

onBeforeUnmount(() => {
  if (mql) {
    if (mql.removeEventListener) mql.removeEventListener('change', onMediaChange)
    else mql.removeListener(onMediaChange)
  }
})

// -------------------- Desktop popup logic --------------------
const onProfileBtnClick = () => {
  if (!isMobile.value) {
    showProfilePopUp.value = !showProfilePopUp.value
  }
}

const closeOnOutsideClick = (e) => {
  if (!isMobile.value && showProfilePopUp.value) {
    const popup = popupRef.value
    // if click is outside the popup and not on the profile button
    if (popup && !popup.contains(e.target)) {
      showProfilePopUp.value = false
    }
  }
}
onMounted(() => document.addEventListener('click', closeOnOutsideClick))
onBeforeUnmount(() => document.removeEventListener('click', closeOnOutsideClick))

// -------------------- Router helpers + vibration --------------------
const vibrateIfSupported = (ms = 15) => {
  if (typeof navigator !== 'undefined' && typeof navigator.vibrate === 'function') {
    navigator.vibrate(ms)
  }
}
const navTo = (path) => {
  vibrateIfSupported(15)
  if (router.currentRoute.value.path !== path) router.push(path)
}

// active check
const isActive = (path) => router.currentRoute.value.path === path

// -------------------- Mobile bottom sheet logic --------------------
const openMobileSheet = () => {
  vibrateIfSupported(15)
  showMobileSheet.value = true
}

const closeMobileSheet = () => {
  showMobileSheet.value = false
  // reset transform if used
  if (sheetRef.value) sheetRef.value.style.transform = ''
}

// touch gesture variables
let startY = 0
let currentY = 0
let dragging = false

const onTouchStart = (e) => {
  if (e.touches && e.touches.length === 1) {
    startY = e.touches[0].clientY
    currentY = startY
    dragging = true
    if (sheetRef.value) {
      sheetRef.value.style.transition = 'none'
    }
  }
}

const onTouchMove = (e) => {
  if (!dragging) return
  currentY = e.touches[0].clientY
  const deltaY = Math.max(0, currentY - startY) // only downward move
  if (sheetRef.value) {
    sheetRef.value.style.transform = `translateY(${deltaY}px)`
  }
}

const onTouchEnd = () => {
  if (!dragging) return
  dragging = false
  const delta = currentY - startY
  if (sheetRef.value) sheetRef.value.style.transition = 'transform 200ms ease'
  // threshold to close (100px or 20% of sheet height)
  const sheetHeight = sheetRef.value ? sheetRef.value.getBoundingClientRect().height : 0
  const threshold = Math.min(100, sheetHeight * 0.2)
  if (delta > threshold) {
    // close
    if (sheetRef.value) sheetRef.value.style.transform = `translateY(100%)`
    // small delay to allow transition then actually hide
    setTimeout(() => closeMobileSheet(), 180)
  } else {
    // reset
    if (sheetRef.value) sheetRef.value.style.transform = ''
  }
}

// -------------------- utilities --------------------
const getFirstLetter = (str = '') => (str && str.length ? String(str).charAt(0).toUpperCase() : '?')
</script>


<template>
  <aside class="sidebar" :class="{ 'sidebar--mobile': isMobile }" aria-label="Main sidebar">
    <!-- Profile Button (desktop) -->
    <button
      class="profile-btn"
      @click.stop="onProfileBtnClick"
      aria-label="Open profile"
      v-if="!isMobile"
    >
      <span class="letter">{{ getFirstLetter(name) }}</span>
    </button>

    <!-- Desktop Profile Popup (centered under button) -->
    <transition name="fade-slide">
      <div
        v-if="showProfilePopUp && !isMobile"
        ref="popupRef"
        class="profile-popup"
        role="dialog"
        aria-modal="false"
      >
        <Профил />
      </div>
    </transition>

    <!-- Desktop Menu -->
    <nav class="menu" v-if="!isMobile" aria-label="Primary">
      <router-link to="/" class="link" :class="{ active: isActive('/') }">
        <span class="icon"><FontAwesomeIcon :icon="faGrip" /></span>
        <span class="text">Табло</span>
      </router-link>

      <router-link to="/transactions" class="link" :class="{ active: isActive('/transactions') }">
        <span class="icon"><FontAwesomeIcon :icon="faList" /></span>
        <span class="text">Транзакции</span>
      </router-link>

      <router-link to="/budget" class="link" :class="{ active: isActive('/budget') }">
        <span class="icon"><FontAwesomeIcon :icon="faWallet" /></span>
        <span class="text">Бюджет</span>
      </router-link>

      <router-link to="/pots" class="link" :class="{ active: isActive('/pots') }">
        <span class="icon"><FontAwesomeIcon :icon="faPiggyBank" /></span>
        <span class="text">Касички</span>
      </router-link>
    </nav>

    <!-- Mobile Bottom Navigation (fixed) -->
    <nav class="mobile-bar" v-if="isMobile" aria-label="Mobile navigation">
      <button
        class="m-link"
        :class="{ active: isActive('/') }"
        @click="navTo('/')"
        aria-label="Dashboard"
      >
        <FontAwesomeIcon :icon="faGrip" />
      </button>

      <button
        class="m-link"
        :class="{ active: isActive('/transactions') }"
        @click="navTo('/transactions')"
        aria-label="Transactions"
      >
        <FontAwesomeIcon :icon="faList" />
      </button>

      <button
        class="m-link"
        :class="{ active: isActive('/budget') }"
        @click="navTo('/budget')"
        aria-label="Budget"
      >
        <FontAwesomeIcon :icon="faWallet" />
      </button>

      <button
        class="m-link"
        :class="{ active: isActive('/pots') }"
        @click="navTo('/pots')"
        aria-label="Pots"
      >
        <FontAwesomeIcon :icon="faPiggyBank" />
      </button>

      <!-- Profile icon (mobile) -->
      <button
        class="m-link profile-mobile"
        @click="openMobileSheet"
        aria-label="Open profile"
      >
        <FontAwesomeIcon :icon="faUser" />
      </button>
    </nav>

    <!-- Mobile Bottom Sheet (inlined here) -->
    <transition name="bottom-sheet">
      <div
        v-if="showMobileSheet && isMobile"
        class="bottom-sheet-backdrop"
        @click.self="closeMobileSheet"
        aria-hidden="false"
      >
        <div
          class="bottom-sheet"
          ref="sheetRef"
          @touchstart.passive="onTouchStart"
          @touchmove.passive="onTouchMove"
          @touchend.passive="onTouchEnd"
          role="dialog"
          aria-modal="true"
        >
          <div class="sheet-grabber" aria-hidden="true"></div>
          <Profile />
        </div>
      </div>
    </transition>
  </aside>
</template>



<style>
/* Root theme variables (easy to adjust) */
:root {
  --primary: #4a6cf7;
  --text: #222;
  --muted: #7a7a7a;
  --bg: #fff;
  --bg-secondary: #f4f5f7;
  --radius: 12px;
  --mobile-bar-height: 64px;
}

/* ---------- Layout ---------- */
.sidebar {
  position: relative;
  width: 220px;
  min-width: 220px;
  height: 100vh;
  padding: 2rem 1.2rem;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  gap: 1rem;
  background: var(--bg);
  border-right: 1px solid rgba(0,0,0,0.06);
  box-sizing: border-box;
}

/* profile button */
.profile-btn {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  border: none;
  background: var(--bg-secondary);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-weight: 600;
  color: var(--text);
}

/* centered popup */
.profile-popup {
  position: absolute;
  top: 64px; /* below profile btn */
  left: 50%;
  transform: translateX(-50%);
  min-width: 220px;
  background: var(--bg);
  border-radius: var(--radius);
  padding: 0.75rem;
  box-shadow: 0 8px 24px rgba(0,0,0,0.08);
  z-index: 50;
}

/* menu (desktop) */
.menu {
  margin-top: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}
.link {
  display: inline-flex;
  gap: 0.75rem;
  align-items: center;
  padding: 0.6rem 0.9rem;
  border-radius: 10px;
  text-decoration: none;
  color: var(--muted);
  font-weight: 500;
  cursor: pointer;
  background: transparent;
  border: none;
  transition: background 160ms ease, color 160ms ease, transform 120ms ease;
}
.link .icon { display: inline-flex; width: 20px; justify-content: center; }
.link .text { font-size: 0.95rem; }
.link:hover { background: var(--bg-secondary); color: var(--text); transform: translateY(-1px); }
.link.active { background: var(--primary); color: #fff; }

/* desktop fade+slide */
.fade-slide-enter-active,
.fade-slide-leave-active { transition: opacity .25s ease, transform .25s ease; }
.fade-slide-enter-from,
.fade-slide-leave-to { opacity: 0; transform: translateY(-8px); }

/* ---------- Mobile (<=768px) ---------- */
@media (max-width: 768px) {
  .sidebar {
    width: 100%;
    min-width: 0;
    height: auto;
    padding: 0;
    border-right: none;
    justify-content: flex-end;
  }

  /* hide desktop menu and profile button */
  .menu { display: none; }
  .profile-btn { display: none; }
  .profile-popup { display: none; }

  /* Mobile bottom bar (full-width, fixed) */
  .mobile-bar {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    height: var(--mobile-bar-height);
    background: var(--bg);
    border-top: 1px solid rgba(0,0,0,0.06);
    display: flex;
    justify-content: space-around;
    align-items: center;
    z-index: 80;
    box-shadow: 0 -6px 18px rgba(0,0,0,0.04);
  }

  .m-link {
    border: none;
    background: transparent;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 52px;
    height: 52px;
    border-radius: 12px;
    font-size: 1.05rem;
    color: var(--muted);
    cursor: pointer;
    transition: color 140ms ease, background 140ms ease, transform 120ms ease;
  }

  .m-link:active { transform: translateY(1px); }

  /* active color change for icons (option 1) */
  .m-link.active { color: var(--primary); }

  /* Profile-specific style (slightly different if you want) */
  .profile-mobile { /* could add different background if desired */ }

  /* Bottom-sheet backdrop (dimmed) */
  .bottom-sheet-backdrop {
    position: fixed;
    inset: 0;
    background: rgba(0,0,0,0.38);
    display: flex;
    justify-content: center;
    align-items: flex-end;
    z-index: 120;
  }

  .bottom-sheet {
    width: 100%;
    max-width: 100%;
    height: 45vh; /* chosen M size */
    border-top-left-radius: var(--radius);
    border-top-right-radius: var(--radius);
    background: var(--bg);
    padding: 0.75rem;
    box-shadow: 0 -8px 24px rgba(0,0,0,0.12);
    transform: translateY(0);
    transition: transform 280ms cubic-bezier(.2,.9,.2,1), opacity 220ms ease;
    overflow: auto;
    -webkit-overflow-scrolling: touch;
  }

  /* small grabber */
  .sheet-grabber {
    width: 36px;
    height: 4px;
    background: rgba(0,0,0,0.12);
    border-radius: 999px;
    margin: 6px auto 10px;
  }

  /* bottom-sheet transition classes (Vue <transition> using these names) */
  .bottom-sheet-enter-from { transform: translateY(100%); opacity: 0; }
  .bottom-sheet-enter-active { transition: transform 260ms cubic-bezier(.2,.9,.2,1), opacity 200ms ease; }
  .bottom-sheet-enter-to { transform: translateY(0%); opacity: 1; }
  .bottom-sheet-leave-from { transform: translateY(0%); opacity: 1; }
  .bottom-sheet-leave-active { transition: transform 220ms ease, opacity 180ms ease; }
  .bottom-sheet-leave-to { transform: translateY(100%); opacity: 0; }
}

/* small responsive niceties */
@media (max-width: 420px) {
  .m-link { width: 44px; height: 44px; font-size: 1rem; }
  :root { --mobile-bar-height: 60px; }
}
</style>
