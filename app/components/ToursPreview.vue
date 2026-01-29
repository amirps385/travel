<template>
  <section class="tours-section">
    <div class="container">
      <!-- Header -->
      <div class="section-header">
        <h3 class="subtitle">See Africa</h3>
        <h2 class="title">The Way It's Meant to Be Experienced</h2>
        <p class="description">
          From thrilling wildlife safaris to conquering Africa's highest peak, discover the adventures that await you
        </p>
      </div>

      <!-- Tours Grid -->
      <div class="tours-grid">
        <!-- Safari Card -->
        <div class="tour-card" style="background-image: url('/images/tourspreview/tourspreview1.jpg')">
          <div class="card-overlay"></div>
          
          <div class="card-content">
            <div class="card-header">
              <span class="tag-outline">PREMIUM SAFARI</span>
              <span class="tag-solid">
                <svg class="star-icon" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                </svg>
                Most Popular
              </span>
            </div>
            
            <div class="card-body">
              <h3 class="card-title">
                <span class="script">Safari</span>
                <span class="bold">Adventures</span>
              </h3>
            </div>
            
            <div class="card-footer">
              <div class="price-wrap">
                <span class="price-label">Starting from</span>
                <span class="price">$2,000</span>
                <span class="price-sublabel">per person</span>
              </div>
              <button class="btn-book">
                Book Safari
                <svg class="arrow-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </button>
            </div>
          </div>
        </div>

        <!-- Kilimanjaro Card -->
        <div class="tour-card" style="background-image: url('/images/tourspreview/tourspreview2.jpg')">
          <div class="card-overlay"></div>
          
          <div class="card-content">
            <div class="card-header">
              <span class="tag-outline">MOUNTAIN TREKKING</span>
              <span class="tag-solid">
                <svg class="star-icon" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                </svg>
                Most Popular
              </span>
            </div>
            
            <div class="card-body">
              <h3 class="card-title">
                <span class="script">Mount</span>
                <span class="bold">Kilimanjaro</span>
              </h3>
            </div>
            
            <div class="card-footer">
              <div class="price-wrap">
                <span class="price-label">Starting from</span>
                <span class="price">$2,500</span>
                <span class="price-sublabel">per person</span>
              </div>
              <button class="btn-book">
                Book Kilimanjaro
                <svg class="arrow-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </button>
            </div>
          </div>
        </div>

        <!-- Zanzibar Card - Wide -->
        <div class="tour-card card-wide" style="background-image: url('/images/tourspreview/tourspreview3.jpg')">
          <div class="card-overlay"></div>
          
          <div class="card-content">
            <div class="card-header">
              <span class="tag-outline">BEACH RELAXATION</span>
              <span class="tag-solid-alt">Perfect Add-On</span>
            </div>
            
            <div class="card-body">
              <h3 class="card-title">
                <span class="script">Zanzibar</span>
                <span class="bold">Beach Escape</span>
              </h3>
            </div>
            
            <div class="card-footer">
              <div class="price-wrap">
                <span class="price-label">Starting from</span>
                <span class="price">$1,500</span>
                <span class="price-sublabel">per person</span>
              </div>
              <button class="btn-book">
                Book Zanzibar
                <svg class="arrow-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Kaushan+Script&family=Outfit:wght@400;500;700&display=swap');

.tours-section {
  padding: 80px 20px;
  background: #f7f6f2;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
}

/* Header Styles */
.section-header {
  text-align: center;
  margin-bottom: 50px;
}

.subtitle {
  font-family: 'Kaushan Script', cursive;
  font-size: 32px;
  color: #c9a962;
  margin-bottom: 8px;
  line-height: 1.2;
}

.title {
  font-family: 'Outfit', sans-serif;
  font-size: 40px;
  font-weight: 700;
  color: #1C1A17;
  margin-bottom: 12px;
  line-height: 56px;
}

.description {
  font-family: 'Outfit', sans-serif;
  font-size: 20px;
  font-weight: 400;
  color: #595959;
  max-width: 700px;
  margin: 0 auto;
  line-height: 32px;
}

/* Grid Layout */
.tours-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 24px;
  max-width: 1000px;
  margin: 0 auto;
}

/* Tour Cards */
.tour-card {
  position: relative;
  height: 420px;
  border-radius: 24px;
  overflow: hidden;
  background-size: cover;
  background-position: center;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.tour-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
}

/* Wide card - matches the combined width of two cards above */
.card-wide {
  grid-column: 1 / -1;
  max-width: 1000px; /* Matches the grid container width exactly */
  width: 100%;
  margin: 0 auto;
  height: 400px;
}

