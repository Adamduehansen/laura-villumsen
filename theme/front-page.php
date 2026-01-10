<?php
const ALL_POSTS = -1;

$all_posts = wp_get_recent_posts(array(
  'numberposts' => ALL_POSTS,
  'post_status' => 'publish',
));

usort($all_posts, function($a, $b) {
    $sort_a = get_field('sort_order', $a['ID']);
    $sort_b = get_field('sort_order', $b['ID']);
    return $sort_b <=> $sort_a;
});

function renderThumbnail($post) {
  $thumbnailUrl = get_the_post_thumbnail_url($post['ID'], 'full');
  $media_thumbnail_id = get_post_meta($post['ID'], 'media_thumbnail_id', true);
  $media_thumbnail_url = $media_thumbnail_id ? wp_get_attachment_url($media_thumbnail_id) : '';

  if ($thumbnailUrl) { ?>
    <img src="<?php echo $thumbnailUrl ?>">
  <?php } else { ?>
    <video src="<?php echo $media_thumbnail_url; ?>" autoplay muted loop playsinline></video>
  <?php }
}
?>

<?php get_header(); ?>
<main>
  <nav>
    <ul class="work-teasers">
      <?php foreach ($all_posts as $post) : ?>
      <li>
        <a href="<?php echo get_permalink($post['ID']); ?>" class="work-teaser">
          <figure>
            <?php renderThumbnail($post); ?>
            <figcaption class="caption <?php echo get_field("frontpage_color", $post['ID']) ?>">
              <p><?php echo get_field("client", $post['ID']); ?></p>
              <p><?php echo get_field("types", $post['ID']); ?></p>
            </figcaption>
          </figure>
          
        </a>
      </li>
      <?php
        endforeach;
        wp_reset_query(); // Reset the query
      ?>
    </ul>
  </nav>
</main>
<?php get_footer(); ?>
