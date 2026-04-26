<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="description"
    content="Thank you for contacting DermaTales — Your trusted dermatology clinic in Gurgaon & Delhi.">
  <meta name="robots" content="noindex, follow">
  <title>Thank You — DermaTales</title>

    <?php include 'nav-link.php'; ?>
<style>
    .thank-you-section {
      min-height: 80vh;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 80px 0;
      position: relative;
      overflow: hidden;
    }

    .thank-you-card {
      background: var(--dt-white);
      padding: clamp(2rem, 5vw, 4rem);
      border-radius: var(--dt-radius-lg);
      box-shadow: var(--dt-shadow-lg);
      max-width: 600px;
      width: 100%;
      text-align: center;
      position: relative;
      z-index: 2;
      border: 1px solid var(--dt-border);
    }

    .thank-you-icon {
      width: 90px;
      height: 90px;
      background: linear-gradient(135deg, var(--dt-champagne), var(--dt-champagne-dark));
      color: var(--dt-white);
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 40px;
      margin: 0 auto 30px;
      box-shadow: 0 10px 25px rgba(183, 110, 121, 0.3);
      animation: checkFadeIn 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    }

    @keyframes checkFadeIn {
      from {
        opacity: 0;
        transform: scale(0.5) translateY(20px);
      }
      to {
        opacity: 1;
        transform: scale(1) translateY(0);
      }
    }

    .thank-you-title {
      font-family: var(--dt-font-display);
      font-size: clamp(2rem, 4vw, 2.75rem);
      color: var(--dt-charcoal);
      margin-bottom: 20px;
    }

    .thank-you-text {
      font-size: 17px;
      color: var(--dt-text-light);
      margin-bottom: 35px;
      line-height: 1.8;
    }

    .thank-you-bg-texture {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 120%;
      height: 120%;
      background: radial-gradient(circle, rgba(183, 110, 121, 0.05) 0%, rgba(255, 255, 255, 0) 70%);
      z-index: 1;
      pointer-events: none;
    }

    /* Page load transition */
    .fade-in-up {
      animation: fadeInUp 0.8s ease-out forwards;
      opacity: 0;
    }

    @keyframes fadeInUp {
      from {
        opacity: 0;
        transform: translateY(30px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
  </style>
</head>

<body>
  <?php include 'header.php'; ?>
  <?php include 'mobile-menu.php'; ?>

  <!-- ===================== THANK YOU SECTION ===================== -->
  <main class="thank-you-section">
    <div class="thank-you-bg-texture"></div>
    <div class="container-xl d-flex justify-content-center">
      <div class="thank-you-card fade-in-up">
        <div class="thank-you-icon">
          <i class="bi bi-check2-circle"></i>
        </div>
        <h1 class="thank-you-title">Thank You!</h1>
        <p class="thank-you-text">
          Your appointment request has been successfully received. <br class="d-none d-md-block">
          One of our patient coordinators will contact you shortly to confirm your consultation time.
        </p>
        <div class="d-flex flex-column flex-sm-row justify-content-center gap-3">
          <a href="index" class="btn btn-gold btn-lg rounded-pill px-5">
            Back to Home
          </a>
          <a href="index#treatments" class="btn btn-outline-gold btn-lg rounded-pill px-4">
            Explore Treatments
          </a>
        </div>
      </div>
    </div>
  </main>

  <?php include 'footer.php'; ?>

  </body>

</html>
