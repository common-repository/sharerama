<?php
/**
 * @package Sharerama
 * @version 1.2.0
 */
/*
Plugin Name: Sharerama
Plugin URI: http://sharerama.com/
Description: Well-written theme-agnostic widget that provides single-style social “like” buttons with counters for Facebook, Twitter, and Google+.
Author: Artem Polikarpov
Version: 1.2.0
*/

define('SHARERAMA_PLUGIN_URL', WP_PLUGIN_URL . '/' . dirname(plugin_basename(__FILE__)) . '/');

add_action('init', 'sharerama_scripts');
add_action( 'widgets_init', 'sharerama_widget' );

/**
 * Adds Sharerama_Widget
 */
class Sharerama_Widget extends WP_Widget {

	/**
	 * Register widget with WordPress.
	 */
	function __construct() {
		parent::__construct(
			'sharerama_widget', // Base ID
			__('Sharerama', 'text_domain'), // Name
			array( 'description' => __( 'Facebook, Twitter, Google+.', 'text_domain' ), ) // Args
		);
	}

	/**
	 * Front-end display of widget.
	 *
	 * @see WP_Widget::widget()
	 *
	 * @param array $args     Widget arguments.
	 * @param array $instance Saved values from database.
	 */
	public function widget( $args, $instance ) {
	  global $wp;

		$facebook = isset( $instance[ 'facebook' ] ) ? (bool) $instance[ 'facebook' ] : true;
		$twitter = isset( $instance[ 'twitter' ] ) ? (bool) $instance[ 'twitter' ] : true;
		$google = isset( $instance[ 'google' ] ) ? (bool) $instance[ 'google' ] : true;

		$theme = isset( $instance[ 'theme' ] ) ? $instance[ 'theme' ] : 'standard';
		$orientation = isset( $instance[ 'orientation' ] ) ? $instance[ 'orientation' ] : 'vertical';

		$counters = isset($instance[ 'counters' ] ) ? (bool) $instance[ 'counters' ] : true;
		$labels = isset( $instance[ 'labels' ] ) ? (bool) $instance[ 'labels' ] : true;
		$monochrome = isset( $instance[ 'monochrome' ] ) ? (bool) $instance[ 'monochrome' ] : false;

		$url = urlencode( add_query_arg($wp->query_string, '', home_url( $wp->request ) ) );

    $text = urlencode( is_single() || is_page() ? single_post_title('', false) : wp_title('|', false, 'right') );

		echo $args['before_widget'];

    ?>
		<div class="sharerama sharerama--<?= $theme; ?> sharerama--<?= $orientation; ?> <?= $monochrome ? 'sharerama--monochrome' : '' ?>" data-counters="<?= $counters; ?>">
		  <?php if ( $facebook ) { ?><div class="sharerama__item"><a data-service="facebook" href="https://www.facebook.com/sharer/sharer.php?u=<?= $url ?>" class="sharerama__button" target="_blank" title="Share on Facebook"><?php if ( $labels ) { ?>Facebook<?php } ?></a></div><?php } ?>
		  <?php if ( $twitter ) { ?><div class="sharerama__item"><a data-service="twitter" href="https://twitter.com/intent/tweet?url=<?= $url ?>&text=<?= $text ?>" class="sharerama__button" target="_blank" title="Tweet"><?php if ( $labels ) { ?>Twitter<?php } ?></a></div><?php } ?>
		  <?php if ( $google ) { ?><div class="sharerama__item"><a data-service="google" href="https://plus.google.com/share?url=<?= $url ?>" class="sharerama__button" target="_blank" title="Share on Google+"><?php if ( $labels ) { ?>Google+<?php } ?></a></div><?php } ?>
	  </div>

	  <?php

		echo $args['after_widget'];
	}

