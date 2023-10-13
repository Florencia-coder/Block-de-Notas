#!/bin/bash

frontend_path='../frontend'
backend_path='./backend'

frontend_command="npm start"
backend_command="npm run dev"

# Función para realizar acciones de limpieza antes de salir
function cleanup() {
    echo "Deteniendo el frontend..."
    kill -SIGINT $frontend_pid

    echo "Deteniendo el backend..."
    kill -SIGINT $backend_pid

    echo "El proyecto se ha detenido."
}

# Establecer la función de limpieza para la señal SIGINT
trap cleanup SIGINT

# Establezco la contraseña para hacerlo automatico
export PGPASSWORD="express"

# Verifico si la base de datos existe
echo "Verificando si la base de datos ya existe..."
if psql -U express -h localhost -p 5432 -lqt | cut -d \| -f 1 | grep -qw "my_db"; then
    echo "La base de datos 'my_db' ya existe. No es necesario crearla."
else
    # Creamos la base de datos de PostgreSQL
    echo "Creando la base de datos de PostgreSQL..."
    createdb -U express -h localhost -p 5432 my_db

    # Verifico si la creacion de la base de datos fue exitosa
    if [ $? -eq 0 ]; then
        echo "Base de datos creada correctamente."
    else
        echo "Error al crear la base de datos. Asegúrate de tener PostgreSQL instalado y configurado correctamente."
        exit 1
    fi
fi

echo "Configurando y ejecutando el backend..."
cd $backend_path
npm install 
$backend_command &
backend_pid=$!

sleep 10

echo "Configurando y ejecutando el frontend en una nueva terminal..."
gnome-terminal --working-directory=$frontend_path -- bash -c "npm install; $frontend_command"

while true; do
    sleep 1
done