const baseParse = _ => {
  let d = [];
  try{
    const list = parseDomForArray(getResCode(), 'body&&.mb');
    for (let j in list) {
      d.push({
        title: parseDomForHtml(list[j], '.mbtit&&Text'),
        desc: parseDomForHtml(list[j], '.mvhdico&&Text'),
        pic_url: parseDom(list[j], 'img&&src'),
        url: parseDom(list[j],'a&&href'),
      });
    }}catch(e){}

  setResult(d);
}

const secParse = _ => {
  let d = [];
  const list = parseDomForArray(getResCode(), 'body&&.dloaddivcol&&a');

  list.forEach(item => {
    d.push({
      title: parseDomForHtml(item, 'a&&Text'),
      url: parseDom(item,'a&&href'),
    });
  })

  setResult(d);
}