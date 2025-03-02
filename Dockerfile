FROM node:18-alpine AS builder

WORKDIR /app

# 의존성 파일 복사 (공유 패키지 포함)
COPY package.json package-lock.json ./
COPY apps/server/package.json ./apps/server/
COPY apps/web/package.json ./apps/web/
COPY packages/ui/package.json ./packages/ui/  # UI 공통 패키지 추가

# 모노레포 의존성 설치
RUN npm ci

# 소스 코드 복사
COPY . .

# 공유 패키지 먼저 빌드
WORKDIR /app/packages/ui
RUN npm run build

# 웹 앱 빌드
WORKDIR /app/apps/web
RUN npm run build

# 서버 빌드
WORKDIR /app/apps/server
RUN npm run build

# 최종 이미지 생성
FROM node:18-alpine

WORKDIR /app

# 서버 의존성만 복사
COPY --from=builder /app/package.json /app/package-lock.json ./
COPY --from=builder /app/apps/server/package.json ./apps/server/
COPY --from=builder /app/packages/ui/package.json ./packages/ui/  # UI 패키지 package.json도 복사

# 프로덕션 의존성만 설치
RUN npm ci --only=production

# 빌드된 공유 패키지 복사
COPY --from=builder /app/packages/ui/dist ./packages/ui/dist

# 빌드된 서버 코드 복사
COPY --from=builder /app/apps/server/dist ./apps/server/dist

# 빌드된 웹 앱 복사
COPY --from=builder /app/apps/web/dist ./apps/web/dist

# 서버 포트 노출
EXPOSE 8000

# 앱 실행
WORKDIR /app/apps/server
CMD ["node", "dist/index.js"]