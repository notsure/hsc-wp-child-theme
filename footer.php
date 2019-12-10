<?php
  $themeURL = get_theme_root_uri() . '/hsc-theme';
  $logo =  $themeURL . '/images/sc-hohenems-logo.svg';
?>

<?php if ( 'on' == et_get_option( 'divi_back_to_top', 'false' ) ) : ?>

<span class="et_pb_scroll_top et-pb-icon"></span>

<?php endif;

      if ( ! is_page_template( 'page-template-blank.php' ) ) : ?>

      <footer class="main-footer">
          <?php get_sidebar( 'footer' ); ?>

          <div class="footer-bottom">
              <div class="container clearfix">
              <div class="footer-logo">
                  <img src="<?php echo esc_attr( $logo ); ?>" />
              </div>

              <?php if ( has_nav_menu( 'footer-menu' ) ) : ?>
              <div class="footer-nav">
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
                  <li class="mr-md">
                      <a href="https://www.facebook.com/SC.Hohenems" target="_blank">
                          <i class="hsc-icon hsc-icon-facebook"></i>
                      </a>
                  </li>
                  <li class="mr-md">
                      <a href="https://www.instagram.com/sc_hohenems" target="_blank">
                          <i class="hsc-icon hsc-icon-instagram"></i>
                      </a>
                  </li>
                  <li>
                      <a href="https://www.youtube.com/channel/UCDcIe4y3sXSmEjDCutV2T6g" target="_blank">
                          <i class="hsc-icon hsc-icon-youtube"></i>
                      </a>
                  </li>
              </ul>
          </div> <!-- .container -->
      </div>
      </footer> <!-- #main-footer -->

      <footer class="mobile-footer">
          <div class="footer-bottom">
              <div class="footer-logo">
                  <img src="<?php echo esc_attr( $logo ); ?>" />
              </div>

              <?php if ( has_nav_menu( 'footer-menu' ) ) : ?>
              <div class="footer-nav">
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
                  <li class="et-social-icon et-social-facebook">
                      <a href="https://www.facebook.com/SC.Hohenems" target="_blank">
                          <i class="hsc-icon hsc-icon-facebook"></i>
                      </a>
                  </li>
                  <li class="et-social-icon et-social-instagram">
                      <a href="https://www.instagram.com/sc_hohenems" target="_blank">
                          <i class="hsc-icon hsc-icon-instagram"></i>
                      </a>
                  </li>
                  <li class="et-social-icon et-social-youtube">
                      <a href="https://www.youtube.com/channel/UCDcIe4y3sXSmEjDCutV2T6g" target="_blank">
                          <i class="hsc-icon hsc-icon-youtube"></i>
                      </a>
                  </li>
              </ul>
          </div> <!-- .container -->
      </footer>

      </div> <!-- #et-main-area -->

<?php endif; // ! is_page_template( 'page-template-blank.php' ) ?>

	</div> <!-- #page-container -->

	<?php wp_footer(); ?>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.13.0/moment.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/underscore.js/1.8.3/underscore-min.js"></script>
    <script src="<?php echo $themeURL . '/hsc.min.js'; ?>" type="text/javascript"></script>
</body>
</html>
