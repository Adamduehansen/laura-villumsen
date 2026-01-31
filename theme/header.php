<?php
  $pageTitle = get_the_title() . ' | ' . get_bloginfo("name");
?>

<!DOCTYPE html <?php language_attributes(); ?>>
<html lang="en">
<head>
  <meta charset=”<?php bloginfo( 'charset' ); ?>”>
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link rel="stylesheet" href="https://use.typekit.net/wsq1sgw.css" />
  <?php wp_head(); ?>
  <title><?php echo $pageTitle ?></title>
</head>
<body>
<header>
  <?php get_template_part( 'template-parts/md-header' ); ?>
</header>