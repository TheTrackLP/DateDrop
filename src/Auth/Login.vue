<style>
:root {
  --brand: #1f5c4d;
  --brand-dark: #174739;
  --page-bg: #eef2f0;
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
  background: var(--brand);
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
          <span class="brand-mark mb-3"><i class="bi bi-shield-lock"></i></span>
          <h1 class="h4 fw-bold mb-1">Sign in to your account</h1>
          <p class="text-muted mb-0">
            Enter your email and password to continue.
          </p>
        </div>

        <!-- Error message (show/hide from backend) -->
        <div id="loginError" class="alert alert-danger d-none" role="alert">
          These credentials do not match our records.
        </div>

        <!-- Login form -->
        <form id="loginForm" action="/login" method="POST" novalidate>
          <!-- CSRF token goes here -->

          <div class="mb-3">
            <label for="email" class="form-label">Email address</label>
            <div class="input-group has-validation">
              <span class="input-group-text"
                ><i class="bi bi-envelope"></i
              ></span>
              <input
                type="email"
                class="form-control"
                id="email"
                name="email"
                placeholder="name@example.com"
                autocomplete="username"
                required
                autofocus
              />
              <div class="invalid-feedback">Enter a valid email address.</div>
            </div>
          </div>

          <div class="mb-3">
            <div class="d-flex justify-content-between">
              <label for="password" class="form-label">Password</label>
              <a href="/forgot-password" class="link-brand small"
                >Forgot password?</a
              >
            </div>
            <div class="input-group has-validation">
              <span class="input-group-text"><i class="bi bi-lock"></i></span>
              <input
                type="password"
                class="form-control"
                id="password"
                name="password"
                placeholder="Enter your password"
                autocomplete="current-password"
                required
                minlength="8"
              />
              <button
                class="btn btn-outline-secondary"
                type="button"
                id="togglePassword"
                aria-label="Show password"
              >
                <i class="bi bi-eye" id="togglePasswordIcon"></i>
              </button>
              <div class="invalid-feedback">
                Password must be at least 8 characters.
              </div>
            </div>
          </div>

          <div class="form-check mb-4">
            <input
              class="form-check-input"
              type="checkbox"
              id="remember"
              name="remember"
            />
            <label class="form-check-label" for="remember"
              >Keep me signed in</label
            >
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
