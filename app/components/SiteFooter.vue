<template>
  <footer class="bg-gray-900 text-white">
    <!-- Top Section with Company Info & Links -->
    <div class="container mx-auto px-4 py-12">
      <div class="grid grid-cols-1 lg:grid-cols-5 gap-8">
        <!-- Company Info -->
        <div class="lg:col-span-2">
          <div class="flex items-center mb-6">
            <div class="flex items-center space-x-2">
              <div class="w-10 h-10 bg-linear-to-r from-emerald-500 to-green-600 rounded-lg flex items-center justify-center">
                <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/>
                </svg>
              </div>
              <span class="text-2xl font-bold">Zafs<span class="text-emerald-400">Tours</span></span>
            </div>
          </div>
          <p class="text-gray-400 mb-6 max-w-md">
            ZafsTours is your trusted local operator for Kilimanjaro climbs, Tanzania safaris, and Zanzibar vacations. Based in Tanzania with years of experience.
          </p>
          <div class="flex space-x-4">
            <!-- Facebook -->
            <a href="https://www.facebook.com/zafstours" 
               target="_blank" 
               rel="noopener noreferrer"
               class="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-emerald-600 transition-colors"
               aria-label="Follow us on Facebook">
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
            </a>
            <!-- Instagram -->
            <a href="https://www.instagram.com/zafstours" 
               target="_blank" 
               rel="noopener noreferrer"
               class="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-emerald-600 transition-colors"
               aria-label="Follow us on Instagram">
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
            </a>
            <!-- TripAdvisor -->
            <a href="https://www.tripadvisor.com/Attraction_Review-g293747-d23849967-Reviews-ZafsTours_Mount_Kilimanjaro-Arusha_Arusha_Region.html" 
               target="_blank" 
               rel="noopener noreferrer"
               class="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-emerald-600 transition-colors"
               aria-label="Check our reviews on TripAdvisor">
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm6 16.5c0 .828-.672 1.5-1.5 1.5h-9c-.828 0-1.5-.672-1.5-1.5v-9c0-.828.672-1.5 1.5-1.5h9c.828 0 1.5.672 1.5 1.5v9zm-3-6.75c0 .828-.672 1.5-1.5 1.5h-3c-.828 0-1.5-.672-1.5-1.5s.672-1.5 1.5-1.5h3c.828 0 1.5.672 1.5 1.5zm0-3c0 .828-.672 1.5-1.5 1.5h-3c-.828 0-1.5-.672-1.5-1.5s.672-1.5 1.5-1.5h3c.828 0 1.5.672 1.5 1.5z"/>
              </svg>
            </a>
            <!-- YouTube -->
            <a href="https://www.youtube.com/@zafstours" 
               target="_blank" 
               rel="noopener noreferrer"
               class="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-emerald-600 transition-colors"
               aria-label="Watch our videos on YouTube">
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
              </svg>
            </a>
          </div>
        </div>

        <!-- Destinations -->
        <div>
          <h3 class="text-xl font-bold mb-6">Destinations</h3>
          <ul class="space-y-3">
            <li><a href="/kilimanjaro-trekking" class="text-gray-400 hover:text-emerald-400 transition-colors">Kilimanjaro Trekking</a></li>
            <li><a href="/tanzania-safari" class="text-gray-400 hover:text-emerald-400 transition-colors">Tanzania Safari</a></li>
            <li><a href="/zanzibar-island" class="text-gray-400 hover:text-emerald-400 transition-colors">Zanzibar Island</a></li>
            <li><a href="/tanzanian-experiences" class="text-gray-400 hover:text-emerald-400 transition-colors">Tanzanian Experiences</a></li>
            <li><a href="/kilimanjaro-routes" class="text-gray-400 hover:text-emerald-400 transition-colors">Kilimanjaro Routes</a></li>
            <li><a href="/national-parks" class="text-gray-400 hover:text-emerald-400 transition-colors">National Parks</a></li>
            <li><a href="/wildlife-animals" class="text-gray-400 hover:text-emerald-400 transition-colors">Wildlife & Animals</a></li>
          </ul>
        </div>

        <!-- Popular Routes -->
        <div>
          <h3 class="text-xl font-bold mb-6">Popular Routes</h3>
          <ul class="space-y-3">
            <li><a href="/climbing-kilimanjaro/routes/lemosho" class="text-gray-400 hover:text-emerald-400 transition-colors">Lemosho Route</a></li>
            <li><a href="/climbing-kilimanjaro/routes/machame" class="text-gray-400 hover:text-emerald-400 transition-colors">Machame Route</a></li>
            <li><a href="/climbing-kilimanjaro/routes/marangu" class="text-gray-400 hover:text-emerald-400 transition-colors">Marangu Route</a></li>
            <li><a href="/climbing-kilimanjaro/routes/northern-circuit" class="text-gray-400 hover:text-emerald-400 transition-colors">Northern Circuit</a></li>
            <li><a href="/climbing-kilimanjaro/routes/rongai" class="text-gray-400 hover:text-emerald-400 transition-colors">Rongai Route</a></li>
            <li><a href="/climbing-kilimanjaro/routes/umbwe" class="text-gray-400 hover:text-emerald-400 transition-colors">Umbwe Route</a></li>
          </ul>
        </div>

        <!-- Company Links -->
        <div>
          <h3 class="text-xl font-bold mb-6">Company</h3>
          <ul class="space-y-3">
            <li><a href="/about" class="text-gray-400 hover:text-emerald-400 transition-colors">About Us</a></li>
            <li><a href="/contact" class="text-gray-400 hover:text-emerald-400 transition-colors">Contact Us</a></li>
            <li><a href="/reviews" class="text-gray-400 hover:text-emerald-400 transition-colors">Reviews & Testimonials</a></li>
            <li><a href="/gallery" class="text-gray-400 hover:text-emerald-400 transition-colors">Photo Gallery</a></li>
            <li><a href="/blog" class="text-gray-400 hover:text-emerald-400 transition-colors">Travel Blog</a></li>
            <li><a href="/faq" class="text-gray-400 hover:text-emerald-400 transition-colors">FAQ</a></li>
            <li><a href="/careers" class="text-gray-400 hover:text-emerald-400 transition-colors">Careers</a></li>
          </ul>
        </div>
      </div>
    </div>

    <!-- Contact Info Bar -->
    <div class="bg-gray-800 border-t border-gray-700">
      <div class="container mx-auto px-4 py-6">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <!-- Phone -->
          <div class="flex items-center space-x-3">
            <div class="w-10 h-10 bg-emerald-600 rounded-full flex items-center justify-center">
              <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
              </svg>
            </div>
            <div>
              <p class="text-sm text-gray-400">Call / WhatsApp</p>
              <a href="https://wa.me/+255620285462" 
                 target="_blank" 
                 rel="noopener noreferrer"
                 class="font-semibold hover:text-emerald-400 transition-colors">
                +255 620 285 462
              </a>
              <p class="text-sm text-gray-400 mt-1">24/7 Support</p>
            </div>
          </div>
          
          <!-- Email -->
          <div class="flex items-center space-x-3">
            <div class="w-10 h-10 bg-emerald-600 rounded-full flex items-center justify-center">
              <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
              </svg>
            </div>
            <div>
              <p class="text-sm text-gray-400">Email Us</p>
              <a href="mailto:info@zafstours.com" 
                 class="font-semibold hover:text-emerald-400 transition-colors">
                info@zafstours.com
              </a>
              <a href="mailto:bookings@zafstours.com" 
                 class="text-sm text-gray-400 hover:text-emerald-400 transition-colors block">
                bookings@zafstours.com
              </a>
            </div>
          </div>
          
          <!-- Location -->
          <div class="flex items-center space-x-3">
            <div class="w-10 h-10 bg-emerald-600 rounded-full flex items-center justify-center">
              <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
              </svg>
            </div>
            <div>
              <p class="text-sm text-gray-400">Our Location</p>
              <p class="font-semibold">Arusha, Tanzania</p>
              <p class="text-sm text-gray-400 mt-1">Kilimanjaro Region</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Bottom Bar -->
    <div class="bg-gray-950 border-t border-gray-800">
      <div class="container mx-auto px-4 py-6">
        <div class="flex flex-col md:flex-row justify-between items-center">
          <div class="mb-4 md:mb-0">
            <p class="text-gray-400 text-sm">
              &copy; {{ new Date().getFullYear() }} ZafsTours. All rights reserved.
            </p>
            <p class="text-gray-500 text-xs mt-1">
              Registered with Tanzania Tourist Board • Member of Tanzania Association of Tour Operators (TATO)
            </p>
          </div>
          <div class="flex flex-wrap gap-4 md:gap-6">
            <a href="/privacy-policy" 
               class="text-gray-400 hover:text-emerald-400 text-sm transition-colors">
              Privacy Policy
            </a>
            <a href="/terms-conditions" 
               class="text-gray-400 hover:text-emerald-400 text-sm transition-colors">
              Terms & Conditions
            </a>
            <a href="/refund-policy" 
               class="text-gray-400 hover:text-emerald-400 text-sm transition-colors">
              Refund Policy
            </a>
            <a href="/cookie-policy" 
               class="text-gray-400 hover:text-emerald-400 text-sm transition-colors">
              Cookie Policy
            </a>
            <a href="/sitemap" 
               class="text-gray-400 hover:text-emerald-400 text-sm transition-colors">
              Sitemap
            </a>
          </div>
        </div>
      </div>
    </div>

    <!-- WhatsApp Float Button -->
    <a href="https://wa.me/+255620285462" 
       target="_blank" 
       rel="noopener noreferrer"
       class="fixed bottom-6 right-6 w-14 h-14 bg-green-500 rounded-full flex items-center justify-center shadow-lg hover:bg-green-600 transition-colors z-50 animate-bounce"
       aria-label="Chat with us on WhatsApp"
       title="Chat with us on WhatsApp">
      <svg class="w-7 h-7 text-white" fill="currentColor" viewBox="0 0 24 24">
        <path d="M20.52 3.449C18.24 1.245 15.24 0 12.045 0 5.496 0 .32 5.032.057 11.338a11.95 11.95 0 001.618 5.943L.056 24l6.858-1.696a12.06 12.06 0 005.13 1.136c6.548 0 11.724-5.032 11.988-11.337 0-1.911-.48-3.785-1.392-5.454a11.996 11.996 0 00-3.26-4.2zm-8.475 18.156a10.014 10.014 0 01-5.086-1.393l-.364-.216-3.76.93.996-3.67-.235-.375a9.996 9.996 0 01-1.512-5.34c.228-5.505 4.778-9.84 10.354-9.84 2.76 0 5.358 1.08 7.305 3.036a10.156 10.156 0 013.048 7.207c-.252 5.505-4.802 9.84-10.346 9.84zm5.532-7.117c-.298-.15-1.767-.872-2.042-.97-.275-.098-.475-.15-.675.15-.2.298-.767.97-.94 1.17-.173.198-.347.223-.645.074-.298-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.76-1.653-2.058-.173-.297-.018-.458.13-.606.134-.133.298-.347.447-.52.15-.174.2-.298.3-.497.1-.198.05-.372-.025-.52-.075-.149-.675-1.627-.925-2.23-.24-.574-.49-.496-.675-.506-.173-.01-.372-.01-.572-.01-.2 0-.523.074-.795.372-.272.298-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.148.198 2.095 3.2 5.074 4.487.709.3 1.262.48 1.692.613.712.223 1.36.192 1.872.117.572-.086 1.767-.721 2.016-1.417.25-.695.25-1.29.175-1.417-.074-.124-.272-.198-.57-.347z"/>
      </svg>
    </a>
  </footer>
</template>

<script setup>
// This component doesn't need any props or reactive data
</script>

<style scoped>
/* Custom animations */
.animate-bounce {
  animation: bounce 2s infinite;
}

@keyframes bounce {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
}

/* Custom styles for better appearance */
footer {
  font-family: 'Inter', sans-serif;
}

/* Smooth hover transitions */
a {
  transition: all 0.2s ease-in-out;
}

/* WhatsApp button shadow */
.fixed {
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
}

/* Gradient border for visual separation */
.border-t {
  border-top-width: 1px;
}
</style>