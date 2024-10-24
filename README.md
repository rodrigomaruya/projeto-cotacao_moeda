## Currency Rate Tracker

Este é um projeto de um rastreador de cotações de moedas, desenvolvido com React, TypeScript e estilizado com Tailwind CSS. A aplicação consome uma API para obter a cotação de várias moedas e atualiza automaticamente a cada 30 segundos.

# Funcionalidades

- Exibe cotações de várias moedas em tempo real.
- Atualização automática a cada 50 segundos.
- Design responsivo, otimizando a experiência tanto em desktop quanto em dispositivos móveis.
- Interface simples e elegante, utilizando Tailwind CSS para estilização.

# Tecnologia Utilizadas

- React: Biblioteca JavaScript para construção da interface.
- TypeScript: Superset de JavaScript, trazendo tipagem estática.
- Tailwind CSS: Framework de CSS para estilização rápida e responsiva.
- API de Cotação de Moedas: Utilizada para obter os dados atualizados das cotações.
- Axios: Para fazer as requisições HTTP à API.

# Como funciona

- O projeto faz uma requisição à API para obter as cotações das moedas e exibe os resultados em um layout responsivo.
- Um intervalo de 50 segundos (usando setInterval) é utilizado para atualizar as cotações automaticamente.

# Exemplo de uso

- Ao acessar a aplicação, o usuário verá uma lista de moedas com suas respectivas cotações em relação a uma moeda de referência (como USD).
- As cotações são atualizadas automaticamente a cada 50 segundos, permitindo ao usuário acompanhar as flutuações do mercado em tempo real.
