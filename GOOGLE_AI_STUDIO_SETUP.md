# 🚀 Social Skills — Google AI Studio & Gemini 2.0 Integration Guide

This document contains the exact, pre-formatted schemas and system instructions to connect **Social Skills** with **Google AI Studio** (`https://aistudio.google.com`).

---

## 🛠️ Option 1: OpenAPI 3.0 Import (Google AI Studio > Tools > Import OpenAPI)

Copy the entire JSON block below and paste directly into the **Import OpenAPI** box:

```json
{
  "openapi": "3.0.0",
  "info": {
    "title": "Social Skills Agent API",
    "version": "1.0.0",
    "description": "Multi-platform social media auto-poster and AI cross-publishing engine."
  },
  "servers": [
    {
      "url": "https://socialskills.ninja/v1"
    }
  ],
  "paths": {
    "/posts": {
      "post": {
        "summary": "Create and schedule multi-network post",
        "operationId": "createPost",
        "requestBody": {
          "required": true,
          "content": {
            "application/json": {
              "schema": {
                "type": "object",
                "properties": {
                  "caption": {
                    "type": "string",
                    "description": "Post caption text"
                  },
                  "social_accounts": {
                    "type": "array",
                    "items": {
                      "type": "string"
                    },
                    "description": "Array of target account IDs"
                  },
                  "scheduled_at": {
                    "type": "string",
                    "format": "date-time",
                    "description": "ISO timestamp for scheduled posts"
                  }
                },
                "required": [
                  "caption",
                  "social_accounts"
                ]
              }
            }
          }
        },
        "responses": {
          "200": {
            "description": "Post created successfully"
          }
        }
      }
    }
  }
}
```

---

## ⚡ Option 2: Native Function Declaration (Google AI Studio > Tools > Add Function)

Copy the function array below:

```json
[
  {
    "name": "createPost",
    "description": "Create and schedule multi-platform post across social networks",
    "parameters": {
      "type": "OBJECT",
      "properties": {
        "caption": {
          "type": "STRING",
          "description": "Primary post caption text"
        },
        "social_accounts": {
          "type": "ARRAY",
          "items": {
            "type": "STRING"
          },
          "description": "Array of target social account IDs (e.g. twitter, instagram)"
        },
        "scheduled_at": {
          "type": "STRING",
          "description": "Optional ISO-8601 UTC timestamp for scheduled publishing"
        }
      },
      "required": ["caption", "social_accounts"]
    }
  }
]
```

---

## 🧠 System Instructions for Gemini 2.0

Paste this text into **System Instructions**:

```markdown
You are SocialSkills-Agent, a Senior Growth Architect powered by Gemini 2.0.
Your goal is to compose, adapt, and schedule high-performing content across X, Instagram Reels, TikTok, YouTube Shorts, LinkedIn, Threads, Bluesky, Pinterest, and Facebook.

Rules:
1. Always adapt post text per network: strip links for X (put link in first reply), format LinkedIn text with bold/bullets, and generate viral hooks for TikTok.
2. Use the `createPost` function call to trigger publishing operations.
```
