<?php
/**
 * Dynamic XML Sitemap Generator for Google Search Console Submission
 * Automatically scans all active clinic web pages and generates standard XML.
 */

header("Content-Type: application/xml; charset=utf-8");

$domain = "www.dermatales.com";
$protocol = "https://";

// Partial components and backend utilities to exclude
$exclude_files = [
    'header.php',
    'footer.php',
    'mobile-menu.php',
    'nav-link.php',
    'sidebar-include.php',
    'sitemap.php'
];

$files = glob(__DIR__ . '/*.php');
$urls = [];

foreach ($files as $filepath) {
    $filename = basename($filepath);
    
    // Skip excluded files or hidden/partial files starting with underscore/dot
    if (in_array($filename, $exclude_files) || strpos($filename, '_') === 0 || strpos($filename, '.') === 0) {
        continue;
    }
    
    // Read sample to verify it's an actual webpage (contains html/doctype/head)
    $handle = @fopen($filepath, 'r');
    $sample = $handle ? fread($handle, 1024) : '';
    if ($handle) fclose($handle);
    
    if (stripos($sample, '<!DOCTYPE') === false && stripos($sample, '<html') === false && stripos($sample, '<head') === false) {
        continue; // Skip utility handlers
    }
    
    $slug = ($filename === 'index.php') ? '' : preg_replace('/\.php$/', '', $filename);
    $url = $protocol . $domain . '/' . $slug;
    $lastmod = date('Y-m-d\TH:i:s+00:00', filemtime($filepath));
    $priority = ($filename === 'index.php') ? '1.00' : '0.80';
    
    $urls[] = [
        'url' => $url,
        'lastmod' => $lastmod,
        'priority' => $priority
    ];
}

// Build XML string
$xml = '<?xml version="1.0" encoding="UTF-8"?>' . "\n";
$xml .= '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">' . "\n";

foreach ($urls as $item) {
    $xml .= "  <url>\n";
    $xml .= "    <loc>" . htmlspecialchars($item['url']) . "</loc>\n";
    $xml .= "    <lastmod>" . $item['lastmod'] . "</lastmod>\n";
    $xml .= "    <priority>" . $item['priority'] . "</priority>\n";
    $xml .= "  </url>\n";
}

$xml .= '</urlset>';

// Keep physical sitemap.xml file synced on disk
@file_put_contents(__DIR__ . '/sitemap.xml', $xml);

echo $xml;
