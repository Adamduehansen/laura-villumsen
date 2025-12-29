<?php
$menu_items = wp_get_nav_menu_items('navigation');
?>

<nav>
  <ul>
    <?php foreach ($menu_items as $item) { ?>
      <li>
        <a href="<?php echo esc_url($item->url) ?>"><?php echo esc_html($item->title) ?></a>
      </li>
    <?php } ?>
  </ul>
</nav>
