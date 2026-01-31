<template>
  <Navtop />

  <header class="w-full bg-[#F6F1E8] sticky top-0 z-50">
    <div class="flex items-center justify-between px-4 sm:px-6 lg:px-9 py-4">
      <!-- LEFT: Logo -->
      <NuxtLink to="/" class="flex items-center z-50">
        <img src="/images/navbar/navlogo.svg" alt="ZAFS logo" class="h-10 sm:h-12 w-auto" />
      </NuxtLink>

      <!-- CENTER: Nav items (Desktop) -->
      <nav class="hidden md:flex items-center gap-8 lg:gap-10 text-[#1C1A17]">
        <div v-for="label in navItems" :key="label" class="flex items-center gap-2 cursor-pointer select-none group">
          <span class="text-base font-normal">{{ label }}</span>
          <img 
            src="/images/navbar/dropdown.svg" 
            alt="dropdown" 
            class="w-3 h-3 transition-transform duration-200 group-hover:rotate-180"
          />
        </div>
      </nav>

      <!-- RIGHT: Interactive Icons + CTA -->
      <div class="flex items-center gap-2 sm:gap-3">
        <!-- Search Container -->
        <div class="relative h-10">
          <button 
            v-if="!isSearchOpen"
            @click="openSearch"
            class="w-10 h-full bg-white rounded-md flex items-center justify-center shadow-sm border border-[#E5E5E5] hover:shadow-md transition-all duration-300"
            aria-label="Search"
          >
            <img src="/images/navbar/magnifier.svg" alt="search" class="h-5 w-5 object-contain shrink-0" />
          </button>
          
          <div 
            v-else
            class="flex items-center h-full bg-white rounded-md shadow-sm border border-[#E5E5E5] w-44 overflow-hidden"
          >
            <input 
              ref="searchInput"
              v-model="searchQuery"
              type="text" 
              placeholder="Search"
              class="bg-transparent border-none outline-none text-sm text-[#1C1A17] placeholder-[#999] flex-1 min-w-0 pl-4 py-2"
              @blur="closeSearch"
              @keyup.enter="handleSearch"
            />
            <div class="shrink-0 pr-3 pl-1">
              <img src="/images/navbar/magnifier.svg" alt="search" class="h-5 w-5 object-contain opacity-60" />
            </div>
          </div>
        </div>

        <!-- Adventure Button -->
        <button 
          @mouseenter="isAdventureOpen = true"
          @mouseleave="isAdventureOpen = false"
          @click="handleAdventure"
          class="hidden sm:flex items-center h-10 rounded-md shadow-sm transition-all duration-300 overflow-hidden bg-[#C6A04A] hover:bg-[#B59240]"
          :class="isAdventureOpen ? 'px-4 gap-3' : 'w-10 justify-center'"
          aria-label="Start Adventure"
        >
          <span 
            v-if="isAdventureOpen" 
            class="text-sm font-medium text-[#1C1A17] whitespace-nowrap order-1"
          >
            Start Adventure
          </span>
          <img 
            src="/images/navbar/hiking.svg" 
            alt="activities" 
            class="h-5 w-5 object-contain order-2 shrink-0"
          />
        </button>
        
        <!-- Mobile Adventure Icon Only -->
        <button 
          @click="handleAdventure"
          class="sm:hidden w-10 h-10 rounded-md shadow-sm bg-[#C6A04A] hover:bg-[#B59240] flex items-center justify-center"
          aria-label="Start Adventure"
        >
          <img src="/images/navbar/hiking.svg" alt="activities" class="h-5 w-5 object-contain" />
        </button>

        <!-- WhatsApp Button -->
        <NuxtLink 
          to="#" 
          class="flex items-center gap-2 sm:gap-3 px-3 sm:px-4 py-2 rounded-md bg-[#0F2A1D] text-white shadow-sm hover:bg-[#0C2217] transition-colors"
        >
          <span class="hidden sm:inline text-sm font-medium">Chat On WhatsApp</span>
          <img src="/images/navbar/whatsapp.svg" alt="whatsapp" class="h-5 w-5 sm:h-6 sm:w-6 object-contain" />
        </NuxtLink>

        <!-- Mobile Menu Toggle -->
        <button 
          @click="isMobileMenuOpen = !isMobileMenuOpen"
          class="md:hidden w-10 h-10 flex items-center justify-center text-[#1C1A17] ml-1"
          aria-label="Toggle menu"
        >
          <svg v-if="!isMobileMenuOpen" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M3 12h18M3 6h18M3 18h18" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          <svg v-else width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M18 6L6 18M6 6l12 12" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </button>
      </div>
    </div>

    <!-- Mobile Menu Overlay -->
    <transition 
      enter-active-class="transition duration-200 ease-out"
      enter-from-class="transform -translate-y-2 opacity-0"
      enter-to-class="transform translate-y-0 opacity-100"
      leave-active-class="transition duration-150 ease-in"
      leave-from-class="transform translate-y-0 opacity-100"
      leave-to-class="transform -translate-y-2 opacity-0"
    >
      <div v-if="isMobileMenuOpen" class="md:hidden absolute top-full left-0 right-0 bg-[#F6F1E8] border-t border-[#E5E5E5] shadow-lg">
        <nav class="flex flex-col py-4 px-4">
          <div 
            v-for="label in navItems" 
            :key="label" 
            class="flex items-center justify-between py-3 px-2 border-b border-[#E5E5E5] last:border-0 cursor-pointer active:bg-[#E8E8E8] transition-colors"
            @click="isMobileMenuOpen = false"
          >
            <span class="text-base font-medium text-[#1C1A17]">{{ label }}</span>
            <img src="/images/navbar/dropdown.svg" alt="dropdown" class="w-4 h-4 -rotate-90" />
          </div>
        </nav>
      </div>
    </transition>
  </header>
</template>

<script setup>
const navItems = ['Kilimanjaro', 'Safaris', 'Zanzibar', 'More'];

// Search state
const isSearchOpen = ref(false);
const searchQuery = ref('');
const searchInput = ref(null);

// Adventure button state
const isAdventureOpen = ref(false);

// Mobile menu state
const isMobileMenuOpen = ref(false);

// Open search
const openSearch = () => {
  isSearchOpen.value = true;
  isMobileMenuOpen.value = false; // Close mobile menu if open
  nextTick(() => {
    searchInput.value?.focus();
  });
};

// Close search
const closeSearch = () => {
  setTimeout(() => {
    isSearchOpen.value = false;
    searchQuery.value = '';
  }, 200);
};

// Handle search submission
const handleSearch = () => {
  if (searchQuery.value.trim()) {
    console.log('Searching for:', searchQuery.value);
  }
  closeSearch();
};

// Handle adventure click
const handleAdventure = () => {
  console.log('Starting adventure...');
  isMobileMenuOpen.value = false;
};
</script>