const baseParse = _ => {
  let d = [];
  const list = JSON.parse(getResCode()).data[0].retBody.data.live_data.live_list

  d.push({
    desc: '48 && float',
    url: 'file:///storage/emulated/0/Android/data/com.example.hikerview/files/Documents/TyrantG/public/qieEgame-tabs.html?time='+(new Date()).getTime(),
    col_type:"x5_webview_single"
  })

  list.forEach(item => {
    let data = JSON.parse(item.data_h5)
    d.push({
      title: data.title,
      desc: data.anchor_name,
      pic_url: data.program_res.cover_url,
      col_type: 'movie_2',
      url: data.jump_url
    })
  })

  setResult(d);
}

const secParse = _ => {
  let d = [];
  const anchor_id = MY_URL.match(/anchorid=(.*?)&/)[1]
  const data_json = fetch("https://share.egame.qq.com/cgi-bin/pgg_async_fcgi", {headers: {"Content-Type": "application/x-www-form-urlencoded"}, method: 'POST', body: "param={\"0\":{\"module\":\"pgg_live_read_svr\",\"method\":\"get_live_and_profile_info\",\"param\":{\"anchor_id\":"+anchor_id+",\"layout_id\":\"hot\",\"index\":1,\"other_uid\":0}}}"})

  const list = JSON.parse(data_json).data[0].retBody.data.video_info.stream_infos

  list.forEach(item => {
    d.push({
      title: item.desc,
      col_type: 'text_2',
      url: item.play_url
    })
  })

  setResult(d);
}

const cateGroupParse = _ => {
  let d = []
  const html = fetch("https://egame.qq.com/gamelist/", {headers:{"User-Agent":PC_UA}})
  const list = parseDomForArray(html, '.livelist-mod&&.gui-list-game');

  list.forEach(item => {
    d.push({
      title: parseDomForHtml(item, 'a&&title'),
      pic_url: parseDomForHtml(item, 'img&&src'),
      url: parseDomForHtml(item, 'a&&href'),
      col_type: 'movie_3',
    })
  })

  setResult(d);
}