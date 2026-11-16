<script setup>
import { supabase } from "@/Lib/supabase";
import { ref } from "vue";
import { useRouter } from "vue-router";

const email = ref("");
const password = ref("");
const router = useRouter();

const handleLogin = async () => {
  const { error } = await supabase.auth.signInWithPassword({
    email: email.value,
    password: password.value,
  });

  router.push({ name: "AdminDashboard" });
};
</script>

<style>
:root {
  --brand-dark: #174739;
  --brand: #e0577a;
  --page-bg: linear-gradient(180deg, #f67280, #c06c84);
}

body {
  background: var(--page-bg);
  min-height: 100vh;
}

.login-wrapper {
  min-height: 100vh;
}

.login-card {
  max-width: 420px;
  width: 100%;
  border: 0;
  border-radius: 1rem;
  box-shadow: 0 10px 30px rgba(31, 92, 77, 0.12);
}

.brand-mark {
  width: 52px;
  height: 52px;
  border-radius: 14px;
  color: #fff;
  font-size: 1.5rem;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

.btn-brand {
  background: var(--brand);
  border-color: var(--brand);
  color: #fff;
}

.btn-brand:hover,
.btn-brand:focus {
  background: var(--brand-dark);
  border-color: var(--brand-dark);
  color: #fff;
}

.form-control:focus,
.form-check-input:focus {
  border-color: var(--brand);
  box-shadow: 0 0 0 0.2rem rgba(31, 92, 77, 0.2);
}

.form-check-input:checked {
  background-color: var(--brand);
  border-color: var(--brand);
}

a.link-brand {
  color: var(--brand);
  text-decoration: none;
}

a.link-brand:hover {
  text-decoration: underline;
}
</style>

<template>
  <main
    class="login-wrapper d-flex align-items-center justify-content-center p-3"
  >
    <div class="card login-card">
      <div class="card-body p-4 p-md-5">
        <!-- Header -->
        <div class="text-center mb-4">
          <span class="brand-mark mb-3"><img src="/favicon.ico" alt="" /></span>
          <h1 class="h4 fw-bold mb-1">Sign in to your account</h1>
          <p class="text-muted mb-0">
            Enter your email and password to continue.
          </p>
        </div>
        <form @submit.prevent="handleLogin">
          <div class="mb-3">
            <label for="email" class="form-label">Email address</label>
            <div class="input-group has-validation">
              <span class="input-group-text"
                ><i class="fa-solid fa-user"></i
              ></span>
              <input
                type="email"
                class="form-control"
                v-model="email"
                placeholder="name@example.com"
                autocomplete="username"
                required
              />
            </div>
          </div>

          <div class="mb-3">
            <div class="d-flex justify-content-between">
              <label for="password" class="form-label">Password</label>
            </div>
            <div class="input-group has-validation">
              <span class="input-group-text"
                ><i class="fa-solid fa-lock"></i
              ></span>
              <input
                type="password"
                class="form-control"
                v-model="password"
                placeholder="Enter your password"
                autocomplete="current-password"
                required
              />
            </div>
          </div>
          <button type="submit" class="btn btn-brand w-100 py-2">
            Sign in
          </button>
        </form>

        <p class="text-center text-muted small mt-4 mb-0">
          Need an account? Contact your administrator.
        </p>
      </div>
    </div>
  </main>
</template>
