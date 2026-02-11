/**
 * 汎用比較表用データ・ロジック
 * 診断結果に基づいておすすめサービスを取得
 */

import type { AgeRange, DiagnosisResult, Situation } from '@/lib/diagnosisLogic';

// ============================================================
// 型定義
// ============================================================

/** 転職者の声（1件） */
export interface UserVoice {
  salaryBefore: string;
  salaryAfter: string;
  jobTitle: string;
  age: number;
  comment: string;
}

export interface AffiliateService {
  id: string;
  name: string;
  description: string;
  features: string[];
  /** キャッチコピー（オプショナル） */
  catchCopy?: string;
  /** おすすめポイント（最大3つ・オプショナル） */
  recommendPoints?: string[];
  /** 転職者の声（最大3つ・オプショナル） */
  userVoices?: UserVoice[];
  /** アフィリエイトリンクURL（A8.net等） */
  affiliateUrl: string;
  /** A8.netバナーHTML（オプショナル） */
  bannerHtml?: string;
  /** 報酬額（円） */
  commission: number;
  /** 成約率（%） */
  confirmationRate: number;
  /** EPC（1クリックあたり報酬） */
  epc: number;
  targetAge: AgeRange[];
  targetSituation: Situation[];
  /** 星評価（1-5） */
  rating: number;
  /** PR枠かどうか */
  isPr: boolean;
}

// ============================================================
// 広告主データ（A8.net等）
// ============================================================

