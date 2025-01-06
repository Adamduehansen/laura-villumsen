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

/* ADD FEATURED IMAGE INFO IN REST API */
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

/* ADD TAG NAMES IN REST API */
function add_tags_to_rest_api($data, $post, $context) {
  // Get the tags for the post
  $tags = get_the_terms($post->ID, 'post_tag');

  if (!empty($tags) && !is_wp_error($tags)) {
      // Extract tag names
      $tag_names = wp_list_pluck($tags, 'name');
  } else {
      $tag_names = [];
  }

  // Add the tag names to the REST API response
  $data->data['tag_names'] = $tag_names;

  return $data;
}
add_filter('rest_prepare_post', 'add_tags_to_rest_api', 10, 3);
/* ===================================================== */

/* CUSTOM CASE INFO BLOCK SUPPORT */
function register_wp_case_info_block() {
  // Register the block editor script
  wp_register_script(
      'wp-case-info-block',
      get_template_directory_uri() . '/case-info-block-plugin/block.js',
      array('wp-blocks', 'wp-element'), // Ensure dependencies are loaded
      filemtime(get_template_directory() . '/case-info-block-plugin/block.js')
  );

  // Register the editor style
  wp_register_style(
      'wp-case-info-editor-style',
      get_template_directory_uri() . '/case-info-block-plugin/editor.css',
      array(),
      filemtime(get_template_directory() . '/case-info-block-plugin/editor.css')
  );

  // Register the frontend style
  wp_register_style(
      'wp-case-info-style',
      get_template_directory_uri() . '/case-info-block-plugin/style.css',
      array(),
      filemtime(get_template_directory() . '/case-info-block-plugin/style.css')
  );

  // Register the block
  register_block_type('custom/wp-case-info', array(
      'editor_script' => 'wp-case-info-block',
      'editor_style' => 'wp-case-info-editor-style',
      'style' => 'wp-case-info-style',
  ));
}
add_action('init', 'register_wp_case_info_block');
/* ===================================================== */

/* THUMBNAIL WITH VIDEO SUPPORT */
function add_video_thumbnail_meta_box() {
  add_meta_box(
      'video_thumbnail_meta_box',
      'Video Thumbnail',
      'video_thumbnail_meta_box_callback',
      'post',
      'side',
      'low'
  );
}
add_action('add_meta_boxes', 'add_video_thumbnail_meta_box');

function video_thumbnail_meta_box_callback($post) {
  $video_url = get_post_meta($post->ID, 'video_thumbnail', true);
  echo '<label for="video_thumbnail">Video URL:</label>';
  echo '<input type="url" id="video_thumbnail" name="video_thumbnail" value="' . esc_url($video_url) . '" style="width:100%">';
}

function save_video_thumbnail_meta($post_id) {
  if (isset($_POST['video_thumbnail'])) {
      update_post_meta($post_id, 'video_thumbnail', esc_url_raw($_POST['video_thumbnail']));
  }
}
add_action('save_post', 'save_video_thumbnail_meta');
/* ===================================================== */
