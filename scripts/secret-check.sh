#!/bin/bash
# ==============================================================
# secret-check.sh
# コードベースにシークレット情報が含まれていないかチェックする
# 使い方: bash scripts/secret-check.sh
# ==============================================================

set -e

RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo "🔒 シークレット情報チェックを開始します..."
echo "================================================"

FOUND=0

# --------------------------------------------------------------
# 1. 環境変数のハードコードチェック
#    .env*, node_modules, .next, .git は除外
# --------------------------------------------------------------
echo ""
echo "📋 チェック1: APIキー・トークンのハードコード"

# microCMS APIキーのパターン
MICROCMS_HITS=$(grep -rn --include="*.ts" --include="*.tsx" --include="*.js" --include="*.jsx" --include="*.json" \
  -E "(X-MICROCMS-API-KEY|MICROCMS_API_KEY|microcms.*api.*key)\s*[:=]\s*['\"][a-zA-Z0-9]" \
  --exclude-dir=node_modules --exclude-dir=.next --exclude-dir=.git \
  . 2>/dev/null || true)

if [ -n "$MICROCMS_HITS" ]; then
  echo -e "${RED}❌ microCMS APIキーのハードコードを検出:${NC}"
  echo "$MICROCMS_HITS"
  FOUND=1
fi

# 一般的なAPIキー・シークレットのパターン
GENERAL_HITS=$(grep -rn --include="*.ts" --include="*.tsx" --include="*.js" --include="*.jsx" \
  -E "(api_key|apikey|api_secret|secret_key|access_token|auth_token|private_key)\s*[:=]\s*['\"][a-zA-Z0-9]" \
  --exclude-dir=node_modules --exclude-dir=.next --exclude-dir=.git \
  -i . 2>/dev/null || true)

if [ -n "$GENERAL_HITS" ]; then
  echo -e "${RED}❌ APIキー/シークレットのハードコードを検出:${NC}"
  echo "$GENERAL_HITS"
  FOUND=1
fi

# Vercelトークン
VERCEL_HITS=$(grep -rn --include="*.ts" --include="*.tsx" --include="*.js" --include="*.jsx" \
  -E "(VERCEL_TOKEN|vercel.*token)\s*[:=]\s*['\"][a-zA-Z0-9]" \
  --exclude-dir=node_modules --exclude-dir=.next --exclude-dir=.git \
  . 2>/dev/null || true)

if [ -n "$VERCEL_HITS" ]; then
  echo -e "${RED}❌ Vercelトークンのハードコードを検出:${NC}"
  echo "$VERCEL_HITS"
  FOUND=1
fi

# --------------------------------------------------------------
# 2. .env.local が .gitignore に含まれているかチェック
# --------------------------------------------------------------
echo ""
echo "📋 チェック2: .gitignore の設定"

if [ -f .gitignore ]; then
  if grep -qE '\.env\.local|\.env\*\.local|\.env\*' .gitignore; then
    echo -e "${GREEN}✅ .env.local は .gitignore に含まれています${NC}"
  else
    echo -e "${RED}❌ .env.local が .gitignore に含まれていません！${NC}"
    echo "   → .gitignore に .env.local を追加してください"
    FOUND=1
  fi

  if grep -q "\.env\b" .gitignore || grep -q "\.env\*" .gitignore; then
    echo -e "${GREEN}✅ .env ファイルは .gitignore に含まれています${NC}"
  else
    echo -e "${YELLOW}⚠️  .env が .gitignore に含まれていない可能性があります（確認推奨）${NC}"
  fi
else
  echo -e "${RED}❌ .gitignore ファイルが見つかりません！${NC}"
  FOUND=1
fi

# --------------------------------------------------------------
# 3. .env ファイルがgit追跡されていないかチェック
# --------------------------------------------------------------
echo ""
echo "📋 チェック3: .env ファイルのgit追跡状態"

ENV_TRACKED=$(git ls-files --cached "*.env" ".env.*" 2>/dev/null || true)

if [ -n "$ENV_TRACKED" ]; then
  echo -e "${RED}❌ 以下の.envファイルがgitに追跡されています:${NC}"
  echo "$ENV_TRACKED"
  echo "   → git rm --cached <ファイル名> で追跡を解除してください"
  FOUND=1
else
  echo -e "${GREEN}✅ .env ファイルはgitに追跡されていません${NC}"
fi

# --------------------------------------------------------------
# 4. console.log でシークレットを出力していないかチェック
# --------------------------------------------------------------
echo ""
echo "📋 チェック4: console.log でのシークレット出力"

CONSOLE_HITS=$(grep -rn --include="*.ts" --include="*.tsx" --include="*.js" --include="*.jsx" \
  -E "console\.(log|debug|info)\(.*process\.env\." \
  --exclude-dir=node_modules --exclude-dir=.next --exclude-dir=.git \
  . 2>/dev/null || true)

if [ -n "$CONSOLE_HITS" ]; then
  echo -e "${RED}❌ console.log で環境変数を出力しているコードを検出:${NC}"
  echo "$CONSOLE_HITS"
  FOUND=1
else
  echo -e "${GREEN}✅ console.log でのシークレット出力は検出されませんでした${NC}"
fi

# --------------------------------------------------------------
# 5. dangerouslySetInnerHTML の使用チェック
# --------------------------------------------------------------
echo ""
echo "📋 チェック5: dangerouslySetInnerHTML の使用"

DANGEROUS_HITS=$(grep -rn --include="*.ts" --include="*.tsx" --include="*.js" --include="*.jsx" \
  "dangerouslySetInnerHTML" \
  --exclude-dir=node_modules --exclude-dir=.next --exclude-dir=.git \
  . 2>/dev/null || true)

if [ -n "$DANGEROUS_HITS" ]; then
  echo -e "${YELLOW}⚠️  dangerouslySetInnerHTML の使用を検出（要確認）:${NC}"
  echo "$DANGEROUS_HITS"
else
  echo -e "${GREEN}✅ dangerouslySetInnerHTML は使用されていません${NC}"
fi

# --------------------------------------------------------------
# 結果サマリー
# --------------------------------------------------------------
echo ""
echo "================================================"
if [ $FOUND -eq 0 ]; then
  echo -e "${GREEN}✅ チェック完了: 問題は検出されませんでした${NC}"
  echo "   → ビルド・pushに進んでOKです"
  exit 0
else
  echo -e "${RED}❌ チェック完了: 問題が検出されました${NC}"
  echo "   → 上記の問題を修正してから再度チェックしてください"
  echo -e "${RED}   → 問題が解消されるまで push しないでください${NC}"
  exit 1
fi
