<?php
/**
 * The base configuration for WordPress
 *
 * The wp-config.php creation script uses this file during the installation.
 * You don't have to use the website, you can copy this file to "wp-config.php"
 * and fill in the values.
 *
 * This file contains the following configurations:
 *
 * * Database settings
 * * Secret keys
 * * Database table prefix
 * * ABSPATH
 *
 * @link https://developer.wordpress.org/advanced-administration/wordpress/wp-config/
 *
 * @package WordPress
 */

// ** Database settings - You can get this info from your web host ** //
// Enable CORS
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Expose-Headers: X-WP-Total, X-WP-TotalPages");

/** The name of the database for WordPress */
define( 'DB_NAME', 'wordpress' );

/** Database username */
define( 'DB_USER', 'admin' );

/** Database password */
define( 'DB_PASSWORD', '7028-Y18h06R_2022' );

/** Database hostname */
define( 'DB_HOST', 'db:3306' );

/** Database charset to use in creating database tables. */
define( 'DB_CHARSET', 'utf8mb4' );

/** The database collate type. Don't change this if in doubt. */
define( 'DB_COLLATE', '' );

/**#@+
 * Authentication unique keys and salts.
 *
 * Change these to different unique phrases! You can generate these using
 * the {@link https://api.wordpress.org/secret-key/1.1/salt/ WordPress.org secret-key service}.
 *
 * You can change these at any point in time to invalidate all existing cookies.
 * This will force all users to have to log in again.
 *
 * @since 2.6.0
 */
define( 'AUTH_KEY',         '8]-h/v(6gu)&-6;8CFmFp=!P07fHk7{%##NjY)!Bm+%{`+^uC)G7sq^e)m;m8pJ.' );
define( 'SECURE_AUTH_KEY',  '=3i<e!D9Z|J,5t0nQE`2O@]3FG=u%yv`>d4J6MO=!nJA4Z`r]S91!wM>0|{)_fw>' );
define( 'LOGGED_IN_KEY',    '9a+ZKsJ5P!e?_=#jQ-/rWrMV2x7OPksC%B&n0c>KHDy5G)B]>.I/-zgHM]kT7-V$' );
define( 'NONCE_KEY',        'lQa$~H]vJG#F[Gv7T$H/G4(yc%Lz0$D~$o)8jO5bEH$w4Ew-I) Yp9m{fQ`fg6Ev' );
define( 'AUTH_SALT',        'Jm;9k1H*Bh+LAbV0Gn}vBES334m,sE^fl1kL!(A}L~!*#^SaODB;xMdo4wuyQnz~' );
define( 'SECURE_AUTH_SALT', 'm)^mr;!^0#OmGP5R^3xa=kK`QXyUVVC9~VQ5q3?1yAwg`34 y?t~h}$W/Tkj%Q;0' );
define( 'LOGGED_IN_SALT',   'aO7=(wj{!C0+ZXNq6km#Tf2:-{zpsE+(9f5V2.L#t&_$o}4FOPMH,7)c|Y)WIvwK' );
define( 'NONCE_SALT',       'mP{-W^,](0LmwI2NL>ke+l*a^W(=g-m`*e`5YsL^)lx;(_7oT9Ht FD!KX$kW3o!' );

/**#@-*/

/**
 * WordPress database table prefix.
 *
 * You can have multiple installations in one database if you give each
 * a unique prefix. Only numbers, letters, and underscores please!
 *
 * At the installation time, database tables are created with the specified prefix.
 * Changing this value after WordPress is installed will make your site think
 * it has not been installed.
 *
 * @link https://developer.wordpress.org/advanced-administration/wordpress/wp-config/#table-prefix
 */
$table_prefix = 'wp_';

/**
 * For developers: WordPress debugging mode.
 *
 * Change this to true to enable the display of notices during development.
 * It is strongly recommended that plugin and theme developers use WP_DEBUG
 * in their development environments.
 *
 * For information on other constants that can be used for debugging,
 * visit the documentation.
 *
 * @link https://developer.wordpress.org/advanced-administration/debug/debug-wordpress/
 */
define( 'WP_DEBUG', false );

/* Add any custom values between this line and the "stop editing" line. */



/* That's all, stop editing! Happy publishing. */

/** Absolute path to the WordPress directory. */
if ( ! defined( 'ABSPATH' ) ) {
	define( 'ABSPATH', __DIR__ . '/' );
}

/** Sets up WordPress vars and included files. */
require_once ABSPATH . 'wp-settings.php';