	/**
	 * Back-end widget form.
	 *
	 * @see WP_Widget::form()
	 *
	 * @param array $instance Previously saved values from database.
	 */
	public function form( $instance ) {
		$facebook = isset( $instance[ 'facebook' ] ) ? (bool) $instance[ 'facebook' ] : true;
		$twitter = isset( $instance[ 'twitter' ] ) ? (bool) $instance[ 'twitter' ] : true;
		$google = isset( $instance[ 'google' ] ) ? (bool) $instance[ 'google' ] : true;

		$theme = isset( $instance[ 'theme' ] ) ? $instance[ 'theme' ] : 'standard';
		$orientation = isset( $instance[ 'orientation' ] ) ? $instance[ 'orientation' ] : 'vertical';

		$monochrome = isset( $instance[ 'monochrome' ] ) ? (bool) $instance[ 'monochrome' ] : false;
		////$counters = isset( $instance[ 'counters' ] ) ? (bool) $instance[ 'counters' ] : true;
		////$labels = isset( $instance[ 'labels' ] ) ? (bool) $instance[ 'labels' ] : true;

		?>
		<p>
		  <input class="checkbox" type="checkbox" <?php checked( $facebook ); ?> id="<?php echo $this->get_field_id( 'facebook' ); ?>" name="<?php echo $this->get_field_name( 'facebook' ); ?>" />
		  <label for="<?php echo $this->get_field_id( 'facebook' ); ?>">Facebook</label><br>
		  <input class="checkbox" type="checkbox" <?php checked( $twitter ); ?> id="<?php echo $this->get_field_id( 'twitter' ); ?>" name="<?php echo $this->get_field_name( 'twitter' ); ?>" />
		  <label for="<?php echo $this->get_field_id( 'twitter' ); ?>">Twitter</label><br>
		  <input class="checkbox" type="checkbox" <?php checked( $google ); ?> id="<?php echo $this->get_field_id( 'google' ); ?>" name="<?php echo $this->get_field_name( 'google' ); ?>" />
		  <label for="<?php echo $this->get_field_id( 'google' ); ?>">Google+</label>
		</p>
		<p>
		  <label><strong>Skin</strong><br>
        <select name="<?php echo $this->get_field_name( 'theme' ); ?>">
          <option value="standard" <?php selected( $theme, 'standard' ); ?>>Standard</option>
          <option value="light" <?php selected( $theme, 'light' ); ?>>Light</option>
        </select>
		  </label>
    </p>
    <p>
    <p>
      <label><strong>Orientation</strong><br>
		  <select name="<?php echo $this->get_field_name( 'orientation' ); ?>">
		    <option value="vertical" <?php selected( $orientation, 'vertical' ); ?>>Vertical</option>
		    <option value="horizontal" <?php selected( $orientation, 'horizontal' ); ?>>Horizontal</option>
		  </select>
		  </label>
    </p>
		<p>
		  <!--<label>
		    <input class="checkbox" type="checkbox" <?php checked( $counters ); ?> name="<?php echo $this->get_field_name( 'counters' ); ?>" />
		    Counters
		  </label><br>
		  <label>
		    <input class="checkbox" type="checkbox" <?php checked( $labels ); ?> name="<?php echo $this->get_field_name( 'labels' ); ?>" />
		    Text labels
		  </label><br>-->
		  <label>
		    <input class="checkbox" type="checkbox" <?php checked( $monochrome ); ?> name="<?php echo $this->get_field_name( 'monochrome' ); ?>" />
		    Monochrome
		  </label>
		</p>
		<?php

	}

	/**
	 * Sanitize widget form values as they are saved.
	 *
	 * @see WP_Widget::update()
	 *
	 * @param array $new_instance Values just sent to be saved.
	 * @param array $old_instance Previously saved values from database.
	 *
	 * @return array Updated safe values to be saved.
	 */
	public function update( $new_instance, $old_instance ) {
		$instance = $old_instance;

		$instance['facebook'] = (bool) $new_instance['facebook'];
		$instance['twitter'] = (bool) $new_instance['twitter'];
		$instance['google'] = (bool) $new_instance['google'];

		$instance['theme'] = isset( $new_instance[ 'theme' ] ) && $new_instance[ 'theme' ] == 'light' ? 'light' : 'standard';
		$instance['orientation'] = isset( $new_instance[ 'orientation' ] ) && $new_instance[ 'orientation' ] == 'horizontal' ? 'horizontal' : 'vertical';

		$instance['monochrome'] = (bool) $new_instance['monochrome'];
		////$instance['counters'] = (bool) $new_instance['counters'];
		////$instance['labels'] = (bool) $new_instance['labels'];

		return $instance;
	}

}

// register the widget
function sharerama_widget() {
    register_widget( 'Sharerama_Widget' );
}

function sharerama_scripts()
{
	// Register scripts and styles in non-admin area only.
	if (!is_admin()) {
		// Stylesheet
		wp_register_style('sharerama-classic.css', SHARERAMA_PLUGIN_URL . 'sharerama-classic.css');
    wp_enqueue_style('sharerama-classic.css');

		// Script
		wp_register_script('sharerama.js', SHARERAMA_PLUGIN_URL . 'sharerama.js', array('jquery'));
		wp_enqueue_script('sharerama.js');
	}
}

?>
