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
        </div>
        <button type="submit" class="btn btn-gold rounded-pill w-100 py-2">Submit Request</button>
    </form>
</div>


<div class="sidebar-widget dr-widget-card">
    <img src="images/dr-pooja.webp" alt="Dr. Pooja Varshney" class="dr-widget-img">
    <h3 class="dr-widget-name">Dr. Pooja Varshney</h3>
    <div class="dr-widget-title">MD (Dermatology), MBBS</div>
    <p class="small text-muted mb-4">Fellowship in Cosmetology with 10+ years of clinical expertise in dermatology and advanced cosmetic treatments.</p>
    <a href="dr-pooja-varshney" class="btn btn-outline-gold btn-sm rounded-pill w-100">Know More</a>
</div>