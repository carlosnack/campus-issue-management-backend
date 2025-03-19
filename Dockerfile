# Usa a imagem oficial do Node.js
FROM node:18-alpine 

# Copia os arquivos package.json e package-lock.json
COPY package*.json ./

# Instala as dependências
RUN npm install

# Copia o restante do código para dentro do container
COPY . .

# Expõe a porta que a aplicação irá rodar
EXPOSE 3000

# Comando para iniciar a aplicação
CMD ["node", "dist/main.js"]
