<?php

// Enables menu
function register_menues() {
  register_nav_menus(
    array(
      'navigation'  => _('Main Navigation Menu'),
      // 'social'      => _('Social Menu'),
      'contact'     => _('Contact Menu'),
    )
  );
}
add_action('init', 'register_menues');

$priority = 10;
$acceptedArgs = 4;

// Remove all menu classes/IDs for a specific menu location ('navigation')
function _c_clean_nav_menu_css_class($classes, $item, $args, $depth) {
  return array(); // no classes on <li>
}
add_filter('nav_menu_css_class', '_c_clean_nav_menu_css_class', $priority, $acceptedArgs);

function _c_clean_nav_menu_item_id($id, $item, $args, $depth) {
  return ''; // remove id attribute on <li>
}
add_filter('nav_menu_item_id', '_c_clean_nav_menu_item_id', $priority, $acceptedArgs);

function _c_clean_nav_submenu_css_class($classes, $args, $depth) {
  return array(); // no classes on submenu <ul>
}
add_filter('nav_menu_submenu_css_class', '_c_clean_nav_submenu_css_class', $priority, $acceptedArgs);

function _c_clean_nav_menu_link_attributes($atts, $item, $args, $depth) {
  unset($atts['class']); // remove class on <a>
  return $atts;
}
add_filter('nav_menu_link_attributes', '_c_clean_nav_menu_link_attributes', $priority, $acceptedArgs);