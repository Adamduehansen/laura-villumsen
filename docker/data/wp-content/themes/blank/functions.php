<?php

// Enables menu
function my_custom_menu() {
  register_nav_menus(
    array(
      'navigation'  => _('Navigation Menu'),
      'social' 	    => _('Social Menu')
    )
  );
}
add_action('init', 'my_custom_menu');

// Enables featured image
add_theme_support('post-thumbnails');