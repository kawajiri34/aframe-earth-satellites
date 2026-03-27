# A-Frame Earth Satellites

A-Frame で地球と人工衛星の軌道をリアルタイム表示する Web-VR アプリケーション。

> ※ 衛星の 3D モデル・スケール・軌道表示はあくまでイメージです。実際の外観や縮尺を正確に再現するものではありません。

**https://kawajiri34.github.io/aframe-earth-satellites/**

## 概要

地球の周囲を周回する人工衛星を 3D で可視化する。
TLE（Two-Line Element）データから軌道を計算し、シミュレーション時計で時間加速しながらリアルタイムに位置を更新する。
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
| 3D モデル | Poly Pizza | - | ISS・汎用衛星モデル（CC BY 3.0） |

> A-Frame 本体はグローバル `AFRAME` オブジェクトが必要なため CDN の `<script>` タグで読み込み、
> カスタムコンポーネントと衛星データのみ Vite + TypeScript でバンドルする構成。

## 設計

### スケール方針

地球と衛星の距離を線形スケールで表示する。

- **地球**: 中心に配置、半径 10 単位
- **スケール係数**: 6371 km / 10 単位 = 637.1 km/単位
- **衛星サイズ**: 視認性のため実際より大幅に拡大

### 対象衛星

| グループ | 衛星 | NORAD ID | 軌道高度 | 軌道種別 | 3D モデル |
|---|---|---|---|---|---|
| ISS | ISS (ZARYA) | 25544 | ~408 km | LEO (51.6°) | ISS 専用 (Poly Pizza) |
| みちびき | QZS-1 (MICHIBIKI-1) | 37158 | ~32,000-40,000 km | IGSO (44.1°) | 汎用衛星 (Poly Pizza) |
| みちびき | QZS-2 (MICHIBIKI-2) | 42738 | ~32,000-40,000 km | IGSO (39.6°) | 汎用衛星 (Poly Pizza) |
| みちびき | QZS-3 (MICHIBIKI-3) | 42917 | ~35,786 km | GEO (0.05°) | 汎用衛星 (Poly Pizza) |
| みちびき | QZS-4 (MICHIBIKI-4) | 42965 | ~32,000-40,000 km | IGSO (40.2°) | 汎用衛星 (Poly Pizza) |

> - QZS-1/2/4: 準天頂軌道（IGSO）— 日本上空で 8 の字を描く
> - QZS-3: 静止軌道（GEO）— 赤道上空に静止

### 衛星データ

TLE（Two-Line Element Set）を使用して衛星の軌道を計算する。

| 項目 | 内容 |
|---|---|
| データ形式 | TLE（2行軌道要素） |
| 軌道伝播 | SGP4 アルゴリズム（satellite.js） |
| 更新頻度 | 毎フレーム（requestAnimationFrame） |
| 座標変換 | ECI → 地球固定座標 → A-Frame 3D 座標 |
| TLE ソース | CelesTrak API（現在はハードコード） |

### 座標系変換

satellite.js が出力する ECI（地球中心慣性座標系）を A-Frame のシーン座標に変換する。

1. **TLE → ECI**: satellite.js の `propagate()` で位置ベクトル (km) を取得
2. **ECI → ECF**: GMST（グリニッジ平均恒星時）で地球固定座標に変換
3. **ECF → シーン座標**: km をスケール係数で割り、A-Frame の単位系にマッピング
   - X = ECF.x / scale
   - Y = ECF.z / scale（A-Frame の Y が上方向）
   - Z = -ECF.y / scale

### UI

#### 速度コントロール（画面下部）

シミュレーション時計の加速倍率を変更する。

- `−` / `+` ボタンで段階変更（1×, 10×, 50×, 100×, 200×, 500×, 1000×）
- `1×` ボタンでリアルタイムにリセット
- デフォルト: 100× 速

#### 衛星グループトグル（画面左上）

衛星グループごとに表示 ON/OFF を切り替える。

- 衛星本体と軌道線を一括で表示/非表示
- グループ追加時は `data/tle.ts` の `groups` 配列に追加するだけで自動生成

### 操作方法

