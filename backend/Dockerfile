# FROM python:3.6.10
# # We copy just the requirements.txt first to leverage Docker cache
# COPY ./requirements.txt /app/requirements.txt

# WORKDIR /app

# RUN pip install -r requirements.txt

# COPY . /app

# ENTRYPOINT [ "python3" ]

# CMD [ "run.py" ]

# FROM python:3.6.1-alpine
# WORKDIR /app
# ADD . /app
# RUN pip install -r requirements.txt
# CMD ["python","run.py"]

FROM ubuntu:16.04

RUN apt-get update -y && \
    apt-get install -y python-pip python-dev 

# We copy just the requirements.txt first to leverage Docker cache
COPY ./requirements.txt /app/requirements.txt

WORKDIR /app

RUN pip install --upgrade pip

RUN python -m pip install -r requirements.txt

COPY . /app

ENTRYPOINT [ "python" ]

CMD [ "run.py" ]