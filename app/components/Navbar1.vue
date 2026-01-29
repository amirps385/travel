<template>
  <Navtop />

  <header class="w-full bg-[#F6F1E8]">
    <div class="flex items-center justify-between px-9 py-4">
      <!-- LEFT: Logo - moved closer to left -->
      <NuxtLink to="/" class="flex items-center">
        <img src="/images/navbar/navlogo.svg" alt="ZAFS logo" class="h-12 w-auto" />
      </NuxtLink>

      <!-- CENTER: Nav items -->
      <nav class="hidden md:flex items-center gap-10 text-[#1C1A17]">
        <div v-for="label in navItems" :key="label" class="flex items-center gap-2 cursor-pointer select-none group">
          <span class="text-base font-normal">{{ label }}</span>
          <img 
            src="/images/navbar/dropdown.svg" 
            alt="dropdown" 
            class="w-3 h-3 transition-transform duration-200 group-hover:rotate-180"
          />
        </div>
      </nav>

      <!-- RIGHT: Icons + CTA -->
      <div class="flex items-center gap-4">
        <button class="w-10 h-10 bg-[#F4F4F4] rounded-md flex items-center justify-center shadow-sm hover:bg-[#E8E8E8] transition-colors" aria-label="Search">
          <img src="/images/navbar/magnifier.svg" alt="search" class="h-5 w-5 object-contain" />
        </button>

        <button class="w-10 h-10 bg-[#C6A04A] rounded-md flex items-center justify-center shadow-sm hover:bg-[#B59240] transition-colors" aria-label="Activities">
          <img src="/images/navbar/hiking.svg" alt="activities" class="h-5 w-5 object-contain" />
        </button>

        <NuxtLink to="#" class="flex items-center gap-3 px-4 py-2 rounded-md bg-[#0F2A1D] text-white shadow-sm hover:bg-[#0C2217] transition-colors">
          <span class="hidden sm:inline text-sm font-medium">Chat On WhatsApp</span>
          <span class="w-8 h-8 rounded-full bg-transparent flex items-center justify-center">
            <img src="/images/navbar/whatsapp.svg" alt="whatsapp" class="h-6 w-6 object-contain" />
          </span>
        </NuxtLink>
      </div>
    </div>
  </header>
</template>

<script setup>
const navItems = ['Kilimanjaro', 'Safaris', 'Zanzibar', 'More'];
</script>