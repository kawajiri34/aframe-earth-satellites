# A-Frame Earth Satellites

A-Frame で地球と人工衛星の軌道をリアルタイム表示する Web-VR アプリケーション。

> ※ 衛星の 3D モデル・スケール・軌道表示はあくまでイメージです。実際の外観や縮尺を正確に再現するものではありません。

**https://kawajiri34.github.io/aframe-earth-satellites/**

## 概要

地球の周囲を周回する人工衛星を 3D で可視化する。
初期リリースでは ISS（国際宇宙ステーション）を対象とし、TLE（Two-Line Element）データから軌道を計算してリアルタイムに位置を更新する。
デスクトップ・モバイル・VR ヘッドセットに対応。GitHub Pages で公開する。

## 技術スタック

| カテゴリ | 技術 | バージョン | 備考 |
|---|---|---|---|
| VR フレームワーク | A-Frame | 1.6.0 | WebXR 対応の宣言的 VR フレームワーク（CDN） |
| 3D 描画基盤 | Three.js | A-Frame 内蔵 | A-Frame が内部で利用 |
| 軌道計算 | satellite.js | 5.x | TLE から SGP4/SDP4 で衛星位置を計算 |
| 言語 | TypeScript | 5.x | 型安全な開発 |
| ビルドツール | Vite | 6.x | 高速 HMR、静的ビルド出力 |
| ホスティング | GitHub Pages | - | Vite ビルド成果物をデプロイ |
| テクスチャ素材 | Solar System Scope / NASA | - | 地球テクスチャ（CC BY 4.0） |

> A-Frame 本体はグローバル `AFRAME` オブジェクトが必要なため CDN の `<script>` タグで読み込み、
> カスタムコンポーネントと衛星データのみ Vite + TypeScript でバンドルする構成。

## 設計

### スケール方針

地球と衛星の関係を直感的に把握できるデフォルメスケールを採用する。

- **地球**: 中心に配置、半径 10 単位
- **ISS 軌道高度**: 地球表面から約 2〜3 単位上空（実際は約 408 km、地球半径比で圧縮）
- **衛星サイズ**: 視認性のため実際より大幅に拡大（半径 0.2 単位程度）

### 衛星データ

TLE（Two-Line Element Set）を使用して衛星の軌道を計算する。

| 項目 | 内容 |
|---|---|
| データ形式 | TLE（2行軌道要素） |
| 軌道伝播 | SGP4 アルゴリズム（satellite.js） |
| 更新頻度 | 毎フレーム（requestAnimationFrame） |
| 座標変換 | ECI → 地球固定座標 → A-Frame 3D 座標 |

#### 初期対象衛星

| 衛星 | NORAD ID | 軌道高度 | 備考 |
|---|---|---|---|
| ISS (ZARYA) | 25544 | ~408 km | 国際宇宙ステーション |

#### TLE データ取得

初期実装ではハードコードした TLE データを使用する。
将来的には CelesTrak API などからリアルタイム取得に拡張可能。

### 座標系変換

satellite.js が出力する ECI（地球中心慣性座標系）を A-Frame のシーン座標に変換する。

1. **TLE → ECI**: satellite.js の `propagate()` で位置ベクトル (km) を取得
2. **ECI → ECF**: GMST（グリニッジ平均恒星時）で地球固定座標に変換
3. **ECF → シーン座標**: km をスケール係数で割り、A-Frame の単位系にマッピング
   - X = ECF.x / scale
   - Y = ECF.z / scale（A-Frame の Y が上方向）
   - Z = -ECF.y / scale

### 操作方法

- **デスクトップ**: WASD キーで移動、マウスドラッグで視点回転
- **VR ヘッドセット**: 頭の向きで視点操作
- **モバイル**: デバイスの傾きで視点操作

### シーン構成

```
a-scene
├── ambient-light
├── directional-light          # 太陽光を模擬
├── camera-rig
│   └── camera
│       └── info-text          # 衛星情報 HUD
├── earth-system
│   ├── earth                  # 地球球体（テクスチャ付き、自転）
│   └── satellites
│       └── iss               # ISS エンティティ（毎フレーム位置更新）
├── orbit-lines
│   └── iss-orbit             # ISS 軌道ガイド線
└── sky                        # 星空背景
```

### ディレクトリ構成

```
aframe-earth-satellites/
├── index.html
├── vite.config.js
├── tsconfig.json
├── package.json
├── public/
│   └── textures/
│       ├── earth.jpg          # 地球テクスチャ
│       ├── earth-night.jpg    # 夜側テクスチャ（将来拡張）
│       └── starfield.jpg      # 星空背景
├── src/
│   ├── main.ts                # エントリ: シーン構築
│   ├── components/
│   │   ├── earth-rotation.ts  # 地球の自転コンポーネント
│   │   ├── satellite.ts       # 衛星位置更新コンポーネント
│   │   └── info-panel.ts      # 衛星情報表示 HUD
│   ├── data/
│   │   └── tle.ts             # TLE データ定義
│   ├── lib/
│   │   └── orbit.ts           # satellite.js ラッパー（座標変換）
│   ├── types/
│   │   └── aframe.d.ts        # A-Frame 型定義
│   └── styles/
│       └── main.css
└── README.md
```

### コンポーネント設計

#### `earth-rotation`

地球の自転を再現するコンポーネント。

- 現在時刻の GMST から初期回転角度を算出
- tick ごとに地球の Y 軸回転を更新

#### `satellite`

衛星の位置をリアルタイム更新するコンポーネント。

- スキーマ: `tle1` (string), `tle2` (string), `name` (string)
- init: TLE から `satrec` を生成
- tick: 現在時刻で `propagate()` → ECI → ECF → シーン座標に変換し `position` を更新

#### `info-panel`

衛星にホバー/クリック時に名前・高度などの情報を HUD に表示。

## 開発

```bash
# 依存インストール
npm install

# 開発サーバー起動
npm run dev

# プロダクションビルド
npm run build

# ビルド結果のプレビュー
npm run preview
```

## デプロイ

`main` ブランチに push すると GitHub Actions が自動で実行される。

1. `npm ci` → `npm run build` で `dist/` を生成
2. GitHub Pages（Actions 経由）にデプロイ

### 初回セットアップ

GitHub リポジトリの Settings → Pages で **Source** を **GitHub Actions** に設定する。
