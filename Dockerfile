FROM nginx:alpine

# Copier les fichiers du site statique vers le dossier par défaut de Nginx
COPY . /usr/share/nginx/html

# Exposer le port 80 (Railway saura automatiquement router le trafic vers ce port)
EXPOSE 80

# Démarrer Nginx
CMD ["nginx", "-g", "daemon off;"]
