# 1. 빌드용 베이스 이미지 설정
FROM node:18-alpine AS builder

WORKDIR /app

# 2. pnpm 설치
RUN npm install -g pnpm

# 3. 의존성 파일 복사
COPY package.json pnpm-lock.yaml turbo.json ./
COPY apps/server/package.json ./apps/server/
COPY apps/web/package.json ./apps/web/
COPY packages/ui/package.json ./packages/ui/
COPY packages/eslint-config/package.json ./packages/eslint-config/
COPY packages/typescript-config/package.json ./packages/typescript-config/

# 4. 전체 소스 코드 복사
COPY . .

# 5. 의존성 설치 및 빌드
RUN pnpm install -r
RUN pnpm build

# 최종 프로덕션 이미지
FROM node:18-alpine

WORKDIR /app

# pnpm 설치
RUN npm install -g pnpm

# 서버 관련 파일 복사
COPY --from=builder /app/apps/server/dist ./dist
COPY --from=builder /app/apps/server/package.json ./package.json
COPY --from=builder /app/pnpm-lock.yaml ./pnpm-lock.yaml

# 프로덕션 의존성 설치
WORKDIR /app
RUN pnpm install --prod

# 서버 포트 노출
EXPOSE 8000

# 앱 실행
CMD ["node", "dist/index.js"]