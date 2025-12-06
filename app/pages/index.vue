<template>
  <div>
    <!-- Hero uses slot to include the lead form -->
    <Hero>
      <template #leadForm>
        <div class="p-3">
          <HeroLead />
        </div>
      </template>
    </Hero>

    <main class="bg-slate-50">
      <!-- Top: tours + core value props -->
      <ToursPreview />
      <FeaturesSection />
      <Offer />
      <WhyChoose />

      <!-- Story / trust -->
      <VideoSection />

      <!-- Lead magnets for different audiences -->
      <SafariPackingListCTA />
      <KilimanjaroPackingListCTA />
      <SampleItineraryCTA />
      <!-- Social proof -->
      <Testimonials />

      <!-- High-intent CTAs -->
      <FreeConsultationCTA />
      <CTA />

      <!-- Long-term relationship -->
      <NewsletterSignup />

      <!-- Footer -->
      <SiteFooter />
    </main>
  </div>
</template>

<script setup>
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
