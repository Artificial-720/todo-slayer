# Official Apache image as the base image
FROM httpd:2.4

# Copy your HTML, JS, and CSS files to the appropriate location
# COPY ./html /usr/local/apache2/htdocs/
# COPY ./js /usr/local/apache2/htdocs/js
# COPY ./css /usr/local/apache2/htdocs/css
COPY ./src /usr/local/apache2/htdocs/

# Expose port 80 for web traffic
EXPOSE 80

# Start Apache in the foreground when the container is run
# CMD ["httpd", "-D", "FOREGROUND"]