<?php
  $themeURL = get_theme_root_uri() . '/hsc-wp-child-theme';
  $logo =  $themeURL . '/images/sc-hohenems-logo.png';
?>

<?php if ( 'on' == et_get_option( 'divi_back_to_top', 'false' ) ) : ?>

<span class="et_pb_scroll_top et-pb-icon"></span>

<?php endif;

      if ( ! is_page_template( 'page-template-blank.php' ) ) : ?>

      <footer id="main-footer">
          <?php get_sidebar( 'footer' ); ?>

          <div id="footer-bottom">
              <div class="container clearfix">
              <div class="footer-logo">
                  <img src="<?php echo esc_attr( $logo ); ?>" />
              </div>

              <?php if ( has_nav_menu( 'footer-menu' ) ) : ?>
              <div id="et-footer-nav">
                  <div class="container">
                      <?php
                          wp_nav_menu( array(
                              'theme_location' => 'footer-menu',
                              'depth'          => '1',
                              'menu_class'     => 'bottom-nav',
                              'container'      => '',
                              'fallback_cb'    => '',
                          ) );
                       ?>
                  </div>
			  </div> <!-- #et-footer-nav -->
			  <?php endif; ?>

              <ul class="footer-social">
                  <li>Social Media</li>
                  <li>&#xe0c1;</li>
                  <li>YT</li>
              </ul>
          </div> <!-- .container -->
      </div>
      </footer> <!-- #main-footer -->

      <footer id="mobile-footer">
          <div id="footer-bottom">
              <div class="footer-logo">
                  <img src="<?php echo esc_attr( $logo ); ?>" />
              </div>

              <?php if ( has_nav_menu( 'footer-menu' ) ) : ?>
              <div id="et-footer-nav">
                  <div class="container">
                      <?php
                          wp_nav_menu( array(
                              'theme_location' => 'footer-menu',
                              'depth'          => '1',
                              'menu_class'     => 'bottom-nav',
                              'container'      => '',
                              'fallback_cb'    => '',
                          ) );
                       ?>
                  </div>
			  </div> <!-- #et-footer-nav -->
			  <?php endif; ?>

              <ul class="footer-social">
                  <li>Social Media</li>
                  <li>&#xe0c1;</li>
                  <li>YT</li>
              </ul>
          </div> <!-- .container -->
      </footer>

      </div> <!-- #et-main-area -->

<?php endif; // ! is_page_template( 'page-template-blank.php' ) ?>

	</div> <!-- #page-container -->

	<?php wp_footer(); ?>
</body>
</html>