.card-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(to bottom, 
    rgba(0,0,0,0.1) 0%, 
    rgba(0,0,0,0.2) 40%, 
    rgba(0,0,0,0.5) 70%,
    rgba(0,0,0,0.7) 100%
  );
  border-radius: 24px;
}

.card-content {
  position: relative;
  z-index: 2;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 30px;
  color: white;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
}

/* FIX 1: Added white-space: nowrap to prevent text wrapping */
.tag-outline {
  display: flex;
  width: auto; /* Changed from fixed 153px to auto */
  min-width: 153px;
  height: 38px;
  padding: 9.8px 16.981px;
  justify-content: center;
  align-items: center;
  border-radius: 26843500px;
  border: 0.8px solid rgba(255, 255, 255, 0.40);
  background: rgba(255, 255, 255, 0.20);
  color: white;
  font-family: 'Outfit', sans-serif;
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  backdrop-filter: blur(4px);
  box-sizing: border-box;
  white-space: nowrap; /* Prevents text wrapping to second line */
}

.tag-solid {
  background: white;
  color: #1a1a1a;
  padding: 8px 16px;
  border-radius: 20px;
  font-family: 'Outfit', sans-serif;
  font-size: 12px;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 6px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  white-space: nowrap;
}

.tag-solid-alt {
  background: white;
  color: #1a1a1a;
  padding: 8px 16px;
  border-radius: 20px;
  font-family: 'Outfit', sans-serif;
  font-size: 12px;
  font-weight: 600;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  white-space: nowrap;
}

.star-icon {
  width: 14px;
  height: 14px;
  color: #1a1a1a;
}

.card-title {
  margin: 0;
  display: flex;
  flex-direction: column;
  line-height: 48px;
}

.card-title .script {
  font-family: 'Kaushan Script', cursive;
  font-size: 40px;
  font-weight: 400;
  color: #FFF;
  line-height: 48px;
  text-shadow: 0 2px 10px rgba(0,0,0,0.3);
}

.card-title .bold {
  font-family: 'Outfit', sans-serif;
  font-size: 40px;
  font-weight: 700;
  color: #FFF;
  line-height: 48px;
  text-shadow: 0 2px 10px rgba(0,0,0,0.3);
}

.card-footer {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  gap: 20px;
}

.price-wrap {
  display: flex;
  flex-direction: column;
}

.price-label {
  font-family: 'Outfit', sans-serif;
  font-size: 14px;
  color: rgba(255,255,255,0.9);
  margin-bottom: 4px;
  font-weight: 400;
}

.price {
  font-family: 'Outfit', sans-serif;
  font-size: 36px;
  font-weight: 700;
  color: white;
  line-height: 1;
  margin-bottom: 4px;
}

.price-sublabel {
  font-family: 'Outfit', sans-serif;
  font-size: 12px;
  color: rgba(255,255,255,0.8);
}

.btn-book {
  display: flex;
  padding: 8.667px 36.5px 11.333px 34.822px;
  justify-content: center;
  align-items: flex-start;
  gap: 7.678px;
  border-radius: 8px;
  background: #C6A04A;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.10), 0 8px 10px -6px rgba(0, 0, 0, 0.10);
  color: white;
  border: none;
  font-family: 'Outfit', sans-serif;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  white-space: nowrap;
}

.btn-book:hover {
  background: #b89a50;
  transform: translateY(-2px);
  box-shadow: 0 25px 30px -5px rgba(0, 0, 0, 0.15), 0 10px 15px -6px rgba(0, 0, 0, 0.15);
}

.arrow-icon {
  width: 18px;
  height: 18px;
  margin-top: 2px;
}

/* Responsive */
@media (max-width: 768px) {
  .tours-grid {
    grid-template-columns: 1fr;
  }
  
  .card-wide {
    max-width: 100%; /* Full width on mobile */
    height: 380px;
  }
  
  .tour-card {
    height: 380px;
  }
  
  .title {
    font-size: 32px;
    line-height: 44px;
  }
  
  .description {
    font-size: 18px;
    line-height: 28px;
  }
  
  .card-title .script,
  .card-title .bold {
    font-size: 32px;
    line-height: 40px;
  }
  
  .tag-outline {
    min-width: auto;
    padding: 8px 14px;
    font-size: 10px;
  }
}

@media (max-width: 480px) {
  .tour-card {
    height: 360px;
  }
  
  .title {
    font-size: 28px;
    line-height: 38px;
  }
  
  .description {
    font-size: 16px;
    line-height: 26px;
  }
  
  .card-title .script,
  .card-title .bold {
    font-size: 28px;
    line-height: 36px;
  }
  
  .price {
    font-size: 28px;
  }
  
  .btn-book {
    padding: 8px 20px;
    font-size: 14px;
  }
  
  .card-content {
    padding: 20px;
  }
}
</style>