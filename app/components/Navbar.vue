<template>
  <ClientOnly>
    <header class="header">
      <div class="container">
        <div class="row">
          <div class="left">
            <NuxtLink to="/" class="logo-link" aria-label="Zafstours home">
              <img src="/images/logo.svg" alt="Zafstours" class="logo" />
            </NuxtLink>
          </div>
          <!-- Desktop Navigation -->
          <nav class="center-nav" aria-label="Primary navigation">
            <ul class="nav-list">
              <li v-for="item in navItems" :key="item.key" class="nav-item">
                <!-- Simple non-mega links (use resolveTo to ensure correct shape) -->
                <NuxtLink
                  v-if="!item.mega"
                  :to="resolveTo(item)"
                  class="nav-link"
                  :class="{ active: isActive(item) }"
                  @click="() => { closeMega(); }"
                >
                  <span class="nav-text">{{ item.label }}</span>
                  <span class="nav-ring" aria-hidden></span>
                </NuxtLink>
                <!-- Mega menu -->
                <div v-else class="mega-wrap">
                  <button
                    class="nav-link trigger"
                    :aria-expanded="openMega === item.key"
                    @click="toggleMegaMenu(item.key)"
                    @mouseenter="() => handleMouseEnter(item.key)"
                    @mouseleave="handleMouseLeave"
                    @focus="() => handleMouseEnter(item.key)"
                    @blur="handleBlur"
                    :ref="el => setTriggerRef(item.key, el)"
                  >
                    <span class="nav-text">{{ item.label }}</span>
                    <svg
                      class="chev"
                      :class="{ 'chev-open': openMega === item.key }"
                      viewBox="0 0 24 24"
                      aria-hidden
                      focusable="false"
                      fill="none"
                      stroke="currentColor"
                    >
                      <path d="M6 9l6 6 6-6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                    <span class="nav-ring" aria-hidden></span>
                  </button>
                  <div
                    v-if="item.mega"
                    :ref="el => setPanelRef(item.key, el)"
                    class="mega-panel"
                    :class="{ open: openMega === item.key }"
                    :style="panelStyle(item.key)"
                    @mouseenter="handlePanelMouseEnter"
                    @mouseleave="handlePanelMouseLeave"
                  >
                    <div class="mega-grid">
                      <div class="mega-col" v-for="(col, idx) in item.megaCols" :key="idx">
                        <h4 class="mega-title">{{ col.title }}</h4>
                        <ul class="mega-links">
                          <li v-for="link in col.links" :key="link.label">
                            <!-- All mega links navigate programmatically to avoid accidental merging -->
                            <a
                              href="#"
                              class="mega-link"
                              @click.prevent="handleLinkClick(link)"
                            >
                              {{ link.label }}
                            </a>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </li>
            </ul>
          </nav>
          <div class="right">
            <button class="icon-btn search-btn" @click="openSiteSearch" aria-label="Search">
              <svg class="icon" viewBox="0 0 24 24" aria-hidden fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="11" cy="11" r="6" />
                <path d="M21 21l-4.35-4.35" />
              </svg>
            </button>
            <!-- Currency Dropdown -->
            <div class="currency">
              <button
                class="currency-btn"
                @click="toggleCurrencyMenu"
                :aria-expanded="showCurrency"
                aria-haspopup="true"
                ref="currencyButton"
              >
                <span class="currency-text">{{ selectedCurrency }}</span>
                <svg
                  class="chev-sm"
                  :class="{ 'chev-sm-open': showCurrency }"
                  viewBox="0 0 24 24"
                  aria-hidden
                  fill="none"
                  stroke="currentColor"
                >
                  <path d="M6 9l6 6 6-6" stroke-width="2" />
                </svg>
              </button>
              <div
                v-if="showCurrency"
                class="currency-menu"
                role="menu"
                ref="currencyMenu"
              >
                <ul>
                  <li v-for="c in currencies" :key="c">
                    <button class="currency-item" @click="selectCurrency(c)">{{ c }}</button>
                  </li>
                </ul>
              </div>
            </div>
            <NuxtLink :to="resolveTo({ to: '/inquire' })" class="cta">INQUIRE NOW</NuxtLink>
            <button class="hamburger" @click="mobileOpen = !mobileOpen" :aria-expanded="mobileOpen" aria-label="Open menu">
              <svg v-if="!mobileOpen" class="icon" viewBox="0 0 24 24" aria-hidden fill="none" stroke="currentColor" stroke-width="2">
                <path d="M4 6h16M4 12h16M4 18h16" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
              <svg v-else class="icon" viewBox="0 0 24 24" aria-hidden fill="none" stroke="currentColor" stroke-width="2">
                <path d="M6 18L18 6M6 6l12 12" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </button>
          </div>
        </div>
      </div>
      <!-- Mobile Navigation Panel -->
      <transition name="slide">
        <div v-if="mobileOpen" class="mobile-panel">
          <div class="mobile-inner">
            <ul class="mobile-list">
              <li v-for="item in navItems" :key="item.key" class="mobile-item">
                <div v-if="!item.mega">
                  <NuxtLink :to="resolveTo(item)" class="mobile-link" @click="() => { mobileOpen = false; closeMega(); }">{{ item.label }}</NuxtLink>
                </div>
                <div v-else>
                  <button class="mobile-link-toggle" @click="toggleMobile(item.key)">
                    <span class="mobile-link-text">{{ item.label }}</span>
                    <svg class="mobile-chev" :class="{ 'mobile-chev-open': mobileActive === item.key }" viewBox="0 0 24 24" aria-hidden fill="none" stroke="currentColor">
                      <path d="M6 9l6 6 6-6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                  </button>
                  <div v-if="mobileActive === item.key" class="mobile-sub">
                    <div v-for="col in item.megaCols" :key="col.title" class="mobile-col">
                      <h5 class="mobile-col-title">{{ col.title }}</h5>
                      <ul class="mobile-sub-list">
                        <li v-for="link in col.links" :key="link.label" class="mobile-sub-item">
                          <a
                            href="#"
                            class="mobile-sub-link"
                            @click.prevent="() => handleMobileLink(link)"
                          >
                            {{ link.label }}
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </li>
            </ul>
            <div class="mobile-actions">
              <div class="mobile-currency">
                <select v-model="selectedCurrency" class="mobile-currency-select" @change="selectCurrency(selectedCurrency)">
                  <option v-for="c in currencies" :key="c" :value="c">{{ c }}</option>
                </select>
              </div>
              <NuxtLink :to="resolveTo({ to: '/inquire' })" class="mobile-cta" @click="mobileOpen = false">INQUIRE NOW</NuxtLink>
            </div>
          </div>
        </div>
      </transition>
      <!-- Search Overlay -->
      <transition name="fade">
        <div v-if="showSearch" class="search-overlay" role="dialog" aria-modal="true">
          <div class="search-box">
            <input v-model="searchQuery" @keydown.enter="performSearch" ref="searchInput" class="search-input" placeholder="Search tours, parks, routes, articles..." />
            <div class="search-actions">
              <button class="btn" @click="performSearch">Search</button>
              <button class="btn alt" @click="closeSearch">Close</button>
            </div>
          </div>
        </div>
      </transition>
    </header>
  </ClientOnly>
