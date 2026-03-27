# 人工衛星表示 調査結果

## 表示候補（優先度順）

| 優先度 | 衛星/グループ | 数 | 軌道高度 | 見どころ | 3Dモデル |
|---|---|---|---|---|---|
| **Tier 1** | **ISS** (実装済み) | 1 | 408 km | 最も有名な人工構造物 | Poly Pizza GLB (CC BY 3.0) |
| | **GPS** | 31 | 20,200 km | 6軌道面の美しい幾何学パターン | Sketchfab (CC BY) |
| | **Starlink** | ~6,000 | 550 km | 地球を覆う大量ドットが圧巻 | Sketchfab (CC BY) |
| | **GEO衛星リング** | 多数 | 35,786 km | 赤道上に静止衛星がリング状に並ぶ | - |
| **Tier 2** | **みちびき (QZSS)** | 4 | 32,000-40,000 km | 日本上空の8の字軌道がユニーク | モデルなし（球体で代替） |
| | **天宮 (CSS)** | 1 | 380 km | ISSとの軌道比較が教育的 | Sketchfab (CC BY) |
| | **ハッブル (HST)** | 1 | 540 km | 科学のアイコン | NASA公式 (パブリックドメイン) |
| | **Iridium** | 66 | 780 km | 6面の極軌道ケージパターン | - |
| | **北斗 (BeiDou)** | ~45 | MEO+GEO+IGSO | 3種の軌道を組み合わせた唯一のGNSS | - |
| **Tier 3** | **モルニヤ軌道** | 数機 | 500-39,900 km | 極端な楕円軌道がドラマチック | - |
| | **Vanguard 1** | 1 | 650-3,840 km | 軌道上最古の人工物（1958年） | - |
| | **デブリ群** (Fengyun-1C等) | 3,000+ | 広範囲 | デブリ問題の可視化 | - |

---

## CelesTrak TLE データカタログ

### API エンドポイント

```
https://celestrak.org/NORAD/elements/gp.php?GROUP=<カテゴリ>&FORMAT=<形式>
```

### 出力形式（FORMAT）

| FORMAT | 説明 |
|---|---|
| `tle` | 3行形式（名前 + 2行要素）※デフォルト |
| `2le` | 2行形式（名前行なし） |
| `json` | JSON形式 |
| `json-pretty` | 整形済みJSON |
| `csv` | CSV形式 |
| `xml` | CCSDS OMM XML形式 |

### 主要カテゴリ一覧

#### 注目衛星

| GROUP名 | 説明 | 概数 |
|---|---|---|
| `stations` | 宇宙ステーション（ISS, 天宮等） | ~15 |
| `visual` | 肉眼で見える明るい衛星 | ~100 |
| `active` | 全アクティブ衛星 | ~10,000+ |
| `last-30-days` | 直近30日間の打上げ | 可変 |

#### 航法衛星 (GNSS)

| GROUP名 | 説明 | 概数 |
|---|---|---|
| `gps-ops` | GPS運用機 | 31 |
| `glo-ops` | GLONASS運用機 | 24 |
| `galileo` | Galileo | 28 |
| `beidou` | BeiDou（北斗） | ~45 |
| `qzss` | みちびき (QZSS) | 4 |
| `sbas` | SBAS（WAAS/EGNOS/MSAS等） | - |

#### 通信衛星

| GROUP名 | 説明 | 概数 |
|---|---|---|
| `geo` | 静止軌道衛星 | 多数 |
| `starlink` | Starlink | ~6,000+ |
| `oneweb` | OneWeb | ~600+ |
| `iridium-NEXT` | Iridium NEXT | 66+ |
| `globalstar` | Globalstar | - |
| `orbcomm` | Orbcomm | - |
| `molniya` | Molniya（高楕円軌道） | - |
| `amateur` | アマチュア無線衛星 | - |

#### 気象・地球観測

| GROUP名 | 説明 |
|---|---|
| `weather` | 気象衛星 |
| `noaa` | NOAA衛星 |
| `goes` | GOES静止気象衛星 |
| `resource` | 地球資源衛星 |
| `planet` | Planet Labs |
| `spire` | Spire Global |

#### 科学・その他

| GROUP名 | 説明 |
|---|---|
| `science` | 科学衛星 |
| `geodetic` | 測地衛星 |
| `engineering` | 工学衛星 |
| `education` | 教育衛星 |
| `cubesat` | CubeSat |
| `military` | 軍事衛星 |

