import SideBusinessClient from '../../components/SideBusinessClient';

export default function SideBusinessArticle() {
  return (
    <article className="pb-20">
      {/* リード文 */}
      <p className="text-base leading-[1.8] mb-4">
        副業で収入を得ている皆さん、確定申告に不安はありませんか？「何から手をつければいいのか分からない」「税金で損したくない」「会社にバレたくない」といった悩みは尽きないものです。本記事では、副業の確定申告に必要な基礎知識から、所得の種類、経費、控除、書類作成、提出方法まで、網羅的に解説します。さらに、税金を大幅に減らせる青色申告の活用法、住民税対策、会社バレを防ぐための具体的な方法もご紹介。20万円以下の収入や複数の副業があるケース、よくある疑問にもお答えし、あなたの副業確定申告を完全にサポートします。これを読めば、もう税金で悩むことはありません。安心して副業に専念できるでしょう。
      </p>

      {/* 計算ツール（セクション1の上に配置） */}
      <SideBusinessClient embedded />

      {/* セクション1 */}
      <section id="section-1" className="scroll-mt-6">
        <h2 className="text-[length:var(--font-size-h2-mobile)] sm:text-[length:var(--font-size-h2)] font-bold text-gray-800 mt-10 mb-4 pl-3 border-l-4 border-amber-500">
          1. 副業の確定申告の基礎知識 始める前に知るべきこと
        </h2>
        <p className="text-base leading-[1.8] mb-4">
          副業を始める際、多くの人が気になるのが「確定申告」ではないでしょうか。確定申告と聞くと複雑なイメージを持つかもしれませんが、基本的なルールを理解すれば決して難しいものではありません。ここでは、副業における確定申告の基礎知識として、どのような場合に確定申告が必要になるのか、そしてその義務と期限について詳しく解説します。
        </p>

        <h3 className="text-[length:var(--font-size-h3-mobile)] sm:text-[length:var(--font-size-h3)] font-bold text-gray-800 mt-7 mb-3 pl-3 border-l-2 border-blue-400">
          1.1 副業で確定申告が必要になる条件とは
        </h3>
        <p className="text-base leading-[1.8] mb-4">
          副業を行っている方が確定申告を必要とするかどうかは、主にその
          <mark className="bg-amber-100 px-1 rounded font-bold">副業からの所得額</mark>
          によって決まります。所得とは、収入から必要経費を差し引いた金額のことです。特に会社員として給与所得を得ている方が副業を行う場合、以下の条件が適用されることが一般的です。
        </p>
        <ul className="list-disc pl-6 mb-4 space-y-2">
          <li className="text-base leading-[1.8]">
            給与所得以外の所得（副業による所得など）の合計額が
            <mark className="bg-amber-100 px-1 rounded font-bold">年間20万円を超える場合</mark>
            は、確定申告が必要です。この「20万円」という基準は、収入ではなく「所得」である点に注意が必要です。
          </li>
          <li className="text-base leading-[1.8]">副業の収入が20万円以下であっても、医療費控除や住宅ローン控除などを受けるために確定申告をする場合は、副業の所得も合わせて申告する必要があります。</li>
          <li className="text-base leading-[1.8]">年間の給与収入が2,000万円を超える場合や、2か所以上から給与を受け取っている場合など、副業の有無にかかわらず確定申告が必要となるケースもあります。</li>
        </ul>
        <p className="text-base leading-[1.8] mb-4">
          自営業やフリーランスとして副業を行っている場合、給与所得者とは異なる条件が適用されます。例えば、所得が基礎控除額（年間48万円）を超える場合に確定申告が必要となることが一般的です。自身の状況に応じて、確定申告の要否を確認することが重要です。
        </p>

        <h3 className="text-[length:var(--font-size-h3-mobile)] sm:text-[length:var(--font-size-h3)] font-bold text-gray-800 mt-7 mb-3 pl-3 border-l-2 border-blue-400">
          1.2 確定申告の義務と期限
        </h3>
        <p className="text-base leading-[1.8] mb-4">
          確定申告とは、1月1日から12月31日までの1年間の所得とそれに対する所得税額を計算し、税務署に申告・納税する手続きです。この手続きは、納税者の義務として法律で定められています。
        </p>
        <p className="text-base leading-[1.8] mb-4">
          確定申告の主な義務と期限は以下の通りです。
        </p>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse my-5 text-sm sm:text-base min-w-[500px]">
            <thead>
              <tr>
                <th className="bg-gray-50 text-gray-700 p-3 text-left font-semibold border-b border-gray-100">項目</th>
                <th className="bg-gray-50 text-gray-700 p-3 text-left font-semibold border-b border-gray-100">内容</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="p-3 border-b border-gray-100">申告義務の対象</td>
                <td className="p-3 border-b border-gray-100">前述の「確定申告が必要になる条件」に該当する方。</td>
              </tr>
              <tr>
                <td className="p-3 border-b border-gray-100">申告期間</td>
                <td className="p-3 border-b border-gray-100">原則として、
                  <mark className="bg-amber-100 px-1 rounded font-bold">その年の翌年の2月16日から3月15日まで</mark>
                  です。例えば、2025年分の所得については、2026年2月16日から3月15日までに申告・納税を行います。
                </td>
              </tr>
              <tr>
                <td className="p-3 border-b border-gray-100">納税期限</td>
                <td className="p-3 border-b border-gray-100">所得税の納税期限は、原則として
                  <mark className="bg-amber-100 px-1 rounded font-bold">確定申告書の提出期限と同じ</mark>
                  です。
                </td>
              </tr>
              <tr>
                <td className="p-3 border-b border-gray-100">還付申告</td>
                <td className="p-3 border-b border-gray-100">税金を納めすぎた場合や、医療費控除などで税金が還付される場合は、「還付申告」を行うことができます。還付申告は、申告の義務がない場合でも行うことができ、
                  <mark className="bg-amber-100 px-1 rounded font-bold">対象となる年の翌年1月1日から5年間</mark>
                  提出が可能です。
                </td>
              </tr>
              <tr>
                <td className="p-3 border-b border-gray-100">期限後申告と加算税</td>
                <td className="p-3 border-b border-gray-100">正当な理由なく期限内に申告・納税を行わないと、
                  <mark className="bg-amber-100 px-1 rounded font-bold">無申告加算税や延滞税</mark>
                  といったペナルティが課されることがあります。これらの加算税は、本来納めるべき税額に上乗せされるため、期限内の申告・納税を心がけましょう。
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="text-base leading-[1.8] mb-4">
          確定申告に関するより詳細な情報は、国税庁のウェブサイトで確認することができます。
        </p>
        <p className="text-base leading-[1.8] mb-4">
          副業で得た収入は、確定申告をする上でどの所得に分類されるかによって、税金の計算方法や適用される控除が大きく異なります。所得税法では所得を10種類に分類しており、副業で得た収入の多くは「雑所得」か「事業所得」のいずれかに該当します。        ここでは、それぞれの所得区分の特徴と、確定申告における違いについて詳しく解説します。
        </p>
      </section>

      {/* セクション2 */}
      <section id="section-2" className="scroll-mt-6">
        <h2 className="text-[length:var(--font-size-h2-mobile)] sm:text-[length:var(--font-size-h2)] font-bold text-gray-800 mt-10 mb-4 pl-3 border-l-4 border-amber-500">
          2. 副業の収入と所得の種類を理解する
        </h2>

        <h3 className="text-[length:var(--font-size-h3-mobile)] sm:text-[length:var(--font-size-h3)] font-bold text-gray-800 mt-7 mb-3 pl-3 border-l-2 border-blue-400">
          2.1 雑所得に分類される副業
        </h3>
        <p className="text-base leading-[1.8] mb-4">
          雑所得とは、利子所得、配当所得、不動産所得、事業所得、給与所得、退職所得、山林所得、譲渡所得、一時所得のいずれにも該当しない所得を指します。つまり、他の9種類の所得区分のいずれにも当てはまらない「その他」の所得が雑所得に分類されます。
        </p>
        <p className="text-base leading-[1.8] mb-4">
          副業で得られる収入の多くは、この雑所得に該当することが一般的です。特に、
          <mark className="bg-amber-100 px-1 rounded font-bold">継続性がなく、営利目的や事業規模とまでは言えないような副業収入</mark>
          は、雑所得と見なされることが多いです。
        </p>
        <p className="text-base leading-[1.8] mb-4">
          具体的な例としては、以下のような副業が雑所得に分類されることがあります。
        </p>
        <ul className="list-disc pl-6 mb-4 space-y-2">
          <li className="text-base leading-[1.8]">原稿料、講演料</li>
          <li className="text-base leading-[1.8]">アフィリエイト収入</li>
          <li className="text-base leading-[1.8]">フリマアプリやネットオークションでの販売収入（生活用動産の売却を除く）</li>
          <li className="text-base leading-[1.8]">クラウドソーシングでの単発の仕事による報酬</li>
          <li className="text-base leading-[1.8]">仮想通貨の売却益</li>
          <li className="text-base leading-[1.8]">公的年金等（これは副業とは異なりますが、雑所得の一種です）</li>
        </ul>
        <p className="text-base leading-[1.8] mb-4">
          ただし、フリマアプリやネットオークションで、生活に通常必要な家具や衣服などの生活用動産を販売した場合は非課税となり、確定申告は不要です。しかし、営利目的で継続的に販売している場合は課税対象となりますので注意が必要です。
        </p>
        <p className="text-base leading-[1.8] mb-4">
          会社員の場合、副業による雑所得の金額が年間20万円を超えると、原則として確定申告が必要です。雑所得が20万円以下の場合は所得税の確定申告は不要ですが、住民税の申告は必要となるため注意しましょう。
        </p>

        <h3 className="text-[length:var(--font-size-h3-mobile)] sm:text-[length:var(--font-size-h3)] font-bold text-gray-800 mt-7 mb-3 pl-3 border-l-2 border-blue-400">
          2.2 事業所得に分類される副業
        </h3>
        <p className="text-base leading-[1.8] mb-4">
          事業所得とは、農業、漁業、製造業、卸売業、小売業、サービス業その他事業から生じる所得を指します。副業であっても、
          <mark className="bg-amber-100 px-1 rounded font-bold">営利性・有償性があり、継続的・反復的に行われ、事業として独立して行われていると認められる規模の活動</mark>
          から得られる所得は、事業所得に分類されます。
        </p>
        <p className="text-base leading-[1.8] mb-4">
          事業所得と認められるかどうかの判断は、その活動が社会通念上「事業」と称するに至る程度で行われているかどうかが基準となります。単に収入があるだけでなく、事業として継続的に利益を得る意思と活動の実態が重要視されます。
        </p>
        <p className="text-base leading-[1.8] mb-4">
          例えば、以下のような副業は事業所得に分類される可能性があります。
        </p>
        <ul className="list-disc pl-6 mb-4 space-y-2">
          <li className="text-base leading-[1.8]">プログラミング、ウェブデザインなどの専門スキルを活かした継続的な請負業務</li>
          <li className="text-base leading-[1.8]">ライター、イラストレーターとして継続的に案件を受注し、事業として確立している場合</li>
          <li className="text-base leading-[1.8]">ネットショップ運営など、独立した事業として継続的に商品を販売している場合</li>
          <li className="text-base leading-[1.8]">コンサルティング業など、専門知識を提供し継続的な収入を得ている場合</li>
        </ul>
        <p className="text-base leading-[1.8] mb-4">
          国税庁は、事業所得と雑所得の区分について、2022年10月に通達の一部改正を行い、判断基準を明確化しています。特に、
          <mark className="bg-amber-100 px-1 rounded font-bold">帳簿書類の保存の有無が重要な要素</mark>
          とされています。前々年の副業収入が300万円を超えている場合は、帳簿書類の保存が義務付けられ、事業所得と認められる可能性が高まります。また、収入金額が300万円以下であっても、帳簿書類を適切に保存していれば、事業所得と認められるケースが多いとされています。
        </p>
        <p className="text-base leading-[1.8] mb-4">
          事業所得として認められることで、後述する青色申告の特典など、税制上のメリットを享受できる可能性が高まります。
        </p>

        <h3 className="text-[length:var(--font-size-h3-mobile)] sm:text-[length:var(--font-size-h3)] font-bold text-gray-800 mt-7 mb-3 pl-3 border-l-2 border-blue-400">
          2.3 所得区分による確定申告の違い
        </h3>
        <p className="text-base leading-[1.8] mb-4">
          副業の所得が雑所得と事業所得のどちらに分類されるかによって、確定申告における取り扱いには大きな違いが生じます。特に、税制上のメリットの有無が異なります。
        </p>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse my-5 text-sm sm:text-base min-w-[500px]">
            <thead>
              <tr>
                <th className="bg-gray-50 text-gray-700 p-3 text-left font-semibold border-b border-gray-100">項目</th>
                <th className="bg-gray-50 text-gray-700 p-3 text-left font-semibold border-b border-gray-100">雑所得</th>
                <th className="bg-gray-50 text-gray-700 p-3 text-left font-semibold border-b border-gray-100">事業所得</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="p-3 border-b border-gray-100 font-semibold">帳簿付けの義務</td>
                <td className="p-3 border-b border-gray-100">原則として義務なし（前々年収入300万円超で現金預金取引等関係書類の保存義務あり）</td>
                <td className="p-3 border-b border-gray-100">義務あり（青色申告の場合は複式簿記が必要）</td>
              </tr>
              <tr>
                <td className="p-3 border-b border-gray-100 font-semibold">青色申告の適用</td>
                <td className="p-3 border-b border-gray-100">不可</td>
                <td className="p-3 border-b border-gray-100">可能（最大65万円の青色申告特別控除など）</td>
              </tr>
              <tr>
                <td className="p-3 border-b border-gray-100 font-semibold">損失の繰り越し</td>
                <td className="p-3 border-b border-gray-100">不可（損失が出ても他の所得と相殺できない）</td>
                <td className="p-3 border-b border-gray-100">可能（最長3年間、損失を繰り越して所得と相殺できる）</td>
              </tr>
              <tr>
                <td className="p-3 border-b border-gray-100 font-semibold">損益通算</td>
                <td className="p-3 border-b border-gray-100">不可（給与所得など他の所得と相殺できない）</td>
                <td className="p-3 border-b border-gray-100">可能（給与所得など他の所得と相殺できる場合がある）</td>
              </tr>
              <tr>
                <td className="p-3 border-b border-gray-100 font-semibold">家族への給与</td>
                <td className="p-3 border-b border-gray-100">経費にできない</td>
                <td className="p-3 border-b border-gray-100">一定の要件を満たせば経費にできる（青色事業専従者給与）</td>
              </tr>
              <tr>
                <td className="p-3 border-b border-gray-100 font-semibold">開業届の提出</td>
                <td className="p-3 border-b border-gray-100">不要</td>
                <td className="p-3 border-b border-gray-100">必要（青色申告を行う場合）</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="text-base leading-[1.8] mb-4">
          雑所得の場合、収入から必要経費を差し引いて所得金額を計算しますが、その損失は他の所得（給与所得など）と相殺する「損益通算」ができません。また、損失を翌年以降に繰り越すこともできません。
        </p>
        <p className="text-base leading-[1.8] mb-4">
          一方、事業所得として認められれば、
          <mark className="bg-amber-100 px-1 rounded font-bold">青色申告を選択することで、最大65万円の青色申告特別控除を受けられる</mark>
          など、大きな節税メリットがあります。さらに、事業で損失が出た場合には、給与所得など他の所得と損益通算ができるため、全体の課税所得を減らすことが可能です。損益通算しきれなかった損失は、翌年以降3年間繰り越して、将来の所得と相殺することもできます。
        </p>
        <p className="text-base leading-[1.8] mb-4">
          このように、所得区分によって税制上の取り扱いが大きく異なるため、副業の実態に合わせて適切な所得区分を判断することが重要です。特に、副業を本格的に行い、継続的な利益を目指すのであれば、事業所得として認められるように活動し、青色申告の適用を検討することをおすすめします。
        </p>
      </section>

      {/* セクション3 */}
      <section id="section-3" className="scroll-mt-6">
        <h2 className="text-[length:var(--font-size-h2-mobile)] sm:text-[length:var(--font-size-h2)] font-bold text-gray-800 mt-10 mb-4 pl-3 border-l-4 border-amber-500">
          3. 副業の確定申告で使える経費と所得控除
        </h2>
        <p className="text-base leading-[1.8] mb-4">
          副業で得た収入に対して税金を計算する際、収入から差し引くことができる「経費」や「所得控除」を適切に適用することで、
          <mark className="bg-amber-100 px-1 rounded font-bold">税負担を軽減することが可能</mark>
          です。ここでは、副業の確定申告で活用できる経費と所得控除について詳しく解説します。
        </p>

        <h3 className="text-[length:var(--font-size-h3-mobile)] sm:text-[length:var(--font-size-h3)] font-bold text-gray-800 mt-7 mb-3 pl-3 border-l-2 border-blue-400">
          3.1 副業収入から差し引ける経費の具体例
        </h3>
        <p className="text-base leading-[1.8] mb-4">
          「経費」とは、副業で収入を得るためにかかった費用のことです。事業所得や雑所得の計算において、収入から経費を差し引くことで所得金額を減らし、結果として課税対象となる所得税や住民税を抑えることができます。経費として認められるのは、その支出が
          <mark className="bg-amber-100 px-1 rounded font-bold">事業の遂行上、直接的かつ必要不可欠なもの</mark>
          である場合です。また、自宅を仕事場としている場合など、プライベートと事業で兼用している費用については「家事按分」という方法で事業に必要な分を合理的に計算し、経費として計上できます。
        </p>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse my-5 text-sm sm:text-base min-w-[500px]">
            <thead>
              <tr>
                <th className="bg-gray-50 text-gray-700 p-3 text-left font-semibold border-b border-gray-100">項目</th>
                <th className="bg-gray-50 text-gray-700 p-3 text-left font-semibold border-b border-gray-100">具体例</th>
                <th className="bg-gray-50 text-gray-700 p-3 text-left font-semibold border-b border-gray-100">備考</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="p-3 border-b border-gray-100">消耗品費</td>
                <td className="p-3 border-b border-gray-100">文房具、インク、USBメモリ、ソフトウェア（少額のもの）、作業用手袋など</td>
                <td className="p-3 border-b border-gray-100">使用期間が1年未満か、取得価額が10万円未満のものが該当します。</td>
              </tr>
              <tr>
                <td className="p-3 border-b border-gray-100">旅費交通費</td>
                <td className="p-3 border-b border-gray-100">取引先への移動費（電車代、バス代、ガソリン代）、出張時の宿泊費など</td>
                <td className="p-3 border-b border-gray-100">業務上必要な移動に限ります。</td>
              </tr>
              <tr>
                <td className="p-3 border-b border-gray-100">通信費</td>
                <td className="p-3 border-b border-gray-100">仕事用のインターネット回線費用、携帯電話料金、切手代、サーバー代など</td>
                <td className="p-3 border-b border-gray-100">プライベートとの兼用がある場合は家事按分が必要です。</td>
              </tr>
              <tr>
                <td className="p-3 border-b border-gray-100">広告宣伝費</td>
                <td className="p-3 border-b border-gray-100">ウェブサイトの広告費用、SNS広告費、名刺作成費用、チラシ作成費用など</td>
                <td className="p-3 border-b border-gray-100">事業の売上増加に直接繋がる宣伝活動費が対象です。</td>
              </tr>
              <tr>
                <td className="p-3 border-b border-gray-100">支払手数料</td>
                <td className="p-3 border-b border-gray-100">振込手数料、クラウドソーシングサイトの手数料、税理士への報酬など</td>
                <td className="p-3 border-b border-gray-100">業務上発生する各種手数料です。</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h3 className="text-[length:var(--font-size-h3-mobile)] sm:text-[length:var(--font-size-h3)] font-bold text-gray-800 mt-7 mb-3 pl-3 border-l-2 border-blue-400">
          3.2 忘れずに利用したい所得控除の種類
        </h3>
        <p className="text-base leading-[1.8] mb-4">
          所得控除とは、納税者個人の事情を考慮して、
          <mark className="bg-amber-100 px-1 rounded font-bold">所得税や住民税の負担を軽減するために所得金額から一定額を差し引く制度</mark>
          です。主な所得控除には、基礎控除、社会保険料控除、生命保険料控除、医療費控除、寄付金控除、小規模企業共済等掛金控除（iDeCoなど）、配偶者控除、扶養控除などがあります。これらの所得控除を最大限に活用することで、
          <mark className="bg-amber-100 px-1 rounded font-bold">手元に残るお金を増やすことができます</mark>
          。
        </p>

        <h3 className="text-[length:var(--font-size-h3-mobile)] sm:text-[length:var(--font-size-h3)] font-bold text-gray-800 mt-7 mb-3 pl-3 border-l-2 border-blue-400">
          3.3 経費の証拠書類の管理方法
        </h3>
        <p className="text-base leading-[1.8] mb-4">
          確定申告で経費を計上するためには、その支出が実際にあったことを証明する書類が必要です。税務調査が入った際に、これらの書類を提示できないと経費として認められない可能性があります。そのため、
          <mark className="bg-amber-100 px-1 rounded font-bold">証拠書類の適切な管理は非常に重要</mark>
          です。領収書・レシート、請求書・納品書、クレジットカードの利用明細、銀行口座の入出金履歴などを整理して保管しましょう。これらの書類は、
          <mark className="bg-amber-100 px-1 rounded font-bold">確定申告書の提出期限から原則として7年間（白色申告の場合は5年間）の保存義務</mark>
          があります。
        </p>
      </section>

      {/* セクション4 */}
      <section id="section-4" className="scroll-mt-6">
        <h2 className="text-[length:var(--font-size-h2-mobile)] sm:text-[length:var(--font-size-h2)] font-bold text-gray-800 mt-10 mb-4 pl-3 border-l-4 border-amber-500">
          4. 副業の確定申告書の作成と提出方法
        </h2>
        <p className="text-base leading-[1.8] mb-4">
          副業の確定申告は、書類の準備から作成、提出まで、いくつかのステップを踏む必要があります。ここでは、それぞれの段階で必要なことや効率的な進め方を詳しく解説します。
          <mark className="bg-amber-100 px-1 rounded font-bold">正確な申告とスムーズな手続き</mark>
          のために、ぜひ参考にしてください。
        </p>

        <h3 className="text-[length:var(--font-size-h3-mobile)] sm:text-[length:var(--font-size-h3)] font-bold text-gray-800 mt-7 mb-3 pl-3 border-l-2 border-blue-400">
          4.1 確定申告に必要な書類をリストアップ
        </h3>
        <p className="text-base leading-[1.8] mb-4">
          確定申告を始める前に、まずは必要な書類を漏れなく集めることが重要です。源泉徴収票、支払調書、帳簿（収支内訳書、青色申告決算書）、経費の領収書・レシート、控除証明書、マイナンバーカードまたは通知カード、預貯金通帳などを準備しましょう。特に
          <mark className="bg-amber-100 px-1 rounded font-bold">経費の領収書や帳簿</mark>
          は、日頃から整理しておく習慣をつけることが大切です。
        </p>

        <h3 className="text-[length:var(--font-size-h3-mobile)] sm:text-[length:var(--font-size-h3)] font-bold text-gray-800 mt-7 mb-3 pl-3 border-l-2 border-blue-400">
          4.2 国税庁のウェブサイトを活用した申告書作成
        </h3>
        <p className="text-base leading-[1.8] mb-4">
          確定申告書の作成は、国税庁のウェブサイトにある「確定申告書等作成コーナー」を利用するのが最も一般的で便利です。
          <mark className="bg-amber-100 px-1 rounded font-bold">画面の案内に従って入力するだけで、税額が自動で計算され</mark>
          、申告書が完成します。この作成コーナーは、税法の知識がなくてもスムーズに申告書を作成できるよう工夫されており、多くの方が利用しています。
        </p>

        <h3 className="text-[length:var(--font-size-h3-mobile)] sm:text-[length:var(--font-size-h3)] font-bold text-gray-800 mt-7 mb-3 pl-3 border-l-2 border-blue-400">
          4.3 e-Taxによる電子申告のメリットと手順
        </h3>
        <p className="text-base leading-[1.8] mb-4">
          e-Tax（国税電子申告・納税システム）を利用することで、確定申告を自宅からインターネット経由で行うことができます。
          <mark className="bg-amber-100 px-1 rounded font-bold">24時間いつでも申告可能、自宅から提出可能、添付書類の提出省略、還付がスピーディー</mark>
          といったメリットがあります。青色申告の場合、e-Taxで申告すると最大65万円の青色申告特別控除が適用されます（書面申告の場合は55万円）。
        </p>

        <h3 className="text-[length:var(--font-size-h3-mobile)] sm:text-[length:var(--font-size-h3)] font-bold text-gray-800 mt-7 mb-3 pl-3 border-l-2 border-blue-400">
          4.4 税務署への提出方法
        </h3>
        <p className="text-base leading-[1.8] mb-4">
          e-Taxを利用しない場合は、郵送による提出、税務署の窓口での提出、時間外収受箱への投函のいずれかの方法で提出できます。どの提出方法を選択するにしても、
          <mark className="bg-amber-100 px-1 rounded font-bold">提出期限を厳守することが最も重要</mark>
          です。期限を過ぎると無申告加算税や延滞税などのペナルティが課される可能性があるため、計画的に準備を進めましょう。
        </p>
      </section>

      {/* セクション5 */}
      <section id="section-5" className="scroll-mt-6">
        <h2 className="text-[length:var(--font-size-h2-mobile)] sm:text-[length:var(--font-size-h2)] font-bold text-gray-800 mt-10 mb-4 pl-3 border-l-4 border-amber-500">
          5. 青色申告で副業の税金を大幅に減らす
        </h2>
        <p className="text-base leading-[1.8] mb-4">
          副業の所得が事業所得または不動産所得に該当する場合、
          <mark className="bg-amber-100 px-1 rounded font-bold">青色申告を選択することで、税負担を大きく軽減できる可能性があります。</mark>
          青色申告は、白色申告と比較して帳簿付けの要件が厳しくなりますが、その分、節税効果の高い特典が数多く用意されています。
        </p>

        <h3 className="text-[length:var(--font-size-h3-mobile)] sm:text-[length:var(--font-size-h3)] font-bold text-gray-800 mt-7 mb-3 pl-3 border-l-2 border-blue-400">
          5.1 青色申告のメリットと適用要件
        </h3>
        <p className="text-base leading-[1.8] mb-4">
          青色申告には、青色申告特別控除（最大65万円または10万円）、赤字の繰り越しと繰り戻し、青色事業専従者給与、貸倒引当金の設定、少額減価償却資産の特例などのメリットがあります。適用するには、「青色申告承認申請書」を該当年の3月15日まで（新規開業の場合は開業日から2ヶ月以内）に提出する必要があります。
        </p>

        <h3 className="text-[length:var(--font-size-h3-mobile)] sm:text-[length:var(--font-size-h3)] font-bold text-gray-800 mt-7 mb-3 pl-3 border-l-2 border-blue-400">
          5.2 青色申告承認申請書の提出
        </h3>
        <p className="text-base leading-[1.8] mb-4">
          青色申告を行うためには、事前に税務署へ「青色申告承認申請書」を提出し、承認を得る必要があります。この手続きを忘れると、せっかくの青色申告のメリットを受けることができませんので、
          <mark className="bg-amber-100 px-1 rounded font-bold">期限内に確実に提出することが重要です。</mark>
        </p>

        <h3 className="text-[length:var(--font-size-h3-mobile)] sm:text-[length:var(--font-size-h3)] font-bold text-gray-800 mt-7 mb-3 pl-3 border-l-2 border-blue-400">
          5.3 青色申告に必要な帳簿付け
        </h3>
        <p className="text-base leading-[1.8] mb-4">
          最大65万円の青色申告特別控除を受けるためには、複式簿記での記帳が必要です。10万円の控除であれば、簡易な帳簿付け（単式簿記）でも認められます。帳簿や取引に関する書類は、
          <mark className="bg-amber-100 px-1 rounded font-bold">原則として帳簿は7年間、書類は5年間（一部は7年間）の保存が必要</mark>
          です。
        </p>
      </section>

      {/* セクション6 */}
      <section id="section-6" className="scroll-mt-6">
        <h2 className="text-[length:var(--font-size-h2-mobile)] sm:text-[length:var(--font-size-h2)] font-bold text-gray-800 mt-10 mb-4 pl-3 border-l-4 border-amber-500">
          6. 副業の確定申告と住民税 会社バレ対策
        </h2>
        <p className="text-base leading-[1.8] mb-4">
          副業を行っている方にとって、本業の会社に副業が発覚することは大きな懸念事項の一つです。特に、住民税の仕組みは会社に副業がバレる主要な原因となり得ます。
        </p>

        <h3 className="text-[length:var(--font-size-h3-mobile)] sm:text-[length:var(--font-size-h3)] font-bold text-gray-800 mt-7 mb-3 pl-3 border-l-2 border-blue-400">
          6.1 住民税の仕組みと普通徴収の選択
        </h3>
        <p className="text-base leading-[1.8] mb-4">
          住民税の徴収方法には「特別徴収」（会社が給与から天引き）と「普通徴収」（本人が直接納付）の2種類があります。会社員が副業で得た所得にかかる住民税を
          <mark className="bg-amber-100 px-1 rounded font-bold">普通徴収にするには、確定申告書の「住民税に関する事項」欄で「自分で納付（普通徴収）」にチェックを入れる</mark>
          ことで、副業分の住民税が自宅に送付され、会社に副業の存在が知られる可能性を大幅に減らせます。
        </p>

        <h3 className="text-[length:var(--font-size-h3-mobile)] sm:text-[length:var(--font-size-h3)] font-bold text-gray-800 mt-7 mb-3 pl-3 border-l-2 border-blue-400">
          6.2 会社に副業が発覚するリスクとその回避策
        </h3>
        <p className="text-base leading-[1.8] mb-4">
          副業が会社に発覚する主な原因は、住民税の特別徴収による通知です。回避策としては、確定申告で住民税の徴収方法を「普通徴収」に選択する、社内で副業について話さない、SNSでの情報発信に注意する、会社の資源を副業に利用しない、就業規則を確認するなどが挙げられます。
        </p>
      </section>

      {/* セクション7 */}
      <section id="section-7" className="scroll-mt-6">
        <h2 className="text-[length:var(--font-size-h2-mobile)] sm:text-[length:var(--font-size-h2)] font-bold text-gray-800 mt-10 mb-4 pl-3 border-l-4 border-amber-500">
          7. 副業の確定申告でよくある疑問とトラブル解決
        </h2>

        <h3 className="text-[length:var(--font-size-h3-mobile)] sm:text-[length:var(--font-size-h3)] font-bold text-gray-800 mt-7 mb-3 pl-3 border-l-2 border-blue-400">
          7.1 副業収入が20万円以下の場合の取り扱い
        </h3>
        <p className="text-base leading-[1.8] mb-4">
          副業による所得が年間20万円以下である場合、所得税の確定申告は原則不要ですが、
          <mark className="bg-amber-100 px-1 rounded font-bold">住民税にはこの「20万円以下なら申告不要」という規定は適用されません</mark>
          。住民税は所得の金額にかかわらず課税されるため、副業所得が20万円以下でも市区町村への住民税申告が必要です。また、「収入」と「所得」の違いを理解することも重要です。所得は収入から経費を差し引いた金額です。
        </p>

        <h3 className="text-[length:var(--font-size-h3-mobile)] sm:text-[length:var(--font-size-h3)] font-bold text-gray-800 mt-7 mb-3 pl-3 border-l-2 border-blue-400">
          7.2 複数の副業がある場合の確定申告
        </h3>
        <p className="text-base leading-[1.8] mb-4">
          複数の副業を掛け持ちしている場合でも、
          <mark className="bg-amber-100 px-1 rounded font-bold">すべての副業から生じた所得を合算して申告する</mark>
          ことになります。所得区分が異なる場合でも、それぞれの所得区分で所得を計算した後、確定申告書上で合算して申告します。経費の管理においては、どの副業にどの経費が対応するのかを明確に区別しておくことが重要です。
        </p>

        <h3 className="text-[length:var(--font-size-h3-mobile)] sm:text-[length:var(--font-size-h3)] font-bold text-gray-800 mt-7 mb-3 pl-3 border-l-2 border-blue-400">
          7.3 確定申告に関する相談窓口
        </h3>
        <p className="text-base leading-[1.8] mb-4">
          副業の確定申告に関して疑問や不安がある場合は、国税庁のホームページやチャットボット、税務署での相談、税理士への相談、市区町村の税務担当部署などを利用することが賢明です。
          <mark className="bg-amber-100 px-1 rounded font-bold">適切な情報を得ることで、誤った申告を防ぎ、税務上のトラブルを回避できます</mark>
          。
        </p>
      </section>

      {/* セクション8 まとめ */}
      <section id="section-8" className="scroll-mt-6">
        <h2 className="text-[length:var(--font-size-h2-mobile)] sm:text-[length:var(--font-size-h2)] font-bold text-gray-800 mt-10 mb-4 pl-3 border-l-4 border-amber-500">
          8. まとめ
        </h2>
        <p className="text-base leading-[1.8] mb-4">
          副業の確定申告は、一見複雑に感じられるかもしれませんが、本記事で解説した「確定申告の条件」「所得区分」「経費・控除」「申告方法」「青色申告」「住民税対策」などのポイントを押さえれば、決して難しいものではありません。適切な申告を行うことで、税金に関する不安を解消し、安心して副業を継続できます。不明な点があれば、国税庁の相談窓口や税理士に相談することも可能です。このマニュアルを参考に、スムーズな確定申告を目指しましょう。
        </p>
      </section>
    </article>
  );
}
