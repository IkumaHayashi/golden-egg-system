
# Use the official lightweight Python image.
# https://hub.docker.com/_/python
FROM python:3.9.13-slim

# Allow statements and log messages to immediately appear in the Knative logs
ENV PYTHONUNBUFFERED True

# Copy local code to the container image.
ENV APP_HOME /app
WORKDIR $APP_HOME
COPY . ./

# Install production dependencies.
# RUN \
RUN apt-get update && apt-get install -y --no-install-recommends \
    gcc \
    g++ \
    unixodbc-dev \
    unixodbc \
    libpq-dev \
    zlib1g-dev \
    git
RUN python -m pip install --upgrade pip wheel setuptools
RUN pip install --no-cache-dir -r requirements.txt -t .
RUN rm -rf Arelle
RUN git clone https://github.com/Arelle/Arelle.git
RUN pip install -r ./Arelle/requirements.txt -t ./Arelle

# Run the web service on container startup. Here we use the gunicorn
# webserver, with one worker process and 8 threads.
# For environments with multiple CPU cores, increase the number of workers
# to be equal to the cores available.
# Timeout is set to 0 to disable the timeouts of the workers to allow Cloud Run to handle instance scaling.
CMD ["python", "main.py"]

FROM python:3.9.13-slim
ENV PYTHONUNBUFFERED True

# Copy local code to the container image.
ENV APP_HOME /app
WORKDIR $APP_HOME
COPY --from=0 /app /app
CMD ["python", "main.py"]