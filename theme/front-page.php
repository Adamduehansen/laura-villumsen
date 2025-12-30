<?php
$all_posts = wp_get_recent_posts(array(
    'numberposts' => -1, // -1 means it will find all posts.
    'post_status' => 'publish',
));

?>

<!DOCTYPE html>
<html lang="en">
<?php get_template_part( 'template-parts/head' ); ?>
<body>
  <?php get_template_part( 'template-parts/header' ); ?>
  <main>
    <nav>
      <ul>
        <?php foreach ($all_posts as $post) : ?>
        <li>
          <a href="<?php echo get_permalink($post['ID']); ?>">
            <?php echo get_field("client", $post['ID']); ?>
            <?php echo get_field("types", $post['ID']); ?>
          </a>
        </li>
        <?php
          endforeach;
          wp_reset_query(); // Reset the query
        ?>
      </ul>
    </nav>
  </main>
  <?php get_template_part( 'template-parts/footer' ); ?>
</body>
</html>