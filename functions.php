<?php

define('NABA_WP_THEME_NAME', 'hsc-wp-child-theme');
define('NABA_WP_THEME_VERSION', '2.8.33');
define('NABA_WP_THEME_PATH', get_stylesheet_directory_uri());
define('NABA_WP_THEME_SRC', get_stylesheet_directory() . '/src');

defined('ABSPATH') or die('Direct script access disallowed.');

function et_get_theme_version() {
    return NABA_WP_THEME_VERSION;
}

add_action( 'wp_enqueue_scripts', 'hsc_styles' );

function hsc_styles() {
    wp_enqueue_style('parent-theme', get_template_directory_uri() .'/style.css');
    wp_enqueue_style('naba-hsc-style', get_stylesheet_uri());
    wp_enqueue_script('naba-hsc-scripts', get_stylesheet_directory_uri() . '/assets/dist/scripts.js?ver=' . NABA_WP_THEME_VERSION, [], null, true);
}

// Use Timber to load and render twig files.
require_once(__DIR__ . '/vendor/autoload.php');
$timber = new \Timber\Timber();

// Child themes includes.
require_once(NABA_WP_THEME_SRC . '/deload.php');
require_once(NABA_WP_THEME_SRC . '/script-includes.php');
require_once(NABA_WP_THEME_SRC . '/sponsor-plugin.php');
