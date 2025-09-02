export async function onRequest() {
  try {
    // 固定目标
    const target = 'https://h5.lot-ml.com/ProductEn/Index/4388a5835e853d71';
    const res    = await fetch(target);
    const html   = await res.text();

    // 抠出 <div id="new_box">
    const m = html.match(/<div[^>]*\bid=['"]new_box['"][^>]*>([\s\S]*?)<\/div>/i);
    const inner = m ? m[0] : '<p>抓取失败</p>';

    return new Response(inner, {
      status: 200,
      headers: {
        'Content-Type': 'text/html;charset=utf-8',
        'Access-Control-Allow-Origin': '*'
      }
    });
  } catch (e) {
    return new Response('抓取失败: ' + e.message, {
      status: 500,
      headers: { 'Content-Type': 'text/plain;charset=utf-8' }
    });
  }
}
