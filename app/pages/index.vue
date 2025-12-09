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
      <!-- Let each component control its own spacing -->
      <div class="flex flex-col">

        <!-- 1) TOP: TOURS + CORE VALUE PROPS -->
        <section aria-labelledby="section-tours">
          <ToursPreview />
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

        <!-- 5) PACKING LIST MAGNETS -->
        <SafariPackingListCTA />
        <KilimanjaroPackingListCTA />

        <!-- 6) KILIMANJARO SUCCESS CALCULATOR -->
        <section aria-labelledby="section-kili-calculator">
          <KilimanjaroSuccessCalculator />
        </section>

        <!-- 7) SOCIAL PROOF: TESTIMONIALS -->
        <section aria-labelledby="section-testimonials">
          <Testimonials />
        </section>

        <!-- 8) FREE CONSULTATION (lead magnet) -->
        <section aria-labelledby="section-free-consultation">
          <FreeConsultationCTA />
        </section>

        <!-- 9) FINAL BIG CTA (BOOK / PLAN TRIP) -->
        <section aria-labelledby="section-cta">
          <CTA />
        </section>

        <!-- 10) NEWSLETTER SIGNUP -->
        <section aria-labelledby="section-newsletter">
          <NewsletterSignup />
        </section>

        <!-- 11) FOOTER -->
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
import KilimanjaroSuccessCalculator from '~/components/KilimanjaroSuccessCalculator.vue'
import Testimonials from '~/components/Testimonials.vue'
import FreeConsultationCTA from '~/components/FreeConsultationCTA.vue'
import CTA from '~/components/CTA.vue'
import NewsletterSignup from '~/components/NewsletterSignup.vue'
import SiteFooter from '~/components/SiteFooter.vue'

definePageMeta({
  title: 'Home — ZafsTours'
})
</script>
