# Python 3.10 slim 베이스 이미지 사용
FROM python:3.10-slim

# 필수 OS 패키지 설치
RUN apt-get update && apt-get install -y \
    build-essential \
    cmake \
    g++ \
    libmagic1 \
    && rm -rf /var/lib/apt/lists/*

# 작업 디렉토리 설정
WORKDIR /app

# requirements.txt 파일을 컨테이너로 복사
COPY requirements.txt .

# 필요한 파이썬 패키지 설치
RUN pip install --no-cache-dir -r requirements.txt

# 현재 디렉토리의 모든 파일을 컨테이너에 복사
COPY . .

# 포트 노출
EXPOSE 8000

# 애플리케이션 실행
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
