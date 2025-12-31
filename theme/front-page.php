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
            <?php 
              $thumbnailUrl = get_the_post_thumbnail_url($post['ID'], 'full');
              if ($thumbnailUrl) {
            ?>
              <img src="<?php echo $thumbnailUrl ?>">
            <?php } else { 
              $media_thumbnail_id = get_post_meta($post['ID'], 'media_thumbnail_id', true);
              $media_thumbnail_url = $media_thumbnail_id ? wp_get_attachment_url($media_thumbnail_id) : '';
            ?>
              <video src="<?php echo $media_thumbnail_url; ?>" autoplay muted loop playsinline></video>
            <?php } ?>
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