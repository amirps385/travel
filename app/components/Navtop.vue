<template>
  <div style="width:100%; padding:10px 36px; background:var(--green-primary,#0F2A1D); box-sizing:border-box;">
    <div style="max-width:1200px; margin:0 auto;">
      <div style="display:inline-flex; align-items:center; justify-content:space-between; width:100%;">

        <!-- LEFT: TripAdvisor (first, hard-coded) then Google (second, hard-coded) -->
        <div style="display:flex; align-items:center; gap:13px;">
          <!-- TRIPADVISOR - EXPLICIT FIRST -->
          <div
            class="badge"
            style="width:199px; height:46px; position:relative; background:linear-gradient(137deg, rgba(255,255,255,0.14) 0%, rgba(255,255,255,0.10) 100%); overflow:hidden; border-radius:16px; outline:1px rgba(255,255,255,0.40) solid; outline-offset:-1px;"
          >
            <div style="position:absolute; left:13px; top:4.23px; display:inline-flex; align-items:center; gap:4px;">
              <img
                data-badge="tripadvisor"
                src="/images/navtop/tripadvisor.png"
                alt="Tripadvisor"
                style="width:36.53px; height:36.53px; object-fit:contain; display:block;"
                @error="imgError($event,'tripadvisor')"
              />

              <div style="width:127px; display:inline-flex; flex-direction:column; justify-content:flex-start; align-items:flex-start;">
                <div style="display:inline-flex; align-items:center; gap:3px; height:19px;">
                  <div style="color:var(--Base-ligh,#F7F6F2); font-size:18px; font-weight:600;">5.0</div>
                  <div style="width:96px; display:flex; gap:4px; align-items:center;">
                    <img v-for="i in 5" :key="'ta-'+i" src="/images/navtop/star.svg" alt="star" style="height:14px; width:14px;" />
                  </div>
                </div>
                <div style="color:var(--Base-ligh,#F7F6F2); font-size:11px; font-weight:600; margin-top:2px;">
                  Based On 600+ Review
                </div>
              </div>
            </div>
          </div>

          <!-- GOOGLE - EXPLICIT SECOND -->
          <div
            class="badge"
            style="width:199px; height:46px; position:relative; background:linear-gradient(137deg, rgba(255,255,255,0.14) 0%, rgba(255,255,255,0.10) 100%); overflow:hidden; border-radius:16px; outline:1px rgba(255,255,255,0.40) solid; outline-offset:-1px;"
          >
            <div style="position:absolute; left:13.39px; top:4.23px; display:inline-flex; align-items:center; gap:4px;">
              <img
                data-badge="google"
                src="/images/navtop/google.png"
                alt="Google"
                style="width:35.75px; height:36.53px; object-fit:contain; display:block;"
                @error="imgError($event,'google')"
              />

              <div style="width:127px; display:inline-flex; flex-direction:column; justify-content:flex-start; align-items:flex-start;">
                <div style="display:inline-flex; align-items:center; gap:3px; height:19px;">
                  <div style="color:var(--Base-ligh,#F7F6F2); font-size:18px; font-weight:600;">4.9</div>
                  <div style="width:96px; display:flex; gap:4px; align-items:center;">
                    <img v-for="i in 5" :key="'g-'+i" src="/images/navtop/star.svg" alt="star" style="height:14px; width:14px;" />
                  </div>
                </div>
                <div style="color:var(--Base-ligh,#F7F6F2); font-size:11px; font-weight:600; margin-top:2px;">
                  Based On 200+ Review
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- RIGHT: links & currency (caret is a small down-triangle SVG) -->
        <div style="display:flex; align-items:center; gap:18px;">
          <div style="display:flex; gap:29px; align-items:center;">
            <NuxtLink to="/blogs" style="color:#F7F6F2; font-size:16px; text-decoration:none;">Blogs</NuxtLink>
            <NuxtLink to="/gallery" style="color:#F7F6F2; font-size:16px; text-decoration:none;">Gallery</NuxtLink>
            <NuxtLink to="/contact-us" style="color:#F7F6F2; font-size:16px; text-decoration:none;">Contact Us</NuxtLink>
          </div>

          <div style="width:30.56px; height:0; transform:rotate(90deg); outline:1px solid rgba(255,255,255,1); "></div>

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

<script setup>
import { onMounted } from 'vue';

function imgError(e, name) {
  e.target.style.outline = '2px solid rgba(255,0,0,0.8)';
  // replace with visually-distinct placeholder so you see immediately
  e.target.src = '/images/navtop/placeholder-36.png'; // optional - create placeholder file or remove this line
  console.warn(`Image failed to load: ${name} — expected at public/images/navtop/${name}.png`);
}

onMounted(() => {
  // sanity-check: log the loaded src order in console so you can confirm
  const badges = Array.from(document.querySelectorAll('img[data-badge]')).map(el => ({
    badge: el.getAttribute('data-badge'),
    src: el.src
  }));
  console.log('NavTop: badge load order →', badges);
});
</script>
