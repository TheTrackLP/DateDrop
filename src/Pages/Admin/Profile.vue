<template>
  <div class="mb-4">
    <h1 class="h3 mb-1">My Profile</h1>
    <p class="text-muted mb-0">Manage your account and couple details.</p>
  </div>

  <div class="row g-3">
    <!-- ============ LEFT: PROFILE CARD ============ -->
    <div class="col-lg-4">
      <div class="card shadow-sm text-center">
        <div class="card-body p-4">
          <div
            class="avatar rounded-circle text-white d-inline-flex align-items-center justify-content-center fw-bold mb-3"
          >
            AS
          </div>
          <h2 class="h5 mb-0">Alex &amp; Sam</h2>
          <p class="text-muted small mb-1">alex@example.com</p>
          <p class="small mb-3">📍 Roxas City, Capiz</p>
          <label for="photoInput" class="btn btn-sm btn-outline-rose"
            >📷 Change photo</label
          >
          <input type="file" id="photoInput" class="d-none" accept="image/*" />
          <hr />
          <p class="small text-muted mb-0">
            💕 Together since <strong class="text-body">Aug 30, 2023</strong>
          </p>
        </div>
        <div class="card-footer bg-white">
          <div class="row text-center g-0">
            <div class="col-4">
              <div class="h5 mb-0">25</div>
              <div class="small text-muted">Places</div>
            </div>
            <div class="col-4 border-start border-end">
              <div class="h5 mb-0">11</div>
              <div class="small text-muted">Visited</div>
            </div>
            <div class="col-4">
              <div class="h5 mb-0">6</div>
              <div class="small text-muted">Memories</div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- ============ RIGHT: FORMS ============ -->
    <div class="col-lg-8">
      <!-- Couple profile -->
      <form class="card shadow-sm mb-3">
        <div class="card-header bg-white fw-semibold">👫 Couple profile</div>
        <div class="card-body">
          <div class="row g-3">
            <div class="col-sm-6">
              <label for="pName" class="form-label">Your name</label
              ><input
                type="text"
                id="pName"
                class="form-control"
                value="Alex"
                autocomplete="name"
                required
              />
            </div>
            <div class="col-sm-6">
              <label for="pPartner" class="form-label">Partner's name</label
              ><input
                type="text"
                id="pPartner"
                class="form-control"
                value="Sam"
              />
            </div>
            <div class="col-12">
              <label for="pEmail" class="form-label">Email</label
              ><input
                type="email"
                id="pEmail"
                class="form-control"
                value="alex@example.com"
                readonly
                aria-describedby="emailHelp"
              />
              <div id="emailHelp" class="form-text">
                This is your login email and can't be changed here.
              </div>
            </div>
            <div class="col-sm-6">
              <label for="pAnniv" class="form-label">Anniversary</label
              ><input
                type="date"
                id="pAnniv"
                class="form-control"
                value="2023-08-30"
              />
            </div>
            <div class="col-sm-6">
              <label for="pCity" class="form-label">City</label
              ><input
                type="text"
                id="pCity"
                class="form-control"
                value="Roxas City, Capiz"
              />
            </div>
            <div class="col-12">
              <label for="pBio" class="form-label">About us</label
              ><textarea
                id="pBio"
                class="form-control"
                rows="3"
                maxlength="200"
                placeholder="A line or two about you two"
              >
Two people who will travel for good seafood.</textarea
              >
              <div class="form-text">Up to 200 characters.</div>
            </div>
          </div>
        </div>
        <div
          class="card-footer bg-white d-grid d-sm-flex justify-content-sm-end gap-2"
        >
          <button type="reset" class="btn btn-light">Cancel</button>
          <button type="submit" class="btn btn-rose">Save changes</button>
        </div>
      </form>

      <!-- Change password -->
      <form class="card shadow-sm mb-3">
        <div class="card-header bg-white fw-semibold">🔒 Change password</div>
        <div class="card-body">
          <div class="row g-3">
            <div class="col-12">
              <label for="pwCurrent" class="form-label">Current password</label
              ><input
                type="password"
                id="pwCurrent"
                class="form-control"
                autocomplete="current-password"
                required
              />
            </div>
            <div class="col-sm-6">
              <label for="pwNew" class="form-label">New password</label
              ><input
                type="password"
                id="pwNew"
                class="form-control"
                minlength="8"
                autocomplete="new-password"
                required
              />
              <div class="form-text">At least 8 characters.</div>
            </div>
            <div class="col-sm-6">
              <label for="pwConfirm" class="form-label"
                >Confirm new password</label
              ><input
                type="password"
                id="pwConfirm"
                class="form-control"
                minlength="8"
                autocomplete="new-password"
                required
              />
            </div>
          </div>
        </div>
        <div
          class="card-footer bg-white d-grid d-sm-flex justify-content-sm-end"
        >
          <button type="submit" class="btn btn-rose">Update password</button>
        </div>
      </form>
    </div>
  </div>
</template>
