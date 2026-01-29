<template>
  <section class="trips-section">
    <div class="section-wrapper">

      <!-- Heading -->
      <div class="heading-container">
        <p class="subtitle">Choose Your</p>
        <h2 class="main-title">Tanzania Experience</h2>
        <p class="description">From iconic safaris to Kilimanjaro treks thoughtfully planned.</p>
      </div>

      <!-- Category pills -->
      <div class="tabs-container">
        <div class="tabs-scroll">
          <button
  v-for="cat in categories"
  :key="cat.key"
  @click="selectCategory(cat.key)"
  :class="['tab-button', { active: activeCategory === cat.key }]"
>
  <img v-if="cat.icon" :src="cat.icon" alt="" class="tab-icon" />
  <span class="tab-label">{{ cat.label }}</span>
  <span class="tab-badge">{{ cat.count }} tours</span>
</button>
        </div>
      </div>

      <!-- Cards Grid -->
      <div class="cards-grid">
        <article
          v-for="trip in filteredTrips"
          :key="trip.id"
          class="trip-card"
        >
          <!-- Image header -->
          <div class="card-image-wrapper">
            <img :src="trip.image" :alt="trip.title" class="card-image" />
            
            <!-- Duration badge -->
            <div class="duration-badge">
              <svg class="icon-clock" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="12" cy="12" r="10"/>
                <path d="M12 6v6l4 2"/>
              </svg>
              <span>{{ trip.duration }}</span>
            </div>

            <!-- Tag badge -->
            <div v-if="trip.tag" class="tag-badge" :style="getTagStyle(trip.tagColor)">
              {{ trip.tag }}
            </div>
          </div>

          <!-- Content -->
          <div class="card-content">
            <h3 class="card-title">{{ trip.title }}</h3>
            <p class="card-excerpt">{{ trip.excerpt }}</p>

            <!-- Highlights -->
            <div class="highlights-section">
              <h4 class="highlights-title">Highlights</h4>
              <ul class="highlights-list">
                <li v-for="(h, i) in trip.highlights" :key="i" class="highlight-item">
                  <span class="check-icon">✓</span>
                  <span>{{ h }}</span>
                </li>
              </ul>
            </div>

            <!-- Footer -->
            <div class="card-footer">
              <div class="price-block">
                <div class="price-label">STARTING FROM</div>
                <div class="price-value">{{ trip.price }}/person</div>
              </div>
              
              <button class="view-details-btn">
                View Details
                <svg class="arrow-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </button>
            </div>
          </div>
        </article>
      </div>

      <!-- Explore CTA -->
      <div class="explore-section">
        <button class="explore-btn">
          Explore All Experience
          <svg class="arrow-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M5 12h14M12 5l7 7-7 7"/>
          </svg>
        </button>
      </div>

    </div>
  </section>
</template>

<script setup>
import { ref, computed } from 'vue'

const categories = [
  { key: 'safari', label: 'Safari Adventures', count: 16, icon: '/images/tripsoffering/jeep.svg' },
  { key: 'kilimanjaro', label: 'Kilimanjaro Treks', count: 10, icon: '/images/tripsoffering/mountain.svg' },
  { key: 'all', label: 'All Experiences', count: 30, icon: null }, // No icon for "All"
  { key: 'zanzibar', label: 'Zanzibar Escapes', count: 5, icon: '/images/tripsoffering/umbrella.svg' },
]

const activeCategory = ref('all')

function selectCategory(key) {
  activeCategory.value = key
}

// Helper for tag colors
function getTagStyle(color) {
  const colors = {
    gold: { bg: '#C6A04A', color: '#1C1A17' },
    green: { bg: '#0F2A1D', color: '#FFFFFF' },
  }
  const style = colors[color] || colors.gold
  return {
    backgroundColor: style.bg,
    color: style.color
  }
}

