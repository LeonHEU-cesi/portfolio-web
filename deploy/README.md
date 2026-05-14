# Déploiement

Le site est généré en HTML statique (`pnpm build` → `dist/`). N'importe quel serveur HTTP peut le servir. Ce dossier propose deux options ; choisis celle qui te convient.

| Option | Pour qui | Fichiers |
|--------|----------|----------|
| **Caddy LXC** | Self-host Proxmox, HTTPS auto, config minimaliste | `Caddyfile`, `deploy-rsync.sh` |
| **Docker nginx** | Conteneurisé, portable, prêt à pousser sur un registry | `Dockerfile`, `nginx.conf`, `docker-compose.yml` |

## Pré-requis DNS

Avant toute option, pointer le domaine sur l'IP du host :

```
leonheu.fr.        A    <IP du LXC / host Docker>
www.leonheu.fr.    A    <même IP>
```

Vérifier : `dig +short leonheu.fr` doit retourner l'IP.

---

## Option 1 — Caddy LXC sur Proxmox (recommandée)

**Pourquoi :** HTTPS auto via Let's Encrypt, config en 20 lignes, pas de reverse proxy à gérer, mises à jour faciles.

### Installation initiale (une seule fois)

Sur le LXC Debian/Ubuntu :

```bash
# Caddy via le repo officiel
sudo apt install -y debian-keyring debian-archive-keyring apt-transport-https curl
curl -1sLf 'https://dl.cloudsmith.io/public/caddy/stable/gpg.key' | sudo gpg --dearmor -o /usr/share/keyrings/caddy-stable-archive-keyring.gpg
curl -1sLf 'https://dl.cloudsmith.io/public/caddy/stable/debian.deb.txt' | sudo tee /etc/apt/sources.list.d/caddy-stable.list
sudo apt update && sudo apt install -y caddy

# Dossier de service
sudo mkdir -p /var/www/leonheu.fr
sudo chown -R caddy:caddy /var/www/leonheu.fr
```

Copier le `Caddyfile` de ce dossier dans `/etc/caddy/Caddyfile` et reload :

```bash
sudo cp deploy/Caddyfile /etc/caddy/Caddyfile
sudo systemctl reload caddy
```

Caddy obtient automatiquement le certificat Let's Encrypt sur le premier accès HTTP.

### Déploiement des mises à jour

Depuis ton poste local, après chaque modification mergée sur `main` :

```bash
REMOTE=user@leonheu.fr REMOTE_PATH=/var/www/leonheu.fr ./deploy/deploy-rsync.sh
```

Le script :
1. Build local (`pnpm install --frozen-lockfile && pnpm build`)
2. rsync de `dist/` vers le LXC (avec `--delete` pour supprimer les fichiers obsolètes)

Pas de redémarrage de Caddy nécessaire — il lit depuis le filesystem.

---

## Option 2 — Docker nginx

**Pourquoi :** image autonome, peut tourner sur un host Docker / Kubernetes / Coolify / Dokploy, pas de SSH à gérer.

### Build local

```bash
docker build -f deploy/Dockerfile -t leonheu-fr:latest .
docker run --rm -p 8080:80 leonheu-fr:latest
# → http://localhost:8080
```

### Avec compose

```bash
docker compose -f deploy/docker-compose.yml up -d
```

### HTTPS

Le `Dockerfile` ne gère pas TLS — placer derrière un reverse proxy qui termine SSL (Caddy, Traefik, Nginx Proxy Manager). Exemple Caddy minimaliste devant le conteneur :

```caddy
leonheu.fr {
    reverse_proxy localhost:8080
}
```

### Push sur un registry

```bash
docker tag leonheu-fr:latest registry.example.com/leonheu-fr:latest
docker push registry.example.com/leonheu-fr:latest
```

---

## Vérifications post-déploiement

- `curl -I https://leonheu.fr` → `200 OK`
- `https://leonheu.fr/sitemap-index.xml` accessible
- `https://leonheu.fr/robots.txt` accessible
- `https://leonheu.fr/rss-fr.xml` valide (vérifier sur https://validator.w3.org/feed/)
- `https://leonheu.fr/zzz-inexistant` → 404 stylée
- `https://leonheu.fr/en/` charge en anglais
- Lighthouse mobile (DevTools → Lighthouse) ≥ 95 partout

## Avant la première mise en ligne

- [ ] Remplacer `public/cv/.gitkeep` par les vrais PDFs `leon-heu-cv-fr.pdf` + `leon-heu-cv-en.pdf`
- [ ] Ajouter une image Open Graph `public/og/og-default.jpg` (1200×630)
- [ ] Mettre à jour `src/data/site.ts` (LinkedIn URL exacte si différente)
- [ ] Ajouter de vrais projets dans `src/content/projects/`
- [ ] Décommenter la ligne `Strict-Transport-Security` dans `Caddyfile` une fois HTTPS confirmé
