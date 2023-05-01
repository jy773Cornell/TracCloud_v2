FROM python:3.8

RUN apt-get update && apt-get install -y \
    unoconv \
    libreoffice \
    && rm -rf /var/lib/apt/lists/*

COPY requirements.txt /app/requirements.txt

RUN pip install --no-cache-dir -r /app/requirements.txt

COPY . /app

WORKDIR /app

EXPOSE 8000

CMD ["gunicorn", "--bind", "0.0.0.0:8000", "TracCloud.wsgi:application"]