const trips = ref([
  {
    id: 1,
    image: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=600&h=400',
    title: 'Great Migration Safari',
    excerpt: "Witness millions of wildebeest and zebra crossing the Serengeti during nature's greatest spectacle.",
    duration: '7 days / 6 Nights',
    tag: 'Popular',
    tagColor: 'green',
    highlights: ['River Crossings', 'Big Five Sightings', 'Hot Air Balloon'],
    price: '$2500'
  },
  {
    id: 2,
    image: 'https://images.unsplash.com/photo-1542401886-65d6c61db217?auto=format&fit=crop&w=600&h=400',
    title: 'Kilimanjaro Machame Route',
    excerpt: 'Embark on a thrilling climb through diverse ecosystems, leading to the stunning Uhuru Peak.',
    duration: '6 days / 5 Nights',
    tag: 'Challenging',
    tagColor: 'gold',
    highlights: ['Lava Tower', 'Giant Senecios', 'Stunning Sunrise Views'],
    price: '$1500'
  },
  {
    id: 3,
    image: 'https://images.unsplash.com/photo-1589553416260-f586c8f1514f?auto=format&fit=crop&w=600&h=400',
    title: 'Kilimanjaro Machame Route — Acclimatization',
    excerpt: 'Experience the majestic beauty of Kilimanjaro at a relaxed pace, enjoying extra time for acclimatization.',
    duration: '8 days / 7 Nights',
    tag: null,
    highlights: ['Barranco Wall', 'Acclimatization Days', 'Stargazing at High Camp'],
    price: '$1800'
  }
])

const filteredTrips = computed(() => {
  // Simple filtering logic - customize as needed
  if (activeCategory.value === 'all') return trips.value
  return trips.value.filter(t => {
    if (activeCategory.value === 'safari') return t.title.toLowerCase().includes('safari')
    if (activeCategory.value === 'kilimanjaro') return /kilimanjaro|machame/i.test(t.title)
    if (activeCategory.value === 'zanzibar') return /zanzibar/i.test(t.title)
    return true
  })
})
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Kaushan+Script&family=Outfit:wght@400;500;600;700&display=swap');

.trips-section {
  padding: 80px 20px;
  background-color: #FFF9E8; /* Lighter sand color like Figma */
  font-family: 'Outfit', sans-serif;
}

.section-wrapper {
  max-width: 1200px;
  margin: 0 auto;
}

/* Header Styles */
.heading-container {
  text-align: center;
  margin-bottom: 40px;
}

.subtitle {
  font-family: 'Kaushan Script', cursive;
  font-size: 28px;
  color: #C6A04A;
  margin-bottom: 8px;
  line-height: 1.2;
}

.main-title {
  font-family: 'Outfit', sans-serif;
  font-size: 40px;
  font-weight: 700;
  color: #1C1A17;
  margin-bottom: 12px;
  line-height: 1.2;
}

.description {
  font-size: 16px;
  color: #666;
  line-height: 1.5;
}

/* Tabs */
.tabs-container {
  margin-bottom: 48px;
  display: flex;
  justify-content: center;
}

.tabs-scroll {
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
  justify-content: center;
}

.tab-button {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 12px 20px;
  border-radius: 12px;
  border: none;
  background: #FFFFFF;
  box-shadow: 0 2px 8px rgba(0,0,0,0.04);
  cursor: pointer;
  transition: all 0.3s ease;
  font-family: inherit;
}

.tab-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0,0,0,0.08);
}

.tab-button.active {
  background: #0F2A1D;
  color: #FFFFFF;
}

.tab-icon {
  width: 20px;
  height: 20px;
  flex-shrink: 0;
  object-fit: contain;
}

.active .tab-icon {
  color: #FFFFFF;
}

.tab-label {
  font-size: 15px;
  font-weight: 500;
  color: inherit;
}

.tab-badge {
  background: rgba(0,0,0,0.06);
  padding: 4px 10px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 500;
  color: #666;
}

.active .tab-badge {
  background: rgba(255,255,255,0.2);
  color: #FFFFFF;
}

/* Cards Grid */
.cards-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 32px;
  margin-bottom: 48px;
}