export const affiliateServices: AffiliateService[] = [
  {
    id: 'rax-partners',
    name: 'ラクスパートナーズ',
    description: '23-30歳の未経験者に特化したIT転職',
    features: [
      '23-30歳に特化',
      '未経験者を丁寧にサポート',
      '自社開発企業多数',
    ],
    catchCopy:
      '未経験から一人前のITエンジニアに。\n社員評価 上位1％ × LinuC100 認定！未経験から安心して成長できる環境！',
    recommendPoints: [
      '9割が未経験。異業種からITのプロへ、一生モノのスキルを。',
      '20年の実績、1000人の仲間。確かなノウハウでITのプロへ。',
      '実際のプロジェクトをベースにしたITスクール超えの研修。',
    ],
    userVoices: [
      {
        salaryBefore: '380万円',
        salaryAfter: '650万円（5年目）',
        jobTitle: '営業→インフラエンジニア',
        age: 28,
        comment:
          '営業では「売って終わり」でしたが、エンジニアは「作って便利にする」という実感があります！また営業時代に培ったコミュニケーションスキルがエンジニアでも大いに活かせています！',
      },
      {
        salaryBefore: '350万円',
        salaryAfter: '490万円（3年目）',
        jobTitle: '事務→QAエンジニア',
        age: 26,
        comment:
          '事務職からエンジニアに転職し、技術力とキャリアアップを実現できました。',
      },
      {
        salaryBefore: '400万円',
        salaryAfter: '880万円（7年目）',
        jobTitle: '技術・研究→AIエンジニア',
        age: 34,
        comment:
          '前職では「すぐに結果が出ない」のが当たり前でしたが、今は作ったものが動くのが楽しく、手応えがあります。成果をスキルとして証明できることが、将来的な安心感にもつながっています。',
      },
    ],
    affiliateUrl: 'https://px.a8.net/svt/ejp?a8mat=4AVF01+4G5MIA+5SN4+5YJRM',
    bannerHtml: `<a href="https://px.a8.net/svt/ejp?a8mat=4AVF01+4G5MIA+5SN4+5YZ75" rel="nofollow noopener noreferrer" target="_blank">
<img border="0" width="300" height="250" alt="" src="https://www23.a8.net/svt/bgt?aid=260126641269&wid=001&eno=01&mid=s00000027040001003000&mc=1"></a>
<img border="0" width="1" height="1" src="https://www12.a8.net/0.gif?a8mat=4AVF01+4G5MIA+5SN4+5YZ75" alt="">`,
    commission: 20000,
    confirmationRate: 20,
    epc: 400,
    targetAge: ['20s'],
    targetSituation: ['it_beginner'],
    rating: 4,
    isPr: false,
  },
  {
    id: 'daini-neo',
    name: '第二新卒エージェントneo',
    description: '第二新卒・既卒の転職に強い',
    features: [
      '第二新卒・既卒に強い',
      '1人平均8時間サポート',
      '内定後も手厚いフォロー',
    ],
    catchCopy:
      '約8万人の20代が利用中！適職を紹介＆無料で内定までサポート！',
    recommendPoints: [
      '平均113万円の年収UPを実現',
      '内定まで最短2日・平均26日',
      '書類選考通過率94.7%',
    ],
    userVoices: [
      {
        salaryBefore: '',
        salaryAfter: '',
        jobTitle: '高卒 H 様',
        age: 21,
        comment:
          'サービスを利用しようと思ったきっかけは？\n大学を辞めてから、すぐに就職したいと思い、ホームページを見つけてすぐに連絡を入れたのがきっかけ。\n\nサービスを使ってよかった点は？\nこんな風に働きたいという願望に沿って自分に合った企業をいくつも提示してくださり、迅速に丁寧にご提案頂いた点\n\n就職活動で苦労した点・頑張った点は？\n面接の練習はして頂いていたが、回答を用意していたこと以外の質問を受けると焦った。しかし、すぐに答えることができた点は頑張った。また面接が続くと体力的にもしんどかったのが苦労した点。\n\n入社の決め手は？\n自分の将来像と社風が合っていた。\n自分が成長出来る環境だった。\n\n後輩へのアドバイス\n給与の点も大事だが、自分が成長できるような企業選び、将来を見据えた企業選びが大切だと思います。\n\nその他感想\n就職し、環境が新しくなるのは最初は不安だったが、企業ごとの詳しい説明、面接での対応の仕方など様々教えて頂き、少しずつ不安が自信に変わっていきました。ありがとうございました。',
      },
      {
        salaryBefore: '',
        salaryAfter: '',
        jobTitle: '第二新卒 T 様',
        age: 23,
        comment:
          'サービスを利用しようと思ったきっかけは？\n将来のキャリアやしたいことを見つけ、その目的を果たそうと思った。\n\nサービスを使ってよかった点は？\n・不安なことや、つまづいていることを丁寧に聞きとってくれて、考える時間や力をいただけた。\n・エージェントと転職活動者という形以上の関係を築けた。\n\n就職活動で苦労した点・頑張った点は？\n・将来像や考えを掘っていくうちに、考えが変わったり、自己分析で迷走することがあった。（苦労したこと）\n・目的を果たす為になにを一番に優先すべきかを考え、ぶらさないこと。（頑張ったこと）\n\n入社の決め手は？\n目的を果たすために必須の条件を満たし、将来像につながる力を身につけることが出来る企業であると判断。\n\n後輩へのアドバイス\n転職することで、何を達成したいのかをしっかりと考えることが大切です。\n\nその他感想\n厳しい意見もある、コロナ禍という転職にあまり良い環境ではない中で、しっかりと内定をいただけたのは、担当カウンセラー様たちの支えのおかげです。ありがとうございました！',
      },
    ],
    affiliateUrl: 'https://px.a8.net/svt/ejp?a8mat=4AVF01+4FK6WI+3Y6M+67JUA',
    bannerHtml: `<a href="https://px.a8.net/svt/ejp?a8mat=4AVF01+4FK6WI+3Y6M+66H9D" rel="nofollow noopener noreferrer" target="_blank">
<img border="0" width="300" height="250" alt="" src="https://www26.a8.net/svt/bgt?aid=260126641268&wid=001&eno=01&mid=s00000018427001038000&mc=1"></a>
<img border="0" width="1" height="1" src="https://www19.a8.net/0.gif?a8mat=4AVF01+4FK6WI+3Y6M+66H9D" alt="">`,
    commission: 15000,
    confirmationRate: 38.28,
    epc: 574,
    targetAge: ['20s', '30s', '40s'],
    targetSituation: ['it_beginner'],
    rating: 4.5,
    isPr: false,
  },
  {
    id: 'pharmacist',
    name: 'ファルマスタッフ',
    description: '薬剤師専門の転職・派遣',
    features: [
      '薬剤師専門',
      '調剤薬局求人数業界最大級',
      '高年収求人多数',
    ],
    catchCopy:
      '薬剤師求人・薬剤師転職ならファルマスタッフ\n公開求人数50,000件以上！職相談満足度97.7%！',
    recommendPoints: [
      '正社員・派遣・パート、多様な働き方に対応',
      '調剤薬局・DgS・病院など豊富な求人',
      '給与や休日、勤務開始日などの条件交渉',
    ],
    userVoices: [
      {
        salaryBefore: '',
        salaryAfter: '',
        jobTitle: '40代 男性',
        age: 45,
        comment:
          '結構グイグイ行きそうな担当者だなという印象でしたが、転職活動全体を通じてピンポイントでの派遣労働をご提案いただいたり、内定後の条件交渉を有利にすすめていただいたりと、良い方向に進めていただけたので感謝しています。',
      },
      {
        salaryBefore: '',
        salaryAfter: '',
        jobTitle: '30代 女性',
        age: 35,
        comment:
          '急な転職だったのですが、お陰様ですぐに仕事が見つかり助かりました。ありがとうございました。',
      },
      {
        salaryBefore: '',
        salaryAfter: '',
        jobTitle: '40代 女性',
        age: 45,
        comment:
          '親身に相談に乗って頂き、必要な情報をいち早く提供して下さって、お陰様で良い就職先のご縁を頂きました。派遣勤務の際も、温かいお言葉やお心遣いで支えて頂きました。',
      },
    ],
    affiliateUrl: 'https://px.a8.net/svt/ejp?a8mat=4AVF01+4P34KY+276A+609HU',
    bannerHtml: `<a href="https://px.a8.net/svt/ejp?a8mat=4AVF01+4P34KY+276A+65EOH" rel="nofollow noopener noreferrer" target="_blank">
<img border="0" width="300" height="250" alt="" src="https://www29.a8.net/svt/bgt?aid=260126641284&wid=001&eno=01&mid=s00000010261001033000&mc=1"></a>
<img border="0" width="1" height="1" src="https://www14.a8.net/0.gif?a8mat=4AVF01+4P34KY+276A+65EOH" alt="">`,
    commission: 60000,
    confirmationRate: 54.05,
    epc: 3243,
    targetAge: ['20s', '30s', '40s', '50s'],
    targetSituation: ['pharmacist'],
    rating: 5,
    isPr: false,
  },
  {
    id: 'deepro',
    name: 'ディープロ',
    description: 'プログラミング学習と転職サポート',
    features: [
      '実践的なプログラミング学習',
      '転職サポート付き',
      '年齢制限なし',
    ],
    catchCopy:
      '実務経験1-3年が必要な優良企業への 内定多数！\nキャリアサポートの年齢制限はなく、 30代以上でも 約9割がエンジニア就職 を決めています！',
    recommendPoints: [
      '卒業課題インターンシップの実務経験と実力証明の「オリジナルアプリ」を開発できる',
      'プロと同じリモートワーク環境で仲間と本気で学び合う',
      '挫折せずに実務まで一気に到達できるカリキュラム',
    ],
    userVoices: [
      {
        salaryBefore: '',
        salaryAfter: '',
        jobTitle: '元鉄道運転士から自社開発エンジニアに！',
        age: 33,
        comment:
          'shunさん（33歳 / 宮城）\n未経験からで当初自分がついていけるか不安でしたが、自走力を養うカリキュラムや共に切磋琢磨できる仲間に出会えたことで最後まで走り抜けることが出来ました。 今は急成長中のスタートアップで様々な開発経験に携わっています。',
      },
      {
        salaryBefore: '',
        salaryAfter: '',
        jobTitle: '40代の一念発起 フルリモートへの挑戦！',
        age: 46,
        comment:
          'Taro Endoさん（46歳 / 福島）\nフルリモート勤務ができる仕事を目指し入校を決意。 アプリデザインなどの仕事に転職をしワクワクの毎日を過ごしています。 アプリデザインを指揮する際には、フロントエンド側だけでなくバックエンド側の知識もあるため、ソフト開発部門と円滑なコミュニケーションができ、ディーププロで開発土台をしっかり学べてよかったと感じています。',
      },
      {
        salaryBefore: '',
        salaryAfter: '',
        jobTitle: '保険営業から 開発エンジニアへの転職！',
        age: 27,
        comment:
          'Y.Sさん（27歳 / 埼玉）\n初めての学習でカリキュラムについていけるか、またオンラインでの授業でコミュニケーションが上手くとれるか心配でした。 しかし同期やメンターの方に恵まれ、エラーが起きた際には原因やその解消法について教えて頂き日々成長することが出来ました。 今はやりたかった開発に携わっており、ディープロでよかったと感じています。',
      },
    ],
    affiliateUrl: 'https://h.accesstrade.net/sp/cc?rk=0100knoa00onsa',
    bannerHtml: `<a href="https://h.accesstrade.net/sp/cc?rk=0100kno300onsa" rel="nofollow noopener noreferrer" referrerpolicy="no-referrer-when-downgrade" target="_blank"><img src="https://h.accesstrade.net/sp/rr?rk=0100kno300onsa" alt="ディープロ" border="0" /></a>`,
    commission: 22000,
    confirmationRate: 30,
    epc: 660,
    targetAge: ['20s', '30s', '40s'],
    targetSituation: ['skill_learning'],
    rating: 4.5,
    isPr: false,
  },
  {
    id: 'shanai-se-navi',
    name: '社内SE転職ナビ',
    description: '社内SE専門の転職支援',
    features: [
      '社内SE専門',
      'ワークライフバランス重視',
      'カジュアル面談可能',
    ],
    catchCopy:
      '社内SE転職ナビは「社内SE」への転職を強力サポート!\n保有求人数は 10,000 件以上!社内SE専門ならではの自社開発・情シス求人をご紹介!',
    recommendPoints: [
      '本質を見抜いたマッチングだから定着率96.5％',
      '内定まで最短1か月と圧倒的なスピードでのご支援',
      '幅広い職種でのご支援実績',
    ],
    userVoices: [
      {
        salaryBefore: '450万円',
        salaryAfter: '530万円',
        jobTitle: 'インフラエンジニア',
        age: 27,
        comment:
          '携わられる案件が変わることで業務レベルもアップ\n前職で就業していた受託企業では運用案件を得意としていたため、設計や構築の業務には携わることができませんでした。社内SE転職ナビの面談で、企業によって得意領域や主業務があることを改めて認識し、自身のキャリアプランにあった企業選びの重要性に気づきました。現在はインフラ上流工程を得意とする企業でさらなるスキルアップに励んでいます。',
      },
      {
        salaryBefore: '750万円',
        salaryAfter: '880万円',
        jobTitle: '社内IT企画職',
        age: 43,
        comment:
          '残業時間を減らし、企画職へのキャリア転向も叶った\n自分で手を動かすことは好きですが、残業が少なく長期休暇も取りやすい環境への転職が理想でした。また、システムエンジニアから別ポジションへ転向したいと考えてはいたものの年齢をネックに感じていました。社内SE転職ナビさんへはエンジニアだった経験を活かせる企画職であること、許容できる残業時間、年間休日130日以上がマストと条件を伝え、しっかり当てはまる求人を複数社紹介して頂きスムーズでした。',
      },
      {
        salaryBefore: '650万円',
        salaryAfter: '800万円',
        jobTitle: 'ITコンサルタント',
        age: 29,
        comment:
          '将来、フリーとして独立したい夢も含めて応援してくれた\n転職かフリーランスか迷っていた中で情報収集を兼ねて相談。エージェントと話をしていくうちに、今独立するよりも、PMOコンサルタントとしての経験値をもう少し積んだ後でフリーになったほうが安定しやすいとアドバイスいただき、転職先を紹介してくれました。まずはしっかり自分の経験値を積み重ね、数年後、フリーランスになる予定です。その際、社内SE転職ナビを運営するアイムファクトリーはフリーランス案件も取り扱っているので、またその頃、相談したいと思います。',
      },
    ],
    affiliateUrl: 'https://px.a8.net/svt/ejp?a8mat=4AVF01+4ASQ2A+3IZO+I4FNM',
    bannerHtml: `<a href="https://px.a8.net/svt/ejp?a8mat=4AVF01+4ASQ2A+3IZO+I1NCH" rel="nofollow noopener noreferrer" target="_blank">
<img border="0" width="300" height="250" alt="" src="https://www25.a8.net/svt/bgt?aid=260126641260&wid=001&eno=01&mid=s00000016458003031000&mc=1"></a>
<img border="0" width="1" height="1" src="https://www19.a8.net/0.gif?a8mat=4AVF01+4ASQ2A+3IZO+I1NCH" alt="">`,
    commission: 20000,
    confirmationRate: 52.54,
    epc: 1050,
    targetAge: ['20s', '30s', '40s'],
    targetSituation: ['it_beginner', 'it_experienced'],
    rating: 4,
    isPr: false,
  },
  {
    id: 'meiko-career-partners',
    name: '明光キャリアパートナーズ',
    description: 'IT経験者向けハイクラス転職',
    features: [
      'IT経験者専門',
      '高年収案件多数',
      'ハイクラス転職に強い',
    ],
    catchCopy:
      '自分に合ったエンジニア職が見つかる！\n当社ならではの寄り添ったヒアリングであなたの経験や希望、価値観にピッタリフィットする業種や会社を提案。',
    recommendPoints: [
      '幅広い言語のスキルアップが可能な職場',
      '充実した福利厚生で安心できる環境',
      '少ない残業でプライベートも充実',
      '高い有休取得率で土日祝休み',
    ],
    userVoices: [
      {
        salaryBefore: '850万円',
        salaryAfter: '1200万円',
        jobTitle: 'WEBエンジニア → リモート専業テックリード',
        age: 38,
        comment:
          'リモートワークが可能な環境で年収を維持するのが難しいと感じていましたが、エージェントの提案で海外チームとのリモート勤務が可能なテックリード職に転職。年収も上がり満足です。',
      },
      {
        salaryBefore: '550万円',
        salaryAfter: '700万円',
        jobTitle: 'QAエンジニア → DevOpsエンジニア',
        age: 32,
        comment:
          '転職後はCI/CDパイプラインの設計など、より責任ある仕事を任されるようになり、大きな達成感を得ています。エージェントのサポートがなければ実現できなかったと思います。',
      },
      {
        salaryBefore: '950万円',
        salaryAfter: '1200万円',
        jobTitle: 'フルスタックエンジニア → スタートアップのCTO',
        age: 42,
        comment:
          '家庭との時間を大切にしたいと思い、スタートアップのCTOに挑戦しました。転職後は、週に1回のオフィス勤務とフレキシブルなスケジュールのおかげで、子どもの送り迎えや家族旅行が可能に。',
      },
    ],
    affiliateUrl: 'https://px.a8.net/svt/ejp?a8mat=4AVF01+4QVFEA+5P1E+5YJRM',
    bannerHtml: `<a href="https://px.a8.net/svt/ejp?a8mat=4AVF01+4QVFEA+5P1E+5YZ75" rel="nofollow noopener noreferrer" target="_blank">
<img border="0" width="300" height="250" alt="" src="https://www24.a8.net/svt/bgt?aid=260126641287&wid=001&eno=01&mid=s00000026573001003000&mc=1"></a>
<img border="0" width="1" height="1" src="https://www11.a8.net/0.gif?a8mat=4AVF01+4QVFEA+5P1E+5YZ75" alt="">`,
    commission: 78000,
    confirmationRate: 17.14,
    epc: 1337,
    targetAge: ['30s', '40s', '50s'],
    targetSituation: ['it_experienced'],
    rating: 4.5,
    isPr: false,
  },
];

// ============================================================
// 診断結果からサービス取得
// ============================================================

const MAX_RECOMMENDED = 3;

/**
 * 診断結果に基づいておすすめサービスを取得する。
 * - 診断結果の age, situation でフィルタリング
 * - isPr: true を最優先
 * - その後は EPC 降順でソート
 * - 最大3件を返す
 */
export function getRecommendedServices(
  result: DiagnosisResult
): AffiliateService[] {
  const filtered = affiliateServices.filter((service) => {
    const ageMatch = service.targetAge.includes(result.age);
    const situationMatch = service.targetSituation.includes(result.situation);
    return ageMatch && situationMatch;
  });

  const sorted = [...filtered].sort((a, b) => {
    if (a.isPr && !b.isPr) return -1;
    if (!a.isPr && b.isPr) return 1;
    return b.epc - a.epc;
  });

  return sorted.slice(0, MAX_RECOMMENDED);
}
