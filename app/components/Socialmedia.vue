<template>
  <section class="social-media">
    <div class="container">
      <!-- Header -->
      <div class="header">
        <h2 class="title">Follow Real Journeys on Instagram</h2>
        <p class="subtitle">
          Daily moments from safaris, Kilimanjaro climbs, and life in Tanzania.
        </p>
      </div>

      <!-- Instagram Grid -->
      <div class="instagram-grid">
        <a 
          v-for="(image, index) in images" 
          :key="index"
          href="https://instagram.com" 
          target="_blank" 
          rel="noopener noreferrer"
          class="insta-card"
        >
          <img :src="`/images/socialmedia/t${index + 1}.png`" :alt="image.alt" />
          <div class="insta-overlay">
            <svg class="insta-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5" stroke="currentColor" stroke-width="2"/>
              <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" stroke="currentColor" stroke-width="2"/>
              <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
            </svg>
          </div>
        </a>
      </div>

      <!-- CTA Button -->
      <div class="cta-section">
        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" class="insta-btn">
          Follow Our Journey On Instagram
          <span class="arrow">→</span>
        </a>
      </div>
    </div>

    <!-- Full Width Banner -->
    <div class="banner-section">
      <img src="/images/socialmedia/Group 30.png" alt="Tanzania Safari Experience" class="full-width-banner" />
    </div>
  </section>
</template>

<script setup>
const images = [
  { alt: 'Kilimanjaro climb at sunrise' },
  { alt: 'Lion encounter on safari' },
  { alt: 'Relaxing in beach hammock' },
  { alt: 'Wildlife photography moment' }
]
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700&display=swap');

.social-media {
  background-color: #FFF9E8; /* Cream background */
  padding: 80px 0 0 0; /* Remove bottom padding since banner follows */
  font-family: 'Outfit', sans-serif;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

/* Header */
.header {
  text-align: center;
  margin-bottom: 48px;
}

.title {
  font-size: 36px;
  font-weight: 700;
  color: #1C1A17;
  margin: 0 0 12px 0;
  line-height: 1.2;
}

.subtitle {
  font-size: 16px;
  color: #6B6B6B;
  font-weight: 400;
  margin: 0;
}

/* Instagram Grid */
.instagram-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
  margin-bottom: 48px;
}

.insta-card {
  position: relative;
  aspect-ratio: 1;
  border-radius: 16px;
  overflow: hidden;
  display: block;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.insta-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.15);
}

.insta-card img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.4s ease;
}

.insta-card:hover img {
  transform: scale(1.1);
}

/* Instagram Hover Overlay */
.insta-overlay {
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.4);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.insta-card:hover .insta-overlay {
  opacity: 1;
}

.insta-icon {
  width: 48px;
  height: 48px;
  color: white;
  transform: scale(0.8);
  transition: transform 0.3s ease;
}

.insta-card:hover .insta-icon {
  transform: scale(1);
}

/* CTA Button */
.cta-section {
  display: flex;
  justify-content: center;
  margin-bottom: 80px;
}

.insta-btn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 14px 32px;
  background-color: transparent;
  border: 2px solid #C6A04A; /* Gold border matching brand */
  border-radius: 50px;
  font-family: 'Outfit', sans-serif;
  font-size: 15px;
  font-weight: 600;
  color: #1C1A17;
  text-decoration: none;
  cursor: pointer;
  transition: all 0.3s ease;
}

.insta-btn:hover {
  background-color: #C6A04A;
  color: #FFFFFF;
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(198, 160, 74, 0.3);
}

.arrow {
  transition: transform 0.3s ease;
}

.insta-btn:hover .arrow {
  transform: translateX(4px);
}

/* Full Width Banner Section */
.banner-section {
  width: 100%;
  line-height: 0; /* Remove gap below image */
  overflow: hidden;
}

.full-width-banner {
  width: 100%;
  height: auto;
  display: block;
  object-fit: cover;
}

/* Responsive */
@media (max-width: 1024px) {
  .instagram-grid {
    gap: 16px;
  }
  
  .title {
    font-size: 32px;
  }
}

@media (max-width: 768px) {
  .social-media {
    padding-top: 60px;
  }
  
  .instagram-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 16px;
  }
  
  .title {
    font-size: 28px;
  }
  
  .cta-section {
    margin-bottom: 60px;
  }
}

@media (max-width: 480px) {
  .container {
    padding: 0 16px;
  }
  
  .instagram-grid {
    gap: 12px;
  }
  
  .insta-card {
    border-radius: 12px;
  }
  
  .insta-btn {
    width: 100%;
    justify-content: center;
    padding: 14px 24px;
  }
}
</style>