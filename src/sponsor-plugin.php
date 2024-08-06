<?php
// This file enqueues a shortcode.
use FileBird\Classes\Helpers as Helpers;
use Timber\Timber;

defined('ABSPATH') or die('Direct script access disallowed.');

add_shortcode('sponsor-grid', function ($atts) {
    $default_atts = [
        'id' => '',
        'high_contrast' => 0,
        'items_per_row' => '6',
        'show_as_row' => 0
    ];
    $args = shortcode_atts($default_atts, $atts);
    $folderId = $args['id'];
    $mediaAssets = getGridMediaItems($folderId);

    ob_start();

    Timber::render('templates/sponsor-grid.html.twig', [
        'args' => $args,
        'gridId' => rand(5, 15) . $folderId,
        'folderId' => $folderId,
        'mediaAssets' => $mediaAssets,
        'amount' => count($mediaAssets),
    ]);

    return ob_get_clean();
});

add_shortcode('sponsor-grid-animated', function ($atts) {
    $default_atts = [
        'id' => '',
        'high_contrast' => 0,
    ];
    $args = shortcode_atts($default_atts, $atts);
    $folderId = $args['id'];
    $mediaAssets = getGridMediaItems($folderId);
    shuffle($mediaAssets);

    ob_start();

    Timber::render('templates/sponsor-grid-animated.html.twig', [
        'args' => $args,
        'gridId' => rand(5, 15) . $folderId,
        'folderId' => $folderId,
        'mediaAssets' => $mediaAssets,
        'amount' => count($mediaAssets),
    ]);

    return ob_get_clean();
});

function getGridMediaItems(string $folderId): array
{
    $mediaAssets = [];
    $mediaIds = Helpers::getAttachmentIdsByFolderId($folderId);

    foreach ($mediaIds as $mediaId) {
        $assetUrl = wp_get_attachment_url($mediaId);
        $fileType = strtolower(wp_check_filetype($assetUrl)['ext']);

        if (!in_array($fileType, ['jpg', 'jpeg', 'webp', 'png', 'gif', 'svg'])) {
            continue;
        }

        $mediaAssets[] = [
            'id' => $mediaId,
            'href' => get_post_meta($mediaId, 'dsm_upload_gallery_custom_link_url', true) ?? '',
            'src' => wp_get_attachment_url($mediaId) ?? ''
        ];
    }

    return $mediaAssets;
}
