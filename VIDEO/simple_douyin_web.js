// const channels_path = "hiker://files/rules/js/TyrantGenesis_抖音关注.js"
const douyin_cookie = "hiker://files/TyrantG/cookie/douyin.txt"

const baseParse = _ => {
    let d = [], category, html
    let home_cookie = request(douyin_cookie)
    const empty = "hiker://empty"
    if (! home_cookie) {
        html = fetch("https://www.douyin.com", {headers:{"User-Agent": PC_UA}, withHeaders: true})
        html = JSON.parse(html)
        log(html)
        home_cookie = html.headers["set-cookie"][0].split(';')[0]
        writeFile(douyin_cookie, home_cookie)
    }

    let current_page = MY_URL.split('##')[1].toString()

    let cate_select = getVar("tyrantgenesis.simple_douyin_web.cate_select", "")


    /*d.push({
        col_type:"blank_block"
    })*/

    if (current_page === '1') {
        category = [
            {title: '全部', id: ''},
            {title: '娱乐', id: '300201'},
            {title: '知识', id: '300203'},
            {title: '二次元', id: '300206'},
            {title: '游戏', id: '300205'},
            {title: '游戏', id: '300205'},
            {title: '美食', id: '300204'},
            {title: '体育', id: '300207'},
            {title: '时尚', id: '300208'},
            {title: '音乐', id: '300209'},
        ]
        category.forEach(cate => {
            d.push({
                title: cate_select === cate.id ? '‘‘’’<strong><font color="red">'+cate.title+'</font></strong>' : cate.title,
                url: $(empty).lazyRule(params => {
                    putVar("tyrantgenesis.simple_douyin_web.cate_select", params.id)
                    refreshPage(false)
                    return "hiker://empty"
                }, {
                    id: cate.id
                }),
                col_type: 'scroll_button',
            })
        })
    }

    // let not_sign_url = "https://www.douyin.com/aweme/v1/web/channel/feed/?device_platform=webapp&aid=6383&channel=channel_pc_web&tag_id="+cate_select+"&count=20&version_code=160100&version_name=16.1.0"

    let sign_url = fetch("http://douyin_signature.dev.tyrantg.com?type=feed&params="+cate_select)
    // let true_url = not_sign_url + "&_signature="+sign
    let data_json = fetch(sign_url, {
        headers: {
            "referer" : "https://www.douyin.com/",
            "cookie": home_cookie,
        }
    })

    if (! data_json || data_json === 'Need Verifying') {
        d.push({
            title: 'signature 获取失败，待修复',
            col_type: "long_text",
        })
    } else {
        let list = JSON.parse(data_json).aweme_list
        if (list && list.length > 0) {
            list.forEach(item => {
                if (item.video && item.author) {
                    d.push({
                        title: item.desc,
                        pic_url: item.video.cover.url_list[0],
                        desc: item.author.nickname,
                        url: $(empty).lazyRule(item => {
                            return item.video.play_addr.url_list[0] + "#isVideo=true#"
                        }, item),
                        col_type: 'movie_2',
                    })
                } else {
                    //item.cell_room.rawdata.replace(/:([1-9]\d*),/g, ':"$1",')
                }
            })
        }
    }

    setResult(d);
}