<template>
  <div style="width:100%; padding:10px 36px; background:var(--green-primary,#0F2A1D); box-sizing:border-box;">
    <div style="max-width:1200px; margin:0 auto;">
      <div style="display:flex; align-items:center; justify-content:space-between; width:100%; flex-wrap:wrap; gap:15px;">

        <!-- LEFT: Badges -->
        <div style="display:flex; align-items:center; gap:13px; flex-wrap:wrap;">
          
          <!-- TripAdvisor -->
          <div
            style="width:199px; height:46px; position:relative; background:linear-gradient(137deg, rgba(255,255,255,0.14) 0%, rgba(255,255,255,0.10) 100%); overflow:hidden; border-radius:16px; outline:1px rgba(255,255,255,0.40) solid; outline-offset:-1px; flex-shrink:0;"
          >
            <div style="position:absolute; left:13px; top:4.23px; display:inline-flex; align-items:center; gap:4px;">
              <img
                src="/images/navtop/tripadvisor.png"
                alt="Tripadvisor"
                style="width:36.53px; height:36.53px; object-fit:contain; display:block;"
              />
              <div style="width:127px; display:inline-flex; flex-direction:column; justify-content:flex-start; align-items:flex-start;">
                <div style="display:inline-flex; align-items:center; gap:3px; height:19px;">
                  <div style="color:#F7F6F2; font-size:18px; font-weight:600;">5.0</div>
                  <div style="width:96px; display:flex; gap:4px; align-items:center;">
                    <img v-for="i in 5" :key="'ta-'+i" src="/images/navtop/star.svg" alt="star" style="height:14px; width:14px;" />
                  </div>
                </div>
                <div style="color:#F7F6F2; font-size:11px; font-weight:600; margin-top:2px; white-space:nowrap;">
                  Based On 600+ Review
                </div>
              </div>
            </div>
          </div>

          <!-- Google -->
          <div
            style="width:199px; height:46px; position:relative; background:linear-gradient(137deg, rgba(255,255,255,0.14) 0%, rgba(255,255,255,0.10) 100%); overflow:hidden; border-radius:16px; outline:1px rgba(255,255,255,0.40) solid; outline-offset:-1px; flex-shrink:0;"
          >
            <div style="position:absolute; left:13.39px; top:4.23px; display:inline-flex; align-items:center; gap:4px;">
              <img
                src="/images/navtop/google.png"
                alt="Google"
                style="width:35.75px; height:36.53px; object-fit:contain; display:block;"
              />
              <div style="width:127px; display:inline-flex; flex-direction:column; justify-content:flex-start; align-items:flex-start;">
                <div style="display:inline-flex; align-items:center; gap:3px; height:19px;">
                  <div style="color:#F7F6F2; font-size:18px; font-weight:600;">4.9</div>
                  <div style="width:96px; display:flex; gap:4px; align-items:center;">
                    <img v-for="i in 5" :key="'g-'+i" src="/images/navtop/star.svg" alt="star" style="height:14px; width:14px;" />
                  </div>
                </div>
                <div style="color:#F7F6F2; font-size:11px; font-weight:600; margin-top:2px; white-space:nowrap;">
                  Based On 200+ Review
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- RIGHT: Links & Currency -->
        <div style="display:flex; align-items:center; gap:18px; flex-wrap:wrap;">
          <div style="display:flex; gap:29px; align-items:center; flex-wrap:wrap;">
            <NuxtLink to="/blogs" style="color:#F7F6F2; font-size:16px; text-decoration:none; white-space:nowrap;">Blogs</NuxtLink>
            <NuxtLink to="/gallery" style="color:#F7F6F2; font-size:16px; text-decoration:none; white-space:nowrap;">Gallery</NuxtLink>
            <NuxtLink to="/contact-us" style="color:#F7F6F2; font-size:16px; text-decoration:none; white-space:nowrap;">Contact Us</NuxtLink>
          </div>

          <div style="width:1px; height:30px; background:rgba(255,255,255,0.4);"></div>

          <div style="display:flex; align-items:center; gap:6px; cursor:pointer;">
            <div style="color:#F7F6F2; font-size:16px;">USD</div>
            <svg width="10" height="6" viewBox="0 0 10 6" aria-hidden="true" style="display:block;">
              <path d="M0 0 L5 6 L10 0 Z" fill="white" opacity="0.95"></path>
            </svg>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<style scoped>
/* Only responsive adjustments - desktop stays exactly as designed */
@media (max-width: 900px) {
  /* Tablet: Slightly smaller gaps and text */
  div[style*="max-width:1200px"] > div {
    gap: 20px 15px !important;
  }
  
  div[style*="display:flex; gap:29px"] {
    gap: 20px !important;
  }
  
  /* Badges scale down slightly */
  div[style*="width:199px"] {
    transform: scale(0.9);
    transform-origin: left center;
  }
}

@media (max-width: 768px) {
  /* Mobile: Stack vertically */
  div[style*="max-width:1200px"] > div {
    flex-direction: column !important;
    align-items: center !important;
    gap: 20px !important;
  }
  
  /* Center badges on mobile */
  div[style*="display:flex; align-items:center; gap:13px"] {
    justify-content: center !important;
    width: 100% !important;
  }
  
  /* Scale badges down a bit more */
  div[style*="width:199px"] {
    transform: scale(0.85);
  }
  
  /* Links row centered */
  div[style*="display:flex; gap:29px"] {
    justify-content: center !important;
    width: 100% !important;
  }
}

@media (max-width: 480px) {
  /* Small mobile: Single column badges */
  div[style*="display:flex; align-items:center; gap:13px"] {
    flex-direction: column !important;
    gap: 10px !important;
  }
  
  div[style*="width:199px"] {
    transform: scale(0.9);
    margin: 0 auto;
  }
  
  /* Links stack */
  div[style*="display:flex; gap:29px"] {
    flex-direction: column !important;
    gap: 15px !important;
    text-align: center;
  }
  
  /* Hide divider on mobile */
  div[style*="width:1px; height:30px"] {
    display: none !important;
  }
}
</style>