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
      <ToursPreview />
      <FeaturesSection />
      <Offer/>
      <WhyChoose />
      <CTA />
      <SiteFooter />
    </main>
  </div>
</template>

<script setup>
import Hero from '~/components/Hero.vue'
import HeroLead from '~/components/HeroLead.vue'
import ToursPreview from '~/components/ToursPreview.vue'
import FeaturesSection from '~/components/FeaturesSection.vue' 
import WhyChoose from '~/components/WhyChoose.vue'
import CTA from '~/components/CTA.vue'
import SiteFooter from '~/components/SiteFooter.vue'
import Offer from '~/components/Offer.vue'

definePageMeta({
  title: 'Home — ZafsTours'
})
</script>
