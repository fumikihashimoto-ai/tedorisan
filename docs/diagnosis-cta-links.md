# 診断結果後に表示されるCTA一覧

診断結果セクション（`DiagnosisResult`）では、`getRecommendedServices(result)` で最大3件のサービスが表示され、各サービスで以下のCTAが使われます。

## 使用箇所

- **CTAボタン**「無料で相談する」→ `service.affiliateUrl`
- **バナー**（`service.bannerHtml` がある場合）→ バナー内の `<a href="...">` のURL

---

## サービス別リンク一覧

| # | サービス名 | id | CTAボタン（affiliateUrl） | バナー内リンク（bannerHtml） | 備考 |
|---|------------|-----|---------------------------|------------------------------|------|
| 1 | TechGo | techgo | 本番リンクに更新済み | `4AVF01+4TULF6+5B0Y+HVNAP` | PR枠 |
| 2 | ラクスパートナーズ | rax-partners | `4AVF01+4RAX+3Y6M+XXXXX`（ダミー） | なし | 要a8mat取得 |
| 3 | 第二新卒エージェントneo | daini-neo | `4AVF01+4FK6WI+3Y6M+631SY` | `4AVF01+4FK6WI+3Y6M+66H9D` | 本番 |
| 4 | ファルマスタッフ | pharmacist | `4AVF01+4P34KY+276A+5ZEMQ` | なし | 本番 |
| 5 | ディープロ | deepro | AccessTrade `rk=0100kno300onsa` | なし | 本番 |
| 6 | 社内SE転職ナビ | shanai-se-navi | `4AVF01+4NAIBUSE+3Y6M+XXXXX`（ダミー） | `4AVF01+4ASQ2A+3IZO+I1NCH` | ボタン要更新可 |
| 7 | 明光キャリアパートナーズ | meiko-career-partners | `4AVF01+4MEIKO+3Y6M+XXXXX`（ダミー） | `4AVF01+4QVFEA+5P1E+5YZ75` | ボタン要更新可 |

---

## ダミーリンクの扱い

- **TechGo**  
  `https://px.a8.net/svt/ejp?a8mat=4AVF01+4TECHGO+3Y6M+XXXXX` はA8のプレースホルダーで、実リンクでは coreda! 等に飛ぶため無効です。  
  → バナーで使用している **`4AVF01+4TULF6+5B0Y+HVNAP`** を `affiliateUrl` にも使用するよう変更済みです。

- **ラクスパートナーズ**  
  A8で正式なa8matを発行したら、`affiliateUrl` の `XXXXX` 部分をその値に差し替えてください。

- **社内SE転職ナビ・明光キャリアパートナーズ**  
  バナー用の正式a8matが既にあるため、必要に応じて `affiliateUrl` をバナーと同じリンクに揃えてください（社内SE: `4AVF01+4ASQ2A+3IZO+I1NCH`、明光: `4AVF01+4QVFEA+5P1E+5YZ75`）。

---

## ファイル

- 定義: `lib/comparisonData.ts`（`affiliateServices` の `affiliateUrl` / `bannerHtml`）
- 表示: `app/components/ServiceCard.tsx`（CTAボタン・バナー表示）
