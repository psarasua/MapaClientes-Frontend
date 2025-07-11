#!/bin/bash
echo "Starting application on port ${PORT:-3000}"
npx serve -s dist -l ${PORT:-3000} --host 0.0.0.0
