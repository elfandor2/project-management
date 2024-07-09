# Gunakan image dasar Node.js resmi
FROM node:alpine

# Tentukan direktori kerja di dalam container
WORKDIR /usr/app

# Salin file package.json dan package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Salin semua file aplikasi ke dalam container
COPY . .

# Expose port 3000 untuk Node.js dan 27017 untuk MongoDB
EXPOSE 3000

# Tentukan perintah untuk menjalankan aplikasi
CMD ["npm", "start"]
