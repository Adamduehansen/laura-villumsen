<?php

// Enables menu
function my_custom_menu() {
  register_nav_menus(
    array(
      'navigation'  => _('Navigation Menu'),
      'social'      => _('Social Menu'),
      'contact'     => _('Contact'),
    )
  );
}
add_action('init', 'my_custom_menu');

// Enables featured image
add_theme_support('post-thumbnails');

function add_featured_image_url_to_rest_api($data, $post, $context) {
    // Check if the post has a featured image
    $featured_image_id = $data->data['featured_media'];

    if ($featured_image_id) {
        $image = wp_get_attachment_image_src($featured_image_id, 'full'); // Use 'full', 'medium', 'thumbnail', etc.
        $data->data['featured_image_url'] = $image ? $image[0] : null;
    } else {
        $data->data['featured_image_url'] = null;
    }

    return $data;
}
add_filter('rest_prepare_post', 'add_featured_image_url_to_rest_api', 10, 3);