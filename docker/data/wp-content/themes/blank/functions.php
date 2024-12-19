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

function add_featured_image_details_to_rest_api($data, $post, $context) {
  $featured_image_id = get_post_thumbnail_id($post->ID);

  if ($featured_image_id) {
    // Get the image URL, metadata, and alt text
    $image_data = wp_get_attachment_image_src($featured_image_id, 'full'); // Use 'full', 'medium', etc.
    $metadata = wp_get_attachment_metadata($featured_image_id);
    $alt_text = get_post_meta($featured_image_id, '_wp_attachment_image_alt', true); // Get alt text

    // Add the details to the response
    $data->data['featured_image'] = array(
      'url' => $image_data ? $image_data[0] : null,
      'width' => $metadata['width'] ?? null,
      'height' => $metadata['height'] ?? null,
      'alt' => $alt_text ?? null,
    );
  } else {
    $data->data['featured_image'] = null;
  }

  return $data;
}
add_filter('rest_prepare_post', 'add_featured_image_details_to_rest_api', 10, 3);

