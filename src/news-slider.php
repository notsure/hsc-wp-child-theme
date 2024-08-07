<?php
// This file enqueues a shortcode.
use Timber\Timber;

defined('ABSPATH') or die('Direct script access disallowed.');

add_shortcode('posts-slider', function ($atts) {
    $default_atts = [];
    $args = shortcode_atts($default_atts, $atts);

    $context = Timber::context();
    $context['posts'] = Timber::get_posts([
        'post_type' => 'post',
        'posts_per_page' => 4,
    ]);

    // Process each post's excerpt
    foreach ($context['posts'] as $post) {
        $excerpt = str_replace('&nbsp;', ' ', $post->post_excerpt);  // Using 'post_excerpt' directly if you're not using Timber\Post
        $post->custom_excerpt = trim(strip_tags(htmlspecialchars_decode($excerpt)));  // Assigning processed excerpt directly to the post object
    }

    ob_start();

    Timber::render('templates/news-slider.html.twig', $context);

    return ob_get_clean();
});
