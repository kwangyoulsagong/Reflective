FROM node:18-alpine AS builder

WORKDIR /app

# 의존성 파일 복사
COPY package.json pnpm-lock.yaml ./
COPY apps/server/package.json ./apps/server/
COPY apps/web/package.json ./apps/web/
COPY packages/ui/package.json ./packages/ui/
COPY tsconfig.json ./

# pnpm 설치 및 의존성 설치 (개발 의존성 포함)
RUN npm install -g pnpm
RUN pnpm install --frozen-lockfile

# 필요한 타입 정의 파일 추가 설치
RUN pnpm add -D @types/jest @testing-library/jest-dom

# 소스 코드 복사
COPY . .

# 각 패키지 개별 빌드 (의존성 순서 고려)
WORKDIR /app
# UI 패키지 먼저 빌드
RUN pnpm --filter "@repo/ui" build
# 서버 빌드
RUN pnpm --filter "@repo/server" build
# 웹 빌드
RUN pnpm --filter "@repo/web" build

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