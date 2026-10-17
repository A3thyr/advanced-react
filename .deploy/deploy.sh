cd ~/advanced-react
npm run build:prod 

rm -rf ~/../var/www/advanced-react/html
mv ~/advanced-react/build ~/../var/www/advanced-react/html