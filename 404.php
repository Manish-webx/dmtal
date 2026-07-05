<?php http_response_code(404); ?>
<!DOCTYPE html>
<html lang="en">

<head>
  <base href="/">
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="description"
    content="The page you are looking for could not be found. Explore DermaTales for world-class dermatology and aesthetic treatments in Gurgaon.">
  <meta name="robots" content="noindex, follow">
  <title>404 Page Not Found — DermaTales</title>

  <?php include 'nav-link.php'; ?>
  <style>
    :root {
      --dt-gold-gradient: linear-gradient(135deg, #d4af37 0%, #aa7c11 100%);
      --dt-champagne-glow: radial-gradient(circle, rgba(212, 175, 55, 0.12) 0%, rgba(255, 255, 255, 0) 70%);
    }

    .error-section {
      min-height: 85vh;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 100px 0 80px;
      position: relative;
      overflow: hidden;
      background-color: var(--dt-cream, #fcfbf9);
    }

    /* Decorative Background Elements */
    .error-bg-glow-1 {
      position: absolute;
      top: 10%;
      left: 15%;
      width: 500px;
      height: 500px;
      background: var(--dt-champagne-glow);
      border-radius: 50%;
      filter: blur(60px);
      z-index: 1;
      pointer-events: none;
      animation: floatGlow 8s ease-in-out infinite alternate;
    }

    .error-bg-glow-2 {
      position: absolute;
      bottom: 10%;
      right: 15%;
      width: 600px;
      height: 600px;
      background: radial-gradient(circle, rgba(183, 110, 121, 0.08) 0%, rgba(255, 255, 255, 0) 70%);
      border-radius: 50%;
      filter: blur(60px);
      z-index: 1;
      pointer-events: none;
      animation: floatGlow 10s ease-in-out infinite alternate-reverse;
    }

    @keyframes floatGlow {
      0% { transform: translate(0, 0) scale(1); }
      100% { transform: translate(30px, -30px) scale(1.1); }
    }

    .error-container {
      position: relative;
      z-index: 2;
      max-width: 850px;
      margin: 0 auto;
      text-align: center;
    }

    /* Animated 404 Number */
    .error-number {
      font-family: var(--dt-font-display, 'Playfair Display', serif);
      font-size: clamp(6rem, 18vw, 13rem);
      font-weight: 700;
      line-height: 0.9;
      margin-bottom: 20px;
      background: linear-gradient(135deg, #1a1a1a 0%, #4a4a4a 40%, #d4af37 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      display: inline-block;
      letter-spacing: -2px;
      filter: drop-shadow(0 15px 25px rgba(0, 0, 0, 0.08));
      animation: floatNumber 5s ease-in-out infinite;
    }

    @keyframes floatNumber {
      0%, 100% { transform: translateY(0); }
      50% { transform: translateY(-12px); }
    }

    .error-badge {
      display: inline-block;
      padding: 6px 18px;
      background: rgba(212, 175, 55, 0.12);
      color: #aa7c11;
      font-size: 13px;
      font-weight: 600;
      letter-spacing: 1.5px;
      text-transform: uppercase;
      border-radius: 50px;
      margin-bottom: 25px;
      border: 1px solid rgba(212, 175, 55, 0.3);
    }

    .error-title {
      font-family: var(--dt-font-display, 'Playfair Display', serif);
      font-size: clamp(1.8rem, 4vw, 2.75rem);
      color: var(--dt-charcoal, #222);
      font-weight: 600;
      margin-bottom: 18px;
    }

    .error-description {
      font-size: clamp(1rem, 2vw, 1.15rem);
      color: var(--dt-text-light, #666);
      max-width: 600px;
      margin: 0 auto 40px;
      line-height: 1.8;
    }

    /* Quick Action Navigation Grid */
    .quick-nav-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
      gap: 20px;
      margin-top: 40px;
      margin-bottom: 45px;
      text-align: left;
    }

    .quick-nav-card {
      background: rgba(255, 255, 255, 0.85);
      backdrop-filter: blur(10px);
      border: 1px solid rgba(0, 0, 0, 0.06);
      padding: 24px;
      border-radius: 16px;
      transition: all 0.4s cubic-bezier(0.165, 0.84, 0.44, 1);
      text-decoration: none;
      display: flex;
      align-items: flex-start;
      gap: 16px;
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.03);
    }

    .quick-nav-card:hover {
      transform: translateY(-5px);
      background: #ffffff;
      border-color: rgba(212, 175, 55, 0.4);
      box-shadow: 0 15px 35px rgba(212, 175, 55, 0.12);
    }

    .quick-nav-icon {
      width: 46px;
      height: 46px;
      border-radius: 12px;
      background: linear-gradient(135deg, #fdfbf7 0%, #f4eee1 100%);
      color: #d4af37;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 20px;
      flex-shrink: 0;
      transition: all 0.3s ease;
    }

    .quick-nav-card:hover .quick-nav-icon {
      background: var(--dt-gold-gradient);
      color: #ffffff;
      transform: scale(1.08);
    }

    .quick-nav-content h4 {
      font-size: 16px;
      font-weight: 600;
      color: var(--dt-charcoal, #222);
      margin-bottom: 4px;
      transition: color 0.3s ease;
    }

    .quick-nav-card:hover .quick-nav-content h4 {
      color: #aa7c11;
    }

    .quick-nav-content p {
      font-size: 13px;
      color: var(--dt-text-light, #777);
      margin: 0;
      line-height: 1.5;
    }

    /* Buttons */
    .error-actions {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      gap: 16px;
    }

    .btn-lux-primary {
      background: linear-gradient(135deg, #222 0%, #3a3a3a 100%);
      color: #fff;
      padding: 14px 36px;
      border-radius: 50px;
      font-weight: 500;
      text-decoration: none;
      transition: all 0.3s ease;
      box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
      border: none;
      display: inline-flex;
      align-items: center;
      gap: 8px;
    }

    .btn-lux-primary:hover {
      background: linear-gradient(135deg, #d4af37 0%, #aa7c11 100%);
      color: #fff;
      transform: translateY(-2px);
      box-shadow: 0 12px 25px rgba(212, 175, 55, 0.3);
    }

    .btn-lux-secondary {
      background: transparent;
      color: #222;
      padding: 14px 36px;
      border-radius: 50px;
      font-weight: 500;
      text-decoration: none;
      transition: all 0.3s ease;
      border: 1.5px solid #d4af37;
      display: inline-flex;
      align-items: center;
      gap: 8px;
    }

    .btn-lux-secondary:hover {
      background: rgba(212, 175, 55, 0.08);
      color: #aa7c11;
      transform: translateY(-2px);
    }
  </style>
</head>

<body>
  <?php include 'header.php'; ?>
  <?php include 'mobile-menu.php'; ?>

  <!-- ===================== 404 SECTION ===================== -->
  <main class="error-section">
    <div class="error-bg-glow-1"></div>
    <div class="error-bg-glow-2"></div>

    <div class="container-xl">
      <div class="error-container">
        
        <div class="error-badge">
          <i class="bi bi-compass me-1"></i> Page Not Found
        </div>

        <div class="error-number">404</div>

        <h1 class="error-title">We Couldn't Find That Page</h1>
        <p class="error-description">
          The page or treatment you are looking for might have been moved, renamed, or no longer exists. But don't worry — beginning your journey to flawless, healthy skin is just a click away.
        </p>

        <!-- Quick Navigation Cards -->
        <div class="quick-nav-grid">
          
          <a href="index" class="quick-nav-card">
            <div class="quick-nav-icon"><i class="bi bi-house-door"></i></div>
            <div class="quick-nav-content">
              <h4>Return Home</h4>
              <p>Explore our clinic, philosophy, and complete care offerings.</p>
            </div>
          </a>

          <a href="botox-treatment-in-gurgaon" class="quick-nav-card">
            <div class="quick-nav-icon"><i class="bi bi-sparkles"></i></div>
            <div class="quick-nav-content">
              <h4>Botox Treatment</h4>
              <p>Smooth dynamic lines with micro-precision aesthetic care.</p>
            </div>
          </a>

          <a href="filler-treatment-in-gurgaon" class="quick-nav-card">
            <div class="quick-nav-icon"><i class="bi bi-magic"></i></div>
            <div class="quick-nav-content">
              <h4>Dermal Fillers</h4>
              <p>Restore youthful volume and contour with natural results.</p>
            </div>
          </a>

          <a href="book-appointment" class="quick-nav-card">
            <div class="quick-nav-icon"><i class="bi bi-calendar-check"></i></div>
            <div class="quick-nav-content">
              <h4>Book Consultation</h4>
              <p>Schedule an assessment with Dr. Pooja Varshney.</p>
            </div>
          </a>

        </div>

        <!-- CTA Buttons -->
        <div class="error-actions">
          <a href="index" class="btn-lux-primary">
            <i class="bi bi-arrow-left"></i> Back to Homepage
          </a>
          <a href="book-appointment" class="btn-lux-secondary">
            <i class="bi bi-telephone"></i> Contact Clinic
          </a>
        </div>

      </div>
    </div>
  </main>

  <?php include 'footer.php'; ?>

</body>

</html>