</template>

<script setup>
import { ref, nextTick, onMounted, onBeforeUnmount, watch } from 'vue'
import { useRoute } from 'vue-router'
const route = useRoute()

// UI
const mobileOpen = ref(false)
const mobileActive = ref(null)
const openMega = ref(null)
const showSearch = ref(false)
const searchQuery = ref('')
const showCurrency = ref(false)
const selectedCurrency = ref('USD')
const currencies = ['USD','EUR','TZS']

// Hover/click state for mega
const menuOpenedByClick = ref(false)
const isMouseOverPanel = ref(false)
const isMouseOverTrigger = ref(false)

// DOM refs
const currencyButton = ref(null)
const currencyMenu = ref(null)
const triggerRefs = ref({})
const panelRefs = ref({})
const panelPositions = ref({})
const EDGE = 14

// NAV items — park links marked with type:'park', route links marked type:'route'
// ONLY include a short list of famous parks and 6 famous trekking routes
const navItems = [
  {
    key: 'safari',
    label: 'Safari',
    mega: true,
    megaCols: [
      {
        title: 'Parks',
        links: [
          { label: 'Serengeti', type: 'park', slug: 'serengeti' },
          { label: 'Ngorongoro', type: 'park', slug: 'ngorongoro' },
          { label: 'Tarangire', type: 'park', slug: 'tarangire' },
          { label: 'Lake Manyara', type: 'park', slug: 'lake-manyara' },
          { label: 'Ruaha', type: 'park', slug: 'ruaha' },
          { label: 'Nyerere (Selous)', type: 'park', slug: 'nyerere' }
        ]
      },
      {
        title: 'Tours',
        links: [
          { label: 'All Safari Tours', to: { path: '/tours', query: { category: 'wildlife-safari' } } },
          { label: 'Family Safaris', to: { path: '/tours', query: { category: 'wildlife-safari', family: '1' } } },
        ]
      },
      {
        title: 'Resources',
        links: [
          { label: 'Packing List', to: '/tanzania-safari/packing-list' },
          { label: 'Articles', to: '/articles' },
        ]
      }
    ]
  },
  {
    key: 'trekking',
    label: 'Trekking',
    mega: true,
    megaCols: [
      {
        title: 'Routes',
        links: [
          { label: 'Lemosho', type: 'route', slug: 'lemosho' },
          { label: 'Machame', type: 'route', slug: 'machame' },
          { label: 'Marangu', type: 'route', slug: 'marangu' },
          { label: 'Rongai', type: 'route', slug: 'rongai' },
          { label: 'Umbwe', type: 'route', slug: 'umbwe' },
          { label: 'Northern Circuit', type: 'route', slug: 'northern-circuit' }
        ]
      },
      {
        title: 'Planning',
        links: [
          { label: 'Packing List', to: '/climbing-kilimanjaro/packing-list' },
          { label: 'Guides & Porters', to: '/climbing-kilimanjaro/guides-and-porters' },
        ]
      },
      {
        title: 'Tours',
        links: [
          { label: 'Kilimanjaro Tours', to: { path: '/tours', query: { category: 'kilimanjaro-climb' } } },
        ]
      }
    ]
  },
  { key: 'experiences', label: 'Experiences', to: '/experiences', mega: false },
  { key: 'zanzibar', label: 'Zanzibar', to: '/zanzibar', mega: false },
  { key: 'about', label: 'About', to: '/about', mega: false },
  { key: 'gallery', label: 'Gallery', to: '/gallery', mega: false },
  { key: 'blog', label: 'Blog', to: '/blog', mega: false },
  { key: 'contact', label: 'Contact', to: '/contact', mega: false },
]