#### デブリ

| GROUP名 | 説明 | 概数 |
|---|---|---|
| `cosmos-2251-debris` | COSMOS 2251衝突デブリ（2009年） | ~1,000+ |
| `iridium-33-debris` | Iridium 33衝突デブリ（2009年） | ~1,000+ |
| `1999-025` | FENGYUN 1C ASAT実験デブリ（2007年） | ~3,000+ |

### リクエスト例

```bash
# ISSのTLEを取得
curl "https://celestrak.org/NORAD/elements/gp.php?CATNR=25544&FORMAT=tle"

# GPS全機をJSON形式で取得
curl "https://celestrak.org/NORAD/elements/gp.php?GROUP=gps-ops&FORMAT=json"

# Starlink全機をTLE形式で取得
curl "https://celestrak.org/NORAD/elements/gp.php?GROUP=starlink&FORMAT=tle"

# みちびきをTLE形式で取得
curl "https://celestrak.org/NORAD/elements/gp.php?GROUP=qzss&FORMAT=tle"

# 個別衛星をNORAD IDで取得
curl "https://celestrak.org/NORAD/elements/gp.php?CATNR=20580&FORMAT=tle"
```

---

## 有名衛星 詳細データ

### 個別衛星

| 衛星名 | NORAD ID | 軌道高度 | 傾斜角 | 用途 | TLE GROUP |
|---|---|---|---|---|---|
| ISS (ZARYA) | 25544 | 408 km | 51.6° | 有人宇宙ステーション | `stations` |
| 天宮 (CSS) | 48274 | 380-390 km | 41.5° | 中国有人宇宙ステーション | `stations` |
| ハッブル (HST) | 20580 | 540 km | 28.5° | 光学天文観測 | `science` |
| TESS | 43435 | 108,000-376,000 km | - | 系外惑星探索（高楕円軌道） | `science` |
| Vanguard 1 | 5 | 650-3,840 km | - | 軌道上最古の人工物（1958年） | - |
| Envisat | 27386 | 770 km | SSO | 制御不能の巨大デブリ（8.2t） | - |

### 日本関連衛星

| 衛星名 | NORAD ID | 軌道高度 | 用途 | TLE GROUP |
|---|---|---|---|---|
| みちびき QZS-1 | 37158 | 32,000-40,000 km (IGSO) | GPS補強 | `qzss` |
| みちびき QZS-2 | 42738 | IGSO | GPS補強 | `qzss` |
| みちびき QZS-3 | 42917 | GEO | GPS補強 | `qzss` |
| みちびき QZS-4 | 42965 | IGSO | GPS補強 | `qzss` |
| ひまわり8号 | 40267 | 35,786 km (GEO) | 気象観測 | `weather` / `geo` |
| ひまわり9号 | 41836 | 35,786 km (GEO) | 気象観測 | `weather` / `geo` |
| だいち2号 (ALOS-2) | 39766 | 628 km (SSO) | 地球観測 (SAR) | `resource` |
| いぶき (GOSAT) | 33492 | 666 km (SSO) | 温室効果ガス観測 | - |
| いぶき2号 (GOSAT-2) | 43867 | 666 km (SSO) | 温室効果ガス観測 | - |

### 大規模コンステレーション

| コンステレーション | 衛星数 | 軌道高度 | 傾斜角 | 軌道面 | TLE GROUP |
|---|---|---|---|---|---|
| Starlink | ~6,000+ | 550 km | 53°/70°/97.6° | 70+ | `starlink` |
| OneWeb | ~600+ | 1,200 km | 87.9° | 12+ | `oneweb` |
| GPS | 31 | 20,200 km | 55° | 6 | `gps-ops` |
| Galileo | 28 | 23,222 km | 56° | 3 | `galileo` |
| GLONASS | 24 | 19,100 km | 64.8° | 3 | `glo-ops` |
| BeiDou | ~45 | MEO/GEO/IGSO混合 | 55° | - | `beidou` |
| Iridium NEXT | 66+ | 780 km | 86.4° | 6 | `iridium-NEXT` |

---

## 3Dモデル入手可能性

### 入手しやすい（NASA公式、パブリックドメイン）

