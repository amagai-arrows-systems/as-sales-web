#!/bin/bash

# --- 設定 ---
# 1. あなたのコンテナ名またはID
CONTAINER_NAME="serena_mcp"

# 2. コンテナ内でのプロジェクトのデフォルトパス (例: /app や /workspace)
DEFAULT_PROJECT_PATH="/workspaces/pdev/apps/sales_support/as-sales-web"

# --- 実行処理 ---
# 第一引数があればそれを使用、なければデフォルト値を使用
TARGET_PATH="${1:-$DEFAULT_PROJECT_PATH}"

echo "🔄 Re-indexing Serena project in container: ${CONTAINER_NAME}..."
echo "📍 Target Path: ${TARGET_PATH}"

# プロジェクトのオンボーディング（インデックス作成）を実行
# 注意: TARGET_PATH はコンテナ内から見たパスである必要があります
docker exec -it -w $TARGET_PATH $CONTAINER_NAME \
  uvx --from git+https://github.com/oraios/serena serena project index

if [ $? -eq 0 ]; then
    echo "✅ Success: Indexing complete for ${TARGET_PATH}"
else
    echo "❌ Error: Indexing failed."
    exit 1
fi
