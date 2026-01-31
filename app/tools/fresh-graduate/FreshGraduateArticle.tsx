import FreshGraduateClient from '../../components/FreshGraduateClient';

export default function FreshGraduateArticle() {
  return (
    <article className="pb-20">
      {/* リード文 */}
      <p className="text-base leading-[1.8] mb-4">
        新卒の皆さんが気になる「手取り平均」について、大卒・高卒・専門卒それぞれのリアルな金額を徹底解説します。この記事を読めば、あなたの学歴や状況に応じた手取りの目安が分かり、額面給与から手取り額がどう算出されるか、なぜ約2割が引かれるのか、そして手取りを増やす具体的な方法まで理解できます。新社会人としての生活設計や、今後のキャリアを考える上で役立つ情報が満載です。結論として、新卒の手取り平均は全体で約17万円〜20万円程度が目安で、額面給与から税金や社会保険料が控除されるため、大卒は約20万円前後、高卒は約16万円前後、専門卒は約18万円前後が一般的です。
      </p>

      {/* 計算ツール（セクション1の上に配置） */}
      <FreshGraduateClient embedded />

      {/* セクション1 */}
      <section id="section-1" className="scroll-mt-6">
        <h2 className="text-[length:var(--font-size-h2-mobile)] sm:text-[length:var(--font-size-h2)] font-bold text-gray-800 mt-10 mb-4 pl-3 border-l-4 border-amber-500">
          1. 新卒の手取り平均額はいくら 結論から解説
        </h2>
        <p className="text-base leading-[1.8] mb-4">
          新卒として社会人生活をスタートさせる際、多くの人が気になるのが
          <mark className="bg-amber-100 px-1 rounded font-bold">「実際にもらえる手取り額はいくらなのか」</mark>
          ということでしょう。求人票に記載されているのは「額面給与」であり、実際に手元に入る「手取り額」とは異なります。
        </p>

        <h3 className="text-[length:var(--font-size-h3-mobile)] sm:text-[length:var(--font-size-h3)] font-bold text-gray-800 mt-7 mb-3 pl-3 border-l-2 border-blue-400">
          1.1 全体の新卒手取り平均を把握する
        </h3>
        <p className="text-base leading-[1.8] mb-4">
          結論から言うと、新卒の手取り平均額は、額面給与の約75%～85%が目安とされています。これは、額面給与から税金や社会保険料が差し引かれるためです。
        </p>
        <p className="text-base leading-[1.8] mb-4">
          厚生労働省の「令和5年賃金構造基本統計調査結果」によると、
          <mark className="bg-amber-100 px-1 rounded font-bold">大学卒（男女計）の初任給（額面）の平均は237,300円</mark>
          でした。この額面を基に手取り額を計算すると、以下のようになります。
        </p>

        <div className="overflow-x-auto">
          <table className="w-full border-collapse my-5 text-sm sm:text-base min-w-[500px]">
            <thead>
              <tr>
                <th className="bg-gray-50 text-gray-700 p-3 text-left font-semibold border-b border-gray-100">学歴</th>
                <th className="bg-gray-50 text-gray-700 p-3 text-left font-semibold border-b border-gray-100">初任給（額面）平均</th>
                <th className="bg-gray-50 text-gray-700 p-3 text-left font-semibold border-b border-gray-100">手取り額（目安：75%の場合）</th>
                <th className="bg-gray-50 text-gray-700 p-3 text-left font-semibold border-b border-gray-100">手取り額（目安：85%の場合）</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="p-3 border-b border-gray-100">大学卒（男女計）</td>
                <td className="p-3 border-b border-gray-100">237,300円</td>
                <td className="p-3 border-b border-gray-100">約177,975円</td>
                <td className="p-3 border-b border-gray-100">約201,705円</td>
              </tr>
            </tbody>
          </table>
        </div>

        <p className="text-base leading-[1.8] mb-4">
          したがって、大学卒の新卒の場合、
          <mark className="bg-amber-100 px-1 rounded font-bold">手取り平均額は月額17.8万円～20.2万円程度</mark>
          が一般的な目安となります。ただし、これはあくまで平均であり、個人の状況（扶養家族の有無など）や勤務する企業、地域によって変動することをご理解ください。
        </p>

        <h3 className="text-[length:var(--font-size-h3-mobile)] sm:text-[length:var(--font-size-h3)] font-bold text-gray-800 mt-7 mb-3 pl-3 border-l-2 border-blue-400">
          1.2 手取り平均に影響する主な要因
        </h3>
        <p className="text-base leading-[1.8] mb-4">
          額面給与から手取り額が少なくなる主な理由は、以下の
          <mark className="bg-amber-100 px-1 rounded font-bold">「税金」と「社会保険料」</mark>
          が差し引かれるためです。これらの控除項目は、新卒1年目と2年目以降で金額やタイミングが異なる場合があります。
        </p>

        <h4 className="text-base sm:text-lg font-bold text-gray-800 mt-5 mb-2">
          1.2.1 社会保険料
        </h4>
        <p className="text-base leading-[1.8] mb-4">
          社会保険料は、病気や怪我、失業などに備えるための公的な保険料です。主なものとして以下の3つが挙げられます。
        </p>
        <ul className="list-disc pl-6 mb-4 space-y-2">
          <li className="text-base leading-[1.8]">
            <strong>健康保険料：</strong>医療費の自己負担を軽減するための保険料です。会社と従業員が折半して負担します。
          </li>
          <li className="text-base leading-[1.8]">
            <strong>厚生年金保険料：</strong>将来の年金受給のための掛け金です。健康保険料と同様に、会社と従業員が折半して負担します。
          </li>
          <li className="text-base leading-[1.8]">
            <strong>雇用保険料：</strong>失業した際の給付金や育児休業給付金などを賄うための保険料です。会社と従業員が負担しますが、従業員の負担割合は会社よりも小さいです。
          </li>
        </ul>
        <p className="text-base leading-[1.8] mb-4">
          これらの社会保険料は、一般的に
          <mark className="bg-amber-100 px-1 rounded font-bold">入社2ヶ月目以降の給与から控除が開始される</mark>
          ことが多いですが、雇用保険料は初任給から差し引かれるケースもあります。そのため、初任給の手取り額は2ヶ月目以降よりも多くなる傾向があります。
        </p>

        <h4 className="text-base sm:text-lg font-bold text-gray-800 mt-5 mb-2">
          1.2.2 税金
        </h4>
        <p className="text-base leading-[1.8] mb-4">
          給与から差し引かれる税金には、所得税と住民税があります。
        </p>
        <ul className="list-disc pl-6 mb-4 space-y-2">
          <li className="text-base leading-[1.8]">
            <strong>所得税：</strong>個人の所得に対して国に納める税金です。毎月の給与から概算で差し引かれ（源泉徴収）、年末調整で精算されます。新卒の場合、
            <mark className="bg-amber-100 px-1 rounded font-bold">初任給から控除の対象</mark>
            となります。
          </li>
          <li className="text-base leading-[1.8]">
            <strong>住民税：</strong>居住している都道府県や市区町村に納める地方税です。住民税は前年の所得に基づいて課税されるため、新卒で初めて給与所得を得る1年目は、前年の所得がほとんどないため、
            <mark className="bg-amber-100 px-1 rounded font-bold">原則として住民税は控除されません</mark>
            。住民税の控除が開始されるのは、通常、社会人2年目の6月以降となります。
          </li>
        </ul>
        <p className="text-base leading-[1.8] mb-4">
          このように、初任給とそれ以降の給与では、控除される項目や金額が異なるため、手取り額も変動することを理解しておくことが重要です。
        </p>
      </section>

      {/* セクション2 */}
      <section id="section-2" className="scroll-mt-6">
        <h2 className="text-[length:var(--font-size-h2-mobile)] sm:text-[length:var(--font-size-h2)] font-bold text-gray-800 mt-10 mb-4 pl-3 border-l-4 border-amber-500">
          2. 大卒新卒の手取り平均を詳しく見る
        </h2>

        <h3 className="text-[length:var(--font-size-h3-mobile)] sm:text-[length:var(--font-size-h3)] font-bold text-gray-800 mt-7 mb-3 pl-3 border-l-2 border-blue-400">
          2.1 大卒の初任給と手取り額の傾向
        </h3>
        <p className="text-base leading-[1.8] mb-4">
          大卒新卒の給与を考える上で、まず理解すべきは「初任給」と「手取り額」の違いです。
          <mark className="bg-amber-100 px-1 rounded font-bold">初任給とは、会社から支給される総支給額</mark>
          を指し、基本給に残業手当や通勤手当などの各種手当を加えた金額です。一方、
          <mark className="bg-amber-100 px-1 rounded font-bold">手取り額とは、この初任給から所得税、社会保険料（健康保険、厚生年金保険、雇用保険）などが差し引かれた、実際に手元に残る金額</mark>
          を指します。給与明細に記載される額面と、実際に銀行口座に振り込まれる金額は異なることを理解しておくことが重要です。
        </p>
        <p className="text-base leading-[1.8] mb-4">
          厚生労働省の「令和5年賃金構造基本統計調査」によると、
          <mark className="bg-amber-100 px-1 rounded font-bold">大卒者の新卒の平均月収（初任給）は23万7,300円</mark>
          と報告されています。ただし、この金額はあくまで額面であり、実際に受け取る手取り額は異なります。一般的に、初任給に対する手取り額の割合は75%〜85%程度が目安とされていますが、新卒1年目の場合は、住民税が前年の所得に対して課税されるため、
          <mark className="bg-amber-100 px-1 rounded font-bold">初任給から住民税は引かれません</mark>
          。
        </p>
        <p className="text-base leading-[1.8] mb-4">
          例えば、初任給が23万7,300円の場合、概算で手取り額は以下のようになります。
        </p>

        <div className="overflow-x-auto">
          <table className="w-full border-collapse my-5 text-sm sm:text-base min-w-[500px]">
            <thead>
              <tr>
                <th className="bg-gray-50 text-gray-700 p-3 text-left font-semibold border-b border-gray-100">項目</th>
                <th className="bg-gray-50 text-gray-700 p-3 text-left font-semibold border-b border-gray-100">金額（目安）</th>
                <th className="bg-gray-50 text-gray-700 p-3 text-left font-semibold border-b border-gray-100">備考</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="p-3 border-b border-gray-100">初任給（額面）</td>
                <td className="p-3 border-b border-gray-100">237,300円</td>
                <td className="p-3 border-b border-gray-100">厚生労働省「令和5年賃金構造基本統計調査」より</td>
              </tr>
              <tr>
                <td className="p-3 border-b border-gray-100">控除額（社会保険料・所得税）</td>
                <td className="p-3 border-b border-gray-100">約35,000円〜47,000円</td>
                <td className="p-3 border-b border-gray-100">約15%〜20%程度を想定</td>
              </tr>
              <tr>
                <td className="p-3 border-b border-gray-100">手取り額（概算）</td>
                <td className="p-3 border-b border-gray-100">
                  <mark className="bg-amber-100 px-1 rounded font-bold">約190,000円〜202,000円</mark>
                </td>
                <td className="p-3 border-b border-gray-100"></td>
              </tr>
            </tbody>
          </table>
        </div>

        <p className="text-base leading-[1.8] mb-4">
          この手取り額はあくまで目安であり、加入する健康保険組合や扶養家族の有無、企業の福利厚生などによって変動します。
        </p>

        <h3 className="text-[length:var(--font-size-h3-mobile)] sm:text-[length:var(--font-size-h3)] font-bold text-gray-800 mt-7 mb-3 pl-3 border-l-2 border-blue-400">
          2.2 業界や企業規模による手取り額の差
        </h3>
        <p className="text-base leading-[1.8] mb-4">
          大卒新卒の手取り額は、所属する業界や企業の規模によって大きく変動します。自身の希望する業界や企業がどの程度の給与水準にあるのかを事前に把握しておくことは、キャリアプランを立てる上で非常に重要です。
        </p>

        <h4 className="text-base sm:text-lg font-bold text-gray-800 mt-5 mb-2">
          2.2.1 業界による手取り額の傾向
        </h4>
        <p className="text-base leading-[1.8] mb-4">
          業界別に初任給を見ると、専門性の高い業界や成長産業で高めの傾向が見られます。
        </p>

        <div className="overflow-x-auto">
          <table className="w-full border-collapse my-5 text-sm sm:text-base min-w-[500px]">
            <thead>
              <tr>
                <th className="bg-gray-50 text-gray-700 p-3 text-left font-semibold border-b border-gray-100">業界</th>
                <th className="bg-gray-50 text-gray-700 p-3 text-left font-semibold border-b border-gray-100">大学卒 初任給（男女計）</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="p-3 border-b border-gray-100">鉱業、採石業、砂利採取業</td>
                <td className="p-3 border-b border-gray-100">288,200円</td>
              </tr>
              <tr>
                <td className="p-3 border-b border-gray-100">医療、福祉</td>
                <td className="p-3 border-b border-gray-100">251,400円</td>
              </tr>
              <tr>
                <td className="p-3 border-b border-gray-100">情報通信業</td>
                <td className="p-3 border-b border-gray-100">244,400円</td>
              </tr>
              <tr>
                <td className="p-3 border-b border-gray-100">建設業</td>
                <td className="p-3 border-b border-gray-100">240,600円</td>
              </tr>
            </tbody>
          </table>
        </div>

        <p className="text-base leading-[1.8] mb-4">
          一方で、宿泊業、飲食サービス業や複合サービス事業などでは、他の業界と比較して初任給が低い傾向にあります。特に、コンサルティング、IT、商社、金融、不動産といった業界は、高い初任給を提示する企業が多いとされています。ただし、初任給が高い企業の中には、みなし残業代が含まれているケースもあるため、給与の内訳をしっかりと確認することが重要です。
        </p>

        <h4 className="text-base sm:text-lg font-bold text-gray-800 mt-5 mb-2">
          2.2.2 企業規模による手取り額の傾向
        </h4>
        <p className="text-base leading-[1.8] mb-4">
          企業規模も初任給、ひいては手取り額に大きな影響を与えます。一般的に、
          <mark className="bg-amber-100 px-1 rounded font-bold">大企業ほど初任給が高く、中小企業や小規模企業になるにつれて低くなる傾向</mark>
          にあります。
        </p>

        <div className="overflow-x-auto">
          <table className="w-full border-collapse my-5 text-sm sm:text-base min-w-[500px]">
            <thead>
              <tr>
                <th className="bg-gray-50 text-gray-700 p-3 text-left font-semibold border-b border-gray-100">企業規模</th>
                <th className="bg-gray-50 text-gray-700 p-3 text-left font-semibold border-b border-gray-100">大学卒 初任給（目安）</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="p-3 border-b border-gray-100">大企業（従業員1,000人以上）</td>
                <td className="p-3 border-b border-gray-100">約24万円</td>
              </tr>
              <tr>
                <td className="p-3 border-b border-gray-100">中企業（従業員300～999人）</td>
                <td className="p-3 border-b border-gray-100">約22万円</td>
              </tr>
              <tr>
                <td className="p-3 border-b border-gray-100">小企業（従業員299人以下）</td>
                <td className="p-3 border-b border-gray-100">約21万円</td>
              </tr>
            </tbody>
          </table>
        </div>

        <p className="text-base leading-[1.8] mb-4">
          大企業は資金力があるため、優秀な人材を確保するために高い初任給を設定する傾向にあります。また、福利厚生なども充実している場合が多く、結果的に手取り額以外の待遇面でも差が出ることが考えられます。しかし、中小企業やベンチャー企業でも、成長性や成果に応じた報酬体系を導入している企業もあり、一概に企業規模だけで判断することはできません。入社を検討する際には、初任給だけでなく、年収の推移や評価制度なども総合的に確認することが大切です。
        </p>
      </section>

      {/* セクション3 */}
      <section id="section-3" className="scroll-mt-6">
        <h2 className="text-[length:var(--font-size-h2-mobile)] sm:text-[length:var(--font-size-h2)] font-bold text-gray-800 mt-10 mb-4 pl-3 border-l-4 border-amber-500">
          3. 高卒新卒の手取り平均とその特徴
        </h2>

        <h3 className="text-[length:var(--font-size-h3-mobile)] sm:text-[length:var(--font-size-h3)] font-bold text-gray-800 mt-7 mb-3 pl-3 border-l-2 border-blue-400">
          3.1 高卒の初任給と手取り額の実態
        </h3>
        <p className="text-base leading-[1.8] mb-4">
          新卒として社会に出る高卒の皆さんがまず気になるのは、実際にどれくらいの収入を得られるか、つまり「手取り額」でしょう。企業から提示される給与は「額面」と呼ばれ、そこから税金や社会保険料が差し引かれた金額が「手取り」となります。一般的に、
          <mark className="bg-amber-100 px-1 rounded font-bold">手取り額は額面の約75%～85%</mark>
          になると言われています。
        </p>
        <p className="text-base leading-[1.8] mb-4">
          厚生労働省の「令和6年賃金構造基本統計調査」によると、高卒新卒の初任給の平均は以下の通りです。
        </p>

        <div className="overflow-x-auto">
          <table className="w-full border-collapse my-5 text-sm sm:text-base min-w-[500px]">
            <thead>
              <tr>
                <th className="bg-gray-50 text-gray-700 p-3 text-left font-semibold border-b border-gray-100">学歴</th>
                <th className="bg-gray-50 text-gray-700 p-3 text-left font-semibold border-b border-gray-100">男女計</th>
                <th className="bg-gray-50 text-gray-700 p-3 text-left font-semibold border-b border-gray-100">男性</th>
                <th className="bg-gray-50 text-gray-700 p-3 text-left font-semibold border-b border-gray-100">女性</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="p-3 border-b border-gray-100">高卒</td>
                <td className="p-3 border-b border-gray-100">197,500円</td>
                <td className="p-3 border-b border-gray-100">200,500円</td>
                <td className="p-3 border-b border-gray-100">191,700円</td>
              </tr>
            </tbody>
          </table>
        </div>

        <p className="text-base leading-[1.8] mb-4">
          この平均初任給額から、手取り額を計算してみましょう。例えば、男女計の平均初任給197,500円を基にすると、
          <mark className="bg-amber-100 px-1 rounded font-bold">高卒新卒の手取り平均は概ね148,000円～168,000円程度</mark>
          と推計されます。
        </p>

        <h3 className="text-[length:var(--font-size-h3-mobile)] sm:text-[length:var(--font-size-h3)] font-bold text-gray-800 mt-7 mb-3 pl-3 border-l-2 border-blue-400">
          3.2 地域による手取り額の違い
        </h3>
        <p className="text-base leading-[1.8] mb-4">
          高卒新卒の手取り額は、居住地や勤務地となる
          <mark className="bg-amber-100 px-1 rounded font-bold">地域によっても大きな差が生じます</mark>
          。これは、地域の最低賃金や物価水準、主要産業の賃金水準などが異なるためです。
        </p>
        <p className="text-base leading-[1.8] mb-4">
          一般的に、東京や大阪といった
          <mark className="bg-amber-100 px-1 rounded font-bold">都市部は、地方に比べて初任給が高い傾向</mark>
          にあります。これは、都市部に本社を置く大企業が多く、また物価や生活費が高いことに起因しています。一方で、地方では都市部ほど初任給が高くないケースが多いですが、その分家賃や食費などの生活コストが低いというメリットもあります。
        </p>
      </section>

      {/* セクション4 */}
      <section id="section-4" className="scroll-mt-6">
        <h2 className="text-[length:var(--font-size-h2-mobile)] sm:text-[length:var(--font-size-h2)] font-bold text-gray-800 mt-10 mb-4 pl-3 border-l-4 border-amber-500">
          4. 専門卒新卒の手取り平均と今後の見込み
        </h2>

        <h3 className="text-[length:var(--font-size-h3-mobile)] sm:text-[length:var(--font-size-h3)] font-bold text-gray-800 mt-7 mb-3 pl-3 border-l-2 border-blue-400">
          4.1 専門卒の初任給と手取り額の現状
        </h3>
        <p className="text-base leading-[1.8] mb-4">
          専門学校を卒業した新卒者の初任給は、専門分野で培った知識や技術を活かし、企業で即戦力として活躍できるため、一定の水準を保っています。厚生労働省が発表した「令和6年賃金構造基本統計調査」によると、
          <mark className="bg-amber-100 px-1 rounded font-bold">専門学校卒の初任給（月給）の平均は22万2,800円</mark>
          です。
        </p>

        <div className="overflow-x-auto">
          <table className="w-full border-collapse my-5 text-sm sm:text-base min-w-[500px]">
            <thead>
              <tr>
                <th className="bg-gray-50 text-gray-700 p-3 text-left font-semibold border-b border-gray-100">学歴</th>
                <th className="bg-gray-50 text-gray-700 p-3 text-left font-semibold border-b border-gray-100">初任給（額面）</th>
                <th className="bg-gray-50 text-gray-700 p-3 text-left font-semibold border-b border-gray-100">手取り額の目安（75%の場合）</th>
                <th className="bg-gray-50 text-gray-700 p-3 text-left font-semibold border-b border-gray-100">手取り額の目安（85%の場合）</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="p-3 border-b border-gray-100">専門学校卒</td>
                <td className="p-3 border-b border-gray-100">222,800円</td>
                <td className="p-3 border-b border-gray-100">約167,100円</td>
                <td className="p-3 border-b border-gray-100">約189,380円</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h3 className="text-[length:var(--font-size-h3-mobile)] sm:text-[length:var(--font-size-h3)] font-bold text-gray-800 mt-7 mb-3 pl-3 border-l-2 border-blue-400">
          4.2 専門スキルが手取りに与える影響
        </h3>
        <p className="text-base leading-[1.8] mb-4">
          専門学校で身につけたスキルは、新卒時の手取り額だけでなく、その後のキャリア形成や長期的な収入にも大きく影響を与えます。専門性の高いスキルを持つ人材は、企業にとって即戦力となるため、
          <mark className="bg-amber-100 px-1 rounded font-bold">特定の分野では高い評価を受けやすく、結果として給与水準も高くなる傾向</mark>
          があります。
        </p>
        <p className="text-base leading-[1.8] mb-4">
          特に、医療・福祉、IT、デザイン、製造業などの専門分野では、資格や実務経験が給与に直結しやすいと言えます。
        </p>
      </section>

      {/* セクション5 */}
      <section id="section-5" className="scroll-mt-6">
        <h2 className="text-[length:var(--font-size-h2-mobile)] sm:text-[length:var(--font-size-h2)] font-bold text-gray-800 mt-10 mb-4 pl-3 border-l-4 border-amber-500">
          5. 新卒の手取り平均が低いと感じたら
        </h2>
        <p className="text-base leading-[1.8] mb-4">
          新卒で働き始めたばかりの頃は、額面給与と手取り額の差に驚く方も少なくありません。しかし、
          <mark className="bg-amber-100 px-1 rounded font-bold">手取り額が低いと感じても、焦る必要はありません</mark>
          。具体的な対策を講じることで、手取り額を増やしたり、賢くお金を管理したりすることが可能です。
        </p>

        <h3 className="text-[length:var(--font-size-h3-mobile)] sm:text-[length:var(--font-size-h3)] font-bold text-gray-800 mt-7 mb-3 pl-3 border-l-2 border-blue-400">
          5.1 手取り額を増やすための具体的な方法
        </h3>

        <h4 className="text-base sm:text-lg font-bold text-gray-800 mt-5 mb-2">
          5.1.1 節税対策を積極的に行う
        </h4>
        <ul className="list-disc pl-6 mb-4 space-y-2">
          <li className="text-base leading-[1.8]">
            <mark className="bg-amber-100 px-1 rounded font-bold">iDeCo（個人型確定拠出年金）の活用</mark>：毎月一定額を積み立てることで、その全額が所得控除の対象となります。
          </li>
          <li className="text-base leading-[1.8]">
            <mark className="bg-amber-100 px-1 rounded font-bold">NISA（少額投資非課税制度）の活用</mark>：投資で得た利益が非課税になる制度です。
          </li>
          <li className="text-base leading-[1.8]">
            <mark className="bg-amber-100 px-1 rounded font-bold">ふるさと納税の活用</mark>：実質2,000円の負担で返礼品を受け取れます。
          </li>
        </ul>

        <h4 className="text-base sm:text-lg font-bold text-gray-800 mt-5 mb-2">
          5.1.2 副業・兼業を検討する
        </h4>
        <p className="text-base leading-[1.8] mb-4">
          勤務先の就業規則で認められている場合、副業・兼業も手取り額を増やす有効な手段です。
        </p>

        <h4 className="text-base sm:text-lg font-bold text-gray-800 mt-5 mb-2">
          5.1.3 会社の福利厚生を最大限に活用する
        </h4>
        <ul className="list-disc pl-6 mb-4 space-y-2">
          <li className="text-base leading-[1.8]">
            <mark className="bg-amber-100 px-1 rounded font-bold">住宅手当や社宅制度</mark>：家賃負担を軽減できます。
          </li>
          <li className="text-base leading-[1.8]">
            <mark className="bg-amber-100 px-1 rounded font-bold">社員食堂や食事補助</mark>：食費を抑えることができます。
          </li>
          <li className="text-base leading-[1.8]">
            <mark className="bg-amber-100 px-1 rounded font-bold">資格取得支援制度</mark>：スキルアップにかかる費用を会社が負担してくれます。
          </li>
        </ul>

        <h4 className="text-base sm:text-lg font-bold text-gray-800 mt-5 mb-2">
          5.1.4 スキルアップ・資格取得で市場価値を高める
        </h4>
        <p className="text-base leading-[1.8] mb-4">
          中長期的な視点では、自身のスキルアップや専門資格の取得が、昇給やキャリアアップに繋がります。
        </p>

        <h4 className="text-base sm:text-lg font-bold text-gray-800 mt-5 mb-2">
          5.1.5 転職を視野に入れる
        </h4>
        <p className="text-base leading-[1.8] mb-4">
          現在の会社で手取り額の増加が見込めない場合は、転職も選択肢の一つです。
        </p>

        <h3 className="text-[length:var(--font-size-h3-mobile)] sm:text-[length:var(--font-size-h3)] font-bold text-gray-800 mt-7 mb-3 pl-3 border-l-2 border-blue-400">
          5.2 新卒が知っておくべき税金と社会保険の知識
        </h3>

        <h4 className="text-base sm:text-lg font-bold text-gray-800 mt-5 mb-2">
          5.2.1 給与から天引きされる主な項目
        </h4>

        <div className="overflow-x-auto">
          <table className="w-full border-collapse my-5 text-sm sm:text-base min-w-[500px]">
            <thead>
              <tr>
                <th className="bg-gray-50 text-gray-700 p-3 text-left font-semibold border-b border-gray-100">区分</th>
                <th className="bg-gray-50 text-gray-700 p-3 text-left font-semibold border-b border-gray-100">項目</th>
                <th className="bg-gray-50 text-gray-700 p-3 text-left font-semibold border-b border-gray-100">概要</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="p-3 border-b border-gray-100" rowSpan={2}>税金</td>
                <td className="p-3 border-b border-gray-100">所得税</td>
                <td className="p-3 border-b border-gray-100">個人の所得に対してかかる国税</td>
              </tr>
              <tr>
                <td className="p-3 border-b border-gray-100">住民税</td>
                <td className="p-3 border-b border-gray-100">前年の所得に基づいて計算される地方税</td>
              </tr>
              <tr>
                <td className="p-3 border-b border-gray-100" rowSpan={3}>社会保険料</td>
                <td className="p-3 border-b border-gray-100">健康保険料</td>
                <td className="p-3 border-b border-gray-100">医療費負担を軽減するための保険料</td>
              </tr>
              <tr>
                <td className="p-3 border-b border-gray-100">厚生年金保険料</td>
                <td className="p-3 border-b border-gray-100">老後の生活を支えるための年金制度の保険料</td>
              </tr>
              <tr>
                <td className="p-3 border-b border-gray-100">雇用保険料</td>
                <td className="p-3 border-b border-gray-100">失業時や育休時に給付金を受け取るための保険料</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h4 className="text-base sm:text-lg font-bold text-gray-800 mt-5 mb-2">
          5.2.2 住民税の「翌年課税」に注意
        </h4>
        <p className="text-base leading-[1.8] mb-4">
          <mark className="bg-amber-100 px-1 rounded font-bold">新卒1年目の途中までは住民税の天引きがないため、2年目から手取り額が減ることに注意が必要です。</mark>
        </p>

        <h4 className="text-base sm:text-lg font-bold text-gray-800 mt-5 mb-2">
          5.2.3 所得控除の種類と活用
        </h4>
        <ul className="list-disc pl-6 mb-4 space-y-2">
          <li className="text-base leading-[1.8]">
            <mark className="bg-amber-100 px-1 rounded font-bold">社会保険料控除</mark>：支払った社会保険料の全額が控除の対象
          </li>
          <li className="text-base leading-[1.8]">
            <mark className="bg-amber-100 px-1 rounded font-bold">生命保険料控除</mark>：生命保険や医療保険に加入している場合に適用
          </li>
          <li className="text-base leading-[1.8]">
            <mark className="bg-amber-100 px-1 rounded font-bold">iDeCoの掛金</mark>：全額が所得控除の対象
          </li>
        </ul>
      </section>

      {/* セクション6 まとめ */}
      <section id="section-6" className="scroll-mt-6">
        <h2 className="text-[length:var(--font-size-h2-mobile)] sm:text-[length:var(--font-size-h2)] font-bold text-gray-800 mt-10 mb-4 pl-3 border-l-4 border-amber-500">
          6. まとめ
        </h2>
        <p className="text-base leading-[1.8] mb-4">
          新卒の手取り平均は、大卒、高卒、専門卒といった学歴だけでなく、勤務する業界や企業規模、地域によって大きく変動します。給与明細の額面から社会保険料や所得税、住民税が差し引かれるため、実際に手元に残る手取り額は額面よりも少なくなることを理解しておくことが重要です。もし手取りが低いと感じた場合でも、家計の見直しや資産形成、スキルアップによるキャリアアップなど、手取り額を増やすための具体的な方法は存在します。自身の状況を正確に把握し、税金や社会保険の知識を身につけることで、賢くキャリアプランを築いていきましょう。
        </p>
      </section>
    </article>
  );
}
