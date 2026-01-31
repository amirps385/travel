<script setup>
import { ref, onMounted } from 'vue';

// Your Stats Data
const stats = ref([
  { id: 1, current: 0, target: 1000, suffix: '+', label: 'Meals & food supplies donated annually!' },
  { id: 2, current: 0, target: 300, suffix: '+', label: 'women reached through hygiene awareness' },
  { id: 3, current: 0, target: 10, suffix: '+', label: 'Schools & community centers assisted' },
  { id: 4, current: 0, target: 100, suffix: '%', label: 'Locally registered & licensed operator' }
]);

const charitySection = ref(null);
const hasAnimated = ref(false);

const animateNumbers = () => {
  const duration = 2000; // 2 seconds total
  const frameRate = 1000 / 60;
  const totalFrames = Math.round(duration / frameRate);

  stats.value.forEach((stat) => {
    let frame = 0;
    const update = () => {
      frame++;
      const progress = frame / totalFrames;
      
      // "Ease Out" formula: starts fast, slows down at the target
      const easeOut = 1 - Math.pow(1 - progress, 3);
      stat.current = Math.floor(easeOut * stat.target);

      if (frame < totalFrames) {
        requestAnimationFrame(update);
      } else {
        stat.current = stat.target;
      }
    };
    update();
  });
};

onMounted(() => {
  const observer = new IntersectionObserver((entries) => {
    // This is the trigger: Only start when the section is visible
    if (entries[0].isIntersecting && !hasAnimated.value) {
      animateNumbers();
      hasAnimated.value = true; // Prevents it from re-triggering
    }
  }, { 
    threshold: 0.15 // Triggers when 15% of the section is visible
  });

  if (charitySection.value) {
    observer.observe(charitySection.value);
  }
});
</script>

<template>
  <section ref="charitySection" class="charity-section">
    <div class="main-grid">
      <div class="content-side">
        <h2 class="section-title">Travel That Gives Back</h2>
        
        <p class="description">
          Every journey with Zafs is designed to leave a positive footprint not just for our travelers, but for the communities that welcome them.
        </p>
        
        <p class="description">
          We believe responsible travel means giving back in meaningful ways: supporting local families, improving access to education, and empowering women through awareness and care.
        </p>

        <div class="stats-grid">
          <div v-for="stat in stats" :key="stat.id" class="stat-card">
            <div class="stat-icon">
              <img src="/images/charity/certificate1.svg" alt="Icon" />
            </div>
            <div class="stat-info">
              <span class="stat-number">
                {{ stat.current.toLocaleString() }}{{ stat.suffix }}
              </span>
              <span class="stat-label">{{ stat.label }}</span>
            </div>
          </div>
        </div>
      </div>

      <div class="image-side">
        <img 
          src="/images/charity/teacherandkids.png" 
          alt="Teacher helping children" 
          class="bleed-image"
        />
      </div>
    </div>
  </section>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Kaushan+Script&family=Outfit:wght@300;400;500;600;700&display=swap');

.charity-section {
  background-color: #FFF9E8;
  padding: 100px 0;
  font-family: 'Outfit', sans-serif;
  overflow: hidden; /* Fixes the horizontal scroll/overflow */
  width: 100%;
}

.main-grid {
  display: grid;
  grid-template-columns: 1.1fr 0.9fr;
  align-items: center;
  /* Aligns the left side with your global 1200px container */
  padding-left: max(20px, calc((100% - 1200px) / 2));
  padding-right: 0;
  gap: 60px;
}

.content-side {
  padding-right: 20px;
}

.section-title {
  font-family: 'Kaushan Script', cursive;
  font-size: 42px;
  color: #C6A04A;
  margin: 0 0 24px 0;
  font-weight: 400;
}

.description {
  font-size: 16px;
  line-height: 1.7;
  color: #1C1A17;
  margin-bottom: 20px;
  opacity: 0.85;
}

/* Stats Styling */
.stats-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 32px;
  margin-top: 40px;
}

.stat-card {
  display: flex;
  gap: 12px;
  align-items: flex-start;
}

.stat-icon {
  width: 44px;
  height: 44px;
  flex-shrink: 0;
  background-color: rgba(198, 160, 74, 0.1);
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px;
}

.stat-icon img {
  width: 100%;
  filter: brightness(0) saturate(100%) invert(66%) sepia(32%) saturate(589%) hue-rotate(8deg) brightness(92%) contrast(89%);
}

.stat-number {
  font-size: 32px;
  font-weight: 700;
  color: #1C1A17;
  display: block;
  line-height: 1;
  margin-bottom: 4px;
}

.stat-label {
  font-size: 14px;
  line-height: 1.4;
  color: #1C1A17;
  opacity: 0.8;
}

/* Image Bleed Logic */
.image-side {
  width: 100%;
  height: 100%;
}

.bleed-image {
  width: 100%;
  height: 100%;
  min-height: 550px;
  object-fit: cover;
  display: block;
}

/* Mobile Responsive */
@media (max-width: 1024px) {
  .main-grid { gap: 40px; }
  .section-title { font-size: 36px; }
}

@media (max-width: 768px) {
  .charity-section { padding: 60px 0; }
  
  .main-grid {
    grid-template-columns: 1fr;
    padding-left: 20px;
    padding-right: 20px;
    gap: 40px;
  }
  
  .image-side {
    order: -1;
    /* On mobile, we make it look full-width by pulling the margins */
    margin-left: -20px;
    margin-right: -20px;
    width: calc(100% + 40px);
  }
  
  .bleed-image {
    min-height: 350px;
  }
}

@media (max-width: 480px) {
  .stats-grid {
    grid-template-columns: 1fr;
    gap: 24px;
  }
}
</style>