- **デスクトップ**: WASD キーで移動、マウスドラッグで視点回転
- **VR ヘッドセット**: 頭の向きで視点操作
- **モバイル**: デバイスの傾きで視点操作

### シーン構成

```
a-scene
├── ambient-light
├── directional-light              # 太陽光を模擬
├── camera-rig
│   └── camera
│       └── info-text              # 衛星情報 HUD
├── earth-system
│   ├── earth                      # 地球球体（テクスチャ付き、自転）
│   └── satellites
│       ├── iss                    # ISS（glTF モデル + マーカー）
│       ├── qzs-1                  # みちびき1号（glTF モデル + マーカー）
│       ├── qzs-2                  # みちびき2号
│       ├── qzs-3                  # みちびき3号（静止軌道）
│       └── qzs-4                  # みちびき4号
├── orbit-lines
│   ├── iss-orbit                  # ISS 軌道ガイド線（~92分周期）
│   ├── qzs-1-orbit               # みちびき1号軌道（~27時間周期）
│   ├── qzs-2-orbit               # みちびき2号軌道（~24時間周期）
│   ├── qzs-3-orbit               # みちびき3号軌道（静止）
│   └── qzs-4-orbit               # みちびき4号軌道
└── sky                            # 星空背景
```

### ディレクトリ構成

```
aframe-earth-satellites/
├── index.html
├── vite.config.js
├── tsconfig.json
├── package.json
├── public/
│   ├── models/
│   │   ├── iss.glb                # ISS 3D モデル (Poly Pizza, CC BY 3.0)
│   │   └── satellite.glb          # 汎用衛星 3D モデル (Poly Pizza, CC BY 3.0)
│   └── textures/
│       ├── earth.jpg              # 地球テクスチャ
│       └── starfield.jpg          # 星空背景
├── src/
│   ├── main.ts                    # エントリ: シーン構築、UI セットアップ
│   ├── components/
│   │   ├── earth-rotation.ts      # 地球の自転コンポーネント
│   │   ├── satellite.ts           # 衛星位置更新コンポーネント
│   │   ├── orbit-line.ts          # 軌道線描画コンポーネント
│   │   └── info-panel.ts          # 衛星情報表示 HUD
│   ├── data/
│   │   └── tle.ts                 # 衛星グループ・TLE データ定義
│   ├── lib/
│   │   ├── orbit.ts               # satellite.js ラッパー（座標変換）
│   │   └── sim-clock.ts           # シミュレーション時計（時間加速）
│   ├── types/
│   │   └── aframe.d.ts            # A-Frame 型定義
│   └── styles/
│       └── main.css
├── docs/
│   └── satellite-research.md      # 衛星追加候補の調査結果
├── .github/
│   └── workflows/
│       └── deploy.yml             # GitHub Pages 自動デプロイ
└── README.md
```

### コンポーネント設計

#### `earth-rotation`

地球の自転を再現するコンポーネント。

- シミュレーション時刻の GMST から回転角度を算出
- tick ごとに地球の Y 軸回転を更新

#### `satellite`

衛星の位置をリアルタイム更新するコンポーネント。

- TLE は `data-tle1` / `data-tle2` HTML data 属性で受け取る
- init: TLE から `satrec` を生成、光源方向に向けて初期回転設定
- tick: シミュレーション時刻で `propagate()` → ECI → ECF → シーン座標に変換し `position` を更新

#### `orbit-line`

衛星の軌道を THREE.Line で 1 周分描画するコンポーネント。

- TLE の mean motion から軌道周期を自動算出
- 128 点をサンプリングして描画
- 5 秒ごとに再計算（シミュレーション時間の進行に追従）

#### `info-panel`

衛星にホバー/クリック時に名前を HUD に表示。

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

## クレジット

- ISS 3D モデル: [Poly Pizza](https://poly.pizza/m/d3Fq5H6ne8E) (CC BY 3.0)
- 汎用衛星 3D モデル: [Poly Pizza](https://poly.pizza/m/1C3zb8Q9USk) (CC BY 3.0)
- 地球テクスチャ: [Solar System Scope](https://www.solarsystemscope.com/textures/) (CC BY 4.0)
- TLE データ: [CelesTrak](https://celestrak.org/)
