#!/usr/bin/env bash
# Build local + rsync vers le LXC Caddy.
# Usage :
#   REMOTE=user@leonheu.fr REMOTE_PATH=/var/www/leonheu.fr ./deploy/deploy-rsync.sh
#
# Pré-requis sur le serveur :
#   - Caddy installé et configuré (voir deploy/Caddyfile)
#   - /var/www/leonheu.fr existe et appartient à l'utilisateur SSH

set -euo pipefail

: "${REMOTE:?missing REMOTE (ex: REMOTE=user@leonheu.fr)}"
: "${REMOTE_PATH:?missing REMOTE_PATH (ex: REMOTE_PATH=/var/www/leonheu.fr)}"

ROOT="$(git rev-parse --show-toplevel)"
cd "$ROOT"

echo "→ build local"
pnpm install --frozen-lockfile
pnpm build

echo "→ rsync vers $REMOTE:$REMOTE_PATH"
rsync -avz --delete \
    --chmod=Du=rwx,Dgo=rx,Fu=rw,Fgo=r \
    dist/ "$REMOTE:$REMOTE_PATH/"

echo "→ terminé. Caddy lit depuis le filesystem, pas de redémarrage nécessaire."