| 衛星 | 入手元 | 形式 | サイズ | 備考 |
|---|---|---|---|---|
| ハッブル (HST) | NASA 3D Resources | glTF/OBJ | 数MB〜数十MB | 公式で最も充実 |
| JWST | NASA 3D Resources | glTF/OBJ | 10〜50MB | 展開状態は重い |
| スペースシャトル | NASA 3D Resources | glTF/OBJ/3DS | 数MB〜数十MB | 複数バリエーション |

### コミュニティモデルあり（Sketchfab、CC BY）

| 衛星 | 入手元 | ポリゴン数 | 備考 |
|---|---|---|---|
| 天宮 (CSS) | Sketchfab | 数万〜数十万 | ファンメイド、要アカウント |
| Starlink（1機） | Sketchfab | 軽量 | 形状がシンプル |
| GPS衛星 | Sketchfab | 数万 | 世代により外観が異なる |
| Crew Dragon | Sketchfab | 数万〜20万 | SpaceX公式モデルなし |
| ソユーズ | Sketchfab | 数万〜15万 | NASA ISS関連モデルにも含まれる場合あり |

### 入手困難

| 衛星 | 状況 | 代替案 |
|---|---|---|
| **みちびき (QZSS)** | 公式3Dモデル未公開 | 汎用通信衛星モデル or 球体 |
| **ひまわり** | 公式3Dモデル未公開 | 汎用静止衛星モデル or 球体 |

---

## パフォーマンス戦略

### 描画方式の選択基準

| 衛星数 | 推奨描画方式 | 推奨計算方式 | draw call |
|---|---|---|---|
| ~30 (GPS等) | glTF 3Dモデル or a-sphere | 毎フレーム propagate（メインスレッド） | ~30 |
| ~500 | **InstancedMesh**（低ポリ球体） | 毎フレーム propagate（メインスレッド） | 1 |
| ~6,000 (Starlink) | **InstancedMesh** | **Web Worker + フレーム間補間** | 1 |
| ~25,000+ | **Points (GL_POINTS)** | Web Worker + 補間 + 視錐台カリング | 1 |

### パフォーマンス目安

| 方式 | 60fps 維持できる数 | ボトルネック |
|---|---|---|
| `<a-sphere>` 個別配置 | ~200-500個 | draw call数 |
| InstancedMesh | ~50,000-100,000個 | GPU描画 |
| Points (GL_POINTS) | ~1,000,000個+ | GPU描画 |

### satellite.js propagate() のコスト

- 1回あたり約 0.01〜0.05ms
- 60fps (16.6ms/frame) でレンダリングに 8-10ms 使う場合、残り 6-8ms で propagate 可能
- メインスレッドのみ: ~2,000-5,000機
- Web Worker 分離: ~10,000機+

### 最適化テクニック

1. **InstancedMesh**: 同一ジオメトリを 1 draw call で大量描画（100倍以上の改善）
2. **Web Worker**: propagate 計算をオフロードしてメインスレッドをブロックしない
3. **時間補間**: propagate を1秒間隔で計算、フレーム間は線形補間
4. **間引き更新**: N グループに分けて毎フレーム1グループずつ更新
5. **視錐台カリング**: カメラから見えない衛星は計算スキップ
6. **LOD**: 遠距離は Points、近距離は glTF モデル

### 推奨アーキテクチャ（GPS + Starlink 同時表示）

```
GPS (31機):   glTF 3Dモデル → draw call ~31
Starlink (6000機): InstancedMesh (低ポリ球体) → draw call 1
合計 draw call: ~32 → 60fps 十分維持可能

軌道計算:
  GPS: メインスレッドで毎フレーム propagate
  Starlink: Web Worker で1秒ごとに一括計算 → SharedArrayBuffer → フレーム間補間
```

### 既存の衛星可視化アプリの最適化手法

| アプリ | 描画方式 | 特徴 |
|---|---|---|
| keeptrack.space | ポイントスプライト (GL_POINTS) | 25,000+衛星、GPU ピッキング、OSS |
| Cesium ベース | PointPrimitiveCollection | 空間インデックス、タイルベース地球 |
| satellite-viewer 系 | THREE.Points | 教育目的、数百機規模 |

---

## 補足事項

- CelesTrak のカタログ番号は5桁上限（最大69999）に近づいており、2026年7月頃に超える見込み。従来のTLE形式は5桁非対応のため、JSON/CSV形式への移行が推奨
- NASA 3D Resources のURLや収録状況は変動する可能性あり
- Sketchfab のモデルは「Downloadable」フィルタで絞り込みが必要
- CC BY-NC ライセンスのモデルは商用利用不可
