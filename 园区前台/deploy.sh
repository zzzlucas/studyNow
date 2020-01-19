#!/bin/bash

set -e
echo 'Check is correct set vars'
checkVars=('BUILD_TAG' 'SERVER_ROOT' 'SERVER_REAL_ROOT' 'SERVER_USER' 'SERVER_GROUP' 'SERVER_TMP_ROOT' 'SERVER_API')
for item in "${checkVars[@]}"
do
  if [ -z "${!item}" ]; then
    echo "Please export $item var."
    exit 1
  fi
done
export SERVER_REAL_BUILD_ROOT="$SERVER_REAL_ROOT/$BUILD_TAG"
echo '---Deploy begin---'
echo 'Remove temp app'
rm -rf app
echo 'Make app folder'
mkdir -p app
echo 'Extract files'
7za x -oapp -aoa app.7z
echo 'Change dir to app'
cd app
echo "Change backend api: $SERVER_API"
sed -i "s#window._CONFIG\['domianURL'\] = '/jeecg-boot'#window._CONFIG['domianURL'] = '$SERVER_API'#g" index.html
echo "Make version file"
echo $BUILD_TAG > .version
echo "Change dir back to $SERVER_TMP_ROOT"
cd $SERVER_TMP_ROOT
echo "Make target app folder $SERVER_REAL_ROOT"
mkdir -p $SERVER_REAL_ROOT
echo "Move files to $SERVER_REAL_BUILD_ROOT"
mv app $SERVER_REAL_BUILD_ROOT
echo "chown -R $SERVER_USER:$SERVER_GROUP $SERVER_REAL_BUILD_ROOT"
chown -R $SERVER_USER:$SERVER_GROUP $SERVER_REAL_BUILD_ROOT
echo "Remove $SERVER_ROOT"
rm -rf $SERVER_ROOT
echo "Link $SERVER_REAL_BUILD_ROOT to $SERVER_ROOT"
ln -s "$SERVER_REAL_BUILD_ROOT" "$SERVER_ROOT"
echo "chown -R $SERVER_USER:$SERVER_GROUP $SERVER_ROOT"
chown -R $SERVER_USER:$SERVER_GROUP $SERVER_ROOT

echo '---Deploy end---'
