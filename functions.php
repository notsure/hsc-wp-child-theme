<?php

define('NABA_WP_THEME_NAME', 'hsc-wp-child-theme');
define('NABA_WP_THEME_PATH', get_stylesheet_directory_uri());
define('NABA_WP_THEME_SRC', get_stylesheet_directory() . '/src');
defined('ABSPATH') or die('Direct script access disallowed.');

function getThemeVersion() {
  // Adjust the path to where your package.json file is located relative to this PHP file
  $path_to_package_json = __DIR__ . '/assets/package.json';

  // Read the contents of the JSON file
  $json_content = file_get_contents($path_to_package_json);

  // Decode the JSON content
  $json_data = json_decode($json_content);

  // Access the version property
  $version = $json_data->version;

  return $version;
}

define('NABA_WP_THEME_VERSION', getThemeVersion());

// Not sure why this was added but it changes the version of the divi script includes. maybe they had to be synced but I am not sure.
function et_get_theme_version() {
    return NABA_WP_THEME_VERSION;
}

add_action( 'wp_enqueue_scripts', 'hsc_styles' );

function hsc_styles() {
    wp_enqueue_style('parent-theme', get_template_directory_uri() .'/style.css');
//    wp_enqueue_script('naba-hsc-scripts', get_stylesheet_directory_uri() . '/assets/dist/scripts.js?ver=' . NABA_WP_THEME_VERSION, [], NABA_WP_THEME_VERSION, true);
}

// Use Timber to load and render twig files.
require_once(__DIR__ . '/vendor/autoload.php');

// Child themes includes.
require_once(NABA_WP_THEME_SRC . '/deload.php');
require_once(NABA_WP_THEME_SRC . '/season-number.php');
