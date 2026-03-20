#!/bin/bash
# Claude Code 권한 요청/알림 → Slack 전송 훅

# UTF-8 인코딩 설정 (한글 지원)
export LANG=ko_KR.UTF-8
export LC_ALL=ko_KR.UTF-8

# stdin에서 JSON 읽기
json_input=$(cat)

# jq로 필드 추출 (설치되지 않으면 기본값 사용)
if command -v jq &> /dev/null; then
  title=$(echo "$json_input" | jq -r '.title // "알림"')
  message=$(echo "$json_input" | jq -r '.message // ""')
  session_id=$(echo "$json_input" | jq -r '.session_id // ""' | cut -c1-8)
else
  # jq 없을 시 grep으로 간단히 처리
  title=$(echo "$json_input" | grep -o '"title":"[^"]*"' | cut -d'"' -f4 || echo "알림")
  message=$(echo "$json_input" | grep -o '"message":"[^"]*"' | cut -d'"' -f4 || echo "")
  session_id=$(echo "$json_input" | grep -o '"session_id":"[^"]*"' | cut -d'"' -f4 | cut -c1-8 || echo "")
fi

# .env.local에서 SLACK_WEBHOOK_URL 로드
slack_webhook=""
if [ -f ".env.local" ]; then
  slack_webhook=$(grep "^SLACK_WEBHOOK_URL=" .env.local | cut -d'=' -f2)
fi

# URL이 없으면 종료
[ -z "$slack_webhook" ] && exit 0

# 프로젝트명 추출
project_name=$(basename "$PWD")

# Slack 메시지 본문 (줄바꿈 포함)
slack_message="프로젝트: \`$project_name\`
세션: \`$session_id\`
내용: $message"

# JSON 페이로드 생성 (jq로 안전하게 처리)
timestamp=$(date "+%Y-%m-%d %H:%M:%S")

if command -v jq &> /dev/null; then
  payload=$(jq -n \
    --arg title "🔔 $title" \
    --arg text "$slack_message" \
    --arg footer "Claude Code • $timestamp" \
    '{attachments: [{color: "warning", title: $title, text: $text, footer: $footer, mrkdwn_in: ["text"]}]}')
else
  # jq 없을 경우 기본 방식 사용 (한글 보장 안 됨)
  payload=$(cat <<EOF
{
  "attachments": [{
    "color": "warning",
    "title": "🔔 $title",
    "text": "$slack_message",
    "footer": "Claude Code • $timestamp",
    "mrkdwn_in": ["text"]
  }]
}
EOF
  )
fi

# Slack에 전송 (백그라운드)
curl -s -o /dev/null \
  -H "Content-Type: application/json; charset=utf-8" \
  -d "$payload" \
  "$slack_webhook" &

exit 0
