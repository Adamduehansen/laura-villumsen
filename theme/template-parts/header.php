<header>
  <a href="/" aria-current="page" title="Gå til forsiden">Laura Villumsen</a>
  <button>Menu</button>
  <nav>
    <?php
      wp_nav_menu(
        array(
          'theme_location' => 'navigation',
          'container' => false,
          'menu_class' => '',
        )
      );
    ?>
  </nav>
  <p>Open for new biz!</p>
    <?php
      wp_nav_menu(
        array(
          'theme_location' => 'contact',
          'container' => false,
          'menu_class' => '',
        )
      );
    ?>
  <p>Portfolio</p>
</header>