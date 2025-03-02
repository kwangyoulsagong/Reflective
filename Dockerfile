# 1. 빌드용 베이스 이미지 설정
FROM node:18-alpine AS builder

# 네이티브 모듈 컴파일을 위한 빌드 도구 추가
RUN apk add --no-cache python3 make g++

WORKDIR /app

# pnpm 설치
RUN npm install -g pnpm

# 의존성 파일 복사
COPY package.json pnpm-lock.yaml turbo.json ./
COPY apps/server/package.json ./apps/server/
COPY apps/web/package.json ./apps/web/
COPY packages/ui/package.json ./packages/ui/
COPY packages/eslint-config/package.json ./packages/eslint-config/
COPY packages/typescript-config/package.json ./packages/typescript-config/

# 전체 소스 코드 복사
COPY . .

# 네이티브 모듈 컴파일을 위한 환경 설정
ENV npm_config_target=18.20.7
ENV npm_config_arch=x64
ENV npm_config_target_arch=x64
ENV npm_config_build_from_source=true

# 의존성 설치 및 빌드
RUN pnpm install -r
RUN pnpm build

# 최종 프로덕션 이미지
FROM node:18-alpine

# 네이티브 모듈 컴파일을 위한 빌드 도구 추가
RUN apk add --no-cache python3 make g++

WORKDIR /app

# pnpm 설치
RUN npm install -g pnpm

# 서버 관련 파일 복사
COPY --from=builder /app/apps/server/dist ./dist
COPY --from=builder /app/apps/server/package.json ./package.json
COPY --from=builder /app/pnpm-lock.yaml ./pnpm-lock.yaml

# 네이티브 모듈 컴파일을 위한 환경 설정
ENV npm_config_target=18.20.7
ENV npm_config_arch=x64
ENV npm_config_target_arch=x64
ENV npm_config_build_from_source=true

# 프로덕션 의존성 설치 및 bcrypt 리빌드
RUN pnpm install --prod
RUN npm rebuild bcrypt

# 서버 포트 노출
EXPOSE 8000

# 앱 실행
CMD ["node", "dist/index.js"]