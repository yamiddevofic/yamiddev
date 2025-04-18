<?php
/**
 * Configuración base para WordPress, adaptada para funcionar como un CMS sin cabeza (headless).
 *
 * Se habilita la API REST, el área de administración y el login, pero se evita el procesamiento completo
 * del frontend. Para cualquier solicitud que no sea hacia:
 * - /wp-json/ (API REST)
 * - /wp-admin/ (área administrativa)
 * - wp-login.php (pantalla de login)
 * se retorna un mensaje JSON notificando que se trata de una instancia headless.
 *
 * @package WordPress
 */
//utilizar variables de entorno


// ** Configuración de CORS para la API REST **
if ( strpos($_SERVER['REQUEST_URI'], '/wp-json/') !== false ) {
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Methods: GET");
    header("Access-Control-Allow-Credentials: true");
    header("Access-Control-Expose-Headers: X-WP-Total, X-WP-TotalPages");
}

// ** Forzar headless: Solo se procesan solicitudes a la API REST, wp-admin o login **
$uri = $_SERVER['REQUEST_URI'];
if (
    strpos($uri, '/wp-json/') === false &&
    strpos($uri, '/wp-admin/') === false &&
    strpos($uri, 'wp-login.php') === false &&
    strpos($uri, 'admin-ajax.php') === false // necesario para algunas funciones del admin
) {
    header('Content-Type: application/json');
    echo json_encode([
        'error' => 'Esta instalación de WordPress opera en modo headless. ' .
                   'Para consumir contenido, accede a la API REST en https://yamid.dev/wordpress/wp-json/'
    ]);
    exit;
}

/** Nombre de la base de datos para WordPress */
define( 'DB_NAME', 'u746779302_wordpress' );

/** Nombre de usuario de la base de datos */
define( 'DB_USER', 'u746779302_admin' );

/** Contraseña de la base de datos */
define( 'DB_PASSWORD', 'pVHhB91Q7w1U' );

/** Host de la base de datos */
define( 'DB_HOST', '82.197.82.41' );

/** Codificación de caracteres para la base de datos */
define( 'DB_CHARSET', 'utf8mb4' );

/** Collate de la base de datos. No cambiar si no estás seguro. */
define( 'DB_COLLATE', '' );

/**#@+
 * Claves únicas de autenticación y salts.
 * Genera nuevas aquí: https://api.wordpress.org/secret-key/1.1/salt/
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
 * Prefijo para las tablas de la base de datos.
 */
$table_prefix = 'wp_';

/**
 * Modo de depuración en WordPress.
 */
define( 'WP_DEBUG', false );

/* Ruta absoluta al directorio de WordPress */
if ( ! defined( 'ABSPATH' ) ) {
	define( 'ABSPATH', __DIR__ . '/' );
}

/** Configura las variables y archivos de WordPress. */
require_once ABSPATH . 'wp-settings.php';
