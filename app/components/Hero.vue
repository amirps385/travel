<template>
  <div class="hero-wrapper">
    <!-- Hero Section with Video -->
    <section class="hero-section">
      <div class="hero-bg">
        <video 
          autoplay 
          muted 
          loop 
          playsinline
          class="hero-video"
          src="/videos/safari.mp4"
        >
        </video>
        <div class="hero-overlay"></div>
      </div>
      
      <!-- Hero Content -->
      <div class="hero-content">
        <h1 class="hero-title-main">Tanzania Is Calling</h1>
        <div class="hero-title-sub-wrapper">
          <h2 class="hero-title-sub">This Is Your Moment to Answer</h2>
        </div>
      </div>
    </section>

    <!-- Form Section -->
    <div class="form-area">
      <!-- TripAdvisor Badge -->
      <div class="tripadvisor-badge">
        <img 
          src="/images/herolead/tripadvisor.png" 
          alt="TripAdvisor Travellers Choice 2024" 
          class="tripadvisor-img"
        />
      </div>

      <!-- Form Card - Wider for single line text -->
      <div class="form-card">
        <div class="form-intro">
          <h3 class="form-title">Personalized Journeys</h3>
          <p class="form-subtitle">Plan Your Trip In 30 Seconds</p>
          <p class="form-description">
            Tell us who's traveling and when you're arriving and unlock a personalized plan crafted just for you.
          </p>
        </div>
        
        <HeroLead />
      </div>
    </div>
  </div>
</template>

<script setup>
import HeroLead from './HeroLead.vue'
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Kaushan+Script&family=Outfit:wght@700&family=Inter:wght@400;500;600;700&display=swap');

.hero-wrapper {
  position: relative;
  width: 100%;
  background: #f5f5f0;
}

/* Hero Section */
.hero-section {
  position: relative;
  height: 70vh;
  min-height: 550px;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 40px 20px;
}

.hero-bg {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
}

.hero-video {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.hero-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(180deg, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.1) 50%, rgba(0,0,0,0.4) 100%);
  z-index: 1;
}

.hero-content {
  position: relative;
  z-index: 2;
  text-align: center;
  margin-top: -60px;
}

.hero-title-main {
  font-family: 'Kaushan Script', cursive;
  font-size: 72px;
  font-weight: 400;
  color: #F7F6F2;
  margin-bottom: 16px;
  line-height: 1.2;
  text-shadow: 0 2px 10px rgba(0,0,0,0.3);
}

.hero-title-sub-wrapper {
  display: inline-block;
  background-color: #1a3d2e;
  padding: 16px 56px;
  border-radius: 50px;
  box-shadow: 0 4px 20px rgba(0,0,0,0.3);
}

.hero-title-sub {
  font-family: 'Outfit', sans-serif;
  font-size: 42px;
  font-weight: 700;
  color: #FFF;
  margin: 0;
  line-height: 1.2;
  white-space: nowrap;
  text-transform: capitalize;
}

/* Form Area */
.form-area {
  position: relative;
  z-index: 10;
  margin-top: -150px;
  padding: 0 20px 40px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

/* TripAdvisor Badge */
.tripadvisor-badge {
  margin-bottom: -35px;
  position: relative;
  z-index: 11;
}

.tripadvisor-img {
  width: 100px;
  height: 100px;
  object-fit: contain;
  filter: drop-shadow(0 2px 4px rgba(0,0,0,0.3));
  display: block;
}

/* Form Card - Wider for single line description */
.form-card {
  width: 100%;
  max-width: 850px; /* Increased from 650px for wider layout */
  background: #FFFFFF;
  border-radius: 24px;
  padding: 50px 60px 30px; /* Increased horizontal padding */
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.15);
}

.form-intro {
  text-align: center;
  margin-bottom: 28px;
}

.form-title {
  font-family: 'Kaushan Script', cursive;
  font-size: 32px;
  font-weight: 400;
  color: #C6A04A;
  margin-bottom: 8px;
  line-height: normal;
}

.form-subtitle {
  font-family: 'Inter', sans-serif;
  font-size: 26px;
  font-weight: 700;
  color: #1a1a1a;
  margin-bottom: 12px;
  line-height: 1.2;
}

/* Force single line on desktop */
.form-description {
  font-size: 15px;
  color: #666;
  margin: 0 auto;
  line-height: 1.5;
  white-space: nowrap; /* Keep on one line */
}

/* Large tablets - allow text to wrap */
@media (max-width: 968px) {
  .form-card {
    max-width: 90%;
    padding: 45px 40px 30px;
  }
  
  .form-description {
    white-space: normal; /* Allow wrapping on smaller screens */
  }
}

/* Tablet */
@media (max-width: 768px) {
  .hero-section {
    height: 65vh;
    min-height: 500px;
  }
  
  .hero-title-main {
    font-size: 52px;
  }
  
  .hero-title-sub-wrapper {
    padding: 14px 40px;
  }
  
  .hero-title-sub {
    font-size: 32px;
  }

  .tripadvisor-img {
    width: 85px;
    height: 85px;
  }
  
  .form-area {
    margin-top: -120px;
  }
  
  .tripadvisor-badge {
    margin-bottom: -30px;
  }
  
  .form-card {
    padding: 40px 30px 25px;
  }

  .form-title {
    font-size: 28px;
  }

  .form-subtitle {
    font-size: 22px;
  }
  
  .form-description {
    font-size: 14px;
  }
}

/* Mobile */
@media (max-width: 480px) {
  .hero-section {
    height: 60vh;
    min-height: 450px;
  }
  
  .hero-title-main {
    font-size: 42px;
  }
  
  .hero-title-sub-wrapper {
    padding: 12px 28px;
  }
  
  .hero-title-sub {
    font-size: 26px;
  }

  .tripadvisor-img {
    width: 75px;
    height: 75px;
  }

  .form-area {
    margin-top: -100px;
  }
  
  .tripadvisor-badge {
    margin-bottom: -25px;
  }
  
  .form-card {
    padding: 35px 20px 20px;
    border-radius: 20px;
  }
  
  .form-title {
    font-size: 24px;
  }
  
  .form-subtitle {
    font-size: 20px;
  }
  
  .form-description {
    font-size: 14px;
    line-height: 1.4;
  }
}
</style>