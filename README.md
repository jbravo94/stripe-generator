# Stripe Generator
![Screenshot](screenshot.png?raw=true "Screenshot")

## Prepare
* Install Node e.g. via `nvm install 22`
* Install globally pnpm and angular cli `npm install -g pnpm @angular/cli`
* Install dependencies `pnpm i`

## Start
* Start locally with `ng --host 0.0.0.0 serve`

## Build
* Build with url path and `ng build --configuration production --base-href=stripe-generator`

## Deploy

### Ubuntu Apache Webserver 
* Copy the folder `dist/stripe-generator/browser` under `/var/www/html/stripe-generator`
* Add a redirection rule `Redirect 301 /stripe-generator/stripe-generator/stripe-generator /stripe-generator` in your appropriate config under `/etc/apache2/sites-available` and restart apache via `systemctl restart apache2`


# TODO
* Add multiple colors via extendable list
* Fix reset for advanced config if less that 4 items

# Sources
* https://www.w3.org/wiki/CSS3/Color/Extended_color_keywords
* https://github.com/dtao/nearest-color/blob/master/nearestColor.js
* https://stackoverflow.com/a/28933315
