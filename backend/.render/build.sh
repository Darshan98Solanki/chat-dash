#!/usr/bin/env bash

# Force use of npm instead of Bun
export PATH="/opt/render/project/.render/node/bin:$PATH"

npm install
npm run build
