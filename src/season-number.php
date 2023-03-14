<?php
// This file enqueues a shortcode.
defined('ABSPATH') or die('Direct script access disallowed.');

add_shortcode('season-number', function () {
    $month = date('m');

    // Lets change the season in august.
    if ((int)$month < 8) {
        $currentYear = date('Y') - 1;
        $nextYear = date('y');
    } else {
        $currentYear = date('Y');
        $nextYear = date('y') + 1;
    }

    ob_start();

    echo $currentYear . '/' . $nextYear;

    return ob_get_clean();
});
