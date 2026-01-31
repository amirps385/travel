<template>
  <section class="charity-section">
    <div class="container">
      <!-- Left Content -->
      <div class="content-wrapper">
        <div class="text-content">
          <h2 class="section-title">Travel That Gives Back</h2>
          
          <p class="description">
            Every journey with Zafs is designed to leave a positive footprint not just for our travelers, but for the communities that welcome them.
          </p>
          
          <p class="description">
            We believe responsible travel means giving back in meaningful ways: supporting local families, improving access to education, and empowering women through awareness and care. Our impact is rooted in the places we operate, guided by respect, responsibility, and long-term commitment.
          </p>
        </div>

        <!-- Stats Grid -->
        <div class="stats-grid">
          <div class="stat-card">
            <div class="stat-icon">
              <img src="/images/charity/certificate1.svg" alt="" />
            </div>
            <div class="stat-info">
              <span class="stat-number">1,000+</span>
              <span class="stat-label">Meals & food supplies donated annually!</span>
            </div>
          </div>

          <div class="stat-card">
            <div class="stat-icon">
              <img src="/images/charity/certificate1.svg" alt="" />
            </div>
            <div class="stat-info">
              <span class="stat-number">300+</span>
              <span class="stat-label">women reached through hygiene awareness initiatives</span>
            </div>
          </div>

          <div class="stat-card">
            <div class="stat-icon">
              <img src="/images/charity/certificate1.svg" alt="" />
            </div>
            <div class="stat-info">
              <span class="stat-number">10+</span>
              <span class="stat-label">Schools & community centers assisted</span>
            </div>
          </div>

          <div class="stat-card">
            <div class="stat-icon">
              <img src="/images/charity/certificate1.svg" alt="" />
            </div>
            <div class="stat-info">
              <span class="stat-number">100%</span>
              <span class="stat-label">Locally registered & licensed operator</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Right Image - Plain display -->
      <div class="image-wrapper">
        <img 
          src="/images/charity/teacherandkids.png" 
          alt="Teacher helping children at a local school" 
          class="charity-image"
        />
      </div>
    </div>
  </section>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Kaushan+Script&family=Outfit:wght@300;400;500;600;700&display=swap');

.charity-section {
  background-color: #FFF9E8;
  padding: 100px 20px;
  font-family: 'Outfit', sans-serif;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 80px;
  align-items: center;
}

/* Left Content Styles */
.content-wrapper {
  display: flex;
  flex-direction: column;
  gap: 40px;
}

.section-title {
  font-family: 'Kaushan Script', cursive;
  font-size: 42px;
  color: #C6A04A;
  margin: 0 0 24px 0;
  line-height: 1.2;
  font-weight: 400;
}

.description {
  font-size: 16px;
  line-height: 1.7;
  color: #1C1A17;
  margin: 0 0 16px 0;
  opacity: 0.85;
}

.description:last-of-type {
  margin-bottom: 0;
}

/* Stats Grid */
.stats-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 30px;
  margin-top: 20px;
}

.stat-card {
  display: flex;
  align-items: flex-start;
  gap: 12px;
}

.stat-icon {
  width: 40px;
  height: 40px;
  flex-shrink: 0;
  background-color: rgba(198, 160, 74, 0.1);
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 8px;
}

.stat-icon img {
  width: 100%;
  height: 100%;
  object-fit: contain;
  filter: brightness(0) saturate(100%) invert(66%) sepia(32%) saturate(589%) hue-rotate(8deg) brightness(92%) contrast(89%);
}

.stat-info {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.stat-number {
  font-size: 28px;
  font-weight: 700;
  color: #1C1A17;
  line-height: 1;
}

.stat-label {
  font-size: 13px;
  line-height: 1.4;
  color: #1C1A17;
  opacity: 0.8;
}

/* Right Image - Plain display */
.image-wrapper {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.charity-image {
  width: 100%;
  height: auto;
  display: block;
  /* No border-radius, no clip-path, no hover effects */
}

/* Responsive Design */
@media (max-width: 1024px) {
  .container {
    gap: 60px;
  }
}

@media (max-width: 768px) {
  .container {
    grid-template-columns: 1fr;
    gap: 50px;
  }
  
  .image-wrapper {
    order: -1; /* Move image above text on mobile */
    max-width: 500px;
    margin: 0 auto;
  }
  
  .section-title {
    font-size: 36px;
  }
  
  .stats-grid {
    gap: 24px;
  }
}

@media (max-width: 480px) {
  .charity-section {
    padding: 60px 16px;
  }
  
  .stats-grid {
    grid-template-columns: 1fr;
    gap: 20px;
  }
  
  .section-title {
    font-size: 32px;
  }
  
  .stat-number {
    font-size: 24px;
  }
}
</style>