<?php
// This file enqueues a shortcode.
use FileBird\Classes\Helpers as Helpers;
use Timber\Timber;

defined('ABSPATH') or die('Direct script access disallowed.');

add_shortcode('main-menu', function ($atts) {
    $default_atts = [
        'toolbar' => '',
        'desktop' => '',
        'mobile' => ''
    ];
    $args = shortcode_atts($default_atts, $atts);

    $toolbar = getWordpressMenu($args['toolbar']);
    $desktop = getWordpressMenu($args['desktop']);
    $mobile = getWordpressMenu($args['mobile']);

    ob_start();

    Timber::render('templates/main-menu.html.twig', [
        'args' => $args,
        'toolbar' => $toolbar,
        'desktop' => $desktop,
        'mobile' => $mobile,
        'basePath' => get_stylesheet_directory_uri(),
    ]);

    return ob_get_clean();
});

function getWordpressMenu(string $menuId)
{
    if (!$menuId) {
        return [];
    }

    $menu = Timber::get_menu($menuId);

    if (empty($menu)) {
        return [];
    }

    return $menu;
}
