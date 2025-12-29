<?php
$menu_items = wp_get_nav_menu_items('contact');
$telephone = $menu_items[0];
$email = $menu_items[1];
?>

<?php if ($telephone) { ?>
  <p>
    M: <a href="<?php echo esc_url($telephone->url) ?>"><?php echo esc_html($telephone->title) ?></a>
  </p>
<?php } ?>

<?php if ($email) { ?>
  <p>
    T: <a href="<?php echo esc_url($email->url) ?>"><?php echo esc_html($email->title) ?></a>
  </p>
<?php } ?>
