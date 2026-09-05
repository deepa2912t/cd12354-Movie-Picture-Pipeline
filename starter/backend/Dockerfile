FROM public.ecr.aws/docker/library/python:3.10-alpine
ENV FLASK_RUN_HOST=0.0.0.0

WORKDIR /

# Create the non-root user first
RUN adduser -u 1000 -D app

# Create directories and grant ownership to the 'app' user before switching
RUN mkdir -p /var/www/app /app && \
    chown -R app:app /var/www/app /app

RUN apk update && \
  apk add \
  pcre \
  pcre-dev \
  build-base \
  gcc \
  linux-headers \
  openssl \
  libffi-dev \
  && pip install pipenv

# Copy dependency files into /app
COPY Pipfile* /app/

# Suppress GCC 15 incompatible pointer type error for uwsgi
ENV CFLAGS="-Wno-error=incompatible-pointer-types"
RUN cd /app && pipenv install --system --deploy

# Copy project files
COPY . /app

# Switch to non-root user for security
USER app

WORKDIR /app

# Exec form for CMD ensures signals like SIGTERM pass correctly
CMD ["uwsgi", "--http", ":5000", "--master", "--enable-threads", "-s", "/var/www/app/app.sock", "--manage-script-name", "--mount", "/=app:app"]