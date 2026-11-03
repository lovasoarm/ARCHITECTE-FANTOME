FROM python:3.12-slim

ENV PYTHONDONTWRITEBYTECODE=1 \
    PYTHONUNBUFFERED=1 \
    AF_HOST=0.0.0.0 \
    AF_PORT=8080

WORKDIR /app
COPY service.py /app/service.py
RUN addgroup --system --gid 10001 af \
    && adduser --system --uid 10001 --ingroup af af
USER 10001:10001
EXPOSE 8080
HEALTHCHECK --interval=15s --timeout=3s --start-period=5s --retries=3 \
  CMD python -c "import urllib.request; urllib.request.urlopen('http://127.0.0.1:8080/readyz', timeout=2)"
CMD ["python", "service.py", "--host", "0.0.0.0", "--port", "8080"]
