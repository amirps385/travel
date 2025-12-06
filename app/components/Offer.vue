<template>
  <!-- WE OFFER SERVICES SECTION START -->
  <div
    class="relative overflow-hidden sm:pb-22.5 pb-10 sm:pt-30 pt-17.5 before:absolute before:left-0 before:right-0 before:bottom-0 before:z-0 2xl:before:h-55 sm:before:h-40 before:h-0 before:bg-lightturquoise"
    style="background-color: #297BD4;"
  >
    <div class="container mx-auto px-4">
      <div class="relative z-1">
        <div class="grid grid-cols-12">
          <!-- Left Images Column -->
          <div class="lg:col-span-5 col-span-12 px-3.75">
            <div class="relative z-1">
  <!-- Traveller -->
  <img
    class="block sm:ml-21.5 pb-24 mt-18 animate-slide-left size-auto"
    src="/images/Left-Man-Image.png"
    alt="Happy traveller ready for his next adventure"
    width="50"
    height="127"
    loading="lazy"
  >

  <!-- Landmarks -->
  <img
    class="
      relative -mt-16               <!-- mobile: pull landmarks up to touch the feet -->
      sm:absolute sm:bottom-10      <!-- from sm: go back to absolute layout -->
      lg:-bottom-60 xl:bottom-0
      left-0 size-auto
    "
    src="/images/travel-sites.png"
    alt="Famous world landmarks illustration"
    width="50"
    height="127"
    loading="lazy"
  >

  <div class="img-bg-shade"></div>