// Utilities
function resolveTo(itemOrLink) {
  const candidate = itemOrLink && itemOrLink.to !== undefined ? itemOrLink.to : itemOrLink
  if (candidate === null || candidate === undefined) return '/'
  if (typeof candidate === 'string') return String(candidate)
  if (typeof candidate === 'object') {
    // shallow clone object (path + query)
    const obj = {}
    if (candidate.path) obj.path = candidate.path
    if (candidate.name) obj.name = candidate.name
    obj.query = { ...(candidate.query || {}) }
    return obj
  }
  return '/'
}
function isActive(item) {
  if (!item) return false
  const to = item.to
  if (!to) return false
  try {
    const path = typeof to === 'string' ? to : (to.path || '')
    return route.path.startsWith(path)
  } catch {
    return false
  }
}
function toggleMobile(key) { mobileActive.value = mobileActive.value === key ? null : key }
function toggleMegaMenu(key) {
  if (openMega.value === key) {
    openMega.value = null
    menuOpenedByClick.value = false
  } else {
    openMega.value = key
    menuOpenedByClick.value = true
    positionPanel(key)
  }
}
async function handleMouseEnter(key) {
  if (!menuOpenedByClick.value) {
    openMega.value = key
    isMouseOverTrigger.value = true
    await nextTick()
    await positionPanel(key)
  }
}
function handleMouseLeave() {
  isMouseOverTrigger.value = false
  if (!menuOpenedByClick.value) {
    openMega.value = null
  }
}
function handlePanelMouseEnter() { isMouseOverPanel.value = true }
function handlePanelMouseLeave() {
  isMouseOverPanel.value = false
  if (!menuOpenedByClick.value) openMega.value = null
}
function handleBlur() {
  if (!isMouseOverPanel.value) {
    openMega.value = null
    menuOpenedByClick.value = false
  }
}
function closeMega() {
  openMega.value = null
  menuOpenedByClick.value = false
}
async function handleLinkClick(link) {
  // debug log to console to help diagnose steps
  console.debug('[Navbar] click -> current route:', route.fullPath, 'link:', link)
  closeMega()
  mobileOpen.value = false
  mobileActive.value = null
  // Park type link: always /parks?search=...
  if (link.type === 'park') {
    await goToPark(link)
    return
  }
  // Route type link: redirect to /routes?q=term (so routes page can search)
  if (link.type === 'route') {
    await goToRoute(link)
    return
  }
  // If link.to is string -> direct navigateTo
  if (link.to && typeof link.to === 'string') {
    const url = String(link.to)
    console.debug('[Navbar] navigating to (string):', url)
    await navigateTo(url).catch(()=>{})
    return
  }
  // If link.to is object and has path -> navigateTo with path and query
  if (link.to && typeof link.to === 'object') {
    if (link.to.path) {
      const navigation = { path: link.to.path, query: link.to.query || {} }
      console.debug('[Navbar] navigating to (object path):', navigation)
      await navigateTo(navigation).catch(err => { console.debug('[Navbar] navigateTo error', err) })
      return
    }
    // If only name is present, use navigateTo with name + query
    if (link.to.name) {
      console.debug('[Navbar] navigating to named route:', link.to.name, link.to.query || {})
      await navigateTo({ name: link.to.name, query: link.to.query || {} }).catch(()=>{})
      return
    }
    // Defensive fallback: if object lacks path and name but contains query only, try to deduce:
    if (link.to.query) {
      // best-effort: if link label contains 'tour' or 'tour', prefer /tours
      const label = (link.label || '').toLowerCase()
      const preferPath = label.includes('tour') ? '/tours' : '/'
      const navigation = { path: preferPath, query: link.to.query || {} }
      console.debug('[Navbar] fallback navigating to:', navigation)
      await navigateTo(navigation).catch(()=>{})
      return
    }
  }
  // External href
  if (link.href) {
    console.debug('[Navbar] navigating to href:', link.href)
    try { window.location.href = link.href } catch(e) { await navigateTo(String(link.href)).catch(()=>{}) }
    return
  }
  // Nothing actionable
  console.debug('[Navbar] handleLinkClick: nothing to navigate for link', link)
}
/* Programmatic park navigation */
async function goToPark(link) {
  const term = (link.slug && String(link.slug)) ? String(link.slug).replace(/[-_]+/g, ' ') : (link.label || '')
  const navigation = { path: '/parks', query: term ? { search: term } : {} }
  console.debug('[Navbar] goToPark ->', navigation)
  await navigateTo(navigation).catch(()=>{})
}
/* Programmatic route navigation -> sends user to /routes?q=term */
async function goToRoute(link) {
  const term = (link.slug && String(link.slug)) ? String(link.slug).replace(/[-_]+/g, ' ') : (link.label || '')
  const navigation = { path: '/routes', query: term ? { q: term } : {} }
  console.debug('[Navbar] goToRoute ->', navigation)
  await navigateTo(navigation).catch(()=>{})
}
/* Mobile handler uses same centralized function */
async function handleMobileLink(link) {
  await handleLinkClick(link)
}
/* Site search overlay */
function openSiteSearch() {
  showSearch.value = true
  nextTick(() => {
    try {
      const el = document.querySelector('.search-input')
      if (el && typeof el.focus === 'function') el.focus()
    } catch {}
  })
}
function closeSearch(){ showSearch.value = false; searchQuery.value = '' }
async function performSearch(){
  if(!searchQuery.value) return;
  await navigateTo({ path: '/search', query: { q: searchQuery.value } }).catch(()=>{})
  showSearch.value = false
}
/* Currency */
function toggleCurrencyMenu() { showCurrency.value = !showCurrency.value }
function selectCurrency(c) {
  selectedCurrency.value = c
  showCurrency.value = false
  try { localStorage.setItem('zafs_currency', c) } catch(e){}
}
/* Click outside handler */
function handleClickOutside(event) {
  const isClickInsideCurrencyButton = currencyButton.value && currencyButton.value.contains(event.target)
  const isClickInsideCurrencyMenu = currencyMenu.value && currencyMenu.value.contains(event.target)
  if (showCurrency.value && !isClickInsideCurrencyButton && !isClickInsideCurrencyMenu) {
    showCurrency.value = false
  }
  const isClickInsideTrigger = Object.values(triggerRefs.value || {}).some(trigger =>
    trigger && trigger.contains(event.target)
  )
  const isClickInsidePanel = Object.values(panelRefs.value || {}).some(panel =>
    panel && panel.contains(event.target)
  )
  if (!isClickInsideTrigger && !isClickInsidePanel && openMega.value) {
    openMega.value = null
    menuOpenedByClick.value = false
  }
}
/* Panel positioning helpers */
function setTriggerRef(key, el) {
  if (el) triggerRefs.value[key] = el
  else delete triggerRefs.value[key]
}
function setPanelRef(key, el) {
  if (el) panelRefs.value[key] = el
  else delete panelRefs.value[key]
}
async function positionPanel(key) {
  await nextTick()
  const trigger = triggerRefs.value[key]
  const panel = panelRefs.value[key]
  if (!trigger || !panel) return
  const t = trigger.getBoundingClientRect()
  const p = panel.getBoundingClientRect()
  const vw = window.innerWidth
  const centerX = t.left + t.width / 2
  const desiredLeft = Math.round(centerX - p.width / 2)
  const minLeft = EDGE
  const maxLeft = Math.max(EDGE, vw - p.width - EDGE)
  const clamped = Math.min(Math.max(desiredLeft, minLeft), maxLeft)
  const parent = panel.offsetParent || document.body
  const parentRect = parent.getBoundingClientRect()
  const leftRelative = clamped - parentRect.left
  panelPositions.value[key] = {
    left: Math.round(leftRelative),
    width: Math.round(p.width)
  }
}
function panelStyle(key) {
  const pos = panelPositions.value[key]
  if (openMega.value !== key) return { pointerEvents: 'none' }
  if (!pos) return { left: '50%', transform: 'translateX(-50%)' }
  return { left: pos.left + 'px', width: pos.width + 'px', transform: 'none', pointerEvents: 'auto' }
}
function onResize() {
  if (window.innerWidth > 1024 && openMega.value) positionPanel(openMega.value)
}
/* Lifecycle */
let unwatchRoute = null
onMounted(() => {
  try {
    const saved = localStorage.getItem('zafs_currency')
    if (saved) selectedCurrency.value = saved
  } catch(e){}
  unwatchRoute = watch(() => route.path, () => {
    mobileOpen.value = false
    openMega.value = null
    menuOpenedByClick.value = false
  })
  document.addEventListener('click', handleClickOutside)
  window.addEventListener('resize', onResize, { passive: true })
})
onBeforeUnmount(() => {
  if (unwatchRoute) unwatchRoute()
  document.removeEventListener('click', handleClickOutside)
  window.removeEventListener('resize', onResize)
})
</script>

