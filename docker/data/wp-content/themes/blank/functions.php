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
      // TODO: This should point to the block.css instead.
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
function add_media_thumbnail_meta_box() {
  add_meta_box(
    'media_thumbnail_meta_box',
    'Udvalgt video',
    'media_thumbnail_meta_box_callback',
    'post',
    'side',
    'high',
    array(
      '__block_editor_compatible_meta_box' => true, // Ensure compatibility with the block editor
    )
  );
}
add_action('add_meta_boxes', 'add_media_thumbnail_meta_box');

function media_thumbnail_meta_box_callback($post) {
  $media_id = get_post_meta($post->ID, 'media_thumbnail_id', true);
  $media_url = $media_id ? wp_get_attachment_url($media_id) : '';

  echo '<div id="media-thumbnail-container">';
  echo $media_url ? '<div><img src="' . esc_url($media_url) . '" style="max-width:100%;"></div>' : '';
  echo '<input type="hidden" id="media_thumbnail_id" name="media_thumbnail_id" value="' . esc_attr($media_id) . '">';
  echo '<button type="button" id="select-media-thumbnail" class="button">Select Media</button>';
  echo '<button type="button" id="remove-media-thumbnail" class="button" style="' . ($media_url ? '' : 'display:none;') . '">Remove Media</button>';
  echo '</div>';
}

function enqueue_media_library_scripts($hook) {
  if ('post.php' === $hook || 'post-new.php' === $hook) {
      wp_enqueue_media();
      wp_enqueue_script(
          'media-thumbnail-script',
          get_template_directory_uri() . '/media-thumbnail.js', // Adjust path if needed
          array('jquery'),
          filemtime(get_template_directory() . '/media-thumbnail.js'),
          true
      );
  }
}
add_action('admin_enqueue_scripts', 'enqueue_media_library_scripts');

function save_media_thumbnail_meta($post_id) {
  if (isset($_POST['media_thumbnail_id'])) {
      update_post_meta($post_id, 'media_thumbnail_id', absint($_POST['media_thumbnail_id']));
  }
}
add_action('save_post', 'save_media_thumbnail_meta');

function add_media_thumbnail_to_rest($data, $post, $context) {
  $media_id = get_post_meta($post->ID, 'media_thumbnail_id', true);

  if ($media_id) {
    $data->data['featured_video'] = array(
      'id' => $media_id,
      'url' => wp_get_attachment_url($media_id),
      'type' => wp_check_filetype(wp_get_attachment_url($media_id))['type'],
    );
  } else {
    $data->data['featured_video'] = null;
  }

  return $data;
}
add_filter('rest_prepare_post', 'add_media_thumbnail_to_rest', 10, 3);

function allow_cors_for_videos($headers) {
  $headers['Access-Control-Allow-Origin'] = '*';
  return $headers;
}

function add_cors_to_video_requests() {
  if (is_attachment() && in_array(get_post_mime_type(), ['video/mp4', 'video/webm', 'video/ogg'])) {
      add_filter('wp_headers', 'allow_cors_for_videos');
  }
}
add_action('template_redirect', 'add_cors_to_video_requests');

/* ===================================================== */
