SHELL := /bin/bash


update:
	@echo "${Update_MSG}"
	@git add .
	@git commit -m "Update"
	@git push
	@echo "✨ Mise à jour terminée✨"
# Lancement du serveur local pour développement
dev:
	@echo "🌱 Lancement du serveur Jardins du Coeur..."
	@node serveur.js

# Installation des dépendances (Nouveau bot, Groq, etc.)
install:
	@npm install express groq-sdk node-telegram-bot-api dotenv cors
	@echo "📦 Dépendances installées."

# Nettoyage des logs de conversation (Soup.md)
clean-logs:
	@echo "" > docs/data/soup.md
	@echo "🧹 Mémoire 'Soup' réinitialisée."