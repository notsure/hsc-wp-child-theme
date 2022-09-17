<?php
// Remove the gutenberg styles as it is not in use but default for wordpress.
function wpassist_remove_block_library_css()
{
    wp_dequeue_style( 'wp-block-library' );
}
add_action( 'wp_enqueue_scripts', 'wpassist_remove_block_library_css' );

/**
 * Move jQuery to the footer.
 */
function wpse_173601_enqueue_scripts()
{
    wp_scripts()->add_data( 'jquery', 'group', 1 );
    wp_scripts()->add_data( 'jquery-core', 'group', 1 );
    wp_scripts()->add_data( 'jquery-migrate', 'group', 1 );
}
add_action( 'wp_enqueue_scripts', 'wpse_173601_enqueue_scripts' );

// Remove the fontawesome include of groovy mega menu.
function groovy_remove_fa_css()
{
    wp_dequeue_style( 'groovy-menu-font-awesome' );
}
add_action( 'wp_enqueue_scripts', 'groovy_remove_fa_css' );

// Remove groovy mega menu.
function groovy_remove_google_fonts()
{
    wp_dequeue_style( 'groovy-menu-style-font-roboto' );
}
add_action( 'wp_enqueue_scripts', 'groovy_remove_google_fonts' );
