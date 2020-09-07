<?php

$themeName = 'hsc-theme';

add_action( 'wp_enqueue_scripts', 'hsc_styles' );
function hsc_styles() {
    wp_enqueue_style( 'parent-style', get_template_directory_uri() . '/style.css' );

}
