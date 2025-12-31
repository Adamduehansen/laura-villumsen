<?php

// Enables menu
function register_menues() {
  register_nav_menus(
    array(
      'navigation'  => _('Main Navigation Menu'),
      'social'      => _('Social Menu'),
      'contact'     => _('Contact Menu'),
    )
  );
}
add_action('init', 'register_menues');

// ----------------------------------------------------------------------------

// Add thumbnail video support
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
      get_template_directory_uri() . '/editor/media-thumbnail.js', // Adjust path if needed
      array('jquery'),
      filemtime(get_template_directory() . '/editor/media-thumbnail.js'),
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

// ----------------------------------------------------------------------------

// This function loads your theme’s stylesheet.
function my_theme_enqueue_styles() {
  wp_enqueue_style('laura-villumsen', get_stylesheet_uri());
}
add_action( 'wp_enqueue_scripts', 'my_theme_enqueue_styles' );

// ----------------------------------------------------------------------------
