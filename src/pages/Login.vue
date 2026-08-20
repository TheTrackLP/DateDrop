<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { supabase } from "@/lib/supabase";

const email = ref("");
const password = ref("");
const errorMsg = ref("");
const loading = ref(false);
const router = useRouter();

async function handleLogin() {
  errorMsg.value = "";
  loading.value = true;

  const { error } = await supabase.auth.signInWithPassword({
    email: email.value,
    password: password.value,
  });

  loading.value = false;

  if (error) {
    errorMsg.value = error.message;
    return;
  }

  router.push({ name: "Home" });
}
</script>
<style scoped>
.login-wrapper {
  background: #f4f5f7;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
}
body {
  background: #f4f5f7;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
}
.btn-coral {
  background: #e8536b;
  border-color: #e8536b;
  color: #fff;
}
.btn-coral:hover {
  background: #d43f57;
  border-color: #d43f57;
  color: #fff;
}
.brand-icon {
  color: #e8536b;
}
a.link-coral {
  color: #e8536b;
  text-decoration: none;
}
a.link-coral:hover {
  text-decoration: underline;
}
</style>
<template>
  <div class="login-wrapper">
    <div class="card border-0 shadow-sm" style="width: 100%; max-width: 380px">
      <div class="card-body p-4 p-md-5">
        <div class="text-center mb-4">
          <div class="fs-3 brand-icon mb-1">
            <i class="bi bi-geo-alt-fill"></i>
          </div>
          <h4 class="fw-bold mb-1">DateDrop</h4>
          <p class="text-muted small mb-0">Log in to see your saved spots</p>
        </div>

        <form @submit.prevent="handleLogin">
          <div class="mb-3">
            <label class="form-label small fw-semibold">Email</label>
            <input v-model="email" type="email" class="form-control" required />
          </div>

          <div class="mb-3">
            <label class="form-label small fw-semibold">Password</label>
            <input
              v-model="password"
              type="password"
              class="form-control"
              required
            />
          </div>

          <div class="d-flex justify-content-between align-items-center mb-4">
            <div class="form-check">
              <input class="form-check-input" type="checkbox" id="rememberMe" />
              <label class="form-check-label small text-muted" for="rememberMe"
                >Remember me</label
              >
            </div>
          </div>

          <button type="submit" class="btn btn-coral w-100 py-2 fw-semibold">
            {{ loading ? "Logging in..." : "Login" }}
          </button>
        </form>
      </div>
    </div>
  </div>
</template>
