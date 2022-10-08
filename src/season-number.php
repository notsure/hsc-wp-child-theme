<?php
// This file enqueues a shortcode.
use FileBird\Classes\Helpers as Helpers;

defined('ABSPATH') or die('Direct script access disallowed.');

add_shortcode('season-number', function ($atts) {
    $default_atts = [];
    $args = shortcode_atts($default_atts, $atts);

    $currentYear = date("Y");
    $nextYear = date("y") + 1;

    ob_start();

    echo $currentYear . '/' . $nextYear;

    return ob_get_clean();
});
