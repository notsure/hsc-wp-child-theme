<?php

define('NABA_WP_THEME_NAME', 'hsc-wp-child-theme');
define('NABA_WP_THEME_VERSION', '0.0.1');
define('NABA_WP_THEME_PATH', get_stylesheet_directory_uri());

defined('ABSPATH') or die('Direct script access disallowed.');

add_action( 'wp_enqueue_scripts', 'hsc_styles' );

function hsc_styles() {
    wp_enqueue_style( 'naba-hsc-style', get_template_directory_uri() . '/style.css' );
}