</div>

          </div>

          <!-- Content Column -->
          <div class="lg:col-span-7 col-span-12 px-3.75">
            <div class="trv-we-off-content">
              <!-- TITLE START -->
              <div class="lg:mr-22.5 text-left mb-15">
                <h2 class="text-white! xl:text-46 md:text-40 text-3xl mb-2.5">
                  We Offer the Best
                  <span style="color: #FFAA0D;">Tanzania Experiences</span>
                </h2>
                <p class="mb-12.5 text-base" style="color: #E0F7FA;">
                  ZafsTours is a locally based Tanzania tour operator crafting tailor-made safaris, Kilimanjaro
                  climbs, and Zanzibar beach holidays. From your first message to the moment you fly home, our
                  team takes care of every detail so you can simply enjoy the journey.
                </p>
              </div>
              <!-- TITLE END -->

              <!-- Service Boxes -->
              <div class="grid grid-cols-12 gap-7.5">
                <!-- Service 1: Exclusive Tanzania Safaris -->
                <div class="xl:col-span-4 md:col-span-6 col-span-12 mb-10">
                  <div
                    class="relative text-center bg-white ml-3 rounded-tl-8xl rounded-br-8xl rounded-tr-2xl rounded-bl-2xl pt-8.75 px-4 pb-15"
                  >
                    <div>
                      <span class="inline-block mb-7.5">
                        <img
                          src="/images/icons/ship.png"
                          alt="Safari and travel icon"
                          class="max-w-16 w-full inline-block"
                          style="filter: brightness(0) saturate(100%) invert(53%) sepia(72%) saturate(1711%) hue-rotate(188deg) brightness(100%) contrast(94%);"
                          width="64"
                          height="64"
                          loading="lazy"
                        >
                      </span>
                    </div>
                    <div class="trv-icon-content">
                      <h4 class="mb-3.75 text-2xl">Exclusive Tanzania Safaris</h4>
                      <p class="p-text">
                        Carefully crafted private and small-group safaris in Serengeti, Ngorongoro, Tarangire and
                        beyond – designed around your travel style and budget.
                      </p>
                    </div>
                    <div
                      class="relative after:absolute after:-left-7 after:-top-10.25 after:size-0 after:border-t-12 after:border-t-transparent after:border-r-12 after:border-r-[#297BD4] after:border-b-12 after:border-b-transparent"
                    >
                      <div
                        class="absolute -left-7 -bottom-15 size-0 border-b-90 border-b-[#489CF6] border-r-80 border-r-transparent"
                      >
                        <span class="text-xs/normal font-medium block text-white font-title pt-9 px-2.5 pb-0"
                          >Step</span
                        >
                        <div class="text-2xl font-black text-white pl-2.5">01</div>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- Service 2: Easy & Transparent Booking -->
                <div class="xl:col-span-4 md:col-span-6 col-span-12 mb-10">
                  <div
                    class="relative text-center bg-white ml-3 rounded-tl-8xl rounded-br-8xl rounded-tr-2xl rounded-bl-2xl pt-8.75 px-4 pb-15"
                  >
                    <div class="inline-block mb-7.5">
                      <span>
                        <img
                          src="/images/icons/plane-booking.png"
                          alt="Easy booking icon"
                          class="max-w-16 w-full inline-block"
                          style="filter: brightness(0) saturate(100%) invert(64%) sepia(100%) saturate(1157%) hue-rotate(350deg) brightness(103%) contrast(103%);"
                          width="64"
                          height="64"
                          loading="lazy"
                        >
                      </span>
                    </div>
                    <div class="trv-icon-content">
                      <h4 class="mb-3.75 text-2xl">Easy &amp; Transparent Booking</h4>
                      <p class="p-text">
                        Clear itineraries, honest pricing and friendly support on WhatsApp and email so you always
                        know exactly what is included in your trip.
                      </p>
                    </div>
                    <div
                      class="relative after:absolute after:-left-7 after:-top-10.25 after:size-0 after:border-t-12 after:border-t-transparent after:border-r-12 after:border-r-[#BA7D0A] after:border-b-12 after:border-b-transparent"
                    >
                      <div
                        class="absolute -left-7 -bottom-15 size-0 border-b-90 border-b-[#FFAA0D] border-r-80 border-r-transparent"
                      >
                        <span class="text-xs/normal font-medium block text-white font-title pt-9 px-2.5 pb-0"
                          >Step</span
                        >
                        <div class="text-2xl font-black text-white pl-2.5">02</div>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- Service 3: Professional Local Guides -->
                <div class="xl:col-span-4 col-span-12 mb-10">
                  <div
                    class="relative text-center bg-white ml-3 rounded-tl-8xl rounded-br-8xl rounded-tr-2xl rounded-bl-2xl pt-8.75 px-4 pb-15"
                  >
                    <div class="inline-block mb-7.5">
                      <span>
                        <img
                          src="/images/icons/guide-icon.png"
                          alt="Professional guide icon"
                          class="max-w-16 w-full inline-block"
                          style="filter: brightness(0) saturate(100%) invert(67%) sepia(36%) saturate(2222%) hue-rotate(38deg) brightness(102%) contrast(101%);"
                          width="64"
                          height="64"
                          loading="lazy"
                        >
                      </span>
                    </div>
                    <div class="trv-icon-content">
                      <h4 class="mb-3.75 text-2xl">Professional Local Guides</h4>
                      <p class="p-text">
                        Climb Kilimanjaro and explore Tanzania’s parks with experienced, licensed local guides who
                        prioritise your safety, comfort and authentic experiences.
                      </p>
                    </div>
                    <div
                      class="relative after:absolute after:-left-7 after:-top-10.25 after:size-0 after:border-t-12 after:border-t-transparent after:border-r-12 after:border-r-[#568603] after:border-b-12 after:border-b-transparent"
                    >
                      <div
                        class="absolute -left-7 -bottom-15 size-0 border-b-90 border-b-[#85D200] border-r-80 border-r-transparent"
                      >
                        <span class="text-xs/normal font-medium block text-white font-title pt-9 px-2.5 pb-0"
                          >Step</span
                        >
                        <div class="text-2xl font-black text-white pl-2.5">03</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Landscape Image -->
              <div class="rounded-full 2xl:h-50 2xl:mb-7.5 overflow-hidden">
                <img
                  src="/images/landscape-pic.jpg"
                  alt="Tropical island and ocean landscape"
                  class="w-full"
                  width="726"
                  height="199"
                  loading="lazy"
                >
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Decorative Images -->
    <div class="absolute left-0 2xl:bottom-55 bottom-40">
      <img
        src="/images/background/building-1.png"
        alt="Decorative building silhouette"
        width="301"
        height="640"
        loading="lazy"
      >
    </div>
    <div class="absolute md:right-0 sm:-right-20 -right-38 md:top-0 sm:-top-3 -top-12">
      <img
        src="/images/background/Right-top-plane.png"
        alt="Decorative airplane graphic"
        width="257"
        height="342"
        loading="lazy"
      >
    </div>
  </div>
  <!-- WE OFFER SERVICES SECTION END -->
</template>

<script setup>
// This component doesn't need any props or reactive data for now
</script>

<style scoped>
/* The styles are now handled in the main.css */

/* Add this style for the before pseudo-element background color */
:deep(.before\:bg-lightturquoise)::before {
  background-color: #afeeee !important;
}

/* Animation for the slide-left effect */
.animate-slide-left {
  animation: slideLeft 1s ease-in-out;
}

@keyframes slideLeft {
  from {
    transform: translateX(-20px);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}

/* Custom image background shade */
.img-bg-shade {
  position: absolute;
  inset: 0;
  background: linear-gradient(to right, transparent, rgba(255, 255, 255, 0.1));
  opacity: 0.3;
}

/* Custom text styles */
.p-text {
  color: #666;
  font-size: 1rem;
  line-height: 1.6;
}

.trv-icon-content h4 {
  font-weight: bold;
  color: #333;
}
</style>