@media (max-width: 1024px) {
  .cards-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 640px) {
  .cards-grid {
    grid-template-columns: 1fr;
  }
}

/* Trip Card */
.trip-card {
  background: #FFFFFF;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(0,0,0,0.06);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  display: flex;
  flex-direction: column;
}

.trip-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 32px rgba(0,0,0,0.12);
}

.card-image-wrapper {
  position: relative;
  height: 220px;
  overflow: hidden;
}

.card-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.duration-badge {
  position: absolute;
  top: 16px;
  left: 16px;
  display: flex;
  align-items: center;
  gap: 6px;
  background: rgba(255,255,255,0.95);
  backdrop-filter: blur(4px);
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 13px;
  font-weight: 500;
  color: #1C1A17;
  box-shadow: 0 2px 8px rgba(0,0,0,0.08);
}

.icon-clock {
  width: 14px;
  height: 14px;
  color: #1C1A17;
}

.tag-badge {
  position: absolute;
  top: 16px;
  right: 16px;
  padding: 6px 14px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 600;
  text-transform: capitalize;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
}

.card-content {
  padding: 24px;
  flex: 1;
  display: flex;
  flex-direction: column;
}

.card-title {
  font-size: 20px;
  font-weight: 700;
  color: #1C1A17;
  margin-bottom: 12px;
  line-height: 1.3;
}

.card-excerpt {
  font-size: 14px;
  color: #666;
  line-height: 1.6;
  margin-bottom: 20px;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

/* Highlights */
.highlights-section {
  margin-bottom: 20px;
}

.highlights-title {
  font-size: 14px;
  font-weight: 600;
  color: #1C1A17;
  margin-bottom: 12px;
  text-transform: none;
}

.highlights-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.highlight-item {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 14px;
  color: #555;
  line-height: 1.4;
}

.check-icon {
  width: 18px;
  height: 18px;
  background: #0F2A1D;
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 11px;
  font-weight: 700;
  flex-shrink: 0;
}

/* Card Footer */
.card-footer {
  margin-top: auto;
  padding-top: 20px;
  border-top: 1px solid #E5E5E5;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
}

.price-block {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.price-label {
  font-size: 11px;
  font-weight: 600;
  color: #999;
  letter-spacing: 0.5px;
}

.price-value {
  font-size: 18px;
  font-weight: 700;
  color: #1C1A17;
}

.view-details-btn {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 20px;
  background: #C6A04A;
  color: #FFFFFF;
  border: none;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  font-family: inherit;
}

.view-details-btn:hover {
  background: #B08D3F;
  transform: translateX(2px);
}

.arrow-icon {
  width: 16px;
  height: 16px;
}

/* Explore Section */
.explore-section {
  text-align: center;
  padding-top: 20px;
}

.explore-btn {
  display: inline-flex;
  align-items: center;
  gap: 12px;
  padding: 14px 32px;
  background: transparent;
  border: 2px solid #0F2A1D;
  color: #0F2A1D;
  border-radius: 50px;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  font-family: inherit;
}

.explore-btn:hover {
  background: #0F2A1D;
  color: #FFFFFF;
}

.explore-btn .arrow-icon {
  width: 18px;
  height: 18px;
  transition: transform 0.3s ease;
}

.explore-btn:hover .arrow-icon {
  transform: translateX(4px);
}

/* Mobile adjustments */
@media (max-width: 640px) {
  .trips-section {
    padding: 60px 16px;
  }
  
  .main-title {
    font-size: 32px;
  }
  
  .tabs-scroll {
    overflow-x: auto;
    flex-wrap: nowrap;
    justify-content: flex-start;
    padding-bottom: 8px;
    -webkit-overflow-scrolling: touch;
    scrollbar-width: none;
  }
  
  .tabs-scroll::-webkit-scrollbar {
    display: none;
  }
  
  .tab-button {
    white-space: nowrap;
    padding: 10px 16px;
  }
  
  .card-image-wrapper {
    height: 180px;
  }
}


</style>