<footer>
  <?php
    wp_nav_menu(
      array(
        'theme_location' => 'social',
        'container' => false,
        'menu_class' => '',
      )
    );
  ?>
  &copy; <?php echo date('Y'); ?> 
</footer>
<?php wp_footer(); ?>
</body>
</html>