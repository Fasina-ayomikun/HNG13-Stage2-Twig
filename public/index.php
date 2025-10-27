<?php
declare(strict_types=1);
require __DIR__ . '/../vendor/autoload.php';

use Twig\Environment;
use Twig\Loader\FilesystemLoader;

$loader = new FilesystemLoader(__DIR__ . '/../templates');
$twig   = new Environment($loader, [
  'cache' => false,                 // set to a writable dir in prod
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
  case '/auth/login':
    render($twig, 'auth/login.twig', ['title' => 'Login']);
  case '/auth/signup':
    render($twig, 'auth/signup.twig', ['title' => 'Sign up']);
  case '/dashboard':
    render($twig, 'dashboard.twig', ['title' => 'Dashboard', 'protected' => true]);
  case '/tickets':
  case '/tickets/new':
    render($twig, 'tickets.twig', ['title' => 'Tickets', 'protected' => true]);
  default:
    http_response_code(302);
    header('Location: /');
    exit;
}
