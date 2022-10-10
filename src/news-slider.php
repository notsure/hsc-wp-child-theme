<?php
// This file enqueues a shortcode.
use FileBird\Classes\Helpers as Helpers;

defined('ABSPATH') or die('Direct script access disallowed.');

add_shortcode('posts-slider', function ($atts) {
    $default_atts = [];
    $args = shortcode_atts($default_atts, $atts);

    $posts = new Timber\PostQuery(array(
        'post_type' => 'post',
        'posts_per_page' => 5,
    ));

    foreach ($posts as $post) {
        $excerpt = str_replace('&nbsp;', ' ', $post->preview);
        $post->custom['custom_excerpt'] = trim(strip_tags(htmlspecialchars_decode($excerpt)));
    }

    ob_start();

    Timber::render('templates/news-slider.html.twig', [
        'posts' => $posts,
    ]);

    return ob_get_clean();
});
