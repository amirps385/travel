<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Hero Section -->
    <section class="relative min-h-[80vh] flex items-center justify-center overflow-hidden bg-linear-to-br from-gray-900 to-emerald-900">
      <div class="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1516426122078-c23e76319801?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80"
          alt="Kilimanjaro mountain with safari landscape"
          class="w-full h-full object-cover opacity-10"
        />
        <div class="absolute inset-0 bg-black/20"></div>
      </div>

      <div class="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl relative z-10">
        <div class="text-center py-16 md:py-24">
          <div class="inline-flex items-center justify-center mb-8">
            <div class="h-px w-12 bg-amber-500"></div>
            <span class="mx-4 text-amber-400 font-medium tracking-wider text-sm uppercase">Tanzanian Excellence</span>
            <div class="h-px w-12 bg-amber-500"></div>
          </div>
          
          <h1 class="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-8 leading-tight">
            About ZAFS Tours
          </h1>
          
          <p class="text-xl text-gray-200 max-w-3xl mx-auto mb-12 leading-relaxed">
            Born from the heart of Tanzania, we craft unforgettable adventures across Serengeti, Kilimanjaro, and Zanzibar with local expertise.
          </p>

          <div class="flex flex-col sm:flex-row gap-4 justify-center">
            <NuxtLink
              to="/contact"
              class="inline-flex items-center justify-center px-8 py-4 bg-emerald-600 hover:bg-emerald-700 text-white font-medium rounded-lg transition-all duration-300 hover:shadow-lg text-lg"
            >
              <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"/>
              </svg>
              Plan My Adventure
            </NuxtLink>

            <button
              @click="scrollToContact"
              class="inline-flex items-center justify-center px-8 py-4 bg-transparent hover:bg-white/10 text-white font-medium rounded-lg border border-white/30 transition-all duration-300 text-lg"
            >
              Contact Our Guides
            </button>
          </div>

          <!-- Trust Badges -->
          <div class="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16 max-w-5xl mx-auto">
            <div 
              v-for="badge in trustBadges"
              :key="badge.title"
              class="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center hover:bg-white/20 transition-all duration-300 border border-white/20"
            >
              <div class="text-3xl mb-3 text-emerald-400">
                {{ badge.icon }}
              </div>
              <h3 class="font-semibold text-white mb-2">{{ badge.title }}</h3>
              <p class="text-gray-300 text-sm">{{ badge.description }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Stats Section -->
    <section class="py-20 bg-white">
      <div class="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
        <div class="text-center mb-16">
          <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            Our Journey in Numbers
          </h2>
          <p class="text-gray-600 text-lg max-w-2xl mx-auto">
            Years of creating unforgettable African adventures
          </p>
        </div>
        
        <div class="grid grid-cols-2 lg:grid-cols-4 gap-8">
          <div 
            v-for="stat in stats"
            :key="stat.label"
            class="bg-gray-50 rounded-xl p-8 text-center hover:shadow-md transition-all duration-300 border border-gray-200"
          >
            <div class="text-4xl md:text-5xl font-bold text-emerald-600 mb-3">
              {{ stat.number }}
            </div>
            <div class="text-gray-700 font-medium text-lg">{{ stat.label }}</div>
          </div>
        </div>
      </div>
    </section>

    <!-- Our Story Section -->
    <section class="py-20 bg-linear-to-b from-gray-50 to-white">
      <div class="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
        <div class="bg-white rounded-2xl p-8 md:p-12 shadow-sm border border-gray-200">
          <div class="grid lg:grid-cols-2 gap-12 items-center">
            <!-- Image -->
            <div class="relative">
              <div class="rounded-xl overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                  alt="African safari guide with binoculars overlooking Serengeti"
                  class="w-full h-[400px] object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
            </div>
            
            <!-- Story Content -->
            <div>
              <div class="flex items-center mb-6">
                <div class="h-px w-8 bg-emerald-500"></div>
                <span class="mx-3 text-emerald-600 font-medium tracking-wider text-sm uppercase">Our Story</span>
                <div class="h-px w-8 bg-emerald-500"></div>
              </div>
              
              <h2 class="text-3xl font-bold text-gray-900 mb-8">
                Born from the Heart of Tanzania
              </h2>
              
              <div class="space-y-6">
                <p class="text-gray-700 leading-relaxed text-lg">
                  ZAFS Tours began with a simple dream: to share the untamed beauty and vibrant culture of Tanzania with the world. Founded by local guides who grew up in the shadows of Kilimanjaro and the plains of Serengeti.
                </p>
                
                <!-- Founder quote -->
                <div class="border-l-4 border-emerald-500 pl-6 py-4 bg-emerald-50 rounded-r-lg">
                  <p class="text-gray-800 italic font-serif text-lg">
                    "Every journey we create is a story waiting to be told—a connection between travelers and the soul of Africa."
                  </p>
                  <div class="flex items-center mt-4">
                    <div class="w-10 h-10 rounded-full bg-emerald-600 flex items-center justify-center text-white font-medium mr-3">
                      J
                    </div>
                    <div>
                      <div class="font-semibold text-gray-900">Juma Hassan</div>
                      <div class="text-sm text-gray-600">Founder & Chief Guide</div>
                    </div>
                  </div>
                </div>
                
                <p class="text-gray-700 leading-relaxed text-lg">
                  We believe in responsible tourism that respects wildlife, supports local communities, and preserves the natural wonders that make Tanzania extraordinary.
                </p>
              </div>
            </div>
          </div>
          
          <!-- Values Section -->
          <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mt-16">
            <div 
              v-for="value in values"
              :key="value.title"
              class="bg-gray-50 rounded-xl p-6 hover:shadow-md transition-all duration-300 border border-gray-200"
            >
              <div class="flex items-center mb-4">
                <div class="w-12 h-12 rounded-lg bg-emerald-100 flex items-center justify-center mr-4">
                  <span class="text-emerald-600 text-lg">{{ value.icon }}</span>
                </div>
                <h4 class="text-lg font-semibold text-gray-900 flex-1">{{ value.title }}</h4>
              </div>
              <p class="text-gray-600 text-sm">{{ value.description }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Services Section -->
    <section class="py-20 bg-emerald-50">
      <div class="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
        <div class="text-center mb-16">
          <div class="flex items-center justify-center mb-8">
            <div class="h-px w-8 bg-emerald-500"></div>
            <span class="mx-3 text-emerald-600 font-medium tracking-wider text-sm uppercase">Our Specialties</span>
            <div class="h-px w-8 bg-emerald-500"></div>
          </div>
          
          <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            Tanzania's Finest Experiences
          </h2>
          <p class="text-gray-600 text-lg max-w-2xl mx-auto">
            From mountain peaks to ocean shores, experience the diversity of East Africa
          </p>
        </div>
        
        <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div 
            v-for="service in services"
            :key="service.title"
            class="bg-white rounded-xl p-8 hover:shadow-lg transition-all duration-300 border border-gray-200"
          >
            <div class="w-16 h-16 rounded-lg bg-emerald-600 flex items-center justify-center mb-6">
              <span class="text-white text-xl">{{ service.icon }}</span>
            </div>
            
            <h3 class="text-xl font-semibold text-gray-900 mb-4">
              {{ service.title }}
            </h3>
            
            <p class="text-gray-600 mb-6">
              {{ service.description }}
            </p>
            
            <NuxtLink 
              :to="service.slug"
              class="inline-flex items-center text-emerald-600 font-medium hover:text-emerald-700 transition-colors"
            >
              Explore
              <svg class="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"/>
              </svg>
            </NuxtLink>
          </div>
        </div>
      </div>
    </section>

    <!-- Why Choose Us Section -->
    <section class="py-20 bg-white">
      <div class="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
        <div class="text-center mb-16">
          <div class="flex items-center justify-center mb-8">
            <div class="h-px w-8 bg-emerald-500"></div>
            <span class="mx-3 text-emerald-600 font-medium tracking-wider text-sm uppercase">Why Choose Us</span>
            <div class="h-px w-8 bg-emerald-500"></div>
          </div>
          
          <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            The ZAFS Difference
          </h2>
          <p class="text-gray-600 text-lg max-w-2xl mx-auto">
            Experience Tanzania with guides who call this land home
          </p>
        </div>
        
        <div class="grid lg:grid-cols-2 gap-12 items-center">
          <!-- Features List -->
          <div class="space-y-6">
            <div 
              v-for="(feature, index) in features"
              :key="feature"
              class="flex items-start space-x-4 bg-gray-50 rounded-xl p-6 hover:shadow-md transition-all duration-300 border border-gray-200"
            >
              <div class="shrink-0">
                <div class="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 font-medium mt-1">
                  {{ index + 1 }}
                </div>
              </div>
              <div class="flex-1">
                <h4 class="font-semibold text-gray-900 mb-2">
                  {{ feature }}
                </h4>
                <p class="text-gray-600 text-sm">
                  {{ getFeatureDescription(index) }}
                </p>
              </div>
            </div>
          </div>
          
          <!-- Image -->
          <div class="relative">
            <div class="rounded-xl overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1503220317375-aaad61436b1b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                alt="ZAFS guide with guests on safari vehicle"
                class="w-full h-[400px] object-cover hover:scale-105 transition-transform duration-300"
              />
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Team Section -->
    <section class="py-20 bg-emerald-50">
      <div class="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
        <div class="text-center mb-16">
          <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            Meet Our Safari Family
          </h2>
          <p class="text-gray-600 text-lg max-w-2xl mx-auto">
            Expert guides born and raised in Tanzania
          </p>
        </div>
        
        <!-- Founder Card -->
        <div class="mb-16">
          <div class="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-200">
            <div class="md:flex">
              <div class="md:w-2/5">
                <img
                  src="https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                  alt="Juma Hassan, Founder of ZAFS Tours"
                  class="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div class="md:w-3/5 p-8 md:p-12">
                <div class="flex items-center mb-6">
                  <div class="w-2 h-6 bg-emerald-500 rounded-full mr-3"></div>
                  <span class="text-emerald-600 font-medium">Founder's Message</span>
                </div>
                
                <h3 class="text-2xl font-bold text-gray-900 mb-6">
                  Juma Hassan<br>
                  <span class="text-lg text-emerald-600">Founder & Chief Safari Guide</span>
                </h3>
                
                <div class="text-gray-700 space-y-4 mb-8">
                  <p class="italic border-l-4 border-emerald-500 pl-4 py-2">
                    "I was born in a Maasai village at the foot of Kilimanjaro. The mountains, the savannah, the ocean—this land is my home."
                  </p>
                  
                  <p class="leading-relaxed">
                    For over 15 years, I've dedicated my life to sharing the magic of Tanzania. ZAFS Tours is more than a business—it's a family of guides united by our love for this land.
                  </p>
                  
                  <p class="leading-relaxed">
                    When you travel with us, you don't just see Tanzania—you feel it, understand it, and become part of its ongoing story.
                  </p>
                </div>
                
                <div class="flex items-center text-gray-600">
                  <svg class="w-5 h-5 text-emerald-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                  </svg>
                  <span>Based in Arusha, Tanzania</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Team Grid -->
        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div 
            v-for="member in team"
            :key="member.name"
            class="bg-white rounded-xl overflow-hidden hover:shadow-md transition-all duration-300 border border-gray-200"
          >
            <div class="relative overflow-hidden">
              <img
                :src="member.photo"
                :alt="member.name"
                class="w-full h-48 object-cover hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div class="p-6">
              <div class="flex items-center mb-6">
                <div class="w-16 h-16 rounded-full overflow-hidden border-2 border-emerald-200 mr-4">
                  <img
                    :src="member.photo"
                    :alt="member.name"
                    class="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h4 class="text-lg font-semibold text-gray-900">{{ member.name }}</h4>
                  <p class="text-emerald-600 font-medium">{{ member.role }}</p>
                </div>
              </div>
              
              <p class="text-gray-600 mb-6 leading-relaxed">{{ member.bio }}</p>
              
              <div class="flex items-center text-sm text-gray-500">
                <svg class="w-4 h-4 text-emerald-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
                <span>{{ member.experience }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Testimonials Section -->
    <Testimonials />

    <!-- Sustainability Commitment -->
    <section class="py-20 bg-white">
      <div class="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
        <div class="bg-gray-50 rounded-2xl p-8 md:p-12 shadow-sm border border-emerald-100">
          <div class="text-center mb-12">
            <h2 class="text-3xl font-bold text-gray-900 mb-4">
              Travel That Gives Back
            </h2>
            <p class="text-gray-600 max-w-2xl mx-auto">
              Committed to sustainable tourism and community support
            </p>
          </div>
          
          <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div 
              v-for="item in sustainabilityItems" 
              :key="item.title"
              class="flex flex-col items-center text-center p-6 bg-white rounded-xl border border-emerald-100 hover:shadow-md transition-all duration-300"
            >
              <div class="w-12 h-12 rounded-full bg-emerald-500 flex items-center justify-center mb-4">
                <span class="text-white text-xl">{{ item.icon }}</span>
              </div>
              <h4 class="font-semibold text-gray-900 mb-2">{{ item.title }}</h4>
              <p class="text-gray-600 text-sm">{{ item.description }}</p>
            </div>
          </div>
          
          <div class="mt-12 pt-8 border-t border-emerald-200">
            <div class="text-center">
              <h4 class="font-semibold text-gray-900 mb-2">Certified Responsible Operator</h4>
              <p class="text-gray-600">Licensed by Tanzania Tourist Board • Sustainable Travel Member</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Final CTA Section -->
    <section 
      id="contact"
      class="py-20 bg-linear-to-br from-gray-900 to-emerald-900 relative"
      ref="contactSection"
    >
      <div class="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
        <div class="text-center">
          <div class="flex items-center justify-center mb-8">
            <div class="h-px w-8 bg-amber-500"></div>
            <span class="mx-3 text-amber-400 font-medium tracking-wider text-sm uppercase">Start Your Adventure</span>
            <div class="h-px w-8 bg-amber-500"></div>
          </div>
          
          <h2 class="text-3xl md:text-4xl font-bold text-white mb-8">
            Ready to Write Your African Story?
          </h2>
          
          <p class="text-lg text-gray-300 mb-12 max-w-2xl mx-auto">
            From the first inquiry to your final sunset in the Serengeti, our team is here to craft your perfect Tanzanian adventure.
          </p>
          
          <div class="grid md:grid-cols-3 gap-6 mb-12">
            <div 
              v-for="contact in contactOptions" 
              :key="contact.title"
              class="bg-white/10 backdrop-blur-sm rounded-xl p-6 hover:bg-white/20 transition-all duration-300 border border-white/20"
            >
              <div class="text-2xl mb-3 text-emerald-400">
                {{ contact.icon }}
              </div>
              <h4 class="font-semibold text-white mb-2">{{ contact.title }}</h4>
              <a 
                :href="contact.href"
                class="text-emerald-400 hover:text-emerald-300 transition-colors block font-medium"
              >
                {{ contact.value }}
              </a>
              <p class="text-gray-400 text-sm mt-2">{{ contact.note }}</p>
            </div>
          </div>
          
          <NuxtLink
            to="/contact"
            class="inline-flex items-center justify-center px-10 py-4 bg-emerald-600 hover:bg-emerald-700 text-white font-medium rounded-lg transition-all duration-300 hover:shadow-lg text-lg"
          >
            Begin Your Journey
            <svg class="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"/>
            </svg>
          </NuxtLink>
          
          <p class="mt-12 text-gray-500 text-sm">
            🇹🇿 Proudly Tanzanian • 🌍 Sustainable Travel • 🤝 Trusted Since 2008
          </p>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useHead } from '#imports'

// Embedded data
const trustBadges = [
  {
    icon: '🦁',
    title: 'Licensed Operator',
    description: 'Fully licensed by Tanzania Tourist Board'
  },
  {
    icon: '🗺️',
    title: 'Local Guides',
    description: 'Born & raised in Tanzania'
  },
  {
    icon: '📞',
    title: '24/7 Support',
    description: 'On-trip assistance always available'
  },
  {
    icon: '✨',
    title: 'Tailor-Made',
    description: 'Custom itineraries for every traveler'
  }
]

const stats = [
  { number: '500+', label: 'Happy Travelers' },
  { number: '15+', label: 'Years Experience' },
  { number: '1000+', label: 'Safaris Organized' },
  { number: '24/7', label: 'Local Support' }
]

const values = [
  { 
    title: 'Authentic Experiences', 
    description: 'Go beyond tourist spots with local guides',
    icon: '🌄'
  },
  { 
    title: 'Sustainable Travel', 
    description: 'Travel that gives back to communities',
    icon: '🌱'
  },
  { 
    title: 'Safety First', 
    description: 'Licensed guides & safety protocols',
    icon: '🛡️'
  },
  { 
    title: 'Personalized Service', 
    description: 'Every journey uniquely crafted',
    icon: '✨'
  }
]

const services = [
  {
    title: 'Zanzibar',
    slug: '/zanzibar',
    description: 'Island paradise with spice tours and pristine beaches',
    icon: '🏝️'
  },
  {
    title: 'Safari',
    slug: '/safari',
    description: 'Wildlife adventures in Serengeti and Ngorongoro',
    icon: '🦁'
  },
  {
    title: 'Kilimanjaro',
    slug: '/kilimanjaro',
    description: 'Guided ascents on Africa\'s highest peak',
    icon: '🏔️'
  },
  {
    title: 'Custom',
    slug: '/custom',
    description: 'Bespoke journeys combining multiple experiences',
    icon: '✈️'
  }
]

const features = [
  'Licensed Tanzanian Tour Operator',
  'Local Expert Guides',
  'Safety-First Approach',
  'Small Group Sizes',
  'Bespoke Itineraries',
  '24/7 On-Trip Support'
]

const team = [
  {
    name: 'Sarah Mwamba',
    role: 'Safari Director',
    photo: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    bio: 'Maasai heritage, 12+ years guiding in Serengeti',
    experience: '12 years experience'
  },
  {
    name: 'Rajab Simba',
    role: 'Mountain Guide',
    photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    bio: 'Chagga tribe, summited Kilimanjaro 200+ times',
    experience: '15 years experience'
  },
  {
    name: 'Aisha Hassan',
    role: 'Zanzibar Specialist',
    photo: 'https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    bio: 'Born in Stone Town, expert in Swahili culture',
    experience: '8 years experience'
  }
]

const sustainabilityItems = [
  {
    icon: '🌱',
    title: 'Community Support',
    description: '5% of every trip supports local initiatives'
  },
  {
    icon: '♻️',
    title: 'Zero Plastic',
    description: 'All tours use reusable containers'
  },
  {
    icon: '🦁',
    title: 'Wildlife Conservation',
    description: 'Partners with conservation programs'
  },
  {
    icon: '👨‍👩‍👧‍👦',
    title: 'Local Employment',
    description: '100% Tanzanian guides and staff'
  }
]

const contactOptions = [
  {
    icon: '✉️',
    title: 'Email Us',
    value: 'info@zafstours.com',
    href: 'mailto:info@zafstours.com',
    note: 'Response within 12 hours'
  },
  {
    icon: '📞',
    title: 'Call Our Team',
    value: '+255 620 285 462',
    href: 'tel:+255620285462',
    note: '24/7 during your trip'
  },
  {
    icon: '💬',
    title: 'WhatsApp',
    value: 'Same Number',
    href: 'https://wa.me/255620285462',
    note: 'Instant responses'
  }
]

// Helper function for feature descriptions
const getFeatureDescription = (index) => {
  const descriptions = [
    'Fully licensed and insured under Tanzanian law',
    'Born and raised in the regions they showcase',
    'Comprehensive safety protocols and emergency plans',
    'Intimate groups for personalized attention',
    'Designed around your interests and pace',
    'Direct access to our team throughout your journey'
  ]
  return descriptions[index] || ''
}

// Scroll to contact section
const contactSection = ref(null)

const scrollToContact = () => {
  if (contactSection.value) {
    contactSection.value.scrollIntoView({ behavior: 'smooth' })
  }
}

// JSON-LD Structured Data
const structuredData = {
  '@context': 'https://schema.org',
  '@type': 'TouristInformationAndServices',
  'name': 'ZAFS Tours',
  'url': 'https://zafstours.com',
  'logo': 'https://zafstours.com/logo.png',
  'description': 'Licensed Tanzanian tour operator specializing in Zanzibar holidays, wildlife safaris, and Kilimanjaro climbs.',
  'address': {
    '@type': 'PostalAddress',
    'addressCountry': 'Tanzania',
    'addressRegion': 'Arusha'
  },
  'contactPoint': {
    '@type': 'ContactPoint',
    'email': 'info@zafstours.com',
    'telephone': '+255620285462',
    'contactType': 'customer service',
    'availableLanguage': ['English', 'Swahili']
  },
  'areaServed': 'Tanzania',
  'founder': {
    '@type': 'Person',
    'name': 'Juma Hassan'
  }
}

// Use useHead for JSON-LD and meta tags
useHead({
  title: 'About ZAFS Tours — Tanzanian Safari Specialists',
  meta: [
    {
      name: 'description',
      content: 'Discover ZAFS Tours: Tanzanian-owned safari experts offering Kilimanjaro climbs, Serengeti wildlife adventures, Zanzibar escapes, and sustainable travel.'
    },
    {
      property: 'og:title',
      content: 'About ZAFS Tours — Tanzanian Safari Specialists'
    },
    {
      property: 'og:description',
      content: 'Meet our local guides and discover our commitment to authentic, sustainable Tanzanian travel experiences.'
    },
    {
      property: 'og:image',
      content: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80'
    }
  ],
  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify(structuredData)
    }
  ]
})

definePageMeta({
  layout: 'default'
})
</script>

<style scoped>
html {
  scroll-behavior: smooth;
}
</style>