@echo off
setlocal

echo === Limpiar carpeta docs (opcional) ===
if exist docs rmdir /S /Q docs
mkdir docs

echo === Build Angular ===
call ng build --configuration production --base-href /melody/ --output-path docs

echo === Copiar archivos desde browser ===
if exist docs\browser\xcopy_marker.txt (
  rem nada
) else (
  rem solo para evitar prompts extraños si no hay nada
)
xcopy /E /I /Y docs\browser\* docs\

echo === Crear 404.html ===
copy /Y docs\index.html docs\404.html >nul

echo === Crear .nojekyll ===
type NUL > docs\.nojekyll

echo === Git commit & push ===
git add docs
git commit -m "deploy: auto build y deploy" || echo No hay cambios para commitear
git push origin main

echo === Deploy completo 🚀 ===
pause
endlocal
