FROM node:18-alpine AS builder

WORKDIR /app

# 의존성 파일 복사
COPY package.json pnpm-lock.yaml ./
COPY turbo.json ./
COPY apps/server/package.json ./apps/server/
COPY apps/web/package.json ./apps/web/
COPY packages/ui/package.json ./packages/ui/
COPY packages/eslint-config/package.json ./packages/eslint-config/
COPY packages/typescript-config/package.json ./packages/typescript-config/

# pnpm 설치 및 의존성 설치 (개발 의존성 포함)
RUN npm install -g pnpm
RUN pnpm install --frozen-lockfile

# 소스 코드 복사
COPY . .

# 필요한 타입 정의 파일과 의존성 추가 설치
WORKDIR /app/apps/web
RUN pnpm add -D @types/jest @testing-library/jest-dom vite @vitejs/plugin-react

# 프로젝트 루트로 돌아가서 빌드
WORKDIR /app
# 개별 패키지 빌드가 아닌 turborepo 자체 build 스크립트 사용
RUN pnpm turbo build

# 최종 이미지 생성
FROM node:18-alpine

WORKDIR /app

# pnpm 설치
RUN npm install -g pnpm

# 패키지 파일 복사
COPY --from=builder /app/package.json /app/pnpm-lock.yaml ./
COPY --from=builder /app/apps/server/package.json ./apps/server/
COPY --from=builder /app/apps/web/package.json ./apps/web/
COPY --from=builder /app/packages/ui/package.json ./packages/ui/

# 프로덕션 의존성만 설치
RUN pnpm install --prod --frozen-lockfile

# 빌드된 패키지 복사
COPY --from=builder /app/packages/ui/dist ./packages/ui/dist
COPY --from=builder /app/apps/server/dist ./apps/server/dist
COPY --from=builder /app/apps/web/dist ./apps/web/dist

# 서버 포트 노출
EXPOSE 8000

# 앱 실행
WORKDIR /app/apps/server
CMD ["node", "dist/index.js"]