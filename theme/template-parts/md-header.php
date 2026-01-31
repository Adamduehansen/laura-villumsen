<?php
/**
 * Renders the MD header.
 */

$menu_items = wp_get_nav_menu_items('navigation');
?>

<div id="md-menu" class="container">
  <div class="flex-between">
    <a href="<?php esc_url(home_url("/")) ?>" title="Gå til forsiden">Laura Villumsen</a>
    <button id="md-menu__button">Menu</button>
  </div>
  <p>/Portfolio</p>
  <div id="md-menu__list" class="closed">
    <nav>
      <ul>
        <?php foreach ($menu_items as $item) { ?>
          <li>
            <a href="<?php echo esc_url($item->url) ?>"><?php echo esc_html($item->title) ?></a>
          </li>
        <?php } ?>
      </ul>
    </nav>
    <p>Open for new biz!</p>
    <?php get_template_part( 'template-parts/contact' ) ?>
    </div>
  </div>

</div>
