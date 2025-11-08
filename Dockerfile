# Imagem base do Node.js
FROM node:20-alpine

# Diretório de trabalho dentro do container
WORKDIR /app

# Copia apenas arquivos de dependências
COPY package*.json ./

# Instala dependências
RUN npm install

# Copia o restante do código
COPY . .

# Expõe a porta padrão do Angular
EXPOSE 4200

# Comando padrão para desenvolvimento
#["npm", "run", "start", "--", "--proxy-config","src/proxy.conf.json","--host", "0.0.0.0"]
CMD ["npm", "run", "start", "--", "--host", "0.0.0.0"]