<?php
declare(strict_types=1);
require __DIR__ . '/../vendor/autoload.php';

use Twig\Environment;
use Twig\Loader\FilesystemLoader;

// 👇 Enable temporarily to see exact errors while testing
error_reporting(E_ALL);
ini_set('display_errors', '1');

$loader = new FilesystemLoader(__DIR__ . '/../templates');
$twig   = new Environment($loader, [
  'cache' => false,
  'autoescape' => 'html',
]);

$path = parse_url($_SERVER['REQUEST_URI'] ?? '/', PHP_URL_PATH) ?: '/';

function render(Environment $twig, string $tpl, array $data = []): void {
  echo $twig->render($tpl, $data);
  exit;
}

switch ($path) {
  case '/':
    render($twig, 'landing.twig', ['title' => 'TicketFlow — Home']);
    break;

  case '/auth/login':
    render($twig, 'auth-login.twig', ['title' => 'Login']);
    break;

  case '/auth/signup':
    render($twig, 'auth-signup.twig', ['title' => 'Sign up']);
    break;

  case '/dashboard':
    render($twig, 'dashboard.twig', ['title' => 'Dashboard', 'protected' => true]);
    break;

  case '/tickets':
  case '/tickets/new':
    render($twig, 'tickets.twig', ['title' => 'Tickets', 'protected' => true]);
    break;

  default:
    http_response_code(404);
    render($twig, '404.twig', ['title' => 'Page Not Found']);
    break;
}