<style scoped>
/* Header container */
.header {
  position: sticky;
  top: 0;
  z-index: 999;
  background: linear-gradient(180deg,#0f6b68 0%, #0d5c5b 100%);
  box-shadow: 0 6px 20px rgba(6, 23, 22, 0.12);
}
.container {
  max-width: 1260px;
  margin: 0 auto;
  padding: 0 22px;
}
.row {
  height: 72px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
}
/* Left: logo spacing */
.left {
  flex: 0 0 auto;
  min-width: 120px; /* Prevent logo from shrinking too much */
}
.logo {
  display: block;
  height: 58px;
  max-height: 58px;
  width: auto;
  object-fit: contain;
}
/* Center nav */
.center-nav {
  flex: 1 1 auto;
  display: flex;
  justify-content: center;
  min-width: 0;
  overflow: visible;
}
.nav-list {
  display: flex;
  gap: 28px;
  flex-wrap: nowrap;
  list-style: none;
  margin: 0;
  padding: 0;
  align-items: center;
  min-width: 0;
  flex: 1 1 auto;
  overflow: visible;
}
.nav-item {
  flex-shrink: 0;
}
.nav-text {
  white-space: nowrap;
  font-size: 14px;
}
/* Link */
.nav-link {
  color: rgba(255,255,255,0.98);
  text-decoration: none;
  font-weight: 600;
  font-size: 14px;
  padding: 8px 6px;
  border-radius: 8px;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  position: relative;
  transition: transform .18s cubic-bezier(.2,.9,.3,1), color .18s;
  cursor: pointer;
  background: transparent;
  border: none;
  font-family: inherit;
}
.nav-link:hover {
  color: #ffffff;
  transform: translateY(-1px);
}
/* Ring hover */
.nav-ring {
  position: absolute;
  left: 50%;
  transform: translateX(-50%) scale(0.64);
  bottom: -16px;
  width: 10px;
  height: 10px;
  border-radius: 9999px;
  background: rgba(255,255,255,0.08);
  opacity: 0;
  transition: transform .18s cubic-bezier(.2,.9,.3,1), opacity .18s;
}
.nav-link:hover .nav-ring,
.nav-link.active .nav-ring {
  opacity: 1;
  transform: translateX(-50%) scale(1);
  box-shadow: 0 8px 18px rgba(15,107,104,0.12), inset 0 0 0 6px rgba(255,255,255,0.02);
}
/* Chevron rotation */
.chev {
  width: 14px;
  height: 14px;
  color: rgba(255,255,255,0.95);
  transition: transform .18s ease;
  transform-origin: center;
}
.chev-open {
  transform: rotate(180deg);
}
/* Right actions */
.right {
  display: flex;
  align-items: center;
  gap: 12px;
  flex-shrink: 0;
  min-width: 180px; /* Reserve minimum space for right actions */
  justify-content: flex-end;
}
/* Search button */
.search-btn {
  width: 40px;
  height: 40px;
  border-radius: 10px;
  background: transparent;
  border: 1px solid rgba(255,255,255,0.06);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  color: white;
  padding: 6px;
  cursor: pointer;
  transition: background .12s ease;
  flex-shrink: 0;
}
.search-btn:hover {
  background: rgba(255,255,255,0.03);
}
/* icon stroke */
.icon {
  width: 18px;
  height: 18px;
  color: currentColor;
  stroke-width: 2;
  fill: none;
}
/* currency */
.currency {
  position: relative;
  flex-shrink: 0;
}
.currency-btn {
  display:inline-flex;
  align-items:center;
  gap:6px;
  padding:8px 12px;
  border-radius:10px;
  background: rgba(255,255,255,0.06);
  border:1px solid rgba(255,255,255,0.06);
  color:white;
  font-weight:600;
  cursor:pointer;
  white-space: nowrap;
  font-size: 14px;
  min-width: 70px;
  justify-content: center;
  transition: background .12s ease;
}
.currency-btn:hover,
.currency-btn[aria-expanded="true"] {
  background: rgba(255,255,255,0.1);
}
.currency-menu {
  position:absolute;
  right:0;
  margin-top:10px;
  background:#fff;
  color:#102a43;
  border-radius:10px;
  box-shadow:0 14px 40px rgba(7,22,21,0.12);
  overflow:hidden;
  z-index:1400;
  min-width:140px;
}
.currency-item{
  display:block;
  padding:10px 14px;
  width:100%;
  text-align:left;
  border:none;
  background:transparent;
  cursor:pointer;
  transition: background .12s ease;
}
.currency-item:hover {
  background: #f0f4f7;
}
/* Currency chevron rotation */
.chev-sm {
  width: 12px;
  height: 12px;
  color: rgba(255,255,255,0.95);
  transition: transform .18s ease;
  transform-origin: center;
}
.chev-sm-open {
  transform: rotate(180deg);
}
/* CTA */
.cta {
  white-space: nowrap;
  display: inline-block;
  background: #f3c23b;
  color: #3b2f26;
  padding: 10px 18px;
  border-radius: 10px;
  font-weight: 700;
  font-size: 14px;
  letter-spacing: 0.6px;
  text-decoration: none;
  box-shadow: none;
  border: 1px solid rgba(0,0,0,0.06);
  transition: transform .12s ease, filter .12s ease;
  flex-shrink: 0;
}
.cta:hover {
  transform: translateY(-2px);
  filter: brightness(.96);
}
/* hamburger visible only on mobile */
.hamburger {
  display: none;
  background: transparent;
  border: none;
  padding: 8px;
  color: white;
  cursor: pointer;
  flex-shrink: 0;
}
/* mega panel */
.mega-panel {
  position:absolute;
  top:100%;
  margin-top:14px;
  background:#fff;
  border-radius:14px;
  padding:22px;
  box-shadow:0 22px 60px rgba(6,22,21,0.12);
  opacity:0;
  pointer-events:none;
  transform-origin:top center;
  transform: translateY(-10px);
  transition: opacity .14s ease, transform .14s ease;
  z-index:1300;
  min-width:320px;
  max-width: min(1040px, 100vw - 20px);
  overflow-x: hidden;
  white-space:normal;
  word-break:break-word;
  overflow-wrap:anywhere;
  cursor: default;
}
.mega-panel.open {
  opacity:1;
  pointer-events:auto;
  transform: translateY(0);
}
/* inside grid */
.mega-grid {
  display:grid;
  grid-template-columns: repeat(3,1fr);
  gap:18px;
}
.mega-title {
  margin:0 0 10px 0;
  font-size:13px;
  font-weight:800;
  color:#0f1720;
  text-transform:uppercase;
  letter-spacing: 0.5px;
}
.mega-link {
  display:block;
  padding:8px 10px;
  color:#334155;
  font-size:14px;
  text-decoration:none;
  border-radius:6px;
  transition: background .1s ease, color .1s ease;
  cursor: pointer;
}
.mega-link:hover {
  background:#f8fafb;
  color: #0f6b68;
}
/* mobile styles */
.mobile-panel {
  background: linear-gradient(180deg,#0f6b68 0%, #0d5c5b 100%);
  color: white;
  border-top:1px solid rgba(255,255,255,0.04);
  position: absolute;
  top: 72px;
  left: 0;
  right: 0;
  width: 100%;
  max-height: calc(100vh - 72px);
  overflow-y: auto;
  z-index: 990;
  -webkit-overflow-scrolling: touch; /* Smooth scrolling on iOS */
}
.mobile-inner {
  padding: 16px 20px 20px;
}
.mobile-list {
  list-style:none;
  margin:0 0 20px 0;
  padding:0;
  display:grid;
  gap: 0;
}
.mobile-item {
  border-bottom: 1px solid rgba(255,255,255,0.05);
}
.mobile-item:last-child {
  border-bottom: none;
}
.mobile-link,
.mobile-link-toggle {
  display:flex;
  justify-content:space-between;
  align-items:center;
  color:white;
  font-size:16px;
  background:transparent;
  border:none;
  padding: 14px 0;
  width:100%;
  text-align:left;
  font-weight:600;
  cursor: pointer;
}
.mobile-link-text {
  flex: 1;
}
/* Mobile chevron - smaller and properly sized */
.mobile-chev {
  width: 16px;
  height: 16px;
  color: rgba(255,255,255,0.7);
  transition: transform .18s ease;
  transform-origin: center;
  margin-left: 8px;
  flex-shrink: 0;
}
.mobile-chev-open {
  transform: rotate(180deg);
}
.mobile-sub {
  padding-left: 12px;
  margin: 8px 0 12px;
  background: rgba(255,255,255,0.03);
  border-radius: 8px;
  padding: 12px 0 8px 16px;
}
.mobile-col {
  margin-bottom: 16px;
}
.mobile-col:last-child {
  margin-bottom: 0;
}
.mobile-col-title {
  font-weight:600;
  margin-bottom:8px;
  font-size: 14px;
  color: rgba(255,255,255,0.8);
  text-transform: uppercase;
  letter-spacing: 0.3px;
}
.mobile-sub-list {
  list-style: none;
  margin: 0;
  padding: 0;
}
.mobile-sub-item {
  margin-bottom: 4px;
}
.mobile-sub-link {
  display:block;
  padding: 8px 0;
  color:rgba(255,255,255,0.92);
  text-decoration:none;
  font-size: 15px;
  font-weight: 400;
}
/* Mobile actions */
.mobile-actions {
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding-top: 16px;
  border-top: 1px solid rgba(255,255,255,0.08);
}
.mobile-currency-select {
  width: 100%;
  padding: 12px 16px;
  border-radius: 8px;
  background: rgba(255,255,255,0.08);
  border: 1px solid rgba(255,255,255,0.1);
  color: white;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  appearance: none;
  background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='white' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpath d='M6 9l6 6 6-6'/%3e%3c/svg%3e");
  background-repeat: no-repeat;
  background-position: right 16px center;
  background-size: 16px;
}
.mobile-currency-select option {
  background: #0f6b68;
  color: white;
}
.mobile-cta {
  display:block;
  background:#f3c23b;
  color:#2b1a12;
  padding:16px;
  border-radius:12px;
  text-align:center;
  font-weight:800;
  text-decoration: none;
  font-size: 16px;
  transition: transform .12s ease;
}
.mobile-cta:hover {
  transform: translateY(-2px);
}
/* search overlay */
.search-overlay {
  position:fixed;
  inset:0;
  background:rgba(0,0,0,0.45);
  display:flex;
  align-items:flex-start;
  justify-content:center;
  padding:40px 20px;
  z-index:1500;
}
.search-box {
  background:white;
  padding:18px;
  border-radius:12px;
  max-width:900px;
  width:100%;
  display:flex;
  gap:12px;
  align-items:center;
}
.search-input {
  flex:1;
  padding:12px 14px;
  border-radius:8px;
  border:1px solid #e6e6e6;
  font-size: 16px;
}
.search-actions {
  display:flex;
  gap:8px;
}
.btn {
  padding:8px 12px;
  border-radius:8px;
  background:#0f6b68;
  color:white;
  border:none;
  cursor:pointer;
  font-weight: 600;
}
.btn.alt {
  background:transparent;
  color:#334155;
  border:1px solid #e6e6e6;
}
/* transitions */
.fade-enter-active,
.fade-leave-active {
  transition: opacity .15s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
.slide-enter-active,
.slide-leave-active {
  transition: all .18s ease;
}
.slide-enter-from,
.slide-leave-to {
  transform: translateY(-8px);
  opacity: 0;
}
/* --- RESPONSIVE BREAKPOINTS --- */
@media (min-width: 1440px) {
  .nav-list {
    gap: 32px;
  }
  .nav-text {
    font-size: 15px;
  }
}
@media (max-width: 1280px) {
  .nav-list {
    gap: 22px;
  }
  .nav-text {
    font-size: 13.5px;
  }
  .cta {
    padding: 9px 16px;
    font-size: 13.5px;
  }
  .currency-btn {
    padding: 8px 10px;
    font-size: 13.5px;
    min-width: 65px;
  }
}
@media (max-width: 1180px) {
  .nav-list {
    gap: 18px;
  }
  .nav-text {
    font-size: 13px;
  }
  .currency-btn {
    min-width: 60px;
    padding: 7px 9px;
  }
  .cta {
    padding: 9px 14px;
    font-size: 13px;
  }
}
@media (max-width: 1100px) {
  .nav-list {
    gap: 16px;
  }
  .nav-text {
    font-size: 12.5px;
  }
  .nav-item:nth-last-child(1),
  .nav-item:nth-last-child(2) {
    display: none;
  }
  .currency-btn {
    padding: 6px 8px;
    font-size: 12.5px;
    min-width: 55px;
  }
  .cta {
    padding: 8px 12px;
    font-size: 12.5px;
  }
  .search-btn {
    width: 36px;
    height: 36px;
  }
}
@media (max-width: 1050px) {
  .nav-list {
    gap: 14px;
  }
  .nav-text {
    font-size: 12px;
  }
  .nav-item:nth-last-child(3),
  .nav-item:nth-last-child(4) {
    display: none;
  }
  .currency-btn {
    min-width: 50px;
    padding: 6px 7px;
  }
  .cta {
    padding: 7px 10px;
    font-size: 12px;
  }
  .search-btn {
    width: 34px;
    height: 34px;
  }
  .icon {
    width: 16px;
    height: 16px;
  }
}
@media (max-width: 1024px) {
  .hamburger {
    display: inline-block;
  }
  .center-nav,
  .currency,
  .cta {
    display: none;
  }
  .logo {
    height: 48px;
    max-height: 48px;
  }
  .left {
    margin-right: 0;
    min-width: auto;
  }
  .right {
    gap: 12px;
    min-width: auto;
  }
  .search-btn {
    width: 40px;
    height: 40px;
  }
  .icon {
    width: 18px;
    height: 18px;
  }
  .row {
    height: 68px;
  }
  .mobile-panel {
    top: 68px;
    max-height: calc(100vh - 68px);
  }
}
@media (max-width: 768px) {
  .container {
    padding: 0 18px;
  }
  .row {
    height: 64px;
  }
  .logo {
    height: 46px;
    max-height: 46px;
  }
  .right {
    gap: 10px;
  }
  .search-btn {
    width: 38px;
    height: 38px;
  }
  .mobile-panel {
    top: 64px;
    max-height: calc(100vh - 64px);
  }
  .mobile-inner {
    padding: 16px 18px 20px;
  }
  .mobile-link,
  .mobile-link-toggle {
    font-size: 15px;
    padding: 12px 0;
  }
  .mobile-chev {
    width: 15px;
    height: 15px;
  }
  .mobile-sub-link {
    font-size: 14px;
    padding: 7px 0;
  }
}
@media (max-width: 640px) {
  .container {
    padding: 0 16px;
  }
  .row {
    height: 60px;
  }
  .logo {
    height: 44px;
    max-height: 44px;
  }
  .search-btn {
    width: 36px;
    height: 36px;
  }
  .mobile-panel {
    top: 60px;
    max-height: calc(100vh - 60px);
  }
  .mobile-inner {
    padding: 14px 16px 18px;
  }
  .mobile-link,
  .mobile-link-toggle {
    font-size: 15px;
    padding: 12px 0;
  }
  .mobile-chev {
    width: 14px;
    height: 14px;
  }
  .mobile-cta {
    padding: 14px;
    font-size: 15px;
  }
  .mobile-currency-select {
    font-size: 15px;
    padding: 11px 16px 11px 44px;
    background-position: right 12px center;
  }
}
@media (max-width: 480px) {
  .row {
    height: 56px;
  }
  .logo {
    height: 40px;
    max-height: 40px;
  }
  .search-btn {
    width: 34px;
    height: 34px;
  }
  .mobile-panel {
    top: 56px;
    max-height: calc(100vh - 56px);
  }
  .mobile-inner {
    padding: 12px 14px 16px;
  }
  .mobile-link,
  .mobile-link-toggle {
    font-size: 14px;
    padding: 11px 0;
  }
  .mobile-link-text {
    font-size: 14px;
  }
  .mobile-chev {
    width: 13px;
    height: 13px;
  }
  .mobile-sub-link {
    font-size: 13.5px;
    padding: 6px 0;
  }
  .mobile-col-title {
    font-size: 13px;
  }
  .mobile-cta {
    padding: 12px;
    font-size: 14px;
  }
  .mobile-currency-select {
    font-size: 14px;
    padding: 10px 14px 10px 40px;
  }
  .search-overlay {
    padding: 20px 16px;
    align-items: flex-start;
    padding-top: 60px;
  }
  .search-box {
    flex-direction: column;
    padding: 16px;
    gap: 12px;
  }
  .search-actions {
    width: 100%;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 8px;
  }
  .btn {
    padding: 10px;
    font-size: 15px;
  }
}
@media (max-width: 360px) {
  .container {
    padding: 0 12px;
  }
  .row {
    height: 52px;
  }
  .logo {
    height: 36px;
    max-height: 36px;
  }
  .hamburger {
    padding: 6px;
  }
  .search-btn {
    width: 32px;
    height: 32px;
  }
  .icon {
    width: 16px;
    height: 16px;
  }
  .mobile-panel {
    top: 52px;
    max-height: calc(100vh - 52px);
  }
  .mobile-inner {
    padding: 10px 12px 14px;
  }
  .mobile-link,
  .mobile-link-toggle {
    font-size: 13.5px;
    padding: 10px 0;
  }
  .mobile-link-text {
    font-size: 13.5px;
  }
  .mobile-chev {
    width: 12px;
    height: 12px;
    margin-left: 6px;
  }
  .mobile-sub-link {
    font-size: 13px;
    padding: 5px 0;
  }
  .mobile-cta {
    padding: 10px;
    font-size: 13.5px;
  }
  .mobile-currency-select {
    font-size: 13.5px;
    padding: 9px 12px 9px 36px;
    background-position: right 10px center;
    background-size: 14px;
  }
}
</style>
