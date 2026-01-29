<template>
  <div class="why-choose-us">
    <!-- Section 1: Travelers Choose Carousel -->
    <section class="travelers-section">
      <div class="container">
        <div class="section-header">
          <h2 class="main-title">Travelers Choose Zafs When...</h2>
          <p class="subtitle">They want more than a trip — they want it done the right way.</p>
        </div>

        <!-- Auto-scrolling Cards (Carousel without dots) -->
        <div class="carousel-container">
          <div
            class="cards-track"
            :style="{ transform: `translateX(-${currentIndex * (100 / cards.length)}%)` }"
          >
            <div
              v-for="(card, index) in cards"
              :key="index"
              class="choice-card"
            >
              <div class="card-header">
                <div class="icon-wrapper">
                  <img :src="card.icon" :alt="card.title" class="card-icon" />
                </div>
                <span class="card-number">0{{ index + 1 }}</span>
              </div>

              <h3 class="card-title">{{ card.title }}</h3>
              <p class="card-description">{{ card.description }}</p>

              <div class="card-image-wrapper">
                <img :src="card.image" :alt="card.title" class="card-image" />
                <div v-if="card.overlayIcon" class="image-overlay-icon">
                  <img :src="card.overlayIcon" alt="" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Green Slope Transition - Fixed to eliminate white space -->
    <div class="slope-transition" aria-hidden="true">
      <svg viewBox="0 0 1440 120" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-hidden="true">
        <!-- Adjusted to fill all gaps -->
        <path d="M0 0 L320 90 L1440 90 L1440 120 L0 120 Z" fill="#0F2A1D" />
      </svg>
    </div>

    <!-- Section 2: Recognized By Institutions (Partners) -->
    <section class="partners-section">
      <div class="container">
        <div class="partners-grid">
          <!-- Left Content -->
          <div class="partners-content">
            <p class="partners-subtitle">Recognized By Institutions</p>
            <h2 class="partners-title">Trusted by<br>Travelers.</h2>
            <p class="partners-description">
              Our credentials reflect how seriously we take safety, responsibility, and on-ground operations in Africa.
            </p>

            <!-- Animal silhouettes decoration -->
            <div class="animal-silhouettes">
              <img src="/images/whychooseus/yak.svg" alt="" class="silhouette yak" />
              <img src="/images/whychooseus/elephant.svg" alt="" class="silhouette elephant" />
            </div>
          </div>

          <!-- Right Grid -->
          <div class="partners-logos">
            <div v-for="(partner, index) in partners" :key="index" class="partner-card">
              <div class="partner-logo">
                <img :src="partner.logo" :alt="partner.name" />
              </div>
              <p class="partner-name">{{ partner.name }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const currentIndex = ref(0)
let intervalId = null

const cards = ref([
  {
    icon: '/images/whychooseus/license.svg',
    title: 'They want a fully licensed local operator',
    description: 'Registered in Tanzania, part of TATO, and compliant with all local tourism regulations.',
    image: '/images/whychooseus/image1.jpg',
    overlayIcon: '/images/whychooseus/tato.svg'
  },
  {
    icon: '/images/whychooseus/social-services.svg',
    title: 'They want their journey to give back',
    description: 'Supporting schools, food programs, and women\'s health initiatives along the way.',
    image: '/images/whychooseus/image2.jpg',
    overlayIcon: null
  },
  {
    icon: '/images/whychooseus/community.svg',
    title: 'They care how their trip impacts people and places',
    description: 'From fair wages to conservation and community support, ethics guide every decision.',
    image: '/images/whychooseus/image3.jpg',
    overlayIcon: null
  },
  {
    icon: '/images/whychooseus/trustworthiness.svg',
    title: 'They value trusted international partnerships',
    description: 'Including long-term collaboration with India\'s leading trekking community.',
    image: '/images/whychooseus/image4.jpg',
    overlayIcon: '/images/whychooseus/indiahike.svg'
  }
])

const partners = ref([
  { logo: '/images/whychooseus/atta.png', name: 'African Travel & Tourism Association' },
  { logo: '/images/whychooseus/apta.png', name: 'Member of the APTA' },
  { logo: '/images/whychooseus/tato.svg', name: 'Registered Member of TATO' },
  { logo: '/images/whychooseus/tripadvisor.png', name: 'Winner of Travelers Choice Award 2025' },
  { logo: '/images/whychooseus/tanzanianationalpark.png', name: 'Tanzania National Parks' },
  { logo: '/images/whychooseus/bcorp.png', name: 'B-Corp Certified' },
  { logo: '/images/whychooseus/indiahike.svg', name: 'Partnership with IndiaHikes' },
  { logo: '/images/whychooseus/tcaa.png', name: 'Tanzania Association of Tour Operators' }
])

function nextSlide() {
  currentIndex.value = (currentIndex.value + 1) % cards.value.length
}

function resetInterval() {
  if (intervalId) clearInterval(intervalId)
  intervalId = setInterval(nextSlide, 5000)
}

onMounted(() => {
  resetInterval()
})

onUnmounted(() => {
  if (intervalId) clearInterval(intervalId)
})
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Kaushan+Script&family=Outfit:wght@300;400;500;600;700&display=swap');

.why-choose-us {
  font-family: 'Outfit', sans-serif;
  position: relative;
}

/* Section 1: Travelers Carousel - FIXED */
.travelers-section {
  padding: 100px 20px 90px; /* Adjusted bottom padding */
  background-color: #FFF9E8;
  position: relative;
  z-index: 2;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
}

.section-header {
  text-align: center;
  margin-bottom: 60px;
}

.main-title {
  font-size: 40px;
  font-weight: 700;
  color: #1C1A17;
  margin-bottom: 16px;
  line-height: 1.2;
}

.subtitle {
  font-family: 'Kaushan Script', cursive;
  font-size: 28px;
  color: #C6A04A;
  line-height: 1.4;
}

/* Carousel */
.carousel-container {
  overflow: hidden;
  position: relative;
}

.cards-track {
  display: flex;
  transition: transform 0.6s cubic-bezier(.22,.9,.36,1);
  gap: 24px;
  will-change: transform;
}

.choice-card {
  flex: 0 0 calc(25% - 18px); /* 4 cards with gap */
  background: #FFFFFF;
  border-radius: 20px;
  padding: 30px;
  display: flex;
  flex-direction: column;
  min-height: 450px;
  box-shadow: 0 6px 28px rgba(0,0,0,0.08);
}

@media (max-width: 1024px) {
  .choice-card {
    flex: 0 0 calc(50% - 12px); /* 2 cards on tablet */
  }
}

@media (max-width: 640px) {
  .choice-card {
    flex: 0 0 100%; /* 1 card on mobile */
  }
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 20px;
}

.icon-wrapper {
  width: 48px;
  height: 48px;
  background-color: rgba(198, 160, 74, 0.08);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 8px;
}

.card-icon {
  width: 100%;
  height: 100%;
  object-fit: contain;
  filter: brightness(0) saturate(100%) invert(77%) sepia(14%) saturate(1162%) hue-rotate(2deg) brightness(89%) contrast(86%);
}

.card-number {
  font-size: 48px;
  font-weight: 700;
  color: rgba(28, 26, 23, 0.06);
  line-height: 1;
}

.card-title {
  font-size: 20px;
  font-weight: 700;
  color: #1C1A17;
  margin-bottom: 12px;
  line-height: 1.3;
}

.card-description {
  font-size: 15px;
  color: #666;
  line-height: 1.6;
  margin-bottom: 24px;
  flex-grow: 1;
}

.card-image-wrapper {
  position: relative;
  width: 100%;
  height: 160px;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: inset 0 -6px 20px rgba(0,0,0,0.06);
}

.card-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.image-overlay-icon {
  position: absolute;
  bottom: 10px;
  left: 10px;
  width: 40px;
  height: 40px;
  background: rgba(255,255,255,0.95);
  border-radius: 8px;
  padding: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 8px rgba(0,0,0,0.12);
}

.image-overlay-icon img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

/* Slope Transition - FIXED to eliminate white space */
.slope-transition {
  position: relative;
  width: 100%;
  height: 120px;
  margin-top: -90px; /* Pulled up more to cover any gap */
  pointer-events: none;
  z-index: 3;
  line-height: 0; /* Eliminate inline spacing */
}

.slope-transition svg {
  display: block;
  width: 100%;
  height: 100%;
  vertical-align: bottom; /* Remove baseline spacing */
}

/* Section 2: Partners - FIXED */
.partners-section {
  background-color: #0F2A1D;
  padding: 0 20px 100px;
  position: relative;
  z-index: 1;
  margin-top: -30px; /* Pull up to eliminate gap with slope */
}

.partners-grid {
  display: grid;
  grid-template-columns: 320px 1fr;
  gap: 60px;
  align-items: start;
  padding-top: 50px; /* Increased to account for slope overlap */
}

@media (max-width: 1024px) {
  .partners-grid {
    grid-template-columns: 1fr;
    gap: 50px;
    padding-top: 40px;
  }
}

.partners-content {
  color: #FFFFFF;
  position: relative;
  padding-bottom: 140px; /* Space for animal silhouettes */
}

.partners-subtitle {
  font-family: 'Kaushan Script', cursive;
  font-size: 32px;
  color: #C6A04A;
  margin-bottom: 8px;
  line-height: 1.2;
}

.partners-title {
  font-size: 42px;
  font-weight: 700;
  color: #FFFFFF;
  margin-bottom: 20px;
  line-height: 1.1;
}

.partners-description {
  font-size: 16px;
  color: rgba(255,255,255,0.75);
  line-height: 1.6;
  max-width: 320px;
}

.animal-silhouettes {
  position: absolute;
  bottom: 0;
  left: -20px;
  display: flex;
  gap: 10px;
  opacity: 0.28;
  transform: translateY(6px);
}

.silhouette {
  height: 120px;
  width: auto;
}

@media (max-width: 1024px) {
  .animal-silhouettes {
    display: none;
  }
  .partners-content {
    padding-bottom: 0;
  }
}

/* Partners Grid */
.partners-logos {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
}

@media (max-width: 900px) {
  .partners-logos {
    grid-template-columns: repeat(2, 1fr);
  }
}

.partner-card {
  background: #FFFFFF;
  border-radius: 12px;
  padding: 24px 16px;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 140px;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.partner-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 10px 30px rgba(0,0,0,0.12);
}

.partner-logo {
  width: 80px;
  height: 80px;
  margin-bottom: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.partner-logo img {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
}

.partner-name {
  font-size: 13px;
  font-weight: 500;
  color: #1C1A17;
  line-height: 1.4;
  margin: 0;
  max-width: 140px;
  text-align: center;
}

/* Mobile adjustments - FIXED */
@media (max-width: 640px) {
  .main-title,
  .partners-title {
    font-size: 32px;
  }

  .subtitle {
    font-size: 24px;
  }

  .travelers-section {
    padding: 60px 16px 70px; /* Adjusted for mobile */
  }

  .slope-transition {
    height: 90px;
    margin-top: -60px; /* Adjusted for mobile */
  }

  .partners-section {
    padding: 0 16px 60px;
    margin-top: -20px; /* Adjusted for mobile */
  }

  .partners-grid {
    padding-top: 30px; /* Adjusted for mobile */
  }

  .choice-card {
    padding: 24px;
    min-height: 400px;
  }

  .partners-description {
    font-size: 15px;
  }

  .partners-subtitle {
    font-size: 28px;
  }
}

/* Tablet adjustments */
@media (max-width: 768px) {
  .main-title {
    font-size: 36px;
  }
  
  .subtitle {
    font-size: 26px;
  }
  
  .travelers-section {
    padding: 80px 20px 80px;
  }
  
  .slope-transition {
    height: 100px;
    margin-top: -70px;
  }
  
  .partners-section {
    margin-top: -25px;
  }
}

/* Ensure no gaps between sections */
.why-choose-us > * {
  box-sizing: border-box;
}

.travelers-section::after,
.slope-transition::after,
.partners-section::after {
  content: '';
  display: table;
  clear: both;
}
</style>