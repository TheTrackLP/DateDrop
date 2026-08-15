<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Example places — swap this with your Supabase fetch later
const places = ref([
  { id: 1, name: "Bohol Bee Farm Resort", lat: 9.5825, lng: 123.8517 },
  { id: 2, name: "Loboc River Grill", lat: 9.6337, lng: 124.0333 },
  { id: 3, name: "Buzz Cafe, Tagbilaran", lat: 9.6474, lng: 123.8547 },
]);

let map = null;

onMounted(() => {
  // Step 3: initialize the map, centered on Tagbilaran
  map = L.map("map").setView([11.586276705834775, 122.75390511153525], 11);

  // Step 4: add the OSM tile layer
  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: "&copy; OpenStreetMap contributors",
  }).addTo(map);

  // Step 5: loop through places and drop a marker for each
  places.value.forEach((place) => {
    L.marker([place.lat, place.lng])
      .addTo(map)
      .bindPopup(`<b>${place.name}</b>`);
  });
});

onUnmounted(() => {
  // Step 6: clean up so the map doesn't leak memory on page navigation
  if (map) {
    map.remove();
    map = null;
  }
});
</script>

<template>
  <main class="main">
    <section class="list-pane">
      <div class="chip-row">
        <span class="chip active">All (12)</span>
        <span class="chip">🏝️ Resorts</span>
        <span class="chip">🍽️ Restaurants</span>
        <span class="chip">🍔 Fast Food</span>
        <span class="chip">🏊 Pools</span>
        <span class="chip">☕ Cafes</span>
      </div>

      <div class="list-scroll">
        <div class="section-title">
          Our spots <small>Sorted by recent</small>
        </div>

        <div class="place-card selected">
          <div
            class="thumb"
            style="
              background-image: url(&quot;https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=200&h=200&fit=crop&quot;);
            "
          ></div>
          <div class="flex-grow-1">
            <div class="place-name">Bohol Bee Farm Resort</div>
            <div class="place-meta">
              <span class="tag">Resort</span>
              <span class="badge-visited">Visited</span>
            </div>
            <div class="stars">★★★★☆</div>
          </div>
        </div>

        <div class="place-card">
          <div
            class="thumb"
            style="
              background-image: url(&quot;https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=200&h=200&fit=crop&quot;);
            "
          ></div>
          <div class="flex-grow-1">
            <div class="place-name">Buzz Cafe, Tagbilaran</div>
            <div class="place-meta">
              <span class="tag">Cafe</span>
              <span class="badge-want">Want to go</span>
            </div>
            <div class="stars">☆☆☆☆☆</div>
          </div>
        </div>

        <div class="place-card">
          <div
            class="thumb"
            style="
              background-image: url(&quot;https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=200&h=200&fit=crop&quot;);
            "
          ></div>
          <div class="flex-grow-1">
            <div class="place-name">Loboc River Grill</div>
            <div class="place-meta">
              <span class="tag">Restaurant</span>
              <span class="badge-visited">Visited</span>
            </div>
            <div class="stars">★★★★★</div>
          </div>
        </div>

        <div class="place-card">
          <div
            class="thumb"
            style="
              background-image: url(&quot;https://images.unsplash.com/photo-1601918774946-25832a4be0d6?w=200&h=200&fit=crop&quot;);
            "
          ></div>
          <div class="flex-grow-1">
            <div class="place-name">Mocha Jack's Poolside</div>
            <div class="place-meta">
              <span class="tag">Pool</span>
              <span class="badge-want">Want to go</span>
            </div>
            <div class="stars">☆☆☆☆☆</div>
          </div>
        </div>

        <div class="place-card">
          <div
            class="thumb"
            style="
              background-image: url(&quot;https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?w=200&h=200&fit=crop&quot;);
            "
          ></div>
          <div class="flex-grow-1">
            <div class="place-name">Jollibee, Island City Mall</div>
            <div class="place-meta">
              <span class="tag">Fast Food</span>
              <span class="badge-visited">Visited</span>
            </div>
            <div class="stars">★★★☆☆</div>
          </div>
        </div>
      </div>
    </section>

    <!-- Map pane -->
    <section class="map-pane">
      <div
        id="map"
        style="height: 700px; width: 100%; border-radius: 16px"
      ></div>

      <div class="map-popup">
        <img
          src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400&h=200&fit=crop"
          alt=""
        />
        <div class="body">
          <div class="place-name">Bohol Bee Farm Resort</div>
          <div class="place-meta mb-1">
            <span class="tag">Resort</span>
            <span class="badge-visited">Visited</span>
          </div>
          <div class="stars">★★★★☆ (4.0)</div>
        </div>
      </div>

      <button class="fab">+</button>
    </section>
  </main>
</template>
