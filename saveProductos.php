<?php
header('Content-Type: application/json; charset=utf-8');

$data = json_decode(file_get_contents('php://input'), true);
$file = 'productos.json';

if (file_exists($file)) {
    $currentData = json_decode(file_get_contents($file), true);
} else {
    $currentData = [];
}

$currentData[] = $data;

if (file_put_contents($file, json_encode($currentData, JSON_UNESCAPED_UNICODE))) {
    echo json_encode(['status' => 'success', 'message' => 'Producto guardado correctamente', 'data' => $data]);
} else {
    echo json_encode(['status' => 'error', 'message' => 'Error al guardar el producto']);
}
?>
