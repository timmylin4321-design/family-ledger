# 家庭帳本

單一網頁的家庭記帳工具，可以安裝到手機主畫面，像 App 一樣使用，也可以離線開啟。

## 功能
- 收入／支出／轉帳記帳，多個銀行帳戶
- 固定收支，每月一鍵記入
- 帳戶總覽、總資產、月底餘額
- 圖表分析：收支趨勢、累計支出、分類比例、帳戶餘額走勢
- 金額點一下即可修改
- 匯出／匯入 CSV、完整備份 JSON

## 檔案
| 檔案 | 用途 |
|---|---|
| index.html | 主程式 |
| manifest.webmanifest | App 名稱、圖示設定 |
| sw.js | 離線快取 |
| firebase-config.js | Firebase 雲端設定（貼上 firebaseConfig） |
| firestore.rules | Firestore 安全規則（貼到 Firebase 主控台，不需上傳） |
| icon-192.png / icon-512.png / icon-maskable-512.png / apple-touch-icon.png | App 圖示 |

## 安裝到手機
1. 用 GitHub Pages 開啟網址（必須是 https）
2. iPhone：用 Safari 開啟 → 分享按鈕 → 「加入主畫面」
3. Android：用 Chrome 開啟 → 右上角選單 → 「安裝應用程式」或「加到主畫面」

## 雲端同步（Firebase）
1. console.firebase.google.com → 新增專案
2. Authentication → 登入方式：啟用「Google」和「電子郵件/密碼」
3. Authentication → 設定 → 授權網域：新增 `你的帳號.github.io`
4. Firestore Database → 建立資料庫（位置選 asia-east1，正式版模式）
5. Firestore → 規則：貼上 firestore.rules 的內容 → 發布
6. 專案設定 → 一般 → 新增網頁應用程式 → 把 firebaseConfig 貼進 firebase-config.js

## 資料存放
資料只存在**自己這支手機／這個瀏覽器**裡，不會上傳。
iPhone 加入主畫面後，App 的資料和 Safari 是分開的，請在 App 裡重新匯入備份。
請定期按「完整備份（JSON）」備份。備份檔含個人財務資料，**不要上傳到 GitHub**。
