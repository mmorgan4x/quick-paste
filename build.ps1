

# build
npm run build

# remove old files
Get-ChildItem -Path dist | Remove-Item -recurse 

# copy files
Copy-Item manifest.json -Destination dist
Copy-Item images -Destination dist -Recurse
Get-ChildItem  -Filter *.js | Copy-Item -Destination dist
Get-ChildItem  -Filter *.css | Copy-Item -Destination dist
Get-ChildItem  -Filter *.html | Copy-Item -Destination dist

# copy libraries
md dist/node_modules/bootstrap/dist/css
Copy-Item node_modules/bootstrap/dist/css/bootstrap.min.css -Destination dist/node_modules/bootstrap/dist/css/bootstrap.min.css

md dist/node_modules/bootstrap-icons/font/fonts
Copy-Item node_modules/bootstrap-icons/font/bootstrap-icons.css -Destination dist/node_modules/bootstrap-icons/font/bootstrap-icons.css
Copy-Item node_modules/bootstrap-icons/font/fonts/bootstrap-icons.woff -Destination dist/node_modules/bootstrap-icons/font/fonts/bootstrap-icons.woff
Copy-Item node_modules/bootstrap-icons/font/fonts/bootstrap-icons.woff2 -Destination dist/node_modules/bootstrap-icons/font/fonts/bootstrap-icons.woff2

md dist/node_modules/jquery/dist
Copy-Item node_modules/jquery/dist/jquery.slim.min.js -Destination dist/node_modules/jquery/dist/jquery.slim.min.js

md dist/node_modules/bootstrap/dist/js
Copy-Item node_modules/bootstrap/dist/js/bootstrap.bundle.min.js -Destination dist/node_modules/bootstrap/dist/js/bootstrap.bundle.min.js

# create .zip
Compress-Archive -Path dist/* -DestinationPath build.zip -Force