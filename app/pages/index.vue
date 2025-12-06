<template>
  <div>
    <!-- HERO SECTION (Top fold with lead form) -->
    <Hero>
      <template #leadForm>
        <div class="p-3">
          <HeroLead />
        </div>
      </template>
    </Hero>

    <!-- MAIN CONTENT -->
    <main class="bg-slate-50">
      <!-- Wrap everything in a vertical stack with controlled gaps -->
      <div class="space-y-10 lg:space-y-14">
        <!-- 1) TOP: TOURS + CORE VALUE PROPS -->
        <section aria-labelledby="section-tours">
          <!-- Handpicked tours preview -->
          <ToursPreview />

          <!-- Core features / value props (icons, reasons to book) -->
          <FeaturesSection />
        </section>

        <!-- 2) SERVICES WE OFFER (bold blue band) -->
        <section aria-labelledby="section-offer">
          <Offer />
        </section>

        <!-- 3) WHY CHOOSE US (trust section) -->
        <section aria-labelledby="section-why-choose">
          <WhyChoose />
        </section>

        <!-- 4) IMMERSIVE VIDEO STORY -->
        <section aria-labelledby="section-video">
          <VideoSection />
        </section>

        <!-- 5) PACKING LIST MAGNETS (DARK DUO BAND) -->
        <section aria-labelledby="section-packing-lists" class="bg-slate-950/90">
          <div class="max-w-6xl mx-auto px-4 py-12 md:py-16 lg:py-20 space-y-10">
            <SafariPackingListCTA />
            <KilimanjaroPackingListCTA />
          </div>
        </section>

        <!-- 6) SOCIAL PROOF: TESTIMONIALS -->
        <section aria-labelledby="section-testimonials">
          <Testimonials />
        </section>

        <!-- 7) FREE CONSULTATION (lead magnet) -->
        <section aria-labelledby="section-free-consultation">
          <FreeConsultationCTA />
        </section>

        <!-- 8) FINAL BIG CTA (BOOK / PLAN TRIP) -->
        <section aria-labelledby="section-cta">
          <CTA />
        </section>

        <!-- 9) NEWSLETTER SIGNUP (low-friction micro-conversion) -->
        <section aria-labelledby="section-newsletter">
          <NewsletterSignup />
        </section>

        <!-- 10) FOOTER -->
        <footer aria-label="Site footer">
          <SiteFooter />
        </footer>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import Hero from '~/components/Hero.vue'
import HeroLead from '~/components/HeroLead.vue'
import ToursPreview from '~/components/ToursPreview.vue'
import FeaturesSection from '~/components/FeaturesSection.vue'
import Offer from '~/components/Offer.vue'
import WhyChoose from '~/components/WhyChoose.vue'
import VideoSection from '~/components/VideoSection.vue'
import SafariPackingListCTA from '~/components/SafariPackingListCTA.vue'
import KilimanjaroPackingListCTA from '~/components/KilimanjaroPackingListCTA.vue'
import Testimonials from '~/components/Testimonials.vue'
import FreeConsultationCTA from '~/components/FreeConsultationCTA.vue'
import CTA from '~/components/CTA.vue'
import NewsletterSignup from '~/components/NewsletterSignup.vue'
import SiteFooter from '~/components/SiteFooter.vue'

definePageMeta({
  title: 'Home — ZafsTours'
})
</script>
