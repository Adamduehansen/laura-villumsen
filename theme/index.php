<?php
  $pageTitle = get_the_title() . ' | ' . get_bloginfo("name");
?>

<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title><?php echo $pageTitle ?></title>
</head>
<body>
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
  <main></main>
  <footer>
  </footer>
</body>
</html>