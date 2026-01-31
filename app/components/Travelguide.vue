<template>
  <section class="travel-guides">
    <div class="container">
      <!-- Header -->
      <div class="header">
        <h2 class="title">Travel Guides & Real Experiences</h2>
        <p class="subtitle">
          Practical insights to help you plan your Tanzania journey with confidence.
        </p>
      </div>

      <!-- Filter Tags -->
      <div class="filter-tags">
        <button 
          v-for="tag in tags" 
          :key="tag.id"
          :class="['tag-btn', { active: activeTag === tag.id }]"
          @click="activeTag = tag.id"
        >
          <img :src="`/images/travelguide/${tag.icon}`" :alt="tag.label" class="tag-icon" />
          <span>{{ tag.label }}</span>
          <span class="tag-count">{{ tag.count }}</span>
        </button>
      </div>

      <!-- Cards Grid -->
      <div class="cards-grid">
        <article v-for="(article, index) in articles" :key="index" class="guide-card">
          <div class="card-image">
            <img :src="`/images/travelguide/t${index + 1}.png`" :alt="article.title" />
            <span class="card-badge">{{ article.category }}</span>
          </div>
          
          <div class="card-content">
            <h3 class="card-title">{{ article.title }}</h3>
            
            <div class="card-footer">
              <div class="read-time">
                <img src="/images/travelguide/time.svg" alt="Time" class="time-icon" />
                <span>{{ article.readTime }}</span>
              </div>
              
              <a href="#" class="read-more">
                Read More 
                <span class="arrow">→</span>
              </a>
            </div>
          </div>
        </article>
      </div>

      <!-- Explore Button -->
      <div class="explore-section">
        <button class="explore-btn">
          Explore All Articles
          <span class="arrow">→</span>
        </button>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'

const activeTag = ref('kilimanjaro')

const tags = [
  { id: 'safari', label: 'Safari', icon: 'jeep.svg', count: '16' },
  { id: 'kilimanjaro', label: 'Kilimanjaro', icon: 'mountain.svg', count: '9' },
  { id: 'zanzibar', label: 'Zanzibar', icon: 'umbrella.svg', count: '12' }
]

const articles = [
  {
    title: 'What a Tanzania Safari Really Costs (And What You Actually Get)',
    category: 'Plan Your Trip',
    readTime: '7 min read'
  },
  {
    title: 'How Difficult Is Kilimanjaro? An Honest Assessment',
    category: 'Kilimanjaro Insights',
    readTime: '7 min read'
  },
  {
    title: 'The Great Migration Explained: When, Where, and What to Expect',
    category: 'Safari Guide',
    readTime: '7 min read'
  },
  {
    title: 'What a Tanzania Safari Really Costs (And What You Actually Get)',
    category: 'Safari Guide',
    readTime: '7 min read'
  }
]
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700&display=swap');

.travel-guides {
  background-color: #FFF9E8; /* Cream background matching screenshot */
  padding: 80px 20px;
  font-family: 'Outfit', sans-serif;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
}

/* Header */
.header {
  text-align: center;
  margin-bottom: 40px;
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

/* Filter Tags */
.filter-tags {
  display: flex;
  justify-content: center;
  gap: 12px;
  margin-bottom: 48px;
  flex-wrap: wrap;
}

.tag-btn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 10px 20px;
  background-color: #E8E4DC; /* Light beige for inactive */
  border: none;
  border-radius: 50px;
  font-family: 'Outfit', sans-serif;
  font-size: 14px;
  font-weight: 500;
  color: #4A4A4A;
  cursor: pointer;
  transition: all 0.3s ease;
}

.tag-btn:hover {
  background-color: #DDD8CE;
  transform: translateY(-1px);
}

.tag-btn.active {
  background-color: #2D2D2D; /* Dark active state */
  color: #FFFFFF;
}

.tag-icon {
  width: 16px;
  height: 16px;
  object-fit: contain;
  filter: brightness(0.4);
}

.tag-btn.active .tag-icon {
  filter: brightness(0) invert(1);
}

.tag-count {
  background-color: rgba(255, 255, 255, 0.3);
  color: inherit;
  padding: 2px 8px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 600;
  margin-left: 4px;
}

/* Cards Grid */
.cards-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 24px;
  margin-bottom: 48px;
}

/* Card Styles */
.guide-card {
  background: #FFFFFF;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
  cursor: pointer;
}

.guide-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.1);
}

.card-image {
  position: relative;
  width: 100%;
  height: 200px;
  overflow: hidden;
}

.card-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.guide-card:hover .card-image img {
  transform: scale(1.05);
}

.card-badge {
  position: absolute;
  top: 12px;
  left: 12px;
  background-color: rgba(255, 255, 255, 0.95);
  color: #1C1A17;
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 600;
  backdrop-filter: blur(8px);
}

.card-content {
  padding: 20px;
}

.card-title {
  font-size: 15px;
  font-weight: 600;
  color: #1C1A17;
  margin: 0 0 16px 0;
  line-height: 1.4;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.card-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.read-time {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 13px;
  color: #6B6B6B;
  font-weight: 500;
}

.time-icon {
  width: 14px;
  height: 14px;
  opacity: 0.6;
}

.read-more {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  font-size: 14px;
  font-weight: 600;
  color: #D4A048; /* Golden/orange accent */
  text-decoration: none;
  transition: gap 0.3s ease;
}

.read-more:hover {
  gap: 8px;
}

.read-more .arrow {
  transition: transform 0.3s ease;
}

.read-more:hover .arrow {
  transform: translateX(4px);
}

/* Explore Button Section */
.explore-section {
  display: flex;
  justify-content: center;
}

.explore-btn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 14px 32px;
  background-color: transparent;
  border: 2px solid #D4A048; /* Gold border */
  border-radius: 50px;
  font-family: 'Outfit', sans-serif;
  font-size: 15px;
  font-weight: 600;
  color: #1C1A17;
  cursor: pointer;
  transition: all 0.3s ease;
}

.explore-btn:hover {
  background-color: #D4A048;
  color: #FFFFFF;
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(212, 160, 72, 0.3);
}

.explore-btn .arrow {
  transition: transform 0.3s ease;
}

.explore-btn:hover .arrow {
  transform: translateX(4px);
}

/* Responsive */
@media (max-width: 1024px) {
  .cards-grid {
    grid-template-columns: repeat(2, 1fr);
  }
  
  .title {
    font-size: 32px;
  }
}

@media (max-width: 640px) {
  .cards-grid {
    grid-template-columns: 1fr;
    max-width: 400px;
    margin: 0 auto 48px auto;
  }
  
  .title {
    font-size: 28px;
  }
  
  .tag-btn {
    padding: 8px 16px;
    font-size: 13px;
  }
  
  .guide-card {
    max-width: 100%;
  }
}

@media (max-width: 480px) {
  .travel-guides {
    padding: 60px 16px;
  }
  
  .filter-tags {
    gap: 8px;
  }
  
  .tag-btn span:not(.tag-count) {
    display: none; /* Hide text on very small screens, show only icon and count */
  }
  
  .tag-btn {
    padding: 8px;
  }
  
  .tag-count {
    margin-left: 0;
  }
}
</style>