#!/bin/sh
echo "Aguardando o banco..."

until nc -z banco 5432; do
  sleep 1
done

echo "Banco pronto! Rodando migrations..."
npx sequelize-cli db:migrate && npx sequelize-cli db:seed:all

echo "Iniciando o servidor..."
yarn dev