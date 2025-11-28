# Batch-14 ERP — Student Enquiry Portal (Demo CI/CD)

This repository is a scaffolded React + Vite application designed for Batch-14 student enquiries with a ready GitHub Actions CI/CD workflow and Dockerfile.

## What you get
- Vite + React front-end (minimal)
- Dockerfile (multi-stage) that produces a static nginx image
- GitHub Actions workflow `.github/workflows/ci-cd.yml`:
  - runs tests
  - builds the app
  - on `main` branch builds and pushes a Docker image to GitHub Container Registry (ghcr.io)

## How to use locally
```bash
# install
npm ci

# dev server (http://localhost:3000)
npm run dev

# build
npm run build

# preview
npm run preview
```

## CI/CD notes
- The workflow pushes Docker image to ghcr.io using the built-in `GITHUB_TOKEN`. For public read access you may need to configure package visibility or create a PAT with `packages:write`.
- Update `tags` in workflow to include version tags, or push to Docker Hub by adding secrets and changing login step.

## Next steps I can help with
- Add backend API (Express) and show how to deploy
- Add automated tests and code coverage reporting
- Provide `terraform` or deployment manifests for Kubernetes/AWS/GCP
