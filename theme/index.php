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
  <?php get_template_part( 'template-parts/header' ); ?>
  <main></main>
  <?php get_template_part( 'template-parts/footer' ); ?>
</body>
</html>