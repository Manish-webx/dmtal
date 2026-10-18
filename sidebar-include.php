<div class="sidebar-widget">
    <h3 class="widget-title">Book Consultation</h3>
    <form action="mail1.php" method="post" class="condensed-form">
        <div class="mb-3">
            <label class="form-label">Full Name *</label>
            <input type="text" name="name" class="form-control" id="formName" placeholder="Your name" required>
        </div>
        <?php
        $actual_link = "https://" . $_SERVER['HTTP_HOST'] . $_SERVER['REQUEST_URI'];
        ?>
        <input type="text" name="url" value="<?php echo $actual_link; ?>" hidden>
        <div class="mb-3">
            <label class="form-label">Phone Number *</label>
            <input type="tel" name="phone" class="form-control" id="formPhone" placeholder="+91 XXXXX XXXXX" required>
        </div>
        <div class="mb-3">
            <label class="form-label">Location</label>
            <select name="location" class="form-select" id="formLocation">
                <option selected disabled>Select Clinic</option>
                <option value="Gurgaon">Gurgaon — Sec 31</option>
                <option value="Delhi">Delhi — Patel Nagar</option>
            </select>
        </div>
        <div class="mb-3">
            <label class="form-label">Your Concern</label>
            <textarea class="form-control" name="message" id="formMessage" rows="2"
                placeholder="Briefly describe..."></textarea>
            <div class="url-warning-msg" style="display: none;"></div>
        </div>
        <div class="mb-3">
            <div class="form-check text-start">
                <input class="form-check-input" type="checkbox" id="dpdpConsentSidebar" name="dpdp_consent" required checked>
                <label class="form-check-label small text-muted" for="dpdpConsentSidebar" style="font-size: 0.775rem; line-height: 1.4;">
                    I consent to the processing of my details to coordinate my consultation under the <a href="privacy-policy" target="_blank" class="text-gold text-decoration-underline">Privacy Policy</a> &amp; DPDP Act, 2023.
                </label>
            </div>
        </div>
        <button type="submit" class="btn btn-gold rounded-pill w-100 py-2">Submit Request</button>
        <p class="small text-muted text-center mt-2 mb-0" style="font-size: 0.75rem;">
            <i class="bi bi-shield-lock-fill text-gold me-1"></i> Data processed confidentially under DPDP Act.
        </p>
    </form>
</div>


<div class="sidebar-widget dr-widget-card">
    <img src="images/dr-pooja.webp" alt="Dr. Pooja Varshney" class="dr-widget-img">
    <h3 class="dr-widget-name">Dr. Pooja Varshney</h3>
    <div class="dr-widget-title">MD (Dermatology), MBBS</div>
    <p class="small text-muted mb-4">Fellowship in Cosmetology with 10+ years of clinical expertise in dermatology and advanced cosmetic treatments.</p>
    <a href="dr-pooja-varshney" class="btn btn-outline-gold btn-sm rounded-pill w-100">Know More</a>
</div>