#!/bin/sh
echo "Aguardando o banco..."
until nc -z banco 5432; do
  sleep 1
done
echo "Banco pronto! Rodando migrations..."
yarn banco
yarn dev