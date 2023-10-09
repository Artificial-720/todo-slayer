# Base image
FROM python:3.8

WORKDIR /app

# Copy files
COPY src /app/mysite
COPY requirements.txt /app/
COPY manage.py /app/

# Install dependencies
RUN pip3 install -r requirements.txt

# Expose port 8000 for web traffic
EXPOSE 8000

# start server  
CMD python manage.py runserver --noreload