<?php
  $pageTitle = get_the_title() . ' | ' . get_bloginfo("name");
?>

<!DOCTYPE html <?php language_attributes(); ?>>
<html lang="en">
<head>
  <meta charset=”<?php bloginfo( 'charset' ); ?>”>
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <?php wp_head(); ?>
  <title><?php echo $pageTitle ?></title>
</head>
<body>
<header>
  <a href="<?php esc_url(home_url("/")) ?>" title="Gå til forsiden">Laura Villumsen</a>
  <button>Menu</button>
  <?php get_template_part( 'template-parts/menu' ); ?>
  <p>Open for new biz!</p>
  <?php get_template_part( 'template-parts/contact' ) ?>
  <p>Portfolio</p>
</header>