'use client';

import { useEffect, useId, useRef } from 'react';

const RAKUTEN_CONFIG_JS =
  'rakuten_affiliateId="0ea62065.34400275.0ea62066.204f04c0";' +
  'rakuten_items="ranking";' +
  'rakuten_genreId="0";' +
  'rakuten_recommend="on";' +
  'rakuten_design="slide";' +
  'rakuten_size="300x250";' +
  'rakuten_target="_blank";' +
  'rakuten_border="on";' +
  'rakuten_auto_mode="on";' +
  'rakuten_adNetworkId="a8Net";' +
  'rakuten_adNetworkUrl="https%3A%2F%2Frpx.a8.net%2Fsvt%2Fejp%3Fa8mat%3D4AVDG5%2B5CWGS2%2B2HOM%2BBS629%26rakuten%3Dy%26a8ejpredirect%3D";' +
  'rakuten_pointbackId="a26012470808_4AVDG5_5CWGS2_2HOM_BS629";' +
  'rakuten_mediaId="20011813";';

const RAKUTEN_WIDGET_SRC = '//xml.affiliate.rakuten.co.jp/widget/js/rakuten_widget.js';
const A8_PIXEL_SRC = 'https://www11.a8.net/0.gif?a8mat=4AVDG5+5CWGS2+2HOM+BS629';

type Props = {
  className?: string;
};

export default function RakutenWidgetAd({ className }: Props) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const id = useId();

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    // 再描画時の二重挿入を防ぐ
    el.innerHTML = '';

    const configScript = document.createElement('script');
    configScript.type = 'text/javascript';
    configScript.text = RAKUTEN_CONFIG_JS;

    const widgetScript = document.createElement('script');
    widgetScript.type = 'text/javascript';
    widgetScript.src = RAKUTEN_WIDGET_SRC;

    el.appendChild(configScript);
    el.appendChild(widgetScript);
  }, []);

  return (
    <div className={className}>
      <div ref={containerRef} data-rakuten-widget={id} />
      <img border={0} width={1} height={1} src={A8_PIXEL_SRC} alt="" />
    </div>
  );
}

