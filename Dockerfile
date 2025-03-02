FROM node:18-alpine AS builder

WORKDIR /app

# 의존성 파일 복사
COPY package.json pnpm-lock.yaml ./
COPY apps/server/package.json ./apps/server/
COPY apps/web/package.json ./apps/web/
COPY packages/ui/package.json ./packages/ui/

# pnpm 설치 및 의존성 설치
RUN npm install -g pnpm
RUN pnpm install --frozen-lockfile

# 소스 코드 복사
COPY . .

# 워크스페이스 전체 빌드 (Turborepo는 빌드 순서를 자동으로 처리)
RUN pnpm -w run build

# 최종 이미지 생성
FROM node:18-alpine

WORKDIR /app

# pnpm 설치
RUN npm install -g pnpm

# 서버 의존성만 복사
COPY --from=builder /app/package.json /app/pnpm-lock.yaml ./
COPY --from=builder /app/apps/server/package.json ./apps/server/
COPY --from=builder /app/packages/ui/package.json ./packages/ui/

# 프로덕션 의존성만 설치
RUN pnpm install --prod --frozen-lockfile

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