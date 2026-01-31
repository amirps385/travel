<template>
  <section class="stories-section">
    <div class="container">
      <!-- Header -->
      <div class="section-header">
        <h2 class="main-title">Stories From Travelers Who Chose Zafs</h2>
        <p class="subtitle">Real experiences from guests who explored Tanzania with us</p>
      </div>

      <!-- Stories Grid -->
      <div class="stories-grid">
        <article v-for="(story, index) in stories" :key="index" class="story-card">
          <!-- Image Section - Split Design -->
          <div class="card-images">
            <div class="image-badge">
              <img src="/images/stories/time.svg" alt="" class="badge-icon" />
              <span>Travelers Photos</span>
            </div>
            <div class="image-split">
              <div class="split-left">
                <img :src="story.leftImage" :alt="story.title" />
              </div>
              <div class="split-right">
                <img :src="story.rightImage" :alt="story.title" />
              </div>
            </div>
          </div>

          <!-- Content Section -->
          <div class="card-content">
            <!-- Tag -->
            <span class="trip-tag">{{ story.tag }}</span>

            <!-- Rating -->
            <div class="rating">
              <img 
                v-for="n in 5" 
                :key="n" 
                src="/images/stories/Star.svg" 
                alt="" 
                class="star-icon"
              />
            </div>

            <!-- Review Text -->
            <p class="review-text">{{ story.review }}</p>

            <!-- Read More -->
            <a href="#" class="read-more">Read More</a>

            <!-- User Info -->
            <div class="user-info">
              <div class="user-details">
                <h4 class="user-name">{{ story.name }}</h4>
                <div class="user-location">
                  <img src="/images/stories/location-pin.svg" alt="" class="location-icon" />
                  <span>{{ story.location }}</span>
                </div>
              </div>
              <div class="verification-badge">
                <img :src="story.badge" alt="Verified review" />
              </div>
            </div>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>

<script setup>
const stories = [
  {
    leftImage: '/images/stories/safariview.png',
    rightImage: '/images/stories/girlwithtiger.png',
    tag: 'safari and Kilimanjaro combo',
    review: 'Our 10-day journey exceeded every expectation. Knowledgeable guides, perfect accommodations, and summiting Kilimanjaro was unforgettable....',
    name: 'Sarah & Michael Thompson',
    location: 'United States Of America',
    badge: '/images/stories/tripadvisor1.png'
  },
  {
    leftImage: '/images/stories/safariview.png',
    rightImage: '/images/stories/girlwithtiger.png',
    tag: 'Honeymoon Safari',
    review: 'An exhilarating week exploring the biodiversity of the Tanzania. Our expert guides led us through lush trails and introduced us to indigenous....',
    name: 'Emily & James Rodriguez',
    location: 'Canada',
    badge: '/images/stories/tripadvisor1.png'
  },
  {
    leftImage: '/images/stories/safariview.png',
    rightImage: '/images/stories/girlwithtiger.png',
    tag: 'Kilimanjaro Treks',
    review: 'This epic trek through the Kilimanjaro culminated in the breathtaking views of Machame. Rich history and captivating scenery made...',
    name: 'Liam & Zoe Patel',
    location: 'United Kingdom',
    badge: '/images/stories/google.png'
  },
  {
    leftImage: '/images/stories/safariview.png',
    rightImage: '/images/stories/girlwithtiger.png',
    tag: 'Wildlife Safari',
    review: 'The serene beauty of the Zanzibar was enhanced by our island-hopping adventure. Crystal-clear waters, stunning sunsets, and luxurious resorts....',
    name: 'Ava & Noah Smith',
    location: 'Australia',
    badge: '/images/stories/tripadvisor1.png'
  }
]
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Kaushan+Script&family=Outfit:wght@300;400;500;600;700&display=swap');

.stories-section {
  background-color: #FFF9E8;
  padding: 100px 20px;
  font-family: 'Outfit', sans-serif;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
}

/* Header */
.section-header {
  text-align: center;
  margin-bottom: 50px;
}

.main-title {
  font-size: 36px;
  font-weight: 700;
  color: #1C1A17;
  margin: 0 0 12px 0;
  line-height: 1.2;
}

.subtitle {
  font-family: 'Kaushan Script', cursive;
  font-size: 24px;
  color: #C6A04A;
  margin: 0;
  line-height: 1.4;
}

/* Grid Layout */
.stories-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 24px;
}

@media (max-width: 1024px) {
  .stories-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 640px) {
  .stories-grid {
    grid-template-columns: 1fr;
    max-width: 400px;
    margin: 0 auto;
  }
}

/* Story Card */
.story-card {
  background: #FFFFFF;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.06);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.story-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.1);
}

/* Image Section */
.card-images {
  position: relative;
  width: 100%;
  height: 200px;
}

.image-badge {
  position: absolute;
  top: 12px;
  left: 12px;
  z-index: 10;
  display: flex;
  align-items: center;
  gap: 6px;
  background: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(4px);
  padding: 6px 12px;
  border-radius: 20px;
  color: #FFFFFF;
  font-size: 12px;
  font-weight: 500;
}

.badge-icon {
  width: 14px;
  height: 14px;
  filter: brightness(0) invert(1);
}

.image-split {
  display: flex;
  width: 100%;
  height: 100%;
}

.split-left,
.split-right {
  width: 50%;
  height: 100%;
  overflow: hidden;
}

.split-left img,
.split-right img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

/* Content Section */
.card-content {
  padding: 20px;
}

.trip-tag {
  display: inline-block;
  padding: 6px 12px;
  border: 1px solid #C6A04A;
  border-radius: 20px;
  color: #C6A04A;
  font-size: 12px;
  font-weight: 500;
  margin-bottom: 12px;
  background-color: rgba(198, 160, 74, 0.05);
}

.rating {
  display: flex;
  gap: 4px;
  margin-bottom: 12px;
}

.star-icon {
  width: 16px;
  height: 16px;
  object-fit: contain;
}

.review-text {
  font-size: 14px;
  line-height: 1.6;
  color: #1C1A17;
  margin: 0 0 12px 0;
  opacity: 0.85;
  display: -webkit-box;
  -webkit-line-clamp: 4;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.read-more {
  color: #C6A04A;
  text-decoration: none;
  font-size: 14px;
  font-weight: 500;
  margin-bottom: 16px;
  display: inline-block;
}

.read-more:hover {
  text-decoration: underline;
}

/* User Info */
.user-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 16px;
  border-top: 1px solid rgba(0, 0, 0, 0.06);
}

.user-name {
  font-size: 14px;
  font-weight: 600;
  color: #1C1A17;
  margin: 0 0 4px 0;
}

.user-location {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 13px;
  color: #666;
}

.location-icon {
  width: 14px;
  height: 14px;
  opacity: 0.7;
  filter: brightness(0) saturate(100%) invert(66%) sepia(32%) saturate(589%) hue-rotate(8deg) brightness(92%) contrast(89%);
}

.verification-badge {
  width: 32px;
  height: 32px;
  flex-shrink: 0;
}

.verification-badge img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

/* Mobile Optimizations */
@media (max-width: 768px) {
  .main-title {
    font-size: 28px;
  }
  
  .subtitle {
    font-size: 20px;
  }
  
  .stories-section {
    padding: 60px 20px;
  }
  
  .card-images {
    height: 180px;
  }
}
</style>