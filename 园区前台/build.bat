@echo off
set
rem ---Dependency manager install begin---
echo Install dependencies...
if not defined USE_DEPENDENCY_MANAGER_INSTALL set USE_DEPENDENCY_MANAGER_INSTALL=true
if %USE_DEPENDENCY_MANAGER_INSTALL%==true call npm config get registry
if %USE_DEPENDENCY_MANAGER_INSTALL%==true call npm i -g npm
if %USE_DEPENDENCY_MANAGER_INSTALL%==true call npm i
rem ---Dependency manager install end---

rem ---Build begin---
echo Building files...
call npm run build
rem ---Build end---

rem ---Archive files begin---
echo Archive files...
if exist _tmp.7z rd _tmp.7z
cd dist
7z a ..\_tmp.7z .
cd ..
move _tmp.7z app.7z
rem ---Archive files end---
